"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewArkView = void 0;
var bundle_1 = require("../lib/bundle");
var CheckType_1 = require("./CheckType");
var ClassPrinter_1 = require("./ClassPrinter");
var Factory_1 = require("./Factory");
var TypeChecker_1 = require("./TypeChecker");
var NewArkView = /** @class */ (function () {
    function NewArkView(inputScene) {
        this.setScene(inputScene);
        //this.buildConstructor();
        // let typechecker: TypeChecker = new TypeChecker(this.scene);
        // typechecker.checkType();
        //this.myCheckType();
        //checkType4Scene(this.scene, this.logger);
        //this.createDummyMain(inputScene);
        //inputScene.inferTypes();
    }
    NewArkView.prototype.checkType = function () {
        var typechecker = new TypeChecker_1.TypeChecker(this.scene);
        typechecker.checkType();
        //this.createDummyMain(this.scene);
    };
    NewArkView.prototype.myCheckType = function () {
        //inferSimpleTypes(this.scene);
        var _this = this;
        (0, CheckType_1.buildFunctionInterface)(this.scene);
        this.getFiles().forEach(function (file) {
            bundle_1.ModelUtils.getAllClassesInFile(file).forEach(function (arkClass) {
                (0, CheckType_1.checkInstance4this)(arkClass);
                arkClass.getMethods(true)
                    .forEach(function (arkMethod) {
                    (0, CheckType_1.checkNodeclaredValue)(arkMethod);
                    _this.inferFunctionType(arkMethod);
                    //this.myInferFiledReftypeInMethoed(arkMethod);
                    (0, CheckType_1.checkReturnType)(arkMethod);
                    (0, CheckType_1.checkControlFlow)(arkMethod);
                    (0, CheckType_1.checkIfComponent)(arkMethod);
                    (0, CheckType_1.checkIfStmt)(arkMethod);
                    (0, CheckType_1.checkFunctionType4Method)(arkMethod, arkClass, _this.scene);
                    (0, CheckType_1.checkStaticInvoke4Method)(arkMethod);
                });
            });
        });
    };
    NewArkView.prototype.setScene = function (inputScene) {
        this.scene = inputScene;
    };
    NewArkView.prototype.getScene = function () {
        return this.scene;
    };
    //得到所有的文件
    NewArkView.prototype.getFiles = function () {
        return this.scene.getFiles();
    };
    //得到所有文件中的所有类
    NewArkView.prototype.getClasses = function () {
        var files = this.getFiles();
        var classes = [];
        for (var i = 0; i < files.length; i++) {
            var thisFileClasses = [];
            thisFileClasses = bundle_1.ModelUtils.getAllClassesInFile(files[i]);
            for (var j = 0; j < thisFileClasses.length; j++) {
                classes.push(thisFileClasses[j]);
            }
        }
        return classes;
    };
    //得到所有文件名
    NewArkView.prototype.getFileNames = function () {
        var output = [];
        this.getFiles().forEach(function (file) {
            output.push(file.getName());
        });
        return output;
    };
    //得到所有文件名
    NewArkView.prototype.getClassNames = function () {
        var output = [];
        this.getClasses().forEach(function (clazz) {
            output.push(clazz.getName());
        });
        return output;
    };
    //得到所有文件中的所有类 包括名称空间里的
    NewArkView.prototype.printClasses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var classes, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        classes = this.getClasses();
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < classes.length)) return [3 /*break*/, 4];
                        return [4 /*yield*/, printClass(classes[i])];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    //遍历所有构造constructor
    //在最开始添加specialinvoke
    //我们会为默认类添加constructor
    // class level
    NewArkView.prototype.buildConstructor = function () {
        var classes = this.getClasses();
        classes.forEach(function (thisClass) {
            //检查是不是_DEFAULT_ARK_CLASS
            if (thisClass.getName() === "_DEFAULT_ARK_CLASS") {
                //添加constructor  因为默认类没有 instaceinit和 cinitinit 只有一个special
                (0, Factory_1.CreateInitMethod)(thisClass);
            }
            //不是_DEFAULT_ARK_CLASS 只用添加一行invoke
            else {
                //找到constructor 方法
                var constructorMethod = thisClass.getMethodWithName("constructor");
                if (thisClass.getSuperClass()) {
                    //调用父类的构造函数 且不打印super()
                    //得到父类
                    var superClass = thisClass.getSuperClass();
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
                            }
                            else {
                                var newStmt = (0, Factory_1.CreateSuperInitInvoke)(superMethodSig, superInvoke_1);
                                //加到开头
                                constructorMethod.getBody().getCfg().getStartingBlock().addStmtToFirst(newStmt);
                            }
                        }
                        else {
                            console.log("没有在" + thisClass.getName() + "constructor");
                        }
                    }
                    else {
                        console.log("没有为" + thisClass.getName() + "找到super类实例");
                    }
                }
            }
        });
    };
    //这个方法会帮助我们检查是否@static_init方法里有多余的逻辑
    //TO DO：暂时没有实施, 我们会打印出所有@static_init
    //为了避免静态不太复杂我们只会 打印有额外逻辑的static
    //这个可以只在打印端实现
    NewArkView.prototype.buildClinit = function () {
    };
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
    NewArkView.prototype.createDummyMain = function (projectScene) {
        var dummyMainCreator = new bundle_1.DummyMainCreater(projectScene);
        dummyMainCreator.createDummyMain();
        var selectFiles = projectScene.getFiles().filter(function (file) { return file.getName() === "@dummyFile"; });
        var selectClass = selectFiles[0].getClassWithName("@dummyClass");
        var selectMethod = selectClass.getMethodWithName("@dummyMain");
        (0, CheckType_1.checkNodeclaredValue)(selectMethod);
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
    };
    //functiontype本来应该含有一个methodSig ,我们通过name去寻找有关的method
    //这个methodSig一般在他的Local里
    NewArkView.prototype.inferFunctionType = function (arkMethod) {
        var body = arkMethod.getBody();
        if (!body) {
            return;
        }
        var locals = body.getLocals();
        var stmts = body.getCfg().getStmts();
        for (var i = 0; i < stmts.length; i++) {
            var values = stmts[i].getUses();
            for (var j = 0; j < values.length; j++) {
                if (values[j] instanceof bundle_1.ArkPtrInvokeExpr) {
                    var methodsig = stmts[i].getInvokeExpr().getMethodSignature();
                    var name_1 = methodsig.getMethodSubSignature().getMethodName();
                    if (locals.get(name_1)) {
                        if (locals.get(name_1).getType() instanceof bundle_1.FunctionType) {
                            //把这个函数类的方法签名赋值给expr
                            stmts[i].getInvokeExpr().setFunPtrLocal(locals.get(name_1));
                            stmts[i].getInvokeExpr().setMethodSignature(locals.get(name_1).getType().getMethodSignature());
                            console.log("更正ptr调用 " + name_1);
                        }
                    }
                }
            }
        }
    };
    return NewArkView;
}());
exports.NewArkView = NewArkView;
function printClass(clazz) {
    return __awaiter(this, void 0, void 0, function () {
        var classPrinter;
        return __generator(this, function (_a) {
            classPrinter = new ClassPrinter_1.ClassPrinter(clazz);
            classPrinter.print();
            return [2 /*return*/];
        });
    });
}
