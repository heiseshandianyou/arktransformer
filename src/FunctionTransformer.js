"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionTransformer = void 0;
var bundle_1 = require("../lib/bundle");
var Map_1 = require("./Map");
var Factory_1 = require("./Factory");
// 这个类主要负责处理函数 把他们变成类
var FunctionTransformer = /** @class */ (function () {
    function FunctionTransformer(inputModule) {
        this.module = inputModule;
        this.file = this.module.getFile();
        this.moduleName = this.module.getModuleName();
        this.fileName = Map_1.StringMap.FileNameMap(this.file.getName());
    }
    //这个方法会搜索这个文件下的defaultclass
    FunctionTransformer.prototype.searchDefaultClass = function () {
        var _this = this;
        var defaultClass = this.file.getDefaultClass();
        //扫描里面的方法 因为定义在 文件中的函数都被写在这里
        var methods = defaultClass.getMethods(true);
        //方法名的列表
        var methodsNames = new Array();
        methods.forEach(function (method) {
            methodsNames.push(method.getName());
        });
        // 为每个被声明为方法的函数建立一个类 
        // 我们用生成默认类的方法为我们文件生成基类 前提是我们人为改变了默认类
        // 改名字 就是签名 
        // 创建一个新签名  名字  包名 + 类名
        var newClassSig = new bundle_1.ClassSignature(this.fileName + "_DEFAULT_CLASS", this.file.getFileSignature(), null);
        //给原本的类赋新签名
        defaultClass.setSignature(newClassSig);
        //现在我知道如何直接创建class不过我还是保留之前的设计
        //对于每一个方法 这里我们处理命名函数 把匿名函数找出来一个
        var AnonymousMethodSet = new Set();
        var defaultMrthod;
        methods.forEach(function (method) {
            if (method.getName() !== "_DEFAULT_ARK_METHOD" && !method.getName().includes("AnonymousMethod")) {
                var newClass = new bundle_1.ArkClass();
                var newClassName = "FunClass_" + method.getName();
                //为这个新class初始
                newClassSig = new bundle_1.ClassSignature(newClassName, _this.file.getFileSignature(), null);
                newClass.setSignature(newClassSig);
                newClass.setCategory(0);
                newClass.setCode(method.getCode());
                newClass.setDeclaringArkFile(_this.file);
                //把原本方法的所属类改为新的
                method.setDeclaringArkClass(newClass);
                //改方法签名
                var newMethodSubSig = new bundle_1.MethodSubSignature(method.getName(), method.getSubSignature().getParameters(), method.getSubSignature().getReturnType(), method.getSubSignature().isStatic());
                var newMethodSig = new bundle_1.MethodSignature(newClassSig, newMethodSubSig);
                method.setSignature(newMethodSig);
                //修饰符改为 public void 
                method.setModifiers(20);
                _this.checkTheClassType(method, newClassSig);
                newClass.addMethod(method);
                //把这个类加到file
                //我们还需要把方法中所有指向默认类的ClassType 变成新类
                //这个逻辑在后面检查类型时实现
                //添加初始方法
                (0, Factory_1.CreateInitMethod)(newClass);
                _this.file.addArkClass(newClass);
            }
            else if (method.getName().includes("AnonymousMethod")) {
                AnonymousMethodSet.add(method);
            }
            else if (method.getName() === "_DEFAULT_ARK_METHOD") {
                defaultMrthod = method;
            }
        });
        //接下来我们去 _DEFAULT_ARK_METHOD 里找函数表达式来给 匿名函数命名
        defaultMrthod.getBody().getCfg().getStmts().forEach(function (stmt) {
            if (stmt instanceof bundle_1.ArkAssignStmt) {
                if (stmt.getRightOp().getType() instanceof bundle_1.FunctionType) {
                    //得到所指方法名
                    var funMethodName_1 = stmt.getRightOp().getName();
                    var newClassName_1 = stmt.getLeftOp().getName();
                    //遍历匿名方法集合 看是否有同名的
                    AnonymousMethodSet.forEach(function (method) {
                        if (method.getName() === funMethodName_1) {
                            //新建类并加入
                            var newClass = new bundle_1.ArkClass();
                            var ClassName = "FunClass_" + "Anonymous_" + newClassName_1;
                            //为这个新class初始
                            newClassSig = new bundle_1.ClassSignature(ClassName, _this.file.getFileSignature(), null);
                            newClass.setSignature(newClassSig);
                            newClass.setCategory(0); //默认为类
                            newClass.setCode(method.getCode());
                            newClass.setDeclaringArkFile(_this.file);
                            //把原本方法的所属类改为新的
                            method.setDeclaringArkClass(newClass);
                            //检查方法中原本的自我ref 
                            _this.checkTheClassType(method, newClassSig);
                            //改方法签名
                            var newMethodSubSig = new bundle_1.MethodSubSignature(method.getName(), method.getSubSignature().getParameters(), method.getSubSignature().getReturnType(), method.getSubSignature().isStatic());
                            var newMethodSig = new bundle_1.MethodSignature(newClassSig, newMethodSubSig);
                            method.setSignature(newMethodSig);
                            method.setModifiers(20);
                            newClass.addMethod(method);
                            newClass.setModifiers(20); // 默认为public static
                            //添加初始方法
                            (0, Factory_1.CreateInitMethod)(newClass);
                            //把这个类加到file
                            _this.file.addArkClass(newClass);
                        }
                    });
                }
            }
        });
    };
    //这个方法会检查方法中的原有的Local和assignStmt把他们变成指向自己类的
    FunctionTransformer.prototype.checkTheClassType = function (inputMethod, selfSig) {
        //得到Local
        if (inputMethod.getBody()) {
            //找到那个赋值语句
            var stmts = inputMethod.getBody().getCfg().getStmts();
            for (var i = 0; i < stmts.length; i++) {
                if (stmts[i] instanceof bundle_1.ArkAssignStmt
                    && stmts[i].getRightOp() instanceof bundle_1.ArkThisRef) {
                    //更新右边
                    var newClassType = new bundle_1.ClassType(selfSig);
                    var newRef = new bundle_1.ArkThisRef(newClassType);
                    stmts[i].setRightOp(newRef);
                    break;
                }
            }
        }
    };
    return FunctionTransformer;
}());
exports.FunctionTransformer = FunctionTransformer;
