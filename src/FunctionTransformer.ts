import { ArkFile,ArkClass,  ArkMethod, FunctionType, Local, ClassType, ArkThisRef,
    ClassSignature, Stmt,ArkAssignStmt,MethodSubSignature, MethodSignature } from "../lib/bundle";
import { ArkModule } from "./ArkModule";
import { StringMap } from "./Map";
import { CreateInitMethod } from "./Factory";

// 这个类主要负责处理函数 把他们变成类
export class FunctionTransformer{
    //以ArkFile为单位的转换
    private file:ArkFile;
    private module: ArkModule;
    private moduleName:string;
    private fileName: string;
    constructor(inputModule: ArkModule) {
        
        this.module = inputModule;
        this.file = this.module.getFile();
        this.moduleName = this.module.getModuleName();
        this.fileName = StringMap.FileNameMap(this.file.getName());
    }

    //这个方法会搜索这个文件下的defaultclass
    public searchDefaultClass(): void{
        let defaultClass: ArkClass = this.file.getDefaultClass();
        
        //扫描里面的方法 因为定义在 文件中的函数都被写在这里
        let methods: ArkMethod[] = defaultClass.getMethods(true);
        //方法名的列表
        let methodsNames:Array<String> = new Array();
        methods.forEach((method) => {
            methodsNames.push(method.getName());
        });
        // 为每个被声明为方法的函数建立一个类 
        // 我们用生成默认类的方法为我们文件生成基类 前提是我们人为改变了默认类
        // 改名字 就是签名 
        // 创建一个新签名  名字  包名 + 类名
        
        let newClassSig: ClassSignature = 
        new ClassSignature(this.fileName + "_DEFAULT_CLASS", this.file.getFileSignature(),null);
        //给原本的类赋新签名
        defaultClass.setSignature(newClassSig);
        //现在我知道如何直接创建class不过我还是保留之前的设计
        //对于每一个方法 这里我们处理命名函数 把匿名函数找出来一个
        let AnonymousMethodSet: Set<ArkMethod> = new Set();
        let defaultMrthod: ArkMethod;
        methods.forEach((method) => {
            if (method.getName() !== "_DEFAULT_ARK_METHOD" && !method.getName().includes("AnonymousMethod")){
                let newClass: ArkClass = new ArkClass();
                let newClassName: string = "FunClass_" + method.getName();
                //为这个新class初始
                newClassSig = new ClassSignature(newClassName, this.file.getFileSignature(),null);
                newClass.setSignature(newClassSig);
                newClass.setCategory(0);
                newClass.setCode(method.getCode());
                newClass.setDeclaringArkFile(this.file);
                //把原本方法的所属类改为新的
                method.setDeclaringArkClass(newClass);
                //改方法签名
                let newMethodSubSig: MethodSubSignature 
                = new MethodSubSignature(method.getName(), 
                method.getSubSignature().getParameters(), method.getSubSignature().getReturnType(),
                method.getSubSignature().isStatic());
                let newMethodSig: MethodSignature 
                = new MethodSignature(newClassSig, newMethodSubSig);
                method.setSignature(newMethodSig);
                //修饰符改为 public void 
                method.setModifiers(20);
                this.checkTheClassType(method, newClassSig);
                newClass.addMethod(method);
                
                //把这个类加到file
                //我们还需要把方法中所有指向默认类的ClassType 变成新类
                //这个逻辑在后面检查类型时实现
                //添加初始方法
                CreateInitMethod(newClass);
                this.file.addArkClass(newClass);
            }
            else if(method.getName().includes("AnonymousMethod")){
                AnonymousMethodSet.add(method);
            }
            else if(method.getName() === "_DEFAULT_ARK_METHOD"){
                defaultMrthod = method;
            }

        });
        //接下来我们去 _DEFAULT_ARK_METHOD 里找函数表达式来给 匿名函数命名
                
        defaultMrthod.getBody().getCfg().getStmts().forEach((stmt: Stmt) => {
            if (stmt instanceof ArkAssignStmt){
                if (stmt.getRightOp().getType() instanceof FunctionType){
                    //得到所指方法名
                    let funMethodName: string = stmt.getRightOp().getName();
                    let newClassName: string = stmt.getLeftOp().getName()
                    //遍历匿名方法集合 看是否有同名的
                    AnonymousMethodSet.forEach((method) => {
                        if (method.getName() === funMethodName){
                            //新建类并加入
                            let newClass: ArkClass = new ArkClass();
                            let ClassName: string = "FunClass_" + "Anonymous_" + newClassName;
                            //为这个新class初始
                            newClassSig = new ClassSignature(ClassName, this.file.getFileSignature(),null);
                            newClass.setSignature(newClassSig);
                            newClass.setCategory(0); //默认为类
                            newClass.setCode(method.getCode());
                            newClass.setDeclaringArkFile(this.file);
                            //把原本方法的所属类改为新的
                            method.setDeclaringArkClass(newClass);
                            //检查方法中原本的自我ref 
                            this.checkTheClassType(method, newClassSig);
                            //改方法签名
                            let newMethodSubSig: MethodSubSignature 
                            = new MethodSubSignature(method.getName(), 
                            method.getSubSignature().getParameters(), method.getSubSignature().getReturnType(),
                            method.getSubSignature().isStatic());
                            let newMethodSig: MethodSignature 
                            = new MethodSignature(newClassSig, newMethodSubSig);
                            method.setSignature(newMethodSig);
                            method.setModifiers(20);
                            newClass.addMethod(method);
                            newClass.setModifiers(20); // 默认为public static
                            //添加初始方法
                            CreateInitMethod(newClass);
                            //把这个类加到file
                            this.file.addArkClass(newClass);
                        }
                    });               
                }
            }
        });

    }
    
    //这个方法会检查方法中的原有的Local和assignStmt把他们变成指向自己类的
    public checkTheClassType(inputMethod: ArkMethod, selfSig: ClassSignature){
        //得到Local
        if(inputMethod.getBody()){
            //找到那个赋值语句
            let stmts:Stmt[] = inputMethod.getBody().getCfg().getStmts();
            for (let i: number = 0; i < stmts.length; i++){
                if(stmts[i] instanceof ArkAssignStmt 
                    && stmts[i].getRightOp() instanceof ArkThisRef){
                        //更新右边
                        let newClassType: ClassType = new ClassType(selfSig);
                        let newRef: ArkThisRef = new ArkThisRef(newClassType);
                        stmts[i].setRightOp(newRef);
                        break;
                    }
            }
        }
        
    }

}

