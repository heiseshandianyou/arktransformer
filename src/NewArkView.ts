import { TypeInference, ArkIfStmt,BasicBlock, Local, ModelUtils,
    MethodParameter,Type,MethodSubSignature, SceneConfig, 
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt, DummyMainCreater,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,ArkPtrInvokeExpr,
    MethodSignature, FieldSignature,ImportInfo, FunctionType,
    AbstractExpr} from "../lib/bundle";

import { checkStaticInvoke4Method, buildFunctionInterface, checkFunctionType4Method, checkNodeclaredValue, checkInstance4this, checkReturnType, checkControlFlow, inferSimpleTypes, inferTypes, checkIfComponent, checkIfStmt } from "./CheckType";

import { ClassPrinter } from "./ClassPrinter";

import { CreateInitMethod, CreateInvokeObject, CreateSuperInitInvoke } from "./Factory";

import { StmtPrinter } from "./StmtPrinter";

import { Logger2 } from "./Logger2";

import { TypeChecker } from "./TypeChecker";


export class NewArkView{
    private scene: Scene;
    constructor(inputScene: Scene){
        
        this.setScene(inputScene);
        //this.buildConstructor();
        // let typechecker: TypeChecker = new TypeChecker(this.scene);
        // typechecker.checkType();
        //this.myCheckType();
        //checkType4Scene(this.scene, this.logger);
        //this.createDummyMain(inputScene);
        
        //inputScene.inferTypes();
    }

    public checkType() {
        let typechecker: TypeChecker = new TypeChecker(this.scene);
        typechecker.checkType();
        
        //this.createDummyMain(this.scene);

        
    }


    public myCheckType(){
        //inferSimpleTypes(this.scene);
        
        buildFunctionInterface(this.scene);
        this.getFiles().forEach(file => {
            ModelUtils.getAllClassesInFile(file).forEach(arkClass => {
                checkInstance4this(arkClass);
                arkClass.getMethods(true)
                .forEach(arkMethod =>{
                    checkNodeclaredValue(arkMethod);
                    this.inferFunctionType(arkMethod);
                    //this.myInferFiledReftypeInMethoed(arkMethod);
                    checkReturnType(arkMethod);
                    checkControlFlow(arkMethod);
                    checkIfComponent(arkMethod);
                    checkIfStmt(arkMethod);
                    checkFunctionType4Method(arkMethod, arkClass, this.scene);
                    checkStaticInvoke4Method(arkMethod);
                });
            });
        });
    }

    public setScene(inputScene: Scene){
        this.scene = inputScene;
    }

    public getScene(): Scene{
        return this.scene;
    }

    //得到所有的文件
    public getFiles(): ArkFile[] {
        return this.scene.getFiles();
    }

    //得到所有文件中的所有类
    public getClasses(): ArkClass[] {
        let files: ArkFile[] = this.getFiles()
        let classes: ArkClass[] = [];
        for (let i: number = 0; i < files.length; i++){
            let thisFileClasses: ArkClass[] = [];
            thisFileClasses = ModelUtils.getAllClassesInFile(files[i]);
            for (let j: number = 0; j < thisFileClasses.length; j++){
                classes.push(thisFileClasses[j]);
            }
        }
        return classes;
    }

    //得到所有文件名
    public getFileNames(): string[]{
        let output: string[] = [];
        this.getFiles().forEach((file) => {
            output.push(file.getName());
        })
        return output;
    }

     //得到所有文件名
     public getClassNames(): string[]{
        let output: string[] = [];
        this.getClasses().forEach((clazz) => {
            output.push(clazz.getName());
        })
        return output;
    }

    //得到所有文件中的所有类 包括名称空间里的
    public async printClasses(): Promise<void>{
        let classes: ArkClass[] = this.getClasses();
        for (let i: number = 0; i < classes.length; i++){
            
            await printClass(classes[i]);
            
            
        }
    }


    //遍历所有构造constructor
    //在最开始添加specialinvoke
    //我们会为默认类添加constructor
    // class level
    public buildConstructor(){
        let classes: ArkClass[] = this.getClasses();
        classes.forEach((thisClass) => {
            //检查是不是_DEFAULT_ARK_CLASS
            if (thisClass.getName() === "_DEFAULT_ARK_CLASS"){
                //添加constructor  因为默认类没有 instaceinit和 cinitinit 只有一个special
                CreateInitMethod(thisClass);
            }
            //不是_DEFAULT_ARK_CLASS 只用添加一行invoke
            else {
                //找到constructor 方法
                let constructorMethod: ArkMethod = thisClass.getMethodWithName("constructor");

                if (thisClass.getSuperClass()){
                    //调用父类的构造函数 且不打印super()
                    //得到父类
                    let superClass: ArkClass = thisClass.getSuperClass();
                    //得到父类的constructor 的sig
                    if (superClass){
                        if (superClass.getMethodWithName("constructor")){
                            let superMethodSig: MethodSignature = 
                                superClass.getMethodWithName("constructor").getSignature();
                                //重新生成一个Stmt
                                //得到之前的stmt 遍历 自己的constructor
                                let constructorStmt: Stmt[] = constructorMethod.getBody().getCfg().getStmts();
                                let superInvoke: ArkInvokeStmt;
                                constructorStmt.forEach((stmt) => {
                                    if(stmt instanceof ArkInvokeStmt){
                                        if(stmt.getInvokeExpr() instanceof ArkStaticInvokeExpr){
                                            if (stmt.getInvokeExpr().getMethodSignature().getMethodSubSignature().getMethodName() === "super"){
                                                superInvoke = stmt;
                                            }
                                        }
                                    }
                                });
                                if(!superInvoke){
                                }
                                else{
                                    let newStmt: ArkInvokeStmt = CreateSuperInitInvoke(superMethodSig, superInvoke);
                                    //加到开头
                                    constructorMethod.getBody().getCfg().getStartingBlock().addStmtToFirst(newStmt);
                                }
                            }
                            else{
                                console.log("没有在" + thisClass.getName() + "constructor" );
                            }
                    }
                    else{
                        console.log("没有为" + thisClass.getName() + "找到super类实例" );
                    }
                            
                }

            }
        });
    }

