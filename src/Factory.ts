import { ArkIfStmt,BasicBlock, Local,FileSignature,NamespaceSignature,
    MethodParameter,Type,MethodSubSignature, SceneConfig, 
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,
    MethodSignature, FieldSignature,ImportInfo, buildDefaultConstructor,
    AbstractExpr, ArkSignatureBuilder, VoidType,UnknownType} from "../lib/bundle";

//这个文件的函数主要负责 创建类

// this function is to create the object class in java to work as the super class
// to create a class 1 category 2 declaringArkFile 3 classSignature must have value
// to create a class we must have a ArkFile 
export function CreateClassSig(className: string, declaringFileSignature: FileSignature, 
    declaringNamespaceSignature: NamespaceSignature | null = null): ClassSignature{
    
    let sig: ClassSignature = new ClassSignature(className, declaringFileSignature, declaringNamespaceSignature);

}

export function CreateFileSig():FileSignature{
    
}

export function CreateInvokeObject(): ArkInvokeStmt{
    //先创建一个 ArkInstanceInvokeExpr
    //创建它 需要base: Local, methodSignature: MethodSignature, args: Value[], realGenericTypes?: Type[]
    //创建  MethodSignature
    //创建 MethodSignature要 ClassSignature
    //创建 ClassSignature 
    let objectClassSig: ClassSignature = 
        ArkSignatureBuilder.buildClassSignatureFromClassName("java.lang.Object");

    let objectMethodSubSig: MethodSubSignature = 
        new MethodSubSignature("<init>", [], VoidType.getInstance(), false);

    let objectMethodSig: MethodSignature = 
        new MethodSignature(objectClassSig, objectMethodSubSig);

    let selfClassLocal: Local = 
        new Local("this");

    let objectInvokeExpr:ArkInstanceInvokeExpr = 
        new ArkInstanceInvokeExpr(selfClassLocal, objectMethodSig, []);

    let objectInvokeStmt: ArkInvokeStmt = 
        new ArkInvokeStmt(objectInvokeExpr);
    
    return objectInvokeStmt;
    
}

export function CreateSuperInitInvoke(superConsSig: MethodSignature, oldstmt: ArkInvokeStmt):ArkInvokeStmt{
    let SuperClassSig: ClassSignature = 
        superConsSig.getDeclaringClassSignature();

    let SuperMethodSubSig: MethodSubSignature = 
        new MethodSubSignature("constructor", superConsSig.getMethodSubSignature().getParameters(),
        VoidType.getInstance(),  superConsSig.getMethodSubSignature().isStatic()); 

    let superMethodSig: MethodSignature = 
        new MethodSignature(SuperClassSig, SuperMethodSubSig); 

    let selfClassLocal: Local = 
        new Local("this");

    let oldExpr: ArkStaticInvokeExpr = oldstmt.getInvokeExpr();

    let args: Value[] = oldExpr.getArgs();

    let realGenericTypes: Type[] = oldExpr.getRealGenericTypes();

    let superInvokeExpr:ArkInstanceInvokeExpr = 
        new ArkInstanceInvokeExpr(selfClassLocal, superMethodSig, args, realGenericTypes);

    let superInvokeStmt: ArkInvokeStmt = 
        new ArkInvokeStmt(superInvokeExpr);

    return superInvokeStmt;
    
}


//会更具输入的类型 返回改类的构造方法 “constructor”
//只包含两个语句 specialinvoke的语句会在buildconstructor中添加
export function  CreateInitMethod(declaringClass: ArkClass){

    //构造默认constructor
    const defaultConstructor: ArkMethod = new ArkMethod();
    defaultConstructor.setDeclaringArkClass(declaringClass);
    defaultConstructor.setCode('');
    defaultConstructor.setIsGeneratedFlag(true);

    let newClassType: ClassType = new ClassType(declaringClass.getSignature());
    const thisLocal = new Local("this", newClassType); // 局部变量 local
    const locals: Set<Local> = new Set([thisLocal]);//构造局部变量集合
    const basicBlock = new BasicBlock(); //构造BB
    let startingStmt: Stmt = new ArkAssignStmt(thisLocal, new ArkThisRef(new ClassType(declaringClass.getSignature())));
    basicBlock.addStmt(startingStmt);
    const methodSubSignature = ArkSignatureBuilder.buildMethodSubSignatureFromMethodName("constructor");
    const methodSignature = new MethodSignature(defaultConstructor.getDeclaringArkClass().getSignature(),
        methodSubSignature);
    defaultConstructor.setSignature(methodSignature);
    const returnVoidStmt = new ArkReturnVoidStmt();
    basicBlock.addStmt(returnVoidStmt);
    const cfg = new Cfg();
    cfg.addBlock(basicBlock);
    cfg.setStartingStmt(startingStmt);
    
    cfg.setDeclaringMethod(defaultConstructor);
    cfg.getStmts().forEach((stmt):Stmt => stmt.setCfg(cfg));

    defaultConstructor.setBody(new ArkBody(locals, cfg));
    declaringClass.addMethod(defaultConstructor); 


    console.log("默认类" + declaringClass.getDeclaringArkFile().getName() + declaringClass.getName() + "构造constructor");
    

}

export function CreateObjectClassType():ClassType{
    //创建ClassSig
    
    let objectClassSig: ClassSignature = 
        ArkSignatureBuilder.buildClassSignatureFromClassName("Object");
    let classType: ClassType = new ClassType(objectClassSig);
    return classType;
}


//输入一个methodsig，和一个名字构造一个newsig只换名字
export function GetmethodsigwithnewName(oldSig: MethodSignature, name: string): MethodSignature{
    let oldSubSig: MethodSubSignature = oldSig.getMethodSubSignature();
    let newSubSig: MethodSubSignature = 
        new MethodSubSignature(name, oldSubSig.getParameters(), oldSubSig.getReturnType(), oldSubSig.isStatic());
    let newSig: MethodSignature = 
        new MethodSignature(oldSig.getDeclaringClassSignature(), newSubSig);
    return newSig;
}
