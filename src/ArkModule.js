"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkModule = void 0;
var bundle_1 = require("../lib/bundle");
var FunctionTransformer_1 = require("./FunctionTransformer");
var Map_1 = require("./Map");
var Factory_1 = require("./Factory");
var ClassPrinter_1 = require("./ClassPrinter");
var path = require("path");
var ArkModule = /** @class */ (function () {
    function ArkModule(inputfile, declaredView) {
        //string是全称 一个类的全称 这个Map保存的是在这个文件里声称的类
        this.declaredValuableClass = new Map();
        //这个Map存储的简称到全称
        this.simpletoFullMap = new Map();
        //这个Map保存的是这个文件里引用的类 是用类的全称引用
        this.importValuableClass = new Map();
        this.file = inputfile;
        this.view = declaredView;
        this.moduleNmae = Map_1.StringMap.PackageMap(this.file.getProjectName() + "/" + this.file.getName());
        this.transformFunction();
        this.setDeclaredValuableClass();
        this.buildSimpleMap();
        this.checkSuperClass();
    }
    //先把文件中声明在顶层的函数转换成静态类
    ArkModule.prototype.transformFunction = function () {
        var functionTransformer = new FunctionTransformer_1.FunctionTransformer(this);
        functionTransformer.searchDefaultClass();
    };
    // 这两个方法会把这个module中所有的类和方法汇总 包括引用的类
    //最终形成Map用来检索Class Map中的名字是as 之前的
    // java中是不支持别名的 所以暂时不支持通过别名来区分类
    ArkModule.prototype.setDeclaredValuableClass = function () {
        var _this = this;
        //首先遍历所有声明的类 ，得到他们的全程，加到Map里
        var thisclassFullName;
        var declaredClasses = this.file.getClasses();
        declaredClasses.forEach(function (thisclass) {
            thisclassFullName = _this.moduleNmae + "." + thisclass.getName();
            _this.declaredValuableClass.set(thisclassFullName, thisclass);
        });
    };
    //再更新引用的类 值得注意的是 这个方法要在项目中所有的的宣称类都修改好后再执行
    ArkModule.prototype.setImportValuableClass = function () {
        var _this = this;
        //先找到所有的引用信息
        var importInfos = this.file.getImportInfos();
        //遍历所有的引用
        importInfos.forEach(function (importInfo) {
            var currentFilePath = importInfo.getDeclaringArkFile().getFilePath();
            var relativePath = importInfo.getFrom() + ".ts";
            var absPath = path.resolve(path.dirname(currentFilePath), relativePath);
            console.log("引用了" + absPath + "路径下的");
            //得到所引用文件的绝对路径
            //得到对应Module
            var declaredModule = _this.view.getModdulebyPath(absPath);
            if (declaredModule) {
                //得到这个import的名字
                var importClauseName = importInfo.getImportClauseName();
                // 遍历module中的简单名字Map 找到这个类的全名             
                var fullClassName = declaredModule.getSimple2FullMap().get(importClauseName);
                //如果找到了这个全称
                if (fullClassName) {
                    //再去全称map里找类
                    var importClass = declaredModule.getDeclaredClassesMap().get(fullClassName);
                    if (importClass) {
                        _this.importValuableClass.set(fullClassName, importClass);
                    }
                }
                else {
                    console.log("找不到" + importClauseName + "引用");
                }
            }
            else {
                console.log("找不到" + absPath + "模块");
            }
        });
    };
    // 这个方法会遍历所有的类中所有的方法的语句 
    //  1 把Functiontype的调用变成static invoke
    //  2 添加switchstmt如果必要的话
    //  3 对于所有是unknown 的类型包括 所在文件更新
    //  4 初始方法的返回类型 void  每个类至少有 一个 @instance_init 和 @static_init 如果人为声明的话 还有一个 constructor
    //  5 对于一些字段引用 他们是不知道类型的
    //  6 重组构造函数 
    ArkModule.prototype.checkType = function () {
        var _this = this;
        var thisMethods;
        var thisMethod;
        var thisFileds;
        var thisBody;
        var thisCfg;
        var thisBB;
        var thisStmt;
        console.log("----------------------------");
        console.log("开始对" + this.moduleNmae + "模块类型检查");
        //怎么得到所有的类？ 遍历declaredValuableClass 这个类是包含了所有的在这个module中的宣称类
        this.getDeclaredClasses().forEach(function (thisClass) {
            //修改构造函数
            _this.buidConstructor(thisClass);
            _this.buildStaticInit(thisClass);
            //得到字段 包括所有的 静态 和 非静态 字段
            thisFileds = thisClass.getFields();
            // 得到方法  包括自动生成的方法 @instance @static
            thisMethods = thisClass.getMethods(true);
            // 遍历方法 
            for (var i = 0; i < thisMethods.length; i++) {
                thisMethod = thisMethods[i];
                //判断是否有方法体
                if (thisMethod.getBody()) {
                    thisBody = thisMethod.getBody();
                    thisCfg = thisBody.getCfg();
                    //检查方法返回类型
                    //this.checkReturnType(thisMethod);
                }
            }
        });
    };
    ArkModule.prototype.getModuleName = function () {
        return this.moduleNmae;
    };
    ArkModule.prototype.getDeclaredClasses = function () {
        return Array.from(this.declaredValuableClass.values());
    };
    ArkModule.prototype.getDeclaredClassesNames = function () {
        return Array.from(this.declaredValuableClass.keys());
    };
    ArkModule.prototype.getDeclaredClassesMap = function () {
        return this.declaredValuableClass;
    };
    ArkModule.prototype.getSimple2FullMap = function () {
        return this.simpletoFullMap;
    };
    ArkModule.prototype.getFile = function () {
        return this.file;
    };
    ArkModule.prototype.getImportClasses = function () {
        return Array.from(this.importValuableClass.values());
    };
    ArkModule.prototype.getImportClassesNames = function () {
        return Array.from(this.importValuableClass.keys());
    };
    //检查有没有父类 如果没有父类 要添加为 java.lang.Object
    //在这里我们只修改了 superclassname 属性 并没有实际添加类 这是为了方便输出jimple
    //将来如果有需求再加实际类
    ArkModule.prototype.checkSuperClass = function () {
        var classes = this.getDeclaredClasses();
        classes.forEach(function (thisClass) {
            if (thisClass.getSuperClassName().length === 0) {
                thisClass.setSuperClassName("java.lang.Object");
            }
        });
    };
    //这个方法主要用来构造我们的构造方法 只是加一个调用父类就行 不合并
    //打印过程中要打印@instance
    ArkModule.prototype.buidConstructor = function (inputClass) {
        //找到constructor 方法
        var constructorMethod = inputClass.getMethodWithName("constructor");
        //在constructor前加一句specailinvoke
        //检查有没有父类且不是object
        if (inputClass.getSuperClassName() === "java.lang.Object") {
            //添加一句调用"java.lang.Object"到constructor 开头
            //创建调用语句
            console.log("给" + inputClass.getName() + "的constructor添加specialinvoke");
            var objectInvokeStmt = (0, Factory_1.CreateInvokeObject)();
            if (constructorMethod) {
                if (constructorMethod.getBody()) {
                    var startBB = constructorMethod.getBody().getCfg().getStartingBlock();
                    startBB.addStmtToFirst(objectInvokeStmt);
                }
            }
        }
    };
    ArkModule.prototype.oldbuidConstructor = function (inputClass) {
        console.log("构建" + inputClass.getName() + "类的实例构造方法");
        //扫描该类的 @instance_init 方法 得到所有的非自我赋值语句
        var constructorMethod = inputClass.getMethodWithName("constructor");
        var allStmt;
        var InstanceStmt = [];
        var InstanceInitMethod = inputClass.getMethodWithName("@instance_init");
        //重构 constructor
        if (InstanceInitMethod) {
            if (InstanceInitMethod.getBody()) {
                //得到所有语句
                allStmt = InstanceInitMethod.getBody().getCfg().getStmts();
                //遍历所有语句找到所有非自我赋值的语句 且不是 returnvoid 语句
                // 我们判断的逻辑是看右操作数 是不是ArkThisRef
                allStmt.forEach(function (stmt) {
                    if (stmt instanceof bundle_1.ArkAssignStmt) {
                        if (stmt.getRightOp() instanceof bundle_1.ArkThisRef) {
                        }
                        else {
                            InstanceStmt.push(stmt);
                        }
                    }
                    else if (stmt instanceof bundle_1.ArkReturnVoidStmt) {
                    }
                    else {
                        InstanceStmt.push(stmt);
                    }
                });
                // 接下来我们把这些语句加到constructor里 这些语句会被加到最开头
                // 找到constructor开始BB
                if (constructorMethod) {
                    if (constructorMethod.getBody()) {
                        var startBB = constructorMethod.getBody().getCfg().getStartingBlock();
                        //反向遍历InstanceStmt 依次加到开头
                        for (var i = InstanceStmt.length - 1; i >= 0; i--) {
                            startBB.addStmtToFirst(InstanceStmt[i]);
                        }
                    }
                    else {
                        console.log("constructor没有方法体");
                    }
                }
                else {
                    console.log("没有找到constructor");
                }
            }
            else {
                console.log(inputClass.getName() + "的instance_init 没有方法体");
            }
        }
        else {
            console.log("没有在" + inputClass.getName() + "发现@instance_init");
            return;
        }
        //在constructor前加一句specailinvoke
        //检查有没有父类且不是object
        if (inputClass.getSuperClassName() === "java.lang.Object") {
            //添加一句调用"java.lang.Object"到constructor 开头
            //创建调用语句
            console.log("给" + inputClass.getName() + "的constructor添加specialinvoke");
            var objectInvokeStmt = (0, Factory_1.CreateInvokeObject)();
            if (constructorMethod) {
                if (constructorMethod.getBody()) {
                    var startBB = constructorMethod.getBody().getCfg().getStartingBlock();
                    startBB.addStmtToFirst(objectInvokeStmt);
                }
            }
        }
        //如果有父类
        else {
            //调用父类的构造函数 且不打印super()
            //得到父类
            var superClass = inputClass.getSuperClass();
            //得到父类的constructor 的sig
            if (superClass) {
                if (superClass.getMethodWithName("constructor")) {
                    var superMethodSig = superClass.getMethodWithName("constructor").getSignature();
                    //重新生成一个Stmt
                    //得到之前的stmt 遍历 自己的constructor
                    var constructorStmt = constructorMethod.getBody().getCfg().getStmts();
                    var superInvoke_1;
                    constructorStmt.forEach(function (stmt) {
                        if (stmt instanceof bundle_1.ArkInvokeStmt) {
                            if (stmt.getInvokeExpr() instanceof bundle_1.ArkStaticInvokeExpr) {
                                if (stmt.getInvokeExpr().getMethodSignature().getMethodSubSignature().getMethodName() === "super") {
                                    superInvoke_1 = stmt;
                                }
                            }
                        }
                    });
                    if (!superInvoke_1) {
                        console.log("没有在" + inputClass.getName() + "找到super调用");
                    }
                    else {
                        var newStmt = (0, Factory_1.CreateSuperInitInvoke)(superMethodSig, superInvoke_1);
                        //加到开头
                        constructorMethod.getBody().getCfg().getStartingBlock().addStmtToFirst(newStmt);
                    }
                }
                else {
                    console.log("没有在" + inputClass.getName() + "constructor");
                }
            }
            else {
                console.log("没有为" + inputClass.getName() + "找到super类实例");
            }
        }
    };
    //这个方法会考察是否静态初始方法被定义 有定义则改名成<clinit>
    ArkModule.prototype.buildStaticInit = function (inputClass) {
        console.log("开始检查" + inputClass.getName() + "的静态初始方法");
        var staticInit;
        staticInit = inputClass.getMethodWithName("@static_init");
        if (staticInit) {
            if (staticInit.getBody()) {
                //得到所有语句
                var allStmt = staticInit.getBody().getCfg().getStmts();
                if (allStmt.length > 2) {
                    //有静态构造逻辑
                    //删掉第一个语句 是自我赋值语句
                    //为这个方法给一个新的标签
                    var oldMethodSig = staticInit.getSignature();
                    var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
                    var newCinitSunSig = new bundle_1.MethodSubSignature("<clinit>", oldMethodSubSig.getParameters(), bundle_1.VoidType.getInstance(), true);
                    var newCinitSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newCinitSunSig);
                    staticInit.setSignature(newCinitSig);
                    //设置为 static
                    staticInit.setModifiers(16);
                    console.log("重新设置" + inputClass.getName() + "的静态初始方法");
                }
                else {
                    console.log(inputClass.getName() + "没有额外静态初始方法");
                }
            }
        }
        else {
            console.log("类" + inputClass.getName() + "没有@static_init方法");
        }
    };
    //这个方法会打印一个模块里所有的类 至于接口 对象 之类的还没实现暂时打印类
    ArkModule.prototype.printModule = function () {
        console.log("开始打印" + this.moduleNmae + "模块");
        //遍历类
        this.getDeclaredClasses().forEach(function (eachClass) {
            var classPrinter = new ClassPrinter_1.ClassPrinter(eachClass);
            classPrinter.print();
        });
        console.log("结束打印" + this.moduleNmae + "模块");
    };
    //这个方法会建立简称Map
    ArkModule.prototype.buildSimpleMap = function () {
        var _this = this;
        var fullNames = Array.from(this.declaredValuableClass.keys());
        var simpleName;
        fullNames.forEach(function (fullName) {
            simpleName = fullName;
            if (simpleName.includes("FunClass_")) {
                // 使用 replace 方法删除 "abds"
                simpleName = simpleName.replace(/FunClass_/g, '');
                if (simpleName.includes("Anonymous_")) {
                    simpleName = simpleName.replace(/Anonymous_/g, '');
                }
            }
            // 创建动态正则表达式，使用 RegExp 构造函数
            var regex = new RegExp(_this.moduleNmae + ".", 'g'); // 'g' 表示全局匹配
            simpleName = simpleName.replace(regex, '');
            _this.simpletoFullMap.set(simpleName, fullName);
        });
    };
    //
    ArkModule.prototype.setInitSimpleMap = function () {
        var _this = this;
        var fullNames = Array.from(this.importValuableClass.keys());
        var simpleName;
        fullNames.forEach(function (fullName) {
            simpleName = fullName;
            if (simpleName.includes("FunClass_")) {
                // 使用 replace 方法删除 "abds"
                simpleName = simpleName.replace(/FunClass_/g, '');
                if (simpleName.includes("Anonymous_")) {
                    simpleName = simpleName.replace(/Anonymous_/g, '');
                }
            }
            // 查找最后一个点的位置
            var lastDotIndex = simpleName.lastIndexOf('.');
            // 检查是否存在点
            if (lastDotIndex === -1) {
                simpleName = simpleName;
            }
            else {
                // 从最后一个点之后的内容开始截取
                simpleName = simpleName.substring(lastDotIndex + 1);
            }
            _this.simpletoFullMap.set(simpleName, fullName);
        });
    };
    //这个方法主要用来检查返回类型 在Infer前调用 
    //会修改MethodSubSignature 的returnType
    ArkModule.prototype.checkReturnType = function (inputMethod) {
        if (inputMethod.getReturnType() instanceof bundle_1.UnionType) {
            //如果是联合类型 设置为Object classtype
            var objectClassType = (0, Factory_1.CreateObjectClassType)();
            var oldMethodSig = inputMethod.getSignature();
            var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
            var newMethodSubSig = new bundle_1.MethodSubSignature(oldMethodSubSig.getMethodName(), oldMethodSubSig.getParameters(), objectClassType, oldMethodSubSig.isStatic());
            var newMethodSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
            inputMethod.setSignature(newMethodSig);
        }
        else if (inputMethod.getReturnType() instanceof bundle_1.UnknownType) {
            if (inputMethod.getBody()) {
                var stmts = inputMethod.getBody().getCfg().getStmts();
                var returnStmts = [];
                for (var i = 0; i < stmts.length; i++) {
                    if (stmts[i] instanceof bundle_1.ArkReturnStmt || stmts[i] instanceof bundle_1.ArkReturnVoidStmt) {
                        returnStmts.push(stmts[i]);
                    }
                }
                if (returnStmts.length === 0) {
                    //没有返回类型 默认为空类型
                    var voidClassType = bundle_1.VoidType.getInstance();
                    var oldMethodSig = inputMethod.getSignature();
                    var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
                    var newMethodSubSig = new bundle_1.MethodSubSignature(oldMethodSubSig.getMethodName(), oldMethodSubSig.getParameters(), voidClassType, oldMethodSubSig.isStatic());
                    var newMethodSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                    inputMethod.setSignature(newMethodSig);
                }
                else {
                    //遍历所有返回语句查看他们的返回类型
                    var returnTypes = new Set();
                    for (var i = 0; i < returnStmts.length; i++) {
                        if (returnStmts[i] instanceof bundle_1.ArkReturnVoidStmt) {
                            returnTypes.add(bundle_1.VoidType.getInstance());
                        }
                        else if (returnStmts[i] instanceof bundle_1.ArkReturnStmt) {
                            returnTypes.add(returnStmts[i].getOp().getType());
                        }
                    }
                    console.log("返回类型：" + Array.from(returnTypes));
                    if (returnTypes.size === 1) {
                        var newReturnType = Array.from(returnTypes)[0];
                        var oldMethodSig = inputMethod.getSignature();
                        var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
                        var newMethodSubSig = new bundle_1.MethodSubSignature(oldMethodSubSig.getMethodName(), oldMethodSubSig.getParameters(), newReturnType, oldMethodSubSig.isStatic());
                        var newMethodSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                        inputMethod.setSignature(newMethodSig);
                    }
                    else {
                        //如果是联合类型 设置为Object classtype
                        var objectClassType = (0, Factory_1.CreateObjectClassType)();
                        var oldMethodSig = inputMethod.getSignature();
                        var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
                        var newMethodSubSig = new bundle_1.MethodSubSignature(oldMethodSubSig.getMethodName(), oldMethodSubSig.getParameters(), objectClassType, oldMethodSubSig.isStatic());
                        var newMethodSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
                        inputMethod.setSignature(newMethodSig);
                    }
                }
            }
        }
        else if (inputMethod.getReturnType() instanceof bundle_1.NeverType) {
            //never类型 默认为空类型
            var voidClassType = bundle_1.VoidType.getInstance();
            var oldMethodSig = inputMethod.getSignature();
            var oldMethodSubSig = oldMethodSig.getMethodSubSignature();
            var newMethodSubSig = new bundle_1.MethodSubSignature(oldMethodSubSig.getMethodName(), oldMethodSubSig.getParameters(), voidClassType, oldMethodSubSig.isStatic());
            var newMethodSig = new bundle_1.MethodSignature(oldMethodSig.getDeclaringClassSignature(), newMethodSubSig);
            inputMethod.setSignature(newMethodSig);
        }
    };
    //开始检查那些unknown 的Local 如果有和方法重名的就删掉
    ArkModule.prototype.chenckIfLocalIsFunction = function (thisBody) {
        var localNames = Array.from(thisBody.getLocals().keys());
        for (var j = 0; j < localNames.length; j++) {
            console.log("检查Local:  " + localNames[j]);
            if (this.simpletoFullMap.has(localNames[j])) {
                thisBody.getLocals().delete(localNames[j]);
                console.log("删除Local" + localNames[j]);
            }
        }
    };
    return ArkModule;
}());
exports.ArkModule = ArkModule;
