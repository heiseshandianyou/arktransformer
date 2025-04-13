import { ArkIfStmt,BasicBlock, Local, ArkSignatureBuilder,
    MethodParameter,Type,MethodSubSignature, SceneConfig, 
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,
    MethodSignature, FieldSignature,ImportInfo, VoidType, UnionType, UnknownType,NeverType,
    AbstractExpr} from "../lib/bundle";

import { FunctionTransformer } from "./FunctionTransformer";

import { ArkView } from "./ArkView";

import { StringMap } from "./Map";

import { CreateInvokeObject, CreateSuperInitInvoke, CreateObjectClassType } from "./Factory"; 

import { ClassPrinter } from "./ClassPrinter";

import * as path from 'path';

export class ArkModule{
    //默认每一个 文件是一个模块
    private file:ArkFile;
    //所属的view
    private view: ArkView;
    //string是全称 一个类的全称 这个Map保存的是在这个文件里声称的类
    private declaredValuableClass: Map<string, ArkClass> = new Map<string, ArkClass>();
    //这个Map存储的简称到全称
    private simpletoFullMap: Map<string, string> = new Map();
    //这个Map保存的是这个文件里引用的类 是用类的全称引用
    private importValuableClass: Map<string, ArkClass> = new Map<string, ArkClass>();
    //文件命加路径 也就是 模块名
    private moduleNmae:string;


    constructor(inputfile: ArkFile, declaredView: ArkView){
        this.file = inputfile;
        this.view = declaredView;
        this.moduleNmae = StringMap.PackageMap(this.file.getProjectName() + "/" + this.file.getName());
        this.transformFunction();
        this.setDeclaredValuableClass();
        this.buildSimpleMap();
        this.checkSuperClass();
        
    }

    //先把文件中声明在顶层的函数转换成静态类
    private transformFunction(){
        let functionTransformer: FunctionTransformer = new FunctionTransformer(this);
        functionTransformer.searchDefaultClass();
    }

    // 这两个方法会把这个module中所有的类和方法汇总 包括引用的类
    //最终形成Map用来检索Class Map中的名字是as 之前的
    // java中是不支持别名的 所以暂时不支持通过别名来区分类
    private setDeclaredValuableClass(){
        //首先遍历所有声明的类 ，得到他们的全程，加到Map里
        let thisclassFullName:string;
        let declaredClasses: ArkClass[] = this.file.getClasses();
        declaredClasses.forEach((thisclass: ArkClass) => {
            thisclassFullName = this.moduleNmae + "." + thisclass.getName();
            this.declaredValuableClass.set(thisclassFullName, thisclass);
        });

    }

    //再更新引用的类 值得注意的是 这个方法要在项目中所有的的宣称类都修改好后再执行
    public setImportValuableClass(){
        //先找到所有的引用信息
        let importInfos: ImportInfo[] = this.file.getImportInfos();
        //遍历所有的引用
        importInfos.forEach((importInfo)=>{
            
            let currentFilePath:string = importInfo.getDeclaringArkFile().getFilePath();

            let relativePath: string = importInfo.getFrom() + ".ts"
            let absPath = path.resolve(path.dirname(currentFilePath), relativePath);

            console.log("引用了" + absPath + "路径下的");
            //得到所引用文件的绝对路径
            //得到对应Module
            let declaredModule :ArkModule | null = this.view.getModdulebyPath(absPath);
            if (declaredModule){
                //得到这个import的名字
                let importClauseName: string = importInfo.getImportClauseName();
                // 遍历module中的简单名字Map 找到这个类的全名             
                let fullClassName : string|undefined = declaredModule.getSimple2FullMap().get(importClauseName);
                //如果找到了这个全称
                if(fullClassName){
                    //再去全称map里找类
                    let importClass: ArkClass|undefined = declaredModule.getDeclaredClassesMap().get(fullClassName);
                    if  (importClass){
                        this.importValuableClass.set(fullClassName,importClass);
                    }
                }
                else{                    
                    console.log("找不到" + importClauseName + "引用");
                }

            }
            else {
                console.log("找不到" + absPath + "模块");
            }
        });
    }