    //这个方法会帮助我们检查是否@static_init方法里有多余的逻辑
    //TO DO：暂时没有实施, 我们会打印出所有@static_init
    //为了避免静态不太复杂我们只会 打印有额外逻辑的static
    //这个可以只在打印端实现
    public buildClinit(){
        
    }

    //做类型检查  
    //检查一个方法里的所有 实例字段引用 针对那些有实例但字段不明的字段引用
    //这个逻辑在打印中实现
    // public myInferFiledReftypeInMethoed(arkMethod: ArkMethod): void{
    //     const body = arkMethod.getBody();
    //     if (!body) {
    //         return;
    //     }
    //     const arkClass = arkMethod.getDeclaringArkClass();
    //     let stmts: Stmt[]  = body.getCfg().getStmts();
    //     for (let i:number = 0; i < stmts.length; i++){
    //         let values: Value[] = stmts[i].getUses();
    //         for (let j:number = 0; j < stmts.length; j++){
    //             if (values[j] instanceof ArkInstanceFieldRef){
    //                 let fieldSig: FieldSignature = values[j].getFieldSignature();
    //                 const baseName = fieldSig.getBaseName();
    //                 if (baseName === ''){
    //                     // console.log("字段：");
    //                     // console.log(values[j]);
    //                     // console.log("字段基类：");
    //                     // let local: Local = values[j].getBase();
    //                     // console.log(local);
    //                 }
                    
    //             }
    //         }
    //     }
    //     TypeInference.inferMethodReturnType(arkMethod);
    // }
    
    //创建一个dummyMain
    public createDummyMain(projectScene: Scene){
        const dummyMainCreator = new DummyMainCreater(projectScene);
        
        dummyMainCreator.createDummyMain();
        
        let selectFiles: ArkFile[] = projectScene.getFiles().filter(file => file.getName() === "@dummyFile")
        
        let selectClass: ArkClass = selectFiles[0].getClassWithName("@dummyClass");
        
        let selectMethod: ArkMethod = selectClass.getMethodWithName("@dummyMain");
        checkNodeclaredValue(selectMethod);
        // let stmts: Stmt[] = selectMethod.getBody().getCfg().getStmts();
        // for (const stmt of stmts){
        //     if (stmt instanceof ArkInvokeStmt) {
        //         let invokeExpr: AbstractInvokeExpr = stmt.getInvokeExpr();
        //         let methodSig: MethodSignature = invokeExpr.getMethodSignature();
        //         let methodName: string = methodSig.getMethodSubSignature().getMethodName();
        //         let classSig: ClassSignature = methodSig.getDeclaringClassSignature();
        //         let clazz: ArkClass|null = projectScene.getClass(classSig);
        //         if (clazz){
        //             let method: ArkMethod | null = clazz.getMethodWithName(methodName);
        //             if (method){
        //                 let newSig: MethodSignature = method.getSignature();
        //                 invokeExpr.setMethodSignature(newSig);

        //                 let stmtPrinter: StmtPrinter = new StmtPrinter(stmt, []);
                        
        //             }
        //         }
        //     }
        // }
        
    }

    //functiontype本来应该含有一个methodSig ,我们通过name去寻找有关的method
    //这个methodSig一般在他的Local里
    public inferFunctionType(arkMethod: ArkMethod): void{
        const body = arkMethod.getBody();
        if (!body) {
            return;
        }
        let locals: Map<string, Local> = body.getLocals();
        let stmts: Stmt[]  = body.getCfg().getStmts();
        for (let i:number = 0; i < stmts.length; i++){
            let values: Value[] = stmts[i].getUses();
            for (let j:number = 0; j < values.length; j++){
                if (values[j] instanceof ArkPtrInvokeExpr){
                    let methodsig: MethodSignature = stmts[i].getInvokeExpr().getMethodSignature();
                    let name: string = methodsig.getMethodSubSignature().getMethodName();
                    if (locals.get(name)){
                        if (locals.get(name).getType() instanceof FunctionType){
                            //把这个函数类的方法签名赋值给expr
                            stmts[i].getInvokeExpr().setFunPtrLocal(locals.get(name));
                            stmts[i].getInvokeExpr().setMethodSignature(locals.get(name).getType().getMethodSignature());
                            console.log("更正ptr调用 " + name);
                        }
                    }           
                }
            }
        }
    }

    
}

async function printClass(clazz: ArkClass) {
    let classPrinter: ClassPrinter = new ClassPrinter(clazz);
    classPrinter.print();
}
