"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClassSig = CreateClassSig;
exports.CreateFileSig = CreateFileSig;
exports.CreateInvokeObject = CreateInvokeObject;
exports.CreateSuperInitInvoke = CreateSuperInitInvoke;
exports.CreateInitMethod = CreateInitMethod;
exports.CreateObjectClassType = CreateObjectClassType;
exports.GetmethodsigwithnewName = GetmethodsigwithnewName;
var bundle_1 = require("../lib/bundle");
//这个文件的函数主要负责 创建类
// this function is to create the object class in java to work as the super class
// to create a class 1 category 2 declaringArkFile 3 classSignature must have value
// to create a class we must have a ArkFile 
function CreateClassSig(className, declaringFileSignature, declaringNamespaceSignature) {
    if (declaringNamespaceSignature === void 0) { declaringNamespaceSignature = null; }
    var sig = new bundle_1.ClassSignature(className, declaringFileSignature, declaringNamespaceSignature);
}
function CreateFileSig() {
}
function CreateInvokeObject() {
    //先创建一个 ArkInstanceInvokeExpr
    //创建它 需要base: Local, methodSignature: MethodSignature, args: Value[], realGenericTypes?: Type[]
    //创建  MethodSignature
    //创建 MethodSignature要 ClassSignature
    //创建 ClassSignature 
    var objectClassSig = bundle_1.ArkSignatureBuilder.buildClassSignatureFromClassName("java.lang.Object");
    var objectMethodSubSig = new bundle_1.MethodSubSignature("<init>", [], bundle_1.VoidType.getInstance(), false);
    var objectMethodSig = new bundle_1.MethodSignature(objectClassSig, objectMethodSubSig);
    var selfClassLocal = new bundle_1.Local("this");
    var objectInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(selfClassLocal, objectMethodSig, []);
    var objectInvokeStmt = new bundle_1.ArkInvokeStmt(objectInvokeExpr);
    return objectInvokeStmt;
}
function CreateSuperInitInvoke(superConsSig, oldstmt) {
    var SuperClassSig = superConsSig.getDeclaringClassSignature();
    var SuperMethodSubSig = new bundle_1.MethodSubSignature("constructor", superConsSig.getMethodSubSignature().getParameters(), bundle_1.VoidType.getInstance(), superConsSig.getMethodSubSignature().isStatic());
    var superMethodSig = new bundle_1.MethodSignature(SuperClassSig, SuperMethodSubSig);
    var selfClassLocal = new bundle_1.Local("this");
    var oldExpr = oldstmt.getInvokeExpr();
    var args = oldExpr.getArgs();
    var realGenericTypes = oldExpr.getRealGenericTypes();
    var superInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(selfClassLocal, superMethodSig, args, realGenericTypes);
    var superInvokeStmt = new bundle_1.ArkInvokeStmt(superInvokeExpr);
    return superInvokeStmt;
}
//会更具输入的类型 返回改类的构造方法 “constructor”
//只包含两个语句 specialinvoke的语句会在buildconstructor中添加
function CreateInitMethod(declaringClass) {
    //构造默认constructor
    var defaultConstructor = new bundle_1.ArkMethod();
    defaultConstructor.setDeclaringArkClass(declaringClass);
    defaultConstructor.setCode('');
    defaultConstructor.setIsGeneratedFlag(true);
    var newClassType = new bundle_1.ClassType(declaringClass.getSignature());
    var thisLocal = new bundle_1.Local("this", newClassType); // 局部变量 local
    var locals = new Set([thisLocal]); //构造局部变量集合
    var basicBlock = new bundle_1.BasicBlock(); //构造BB
    var startingStmt = new bundle_1.ArkAssignStmt(thisLocal, new bundle_1.ArkThisRef(new bundle_1.ClassType(declaringClass.getSignature())));
    basicBlock.addStmt(startingStmt);
    var methodSubSignature = bundle_1.ArkSignatureBuilder.buildMethodSubSignatureFromMethodName("constructor");
    var methodSignature = new bundle_1.MethodSignature(defaultConstructor.getDeclaringArkClass().getSignature(), methodSubSignature);
    defaultConstructor.setSignature(methodSignature);
    var returnVoidStmt = new bundle_1.ArkReturnVoidStmt();
    basicBlock.addStmt(returnVoidStmt);
    var cfg = new bundle_1.Cfg();
    cfg.addBlock(basicBlock);
    cfg.setStartingStmt(startingStmt);
    cfg.setDeclaringMethod(defaultConstructor);
    cfg.getStmts().forEach(function (stmt) { return stmt.setCfg(cfg); });
    defaultConstructor.setBody(new bundle_1.ArkBody(locals, cfg));
    declaringClass.addMethod(defaultConstructor);
    console.log("默认类" + declaringClass.getDeclaringArkFile().getName() + declaringClass.getName() + "构造constructor");
}
function CreateObjectClassType() {
    //创建ClassSig
    var objectClassSig = bundle_1.ArkSignatureBuilder.buildClassSignatureFromClassName("Object");
    var classType = new bundle_1.ClassType(objectClassSig);
    return classType;
}
//输入一个methodsig，和一个名字构造一个newsig只换名字
function GetmethodsigwithnewName(oldSig, name) {
    var oldSubSig = oldSig.getMethodSubSignature();
    var newSubSig = new bundle_1.MethodSubSignature(name, oldSubSig.getParameters(), oldSubSig.getReturnType(), oldSubSig.isStatic());
    var newSig = new bundle_1.MethodSignature(oldSig.getDeclaringClassSignature(), newSubSig);
    return newSig;
}