    // 这个方法会遍历所有的类中所有的方法的语句 
    //  1 把Functiontype的调用变成static invoke
    //  2 添加switchstmt如果必要的话
    //  3 对于所有是unknown 的类型包括 所在文件更新
    //  4 初始方法的返回类型 void  每个类至少有 一个 @instance_init 和 @static_init 如果人为声明的话 还有一个 constructor
    //  5 对于一些字段引用 他们是不知道类型的
    //  6 重组构造函数 
    public checkType():void {
        
        let thisMethods: ArkMethod[];
        let thisMethod: ArkMethod;
        let thisFileds: ArkField[];
        let thisBody: ArkBody;
        let thisCfg: Cfg;
        let thisBB: BasicBlock;
        let thisStmt: Stmt;
        console.log("----------------------------");
        console.log("开始对" + this.moduleNmae + "模块类型检查");
        //怎么得到所有的类？ 遍历declaredValuableClass 这个类是包含了所有的在这个module中的宣称类
        this.getDeclaredClasses().forEach((thisClass) => {
            //修改构造函数
            this.buidConstructor(thisClass);
            this.buildStaticInit(thisClass);
            //得到字段 包括所有的 静态 和 非静态 字段
            thisFileds = thisClass.getFields();        
            // 得到方法  包括自动生成的方法 @instance @static
            thisMethods = thisClass.getMethods(true);
            // 遍历方法 
            for (let i: number = 0; i < thisMethods.length; i++){
                thisMethod = thisMethods[i];
                //判断是否有方法体
                if (thisMethod.getBody()){
                    thisBody = thisMethod.getBody();
                    thisCfg = thisBody.getCfg();                   
                    //检查方法返回类型
                    //this.checkReturnType(thisMethod);
                }
                
            }
        });
    }


    public getModuleName():string{
        return this.moduleNmae;
    }

    public getDeclaredClasses():ArkClass[]{
        return Array.from(this.declaredValuableClass.values());
    }

    public getDeclaredClassesNames():string[]{
        return Array.from(this.declaredValuableClass.keys());
    }

    public getDeclaredClassesMap():Map<string, ArkClass>{
        return this.declaredValuableClass;
    }

    public getSimple2FullMap():Map<string, string>{
        return this.simpletoFullMap;
    }

    public getFile():ArkFile{
        return this.file;
    }

    public getImportClasses():ArkClass[]{
        return Array.from(this.importValuableClass.values());
    }

    public getImportClassesNames():string[]{
        return Array.from(this.importValuableClass.keys());
    }

    //检查有没有父类 如果没有父类 要添加为 java.lang.Object
    //在这里我们只修改了 superclassname 属性 并没有实际添加类 这是为了方便输出jimple
    //将来如果有需求再加实际类
    public checkSuperClass(){
        let classes: ArkClass[] = this.getDeclaredClasses();
        classes.forEach((thisClass) => {
            if (thisClass.getSuperClassName().length === 0){
                thisClass.setSuperClassName("java.lang.Object");
            }
        });
    }

    //这个方法主要用来构造我们的构造方法 只是加一个调用父类就行 不合并
    //打印过程中要打印@instance
    public buidConstructor(inputClass: ArkClass){
        //找到constructor 方法
        let constructorMethod: ArkMethod = inputClass.getMethodWithName("constructor");
        //在constructor前加一句specailinvoke
        //检查有没有父类且不是object
        if (inputClass.getSuperClassName() === "java.lang.Object" ){
        //添加一句调用"java.lang.Object"到constructor 开头
        //创建调用语句
        console.log("给" + inputClass.getName() + "的constructor添加specialinvoke");
        let objectInvokeStmt: ArkInvokeStmt = CreateInvokeObject();
            if(constructorMethod){
                if(constructorMethod.getBody()){
                    let startBB = constructorMethod.getBody().getCfg().getStartingBlock(); 
                    startBB.addStmtToFirst(objectInvokeStmt);                     
                }
            }      
        }
    }

    public oldbuidConstructor(inputClass: ArkClass):void{
        
          console.log("构建" + inputClass.getName() + "类的实例构造方法");
          //扫描该类的 @instance_init 方法 得到所有的非自我赋值语句
          let constructorMethod: ArkMethod = inputClass.getMethodWithName("constructor");
          let allStmt: Stmt[];
          let InstanceStmt: Stmt[] = [];
          let InstanceInitMethod: ArkMethod = inputClass.getMethodWithName("@instance_init");
          //重构 constructor
          if (InstanceInitMethod){
            if(InstanceInitMethod.getBody()){
                //得到所有语句
                allStmt = InstanceInitMethod.getBody().getCfg().getStmts();
                //遍历所有语句找到所有非自我赋值的语句 且不是 returnvoid 语句
                // 我们判断的逻辑是看右操作数 是不是ArkThisRef
                allStmt.forEach((stmt:Stmt) => {                  
                    if(stmt instanceof ArkAssignStmt){
                        if(stmt.getRightOp() instanceof ArkThisRef){
                            
                        }
                        else{
                            InstanceStmt.push(stmt);
                        }

                    }
                    else if (stmt instanceof ArkReturnVoidStmt){

                    }
                    else{
                        InstanceStmt.push(stmt);
                    }
                    
                });
                // 接下来我们把这些语句加到constructor里 这些语句会被加到最开头
                // 找到constructor开始BB
                if(constructorMethod){
                    if(constructorMethod.getBody()){
                        let startBB = constructorMethod.getBody().getCfg().getStartingBlock();
                        //反向遍历InstanceStmt 依次加到开头
                        for(let i = InstanceStmt.length - 1; i >= 0; i--){
                            startBB.addStmtToFirst(InstanceStmt[i]);
                        }
                        
                    }
                    else{
                        console.log("constructor没有方法体");
                    }
                }
                else{
                    console.log("没有找到constructor");
                }
            }
            else {
                console.log(inputClass.getName() + "的instance_init 没有方法体");
            }
          }
          else{
            console.log("没有在" + inputClass.getName() + "发现@instance_init");
            return;
          }
          //在constructor前加一句specailinvoke
          //检查有没有父类且不是object
          if (inputClass.getSuperClassName() === "java.lang.Object" ){
            //添加一句调用"java.lang.Object"到constructor 开头
            //创建调用语句
            console.log("给" + inputClass.getName() + "的constructor添加specialinvoke");
            let objectInvokeStmt: ArkInvokeStmt = CreateInvokeObject();
            if(constructorMethod){
                if(constructorMethod.getBody()){
                    let startBB = constructorMethod.getBody().getCfg().getStartingBlock(); 
                    startBB.addStmtToFirst(objectInvokeStmt);                     
                }

            }
          }
          //如果有父类
          else{
            //调用父类的构造函数 且不打印super()
            //得到父类
            let superClass: ArkClass = inputClass.getSuperClass();
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
                        console.log("没有在" + inputClass.getName() + "找到super调用" );
                    }
                    else{
                        let newStmt: ArkInvokeStmt = CreateSuperInitInvoke(superMethodSig, superInvoke);
                        //加到开头
                        constructorMethod.getBody().getCfg().getStartingBlock().addStmtToFirst(newStmt);
                    }
                }
                else{
                    console.log("没有在" + inputClass.getName() + "constructor" );
                }
            }
            else{
                console.log("没有为" + inputClass.getName() + "找到super类实例" );
            }
        
          }
    }

    //这个方法会考察是否静态初始方法被定义 有定义则改名成<clinit>
    public buildStaticInit(inputClass: ArkClass):void{

        console.log("开始检查" + inputClass.getName() + "的静态初始方法");
        let staticInit:ArkMethod;
        staticInit = inputClass.getMethodWithName("@static_init");
        if (staticInit){
            if(staticInit.getBody()){
                //得到所有语句
                let allStmt: Stmt[] = staticInit.getBody().getCfg().getStmts();
                if(allStmt.length > 2){
                    //有静态构造逻辑
                    //删掉第一个语句 是自我赋值语句
                    //为这个方法给一个新的标签
                    let oldMethodSig: MethodSignature = staticInit.getSignature();

                    let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();

                    let newCinitSunSig: MethodSubSignature =
                        new MethodSubSignature("<clinit>", oldMethodSubSig.getParameters(), 
                        VoidType.getInstance(), true);

                    let newCinitSig: MethodSignature = 
                        new MethodSignature(oldMethodSig.getDeclaringClassSignature(),
                        newCinitSunSig);

                    staticInit.setSignature(newCinitSig);
                    //设置为 static
                    staticInit.setModifiers(16);
                    console.log("重新设置" + inputClass.getName() + "的静态初始方法");
                }
                else{
                    console.log(inputClass.getName() + "没有额外静态初始方法");
                }
            }
        }
        else{
            console.log("类" + inputClass.getName() + "没有@static_init方法");
        }

    }

    //这个方法会打印一个模块里所有的类 至于接口 对象 之类的还没实现暂时打印类
    public printModule(){
        console.log("开始打印" + this.moduleNmae + "模块");
        //遍历类
        this.getDeclaredClasses().forEach((eachClass) =>{
            let classPrinter: ClassPrinter = new ClassPrinter(eachClass);
            classPrinter.print();
        });

        console.log("结束打印" + this.moduleNmae + "模块");
    }
    
    //这个方法会建立简称Map
    public buildSimpleMap():void{
        let fullNames :string[] = Array.from(this.declaredValuableClass.keys());
        let simpleName: string;
        fullNames.forEach((fullName) => {
            simpleName = fullName;
            if(simpleName.includes("FunClass_")){
                // 使用 replace 方法删除 "abds"
                simpleName = simpleName.replace(/FunClass_/g, '');
                if(simpleName.includes("Anonymous_")){
                    simpleName = simpleName.replace(/Anonymous_/g, '');
                }
            }
            // 创建动态正则表达式，使用 RegExp 构造函数
            const regex = new RegExp(this.moduleNmae + ".", 'g'); // 'g' 表示全局匹配
            simpleName = simpleName.replace(regex, '');
            
            this.simpletoFullMap.set(simpleName, fullName);
        });
    }
    //
    public setInitSimpleMap(){
        let fullNames :string[] = Array.from(this.importValuableClass.keys());
        let simpleName: string;
        fullNames.forEach((fullName) => {
            simpleName = fullName;
            if(simpleName.includes("FunClass_")){
                // 使用 replace 方法删除 "abds"
                simpleName = simpleName.replace(/FunClass_/g, '');
                if(simpleName.includes("Anonymous_")){
                    simpleName = simpleName.replace(/Anonymous_/g, '');
                }
            }
            
            // 查找最后一个点的位置
            const lastDotIndex = simpleName.lastIndexOf('.');
            
            // 检查是否存在点
            if (lastDotIndex === -1) {
                simpleName = simpleName; 
            }
            else{
                // 从最后一个点之后的内容开始截取
                simpleName = simpleName.substring(lastDotIndex + 1);
            }
            this.simpletoFullMap.set(simpleName, fullName);
        });
    }
   
    //这个方法主要用来检查返回类型 在Infer前调用 
    //会修改MethodSubSignature 的returnType
    public checkReturnType(inputMethod: ArkMethod){
        if (inputMethod.getReturnType() instanceof UnionType){
            //如果是联合类型 设置为Object classtype
            let objectClassType: ClassType = CreateObjectClassType();
            let oldMethodSig: MethodSignature = inputMethod.getSignature();
            let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();
            let newMethodSubSig: MethodSubSignature = 
                new MethodSubSignature(oldMethodSubSig.getMethodName(), 
                oldMethodSubSig.getParameters(), objectClassType, oldMethodSubSig.isStatic());
            let newMethodSig: MethodSignature = 
                new MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
            inputMethod.setSignature(newMethodSig);
        }
        else if(inputMethod.getReturnType() instanceof UnknownType){
            if(inputMethod.getBody()){
                let stmts: Stmt[] = inputMethod.getBody().getCfg().getStmts();
                let returnStmts: Stmt[] = []
                for (let i:number = 0; i < stmts.length; i++){
                    if(stmts[i] instanceof ArkReturnStmt || stmts[i] instanceof ArkReturnVoidStmt){
                        returnStmts.push(stmts[i]);
                    }
                }
                if (returnStmts.length === 0){
                    //没有返回类型 默认为空类型
                    let voidClassType: VoidType = VoidType.getInstance();
                    let oldMethodSig: MethodSignature = inputMethod.getSignature();
                    let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();
                    let newMethodSubSig: MethodSubSignature = 
                        new MethodSubSignature(oldMethodSubSig.getMethodName(), 
                        oldMethodSubSig.getParameters(), voidClassType, oldMethodSubSig.isStatic());
                    let newMethodSig: MethodSignature = 
                        new MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                    inputMethod.setSignature(newMethodSig);
                }
                else{
                    //遍历所有返回语句查看他们的返回类型
                    let returnTypes: Set<Type> = new Set();
                    for(let i:number = 0; i < returnStmts.length; i++){
                        if(returnStmts[i] instanceof ArkReturnVoidStmt){
                            returnTypes.add(VoidType.getInstance());
                        }
                        else if(returnStmts[i] instanceof ArkReturnStmt){
                            returnTypes.add(returnStmts[i].getOp().getType());
                        }
                    }
                    console.log("返回类型：" + Array.from(returnTypes));
                    if(returnTypes.size === 1){
                        let newReturnType = Array.from(returnTypes)[0] ;
                        let oldMethodSig: MethodSignature = inputMethod.getSignature();
                        let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();
                        let newMethodSubSig: MethodSubSignature = 
                            new MethodSubSignature(oldMethodSubSig.getMethodName(), 
                            oldMethodSubSig.getParameters(), newReturnType, oldMethodSubSig.isStatic());
                        let newMethodSig: MethodSignature = 
                            new MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                        inputMethod.setSignature(newMethodSig);
                        
                    }
                    else{
                        //如果是联合类型 设置为Object classtype
                        let objectClassType: ClassType = CreateObjectClassType();
                        let oldMethodSig: MethodSignature = inputMethod.getSignature();
                        let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();
                        let newMethodSubSig: MethodSubSignature = 
                            new MethodSubSignature(oldMethodSubSig.getMethodName(), 
                            oldMethodSubSig.getParameters(), objectClassType, oldMethodSubSig.isStatic());
                        let newMethodSig: MethodSignature = 
                            new MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                        inputMethod.setSignature(newMethodSig);
                    }
                }
            }
        }
        else if(inputMethod.getReturnType() instanceof NeverType){
            //never类型 默认为空类型
            let voidClassType: VoidType = VoidType.getInstance();
            let oldMethodSig: MethodSignature = inputMethod.getSignature();
            let oldMethodSubSig: MethodSubSignature = oldMethodSig.getMethodSubSignature();
            let newMethodSubSig: MethodSubSignature = 
                new MethodSubSignature(oldMethodSubSig.getMethodName(), 
                oldMethodSubSig.getParameters(), voidClassType, oldMethodSubSig.isStatic());
            let newMethodSig: MethodSignature = 
                new MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
            inputMethod.setSignature(newMethodSig);
        }

    }


    //开始检查那些unknown 的Local 如果有和方法重名的就删掉
    public chenckIfLocalIsFunction(thisBody: ArkBody){
        let localNames: string[] = Array.from(thisBody.getLocals().keys());
        for (let j: number = 0; j < localNames.length; j++){
            console.log("检查Local:  " + localNames[j]);
            if (this.simpletoFullMap.has(localNames[j])){
                thisBody.getLocals().delete(localNames[j]);
                console.log("删除Local" + localNames[j]);
            }
        }
    }    
    
}


