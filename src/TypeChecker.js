"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeChecker = void 0;
var bundle_1 = require("../lib/bundle");
var Logger2_1 = require("./Logger2");
var TypeChecker = /** @class */ (function () {
    function TypeChecker(scene) {
        var _this = this;
        this.scene = scene;
        this.logger = new Logger2_1.Logger2("logfile");
        this.checkedMethods = new Map();
        this.toCheckMethods = new Map();
        // 遍历所有的 方法 全部加到 待检查的map里
        this.getFiles().forEach(function (file) {
            bundle_1.ModelUtils.getAllClassesInFile(file).forEach(function (arkClass) {
                arkClass.getMethods(true)
                    .forEach(function (arkMethod) {
                    _this.addToNoChecked(arkMethod);
                });
            });
        });
        this.logger.log("number of classes: " + this.toCheckMethods.size, 0);
    }
    //得到所有的文件
    TypeChecker.prototype.getFiles = function () {
        return this.scene.getFiles();
    };
    // class level  (called in each class)
    // this method aims to 
    // 1. check if a class has the @instance_init method
    // 2. if the class has no superclass we construct a instanceinvoke for the <java.lang.Object> stmt in the constructor method
    TypeChecker.prototype.checkInstance4this = function (arkClass) {
        this.logger.log("开始检查" + arkClass.getName() + "的实例初始函数@instance_init", 2);
        var instanceMethod = arkClass.getMethodWithName("@instance_init");
        if (instanceMethod) {
            //得到Locals
            var methodBody = instanceMethod.getBody();
            if (methodBody) {
                var localsMap = methodBody.getLocals();
                if (!localsMap.has("this")) {
                    this.logger.log("该类初始方法没有this变量", 3);
                    // 新建一个local 
                    var thisType = new bundle_1.ClassType(instanceMethod.getDeclaringArkClass().getSignature());
                    var thisLocal_1 = new bundle_1.Local("this", thisType);
                    localsMap.set("this", thisLocal_1);
                    methodBody.setLocals(new Set(localsMap.values()));
                    this.logger.log("添加local变量", 3);
                }
                var thisLocal = localsMap.get("this");
                if (!arkClass.getSuperClass()) {
                    this.logger.log(arkClass.getName() +
                        "没有父类我们构造一个对java.lang.Object的调用", 3);
                    if (arkClass.getMethodWithName("constructor")) {
                        if (arkClass.getMethodWithName("constructor").getBody()) {
                            var stmts = arkClass.getMethodWithName("constructor").getBody().getCfg().getStmts();
                            var initExpr = new bundle_1.ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
                            var initStmt = new bundle_1.ArkInvokeStmt(initExpr);
                            stmts.splice(0, 0, initStmt);
                            arkClass.getMethodWithName("constructor").getBody().getCfg().getStartingBlock().setStmts(stmts);
                        }
                        else {
                            this.logger.log("该类构造方法没有方法体", 3);
                        }
                    }
                    else {
                        this.logger.log("该类没有构造方法", 3);
                    }
                }
            }
        }
        else {
            this.logger.log(arkClass.getName() + "没有实例初始函数", 2);
        }
        var staticMethod = arkClass.getMethodWithName("@static_init");
        if (staticMethod) {
            //得到Locals
            var methodBody = staticMethod.getBody();
            if (methodBody) {
                var localsMap = methodBody.getLocals();
                if (!localsMap.has("this")) {
                    // 新建一个local 
                    var thisType = new bundle_1.ClassType(staticMethod.getDeclaringArkClass().getSignature());
                    var thisLocal = new bundle_1.Local("this", thisType);
                    localsMap.set("this", thisLocal);
                }
            }
        }
        else {
            this.logger.log(arkClass.getName() + "没有静态初始函数", 2);
        }
    };
    // 遍历所有语句 检查是否有用到但是没有出现在local中的local
    // 如果有 我们会把他加到方法中local 集合中
    // 这针对的是 缺失local的问题 
    TypeChecker.prototype.checkNodeclaredValue = function (inputMethod, logger, loggerLevel) {
        // 遍历一个方法的所有语句
        logger.log("检查方法:  " + inputMethod.getName() + "是否有使用到却没有声明的变量", loggerLevel);
        if (inputMethod.getBody()) {
            if (inputMethod.getBody().getCfg()) {
                var localsMap = inputMethod.getBody().getLocals();
                var localsSet = new Set(localsMap.values());
                // 遍历 所有语句
                // 遍历每个语句用到的value
                for (var _i = 0, _a = inputMethod.getBody().getCfg().getStmts(); _i < _a.length; _i++) {
                    var stmt = _a[_i];
                    var values = stmt.getUses();
                    for (var _b = 0, values_1 = values; _b < values_1.length; _b++) {
                        var value = values_1[_b];
                        if (value instanceof bundle_1.Local) {
                            if (!localsMap.has(value.getName())) {
                                localsSet.add(value);
                                logger.log("添加变量" + value.getName(), loggerLevel);
                            }
                        }
                    }
                    inputMethod.getBody().setLocals(localsSet);
                }
            }
        }
    };
    TypeChecker.prototype.buildFunctionInterface = function (scene) {
        var funcInterFaceFile = new bundle_1.ArkFile();
        funcInterFaceFile.setScene(scene);
        var funcInterFaceFileSignature = new bundle_1.FileSignature(scene.getProjectName(), 'funcInterfaceFile');
        funcInterFaceFile.setFileSignature(funcInterFaceFileSignature);
        scene.getFilesMap().set(funcInterFaceFile.getFileSignature().toString(), funcInterFaceFile);
    };
    // 这个是检查类型的总方法
    TypeChecker.prototype.checkType = function () {
        var _this = this;
        // 调用自带的类型推断
        this.scene.inferTypes();
        this.logger.log("开始对项目进行类型检查", 0);
        this.logger.log("------------------------------", 0);
        // 构建一个文件 用来装 函数接口
        this.buildFunctionInterface(this.scene);
        var files = this.scene.getFiles();
        // 开始遍历每个文件
        files.forEach(function (file) {
            _this.logger.log("开始检查文件" + file.getName(), 1);
            if (file.getName() === "funcInterfaceFile") {
                _this.logger.log("this file is interface file ", 1);
            }
            else {
                // 开始遍历所有  类
                bundle_1.ModelUtils.getAllClassesInFile(file).forEach(function (arkClass) {
                    _this.logger.log("开始检查类" + arkClass.getName(), 1);
                    // 检查instance_init方法 是否有包含 this 变量
                    //this.checkInstance4this(arkClass, this.logger);
                    // 开始遍历方法
                    arkClass.getMethods(true).forEach(function (arkMethod) {
                        _this.checkMethod(arkMethod, arkClass, false, 3);
                    });
                    _this.checkInstance4this(arkClass);
                    _this.buildConstructor4DefaultClass(arkClass, 2);
                });
            }
        });
        this.logger.log("Finish the type check");
    };
    // 这个方法 遍历所有语句 查看语句中的所有值
    TypeChecker.prototype.checkType4Stmts = function (arkMethod, arkClass, loggerLevel, isAnonymous) {
        var _this = this;
        if (arkMethod.getBody()) {
            if (arkMethod.isAnonymousMethod() && !isAnonymous) {
                this.logger.log("方法: " + arkMethod.getName() + "是一个匿名方法 加入到待检查区", loggerLevel);
                this.addToNoChecked(arkMethod);
                return;
            }
            var fullChecked_1 = true;
            var localsMap_1 = arkMethod.getBody().getLocals();
            this.logger.log("对方法: " + arkMethod.getName() + " 语句逐句类型检测", loggerLevel);
            // 还是逐个BB查找
            var blocks = Array.from(arkMethod.getBody().getCfg().getBlocks());
            blocks.forEach(function (block) {
                _this.logger.log("检查BB id: " + block.getId(), loggerLevel + 1);
                var stmts = block.getStmts();
                stmts.forEach(function (stmt) {
                    _this.logger.log("检查语句 : " + stmt, loggerLevel + 1);
                    // 遍历这个语句 使用的value
                    var values = stmt.getUses();
                    // 对于这个value 
                    _this.logger.log("语句包含值 : " + values, loggerLevel + 2);
                    // 遍历Value
                    values.forEach(function (value) {
                        if (fullChecked_1) {
                            _this.logger.log("检查值 : " + value + "Type: " + value.getType(), loggerLevel + 3);
                            // 如果是一个 local
                            if (value instanceof bundle_1.Local) {
                                var localType = value.getType();
                                _this.logger.log("检查值 : " + value + "是一个local 类型是" + localType, loggerLevel + 4);
                                // 检查这个 变量是否在local里
                                if (!localsMap_1.has(value.getName())) {
                                    _this.logger.log("值 : " + value + "没有在该方法集合中发现", loggerLevel + 5);
                                    _this.logger.log("把方法: " + arkMethod.getName() + "加到需要待定集合中", loggerLevel + 5);
                                }
                                else {
                                    _this.logger.log("值 : " + value + "在方法集合中", loggerLevel + 5);
                                    // 我们用集合中的Local来替代这个
                                    stmt.replaceUse(value, localsMap_1.get(value.getName()));
                                    value = localsMap_1.get(value.getName());
                                    // 检查是否为一个函数类型
                                    if (value.getType instanceof bundle_1.FunctionType) {
                                        _this.logger.log("值 : " + value + "是一个函数类型 所致方法为" + value.getType.getMethodSignature(), loggerLevel + 5);
                                        // 看是否函数方法已经被分析过了
                                        //在scene中 利用得到的 Sig 来搜索对应方法 
                                        var funcSig = value.getType().getMethodSignature();
                                        if (_this.checkedMethods.has(_this.genKey(funcSig))) {
                                            _this.logger.log("我们已经检查过了方法: " + funcSig);
                                            //直接得到 方法的签名
                                        }
                                        // 如果被分析过了 那就不会再分析了 我们会直接选取
                                        // 跳转到所指方法的分析方法
                                    }
                                }
                            }
                        }
                    });
                });
            });
        }
        else {
            this.logger.log("方法: " + arkMethod.getName() + "没有方法体", loggerLevel);
        }
    };
    TypeChecker.prototype.genKey = function (methodSig1) {
        var key = "";
        key += methodSig1.getDeclaringClassSignature().getClassName();
        key += "." + methodSig1.getMethodSubSignature().getMethodName();
        return key;
    };
    // 这是一个 检查一个方法类型的总方法
    // 分为两种模式 是否作为 函数方法检查 和 普通方法检查
    // 我们检查完成一个方法后 会把它从待检测去掉 加到已经检查
    // 同时我们还会更新他的 方法签名
    TypeChecker.prototype.checkMethod = function (arkMethod, arkClass, ifAnony, loggerLevel, callerMethod) {
        if (this.methodChecked(arkMethod)) {
            this.logger.log("方法" + arkMethod.getName() + "已经被检查过", loggerLevel);
            return true;
        }
        // 普通方法的模式
        if (!ifAnony) {
            this.logger.log("方法模式: 开始检查方法: " + arkMethod.getName(), loggerLevel);
            if (arkMethod.isAnonymousMethod()) {
                this.logger.log("方法是匿名的跳过", loggerLevel + 1);
                return false;
            }
            // 先检查控制流
            // 1 检查三元表达式
            this.checkControlFlow(arkMethod, this.logger, loggerLevel + 1);
            // 2 检查if 组件
            this.checkIfComponent(arkMethod, this.logger, loggerLevel + 1);
            //检查是否有使用了但没有在方法中的变量
            this.checkNodeclaredValue(arkMethod, this.logger, loggerLevel + 1);
            // 检查该方法内的local是否有函数类型
            // 遍历所有 local 如果有local 我们会去检查
            this.checkFunctionType4Method(arkMethod, arkClass, loggerLevel + 1);
            // TOOD check the stmts 
            // 检查 所有的 是value  
            this.checkValues(arkMethod, loggerLevel + 1);
            // 检查array 生成语句
            // numberType的处理
            // finish typecheck add the method to the checked
            this.addToChecked(arkMethod);
            // delete it in the tocheck
            this.dropFromNoCheck(arkMethod);
        }
        // 匿名方法模式
        else {
            this.logger.log("匿名函数模式: 开始检查方法: " + arkMethod.getName(), loggerLevel);
            // 匿名模式下的检查就是把这个方法当作一个匿名函数来检查
            if (!arkMethod.getBody()) {
                this.logger.log("这个函数方法没有方法体", loggerLevel + 1);
                this.logger.log("该方法的签名是" + arkMethod.getSignature(), loggerLevel + 2);
                // 我们会直接把这个方法当作已经检查好的 加到已经检查的集合里
                this.addToChecked(arkMethod);
                this.dropFromNoCheck(arkMethod);
            }
            else {
                // 把这个方法的修饰符设置成 public static
                arkMethod.setModifiers(20);
                // 检查调用方法和被调用方法的 变量映射
                this.checkType4CallerCallee(callerMethod, arkMethod, loggerLevel + 1);
                // 先检查控制流
                // 1 检查三元表达式
                this.checkControlFlow(arkMethod, this.logger, loggerLevel + 1);
                // 2 检查if 组件
                this.checkIfComponent(arkMethod, this.logger, loggerLevel + 1);
                //检查是否有使用了但没有在方法中的变量
                this.checkNodeclaredValue(arkMethod, this.logger, loggerLevel + 1);
                // 检查该方法内的local是否有函数类型
                // 遍历所有 local 如果有local 我们会去检查
                this.checkFunctionType4Method(arkMethod, arkClass, loggerLevel + 1);
                // 检查 所有的 是value  
                this.checkValues(arkMethod, loggerLevel + 1);
                // TODO check new array stmt
                // TODO numberType的处理
                // TODO 返回类型的推导
                // TODO update the methodSig
                // finish typecheck add the method to the checked
                this.addToChecked(arkMethod);
                // delete it in the tocheck
                this.dropFromNoCheck(arkMethod);
            }
        }
    };
    TypeChecker.prototype.checkIfComponent = function (inputMethod, logger, loggerLevel) {
        //遍历每一个语句，是否一个赋值语句右边是一个ConditionExpr
        logger.log("检查方法:  " + inputMethod.getName() + "  是否含有 if组件", loggerLevel);
        if (inputMethod.getBody()) {
            var blocks = Array.from(inputMethod.getBody().getCfg().getBlocks());
            var maxID = blocks.length;
            // 动态遍历每一个BB
            for (var i = 0; i < maxID; i++) {
                var blocks_1 = Array.from(inputMethod.getBody().getCfg().getBlocks());
                // 按照id顺序排列 BB
                var orderBlocks = blocks_1.sort(function (a, b) { return a.getId() - b.getId(); });
                var stmts = orderBlocks[i].getStmts();
                var _loop_1 = function (j) {
                    if (stmts[j] instanceof bundle_1.ArkAssignStmt) {
                        if (stmts[j].getRightOp() instanceof bundle_1.ArkConditionExpr) {
                            logger.log("语句" + stmts[j] + "含有if组件", loggerLevel + 1);
                            //我们把老Block分成两半
                            var newStmts = stmts.slice(j + 1, stmts.length);
                            //创建一个Block
                            var newBlock1_1 = new bundle_1.BasicBlock();
                            newBlock1_1.setId(maxID);
                            maxID++;
                            newBlock1_1.setStmts(newStmts);
                            //新建一个IF语句加到原有Block后面
                            var newIfStmt = new bundle_1.ArkIfStmt(stmts[j].getRightOp());
                            //stmts[j] = newIfStmt;
                            //新建两个BB
                            var newBlock2 = new bundle_1.BasicBlock();
                            newBlock2.setId(maxID);
                            maxID++;
                            var trueBool = new bundle_1.Constant('true', bundle_1.BooleanType.getInstance());
                            var newAssignStmt1 = new bundle_1.ArkAssignStmt(stmts[j].getLeftOp(), trueBool);
                            newBlock2.addStmt(newAssignStmt1);
                            var newBlock3 = new bundle_1.BasicBlock();
                            newBlock3.setId(maxID);
                            maxID++;
                            var falseBool = new bundle_1.Constant('false', bundle_1.BooleanType.getInstance());
                            var newAssignStmt2 = new bundle_1.ArkAssignStmt(stmts[j].getLeftOp(), falseBool);
                            newBlock3.addStmt(newAssignStmt2);
                            //加到Block到CFG
                            inputMethod.getBody().getCfg().addBlock(newBlock1_1);
                            inputMethod.getBody().getCfg().addBlock(newBlock2);
                            inputMethod.getBody().getCfg().addBlock(newBlock3);
                            //原有的Blcok的后继者是block2 和 block3
                            if (!orderBlocks[i].setSuccessorBlock(0, newBlock2)) {
                                orderBlocks[i].addSuccessorBlock(newBlock2);
                            }
                            if (!orderBlocks[i].setSuccessorBlock(1, newBlock3)) {
                                orderBlocks[i].addSuccessorBlock(newBlock3);
                            }
                            //block1 的后继者是原有block的
                            orderBlocks[i].getSuccessors().forEach(function (nextBlock) {
                                newBlock1_1.addSuccessorBlock(nextBlock);
                            });
                            //这个新Block2 3的前者是之前的Blcok 后者是block1
                            newBlock2.addSuccessorBlock(newBlock1_1);
                            newBlock2.addPredecessorBlock(orderBlocks[i]);
                            newBlock3.addSuccessorBlock(newBlock1_1);
                            newBlock3.addPredecessorBlock(orderBlocks[i]);
                            //把原先Block的这句assStmt换成 If
                            stmts[j] = newIfStmt;
                            stmts = stmts.slice(0, j + 1);
                            orderBlocks[i].setStmts(stmts);
                            logger.log("添加if语句:  " + newIfStmt, loggerLevel + 1);
                        }
                    }
                };
                for (var j = 0; j < stmts.length; j++) {
                    _loop_1(j);
                }
            }
        }
    };
    TypeChecker.prototype.checkControlFlow = function (inputMethod, logger, loggerLevel) {
        logger.log("开始检查方法是否含有三元表达式", loggerLevel);
        if (inputMethod.getBody()) {
            // 得到有BB
            var blocks = Array.from(inputMethod.getBody().getCfg().getBlocks());
            var maxID = blocks.length;
            for (var i = 0; i < maxID; i++) {
                var blocks_2 = Array.from(inputMethod.getBody().getCfg().getBlocks());
                var orderBlocks = blocks_2.sort(function (a, b) { return a.getId() - b.getId(); });
                var stmts = orderBlocks[i].getStmts();
                var _loop_2 = function (j) {
                    if (stmts[j] instanceof bundle_1.ArkIfStmt && j != stmts.length - 1) {
                        //我们要创建新的BB 且要收集后两个赋值语句
                        //ifstmt       
                        //assign
                        if (stmts[j + 1] instanceof bundle_1.ArkAssignStmt &&
                            stmts[j + 2] instanceof bundle_1.ArkAssignStmt) {
                            logger.log("在id 为" + orderBlocks[i].getId()
                                + "的BB中找到三元表达式", loggerLevel + 1);
                            logger.log(stmts[j], loggerLevel + 2);
                            logger.log(stmts[j + 1], loggerLevel + 2);
                            logger.log(stmts[j + 2], loggerLevel + 2);
                            //把原有的Blcok分成两半 
                            //原有的Block  0123 4 5  67
                            var newStmts = stmts.slice(j + 3, stmts.length);
                            //创建一个Block
                            var newBlock1_2 = new bundle_1.BasicBlock();
                            newBlock1_2.setId(maxID);
                            maxID++;
                            newBlock1_2.setStmts(newStmts);
                            var newBlock2 = new bundle_1.BasicBlock();
                            newBlock2.setId(maxID);
                            maxID++;
                            newBlock2.addStmt(stmts[j + 1]);
                            var newBlock3 = new bundle_1.BasicBlock();
                            newBlock3.setId(maxID);
                            maxID++;
                            newBlock3.addStmt(stmts[j + 2]);
                            //加到Block到CFG
                            inputMethod.getBody().getCfg().addBlock(newBlock1_2);
                            inputMethod.getBody().getCfg().addBlock(newBlock2);
                            inputMethod.getBody().getCfg().addBlock(newBlock3);
                            //原有的Blcok的后继者是block2 和 block3
                            if (!orderBlocks[i].setSuccessorBlock(0, newBlock2)) {
                                orderBlocks[i].addSuccessorBlock(newBlock2);
                            }
                            if (!orderBlocks[i].setSuccessorBlock(1, newBlock3)) {
                                orderBlocks[i].addSuccessorBlock(newBlock3);
                            }
                            //block1 的后继者是原有block的
                            orderBlocks[i].getSuccessors().forEach(function (nextBlock) {
                                newBlock1_2.addSuccessorBlock(nextBlock);
                            });
                            //原有的Block要删掉之后语句  缺少对应的API 
                            // 在打印端实现逻辑  遇到一个if就不再打印
                            //这个新Block2的前者是之前的Blcok 后者是原有block
                            newBlock2.addSuccessorBlock(newBlock1_2);
                            newBlock2.addPredecessorBlock(orderBlocks[i]);
                            newBlock3.addSuccessorBlock(newBlock1_2);
                            newBlock3.addPredecessorBlock(orderBlocks[i]);
                            stmts = stmts.slice(0, j);
                            orderBlocks[i].setStmts(stmts);
                            logger.log("为在id 为" + orderBlocks[i].getId()
                                + "的BB后添加" + newBlock1_2.getId() + " "
                                + newBlock1_2.getId() + " "
                                + newBlock2.getId() + " "
                                + newBlock3.getId() + " 三个BB" + loggerLevel + 1);
                            //console.log(Array.from(inputMethod.getBody().getCfg().getBlocks()));
                        }
                    }
                };
                for (var j = 0; j < stmts.length; j++) {
                    _loop_2(j);
                }
            }
        }
        else {
            logger.log("该方法没有方法体", loggerLevel);
        }
    };
    // this method is class level
    // we construct the init method for the _DEFAULT_ARK_CLASS class
    // we only add the constructor
    TypeChecker.prototype.buildConstructor4DefaultClass = function (arkClass, loggerLevel) {
        if (arkClass.getName() === "_DEFAULT_ARK_CLASS") {
            this.logger.log("This class is a default class we need check if it has a init method", loggerLevel);
            var initMethod = arkClass.getMethodWithName("constructor");
            if (!initMethod) {
                // if the initMethod not exist
                this.logger.log("This class has no constructor, we build it now", loggerLevel + 1);
                this.CreateInitMethod(arkClass);
            }
        }
    };
    // this method is used to build the constructor for a class
    TypeChecker.prototype.CreateInitMethod = function (declaringClass) {
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
        // the default class has no superclass so we need to add an java.lang.init stmt
        var initExpr = new bundle_1.ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
        var initStmt = new bundle_1.ArkInvokeStmt(initExpr);
        basicBlock.addStmt(initStmt);
        // then we build a methodSig for the constructor
        var methodSubSignature = new bundle_1.MethodSubSignature("constructor", [], bundle_1.VoidType.getInstance(), false);
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
    };
    // 这个方法检查 方法中是否有函数类型变量
    TypeChecker.prototype.checkFunctionType4Method = function (inputMethod, inputClass, loggerLevel) {
        var _this = this;
        this.logger.log("检查方法: " + inputMethod.getName() + "是否有函数类型变量", loggerLevel);
        var localsMap = inputMethod.getBody().getLocals();
        // 遍历有没有functiontype
        var locals = Array.from(localsMap.values());
        locals.forEach(function (local) {
            var _a;
            if (local.getType() instanceof bundle_1.FunctionType) {
                _this.logger.log("在类: " + inputClass.getName() + " 方法: " +
                    inputMethod.getName() + "中发现函数类型变量: " + local.getName(), loggerLevel + 1);
                var funcSig_1 = local.getType().getMethodSignature();
                var funcMethod = _this.scene.getMethod(funcSig_1);
                if (funcMethod) {
                    _this.logger.log("我们在项目中发现了所指的方法" + funcMethod.getName(), loggerLevel + 1);
                    // 是否该方法已经被检查
                    if (_this.methodChecked(funcMethod)) {
                        _this.logger.log("该方法已经被检查", loggerLevel + 2);
                    }
                    // 如果没有被检查则检查 函数方法
                    else {
                        _this.logger.log("该方法需要检查", loggerLevel + 1);
                        // 把这个方法的修饰符设置成 public static
                        funcMethod.setModifiers(20);
                        if (funcMethod.getBody()) {
                            _this.logger.log("该方法有方法体", loggerLevel + 1);
                            // 如果方法没有被检查我们需要调用方法检查
                            _this.checkMethod(funcMethod, funcMethod.getDeclaringArkClass(), true, loggerLevel + 2, inputMethod);
                            // 我们假设在经历过检查之后 函数方法的类型 包括签名已经完备
                            funcSig_1 = funcMethod.getSignature();
                            var inputTypes = parseFunSigMustInputTypes(funcSig_1);
                            var returnType = funcSig_1.getMethodSubSignature().getReturnType();
                            //funcSig = funcMethod.getSignature();
                            _this.logger.log("函数方法输入类型是" + inputTypes, loggerLevel + 1);
                            _this.logger.log("函数方法输出类型是" + returnType, loggerLevel + 1);
                            // 接下来我们会为他构造一个函数接口
                            // 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
                            var funcInterFaceFileSignature = new bundle_1.FileSignature(_this.scene.getProjectName(), 'funcInterfaceFile');
                            var interfaceFile = _this.scene.getFile(funcInterFaceFileSignature);
                            if (interfaceFile) {
                                _this.logger.log("找到 函数接口文件 开始构造函数对应接口", loggerLevel + 2);
                                // 根据输入和输出信息来寻找是否已经存在对应的接口
                                var funcType = void 0;
                                var inputTypesString_1 = "";
                                var returnTypesString = "";
                                var interfaceName = "";
                                // 如果没有输入 也没有 输出 (void) 那就归为 Runnable
                                if (inputTypes.length === 0 && returnType instanceof bundle_1.VoidType) {
                                    funcType = "Runnable";
                                    interfaceName = funcType;
                                }
                                // 至少有 一个输入或者输出 我们统一构造为一个输入类型1+2+输出类型+Function的接口
                                else {
                                    funcType = "Function";
                                    if (inputTypes.length === 0) {
                                        inputTypesString_1 = "void";
                                    }
                                    else {
                                        inputTypes.forEach(function (type) {
                                            inputTypesString_1 += type.toString();
                                        });
                                    }
                                    returnTypesString = returnType.toString();
                                    interfaceName = inputTypesString_1 + "To" + returnTypesString + funcType;
                                }
                                _this.logger.log("构造的接口名字为: " + interfaceName, loggerLevel + 2);
                                // 在这个文件里 搜索 有没有和 接口名同名的方法 没有就构造一个
                                if (interfaceFile.getClassWithName(interfaceName)) {
                                    _this.logger.log("接口文件中 已有 对应的接口类", loggerLevel + 2);
                                }
                                // 构造对应接口类
                                else {
                                    _this.logger.log("接口文件中 没有 对应的接口类", loggerLevel + 2);
                                    // 开始构造 对应的类
                                    var interFaceClass = new bundle_1.ArkClass();
                                    interFaceClass.setDeclaringArkFile(interfaceFile);
                                    var interFaceClassSignature = new bundle_1.ClassSignature(interfaceName, interFaceClass.getDeclaringArkFile().getFileSignature(), ((_a = interFaceClass.getDeclaringArkNamespace()) === null || _a === void 0 ? void 0 : _a.getSignature()) || null);
                                    interFaceClass.setSignature(interFaceClassSignature);
                                    // 把类的 类别设置为接口
                                    interFaceClass.setCategory(ClassCategory.INTERFACE);
                                    interfaceFile.addArkClass(interFaceClass);
                                    // 开始构造方法  没有方法体 且 修饰符为 public abstract
                                    // 方法名统一设置为 apply
                                    var interfaceMethod = new bundle_1.ArkMethod();
                                    interfaceMethod.setDeclaringArkClass(interFaceClass);
                                    // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
                                    var interfaceMethodSubSig = new bundle_1.MethodSubSignature('apply', funcSig_1.getMethodSubSignature().getParameters(), returnType, false);
                                    var interfaceMethodSignature = new bundle_1.MethodSignature(interfaceMethod.getDeclaringArkClass().getSignature(), interfaceMethodSubSig);
                                    interfaceMethod.setSignature(interfaceMethodSignature);
                                    // 设置修饰符
                                    interfaceMethod.setModifiers(36);
                                    interFaceClass.addMethod(interfaceMethod);
                                    _this.logger.log("接口方法构造完成: " + interfaceMethodSignature, loggerLevel + 2);
                                }
                                // 接口构造完成 开始构造 生成语句
                                // 首先我们先遍历这个方法的 语句 看这个函数Local是否出现在 赋值的左边
                                // 遍历所有的 BB
                                var ifNeedGenFunction_1 = true;
                                // 遍历这个Local的使用的语句
                                inputMethod.getBody().getCfg().getStmts().forEach(function (stmt) {
                                    if (stmt instanceof bundle_1.ArkAssignStmt) {
                                        if (stmt.getLeftOp().getType() instanceof bundle_1.FunctionType) {
                                            if (stmt.getLeftOp().getType().getMethodSignature().isMatch(funcSig_1)) {
                                                ifNeedGenFunction_1 = false;
                                            }
                                        }
                                    }
                                });
                                // 构造函数类
                                var bootstrapSig_1 = _this.createFunctionClass(funcSig_1, loggerLevel + 2);
                                // 构建创造函数语句
                                if (ifNeedGenFunction_1) {
                                    var firstUse_1 = true;
                                    _this.logger.log("没有找到函数变量的赋值语句 开始遍历所有语句找到合适插入位置", loggerLevel + 1);
                                    if (inputMethod.getBody()) {
                                        var basicBlocks = inputMethod.getBody().getCfg().getBlocks();
                                        // 这里我们暂时认定 遍历顺序就是 执行顺序
                                        // TODO 按照真正的执行顺序遍历语句	
                                        basicBlocks.forEach(function (block) {
                                            if (firstUse_1) {
                                                var stmts_1 = block.getStmts();
                                                var _loop_3 = function (i) {
                                                    //找到第一次使用的位置并且插入
                                                    var values = stmts_1[i].getUses();
                                                    values.forEach(function (value) {
                                                        if (value.getType() instanceof bundle_1.FunctionType && firstUse_1) {
                                                            if (value.getType().getMethodSignature().isMatch(funcSig_1)) {
                                                                _this.logger.log("找到函数使用", loggerLevel + 2);
                                                                _this.logger.log("在语句: " + stmts_1[i] + "之前开始构建函数生成语句", loggerLevel + 2);
                                                                // 生成一个静态调用语句  输入为 可选参数
                                                                if (bootstrapSig_1) {
                                                                    var paras = funcSig_1.getMethodSubSignature().getParameters();
                                                                    var args = [];
                                                                    for (var i_1 = 0; i_1 < paras.length; i_1++) {
                                                                        if (paras[i_1].isOptional()) {
                                                                            var arg = new bundle_1.Local(paras[i_1].getName(), paras[i_1].getType());
                                                                            args.push(arg);
                                                                        }
                                                                        else {
                                                                            break;
                                                                        }
                                                                    }
                                                                    var newStaticInvokeExpr = new bundle_1.ArkStaticInvokeExpr(bootstrapSig_1, args);
                                                                    var genStmt = new bundle_1.ArkAssignStmt(value, newStaticInvokeExpr);
                                                                    genStmt.setCfg(inputMethod.getBody().getCfg());
                                                                    stmts_1.splice(i, 0, genStmt);
                                                                    block.setStmts(stmts_1);
                                                                    _this.logger.log("成功构建语句" + genStmt, loggerLevel + 3);
                                                                    firstUse_1 = false;
                                                                }
                                                                else {
                                                                    _this.logger.log("警告!!!!!  没有找到生成的函数类", loggerLevel + 2);
                                                                }
                                                            }
                                                        }
                                                    });
                                                };
                                                for (var i = 1; i < stmts_1.length; i++) {
                                                    _loop_3(i);
                                                }
                                            }
                                        });
                                    }
                                    else {
                                        _this.logger.log("警告!!!!:   没有找到" + inputMethod.getSignature() + " 方法体", loggerLevel + 1);
                                    }
                                }
                            }
                        }
                        else {
                            _this.logger.log("该方法没有方法体", loggerLevel + 1);
                            _this.logger.log("方法: " + funcMethod.getName() + "检查完成", loggerLevel + 1);
                        }
                    }
                }
                else {
                    _this.logger.log("我们没有在项目中发现了所指的方法", loggerLevel + 1);
                }
            }
        });
    };
    //这个方法用来为每个 函数 产生一个具体实现的类
    //我们现在拥有一个 methodSig 其中 可选的参数表示需要捕捉和输入的参数 必选的参数表示一定要有的
    TypeChecker.prototype.createFunctionClass = function (methodSig, loggerLevel) {
        var _this = this;
        var _a;
        // 类的名字 方法的全局名字 + $
        var declaredClassSig = methodSig.getDeclaringClassSignature();
        var className = methodSig.getMethodSubSignature().getMethodName();
        className = declaredClassSig.toString() + "." + className + "$";
        this.logger.log("开始构造函数类:" + className, loggerLevel + 1);
        // 开始构造类 这个类我们沿用 之前
        // 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
        var funcInterFaceFileSignature = new bundle_1.FileSignature(this.scene.getProjectName(), 'funcInterfaceFile');
        var interfaceFile = this.scene.getFile(funcInterFaceFileSignature);
        if (interfaceFile) {
            this.logger.log("找到 函数接口文件 接下来开始构造函数类", loggerLevel + 1);
            var funcClass_1 = new bundle_1.ArkClass();
            funcClass_1.setDeclaringArkFile(interfaceFile);
            var funcClassSignature_1 = new bundle_1.ClassSignature(className, funcClass_1.getDeclaringArkFile().getFileSignature(), ((_a = funcClass_1.getDeclaringArkNamespace()) === null || _a === void 0 ? void 0 : _a.getSignature()) || null);
            funcClass_1.setSignature(funcClassSignature_1);
            // 把类的 类别设置为类
            funcClass_1.setCategory(ClassCategory.CLASS);
            interfaceFile.addArkClass(funcClass_1);
            this.logger.log("开始构造函数类:" + className, loggerLevel + 1);
            // 不用设置 修饰符 因为我们的 printer 默认public
            // 开始构造字段
            // 得到 可选类型
            this.logger.log("开始构造字段", loggerLevel + 2);
            var optionalTypes = parseFunSigOptionalInputTypes(methodSig);
            var filedIndex_1 = 0;
            optionalTypes.forEach(function (type) {
                var newField = new bundle_1.ArkField();
                newField.setCategory(FieldCategory.PROPERTY_DECLARATION);
                newField.setDeclaringArkClass(funcClass_1);
                // 创建字段签名
                var fieldName = "cap" + filedIndex_1;
                filedIndex_1++;
                var newFieldSig = new bundle_1.FieldSignature(fieldName, funcClassSignature_1, type, false);
                newField.setSignature(newFieldSig);
                // 添加到类里面
                funcClass_1.addField(newField);
                _this.logger.log("构造字段: " + fieldName, loggerLevel + 3);
            });
            // 开始构造方法
            // 1. 开始构造<init>
            var initMethod = new bundle_1.ArkMethod();
            initMethod.setDeclaringArkClass(funcClass_1);
            // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
            // 创建一个新 方法签名  输入类型和 bootstrap 一样都是可选类型 返回类型是 void
            // 构建参数列表
            var initParameters_1 = [];
            var paraindex_1 = 0;
            optionalTypes.forEach(function (type) {
                var newPara = new MethodParameter();
                newPara.setName("$r" + paraindex_1);
                newPara.setType(type);
                newPara.setOptional(false);
                initParameters_1.push(newPara);
                paraindex_1++;
            });
            // 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
            // 我们从外部得到这个类型
            var initMethodSubSig = new bundle_1.MethodSubSignature('<init>', initParameters_1, bundle_1.VoidType.getInstance(), false);
            var initMethodSignature = new bundle_1.MethodSignature(initMethod.getDeclaringArkClass().getSignature(), initMethodSubSig);
            initMethod.setSignature(initMethodSignature);
            // 设置修饰符 init 的修饰符为 public 
            initMethod.setModifiers(4);
            funcClass_1.addMethod(initMethod);
            // 开始构造方法体
            // 构造CFG
            var newCfg_1 = new bundle_1.Cfg();
            // 构造BB 
            var newInitBB = new bundle_1.BasicBlock();
            var stmts_2 = [];
            // 构造 local set 和 local array
            var localSet = void 0;
            var localArray_1 = [];
            var i_2 = 0;
            // 把 参数构造成 Local
            initParameters_1.forEach(function (para) {
                var newLocal = new bundle_1.Local(para.getName(), para.getType());
                localArray_1.push(newLocal);
                // 构造参数赋值语句
                var newParaRef = new bundle_1.ArkParameterRef(i_2, para.getType());
                var newAssignStmt = new bundle_1.ArkAssignStmt(newLocal, newParaRef);
                newAssignStmt.setCfg(newCfg_1);
                stmts_2.push(newAssignStmt);
                i_2++;
            });
            // 这部分在 参数赋值之后构造
            // 添加变量 指向自己类实例的变量 
            var thisType = new bundle_1.ClassType(funcClassSignature_1);
            var thisLocal = new bundle_1.Local("this", thisType);
            localArray_1.push(thisLocal);
            // 添加一个 this 赋值语句
            var newThisRef = new bundle_1.ArkThisRef(thisType);
            var newAssignStmt = new bundle_1.ArkAssignStmt(thisLocal, newThisRef);
            newAssignStmt.setCfg(newCfg_1);
            stmts_2.push(newAssignStmt);
            // 加一个调用 java.lang.Object 的 <init>语句
            // 需要构造一个 MethodSignature
            var initExpr = new bundle_1.ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
            var initStmt = new bundle_1.ArkInvokeStmt(initExpr);
            initStmt.setCfg(newCfg_1);
            stmts_2.push(initStmt);
            // 输入参数 和 字段匹配 赋值
            for (var j = 0; j < localArray_1.length - 1; j++) {
                //得到对应字段
                var field = funcClass_1.getFieldWithName("cap" + j);
                if (field) {
                    var fieldSig = field.getSignature();
                    var newFieldRef = new bundle_1.ArkInstanceFieldRef(thisLocal, fieldSig);
                    newAssignStmt = new bundle_1.ArkAssignStmt(newFieldRef, localArray_1[j]);
                    newAssignStmt.setCfg(newCfg_1);
                    stmts_2.push(newAssignStmt);
                }
                else {
                    this.logger.log("!!!!!警告: 没有找到字段" + "cap" + j, loggerLevel + 3);
                }
            }
            //添加返回语句
            var returnVoidStmt = new bundle_1.ArkReturnVoidStmt();
            returnVoidStmt.setCfg(newCfg_1);
            stmts_2.push(returnVoidStmt);
            newInitBB.setStmts(stmts_2);
            newCfg_1.setStartingStmt(stmts_2[0]);
            newCfg_1.addBlock(newInitBB);
            localSet = new Set(localArray_1);
            // 构建Body
            var newBody = new bundle_1.ArkBody(localSet, newCfg_1);
            initMethod.setBody(newBody);
            // 2. bootstrap$方法 
            var bootstrapMethod = new bundle_1.ArkMethod();
            bootstrapMethod.setDeclaringArkClass(funcClass_1);
            // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
            // 创建一个新 方法签名
            // 构建参数列表
            var bootstrapParameters_1 = [];
            paraindex_1 = 0;
            optionalTypes.forEach(function (type) {
                var newPara = new MethodParameter();
                newPara.setName("$r" + paraindex_1);
                newPara.setType(type);
                newPara.setOptional(false);
                bootstrapParameters_1.push(newPara);
                paraindex_1++;
            });
            // 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
            // 我们 根据得到的 方法签名构造一个
            var funcType = new bundle_1.FunctionType(methodSig);
            var bootstrapMethodSubSig = new bundle_1.MethodSubSignature('bootstrap$', bootstrapParameters_1, funcType, true);
            var bootstrapMethodSignature = new bundle_1.MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(), bootstrapMethodSubSig);
            bootstrapMethod.setSignature(bootstrapMethodSignature);
            // 设置修饰符 bootstrapMethod 的修饰符为 public static
            bootstrapMethod.setModifiers(20);
            // 开始构造方法体
            // 构造BB 
            newCfg_1 = new bundle_1.Cfg();
            var newBootStrapBB = new bundle_1.BasicBlock();
            stmts_2 = [];
            // 构造 local set
            localArray_1 = [];
            localSet = new Set();
            i_2 = 0;
            bootstrapParameters_1.forEach(function (para) {
                var newLocal = new bundle_1.Local(para.getName(), para.getType());
                localArray_1.push(newLocal);
                // 构造参数赋值语句
                var newParaRef = new bundle_1.ArkParameterRef(i_2, para.getType());
                var newAssignStmt = new bundle_1.ArkAssignStmt(newLocal, newParaRef);
                newAssignStmt.setCfg(newCfg_1);
                stmts_2.push(newAssignStmt);
                i_2++;
            });
            // 这部分在 参数赋值之后构造
            // 添加变量 指向自己类实例的变量 
            thisType = new bundle_1.ClassType(funcClassSignature_1);
            thisLocal = new bundle_1.Local(("$r" + paraindex_1), thisType);
            paraindex_1++;
            localArray_1.push(thisLocal);
            // 添加一个实例化 自己类型的语句
            var instanceExpr = new bundle_1.ArkNewExpr(thisType);
            newAssignStmt = new bundle_1.ArkAssignStmt(thisLocal, instanceExpr);
            newAssignStmt.setCfg(newCfg_1);
            stmts_2.push(newAssignStmt);
            // 添加调用自己 <init> 方法的语句
            var newInstanceExpr = new bundle_1.ArkInstanceInvokeExpr(thisLocal, initMethodSignature, localArray_1.slice(0, -1));
            var newInstanceStmt = new bundle_1.ArkInvokeStmt(newInstanceExpr);
            newInstanceStmt.setCfg(newCfg_1);
            stmts_2.push(newInstanceStmt);
            // 添加返回语句
            var newReturnStmt = new bundle_1.ArkReturnStmt(thisLocal);
            newReturnStmt.setCfg(newCfg_1);
            stmts_2.push(newReturnStmt);
            newBootStrapBB.setStmts(stmts_2);
            newCfg_1.setStartingStmt(stmts_2[0]);
            newCfg_1.addBlock(newBootStrapBB);
            localSet = new Set(localArray_1);
            // 构建Body
            newBody = new bundle_1.ArkBody(localSet, newCfg_1);
            bootstrapMethod.setBody(newBody);
            funcClass_1.addMethod(bootstrapMethod);
            // 构建 方法 apply
            var applyMethod = new bundle_1.ArkMethod();
            applyMethod.setDeclaringArkClass(funcClass_1);
            // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
            // 创建一个新 方法签名 参数是一个方法的必选参数  返回的是方法的参数
            // 构建参数列表
            var applyParameters_1 = [];
            paraindex_1 = 0;
            var mustParas = parseFunSigMustInputTypes(methodSig);
            mustParas.forEach(function (type) {
                var newPara = new MethodParameter();
                newPara.setName("$r" + paraindex_1);
                newPara.setType(type);
                newPara.setOptional(false);
                applyParameters_1.push(newPara);
                paraindex_1++;
            });
            // 我们 根据得到的 方法签名构造一个 apply 
            // apply 的输入和输出是 函数must的参数
            var applyMethodSubSig = new bundle_1.MethodSubSignature('apply', applyParameters_1, methodSig.getType(), true);
            var applyMethodSignature = new bundle_1.MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(), applyMethodSubSig);
            applyMethod.setSignature(applyMethodSignature);
            // 设置修饰符 applyMethod 的修饰符为 public 
            applyMethod.setModifiers(4);
            // 开始构造方法体
            // 构造BB 
            newCfg_1 = new bundle_1.Cfg();
            var newApplyBB = new bundle_1.BasicBlock();
            stmts_2 = [];
            // 构造 local set
            localArray_1 = [];
            localSet = new Set();
            i_2 = 0;
            // 添加参数 获取语句
            var args2_1 = [];
            applyParameters_1.forEach(function (para) {
                var newLocal = new bundle_1.Local(para.getName(), para.getType());
                localArray_1.push(newLocal);
                args2_1.push(newLocal);
                // 构造参数赋值语句
                var newParaRef = new bundle_1.ArkParameterRef(i_2, para.getType());
                var newAssignStmt = new bundle_1.ArkAssignStmt(newLocal, newParaRef);
                newAssignStmt.setCfg(newCfg_1);
                stmts_2.push(newAssignStmt);
                i_2++;
            });
            // 这部分在 参数赋值之后构造
            // 添加变量 指向自己类实例的变量 
            thisType = new bundle_1.ClassType(funcClassSignature_1);
            thisLocal = new bundle_1.Local(("$r" + paraindex_1), thisType);
            paraindex_1++;
            localArray_1.push(thisLocal);
            // 添加一个 自我赋值语句
            newThisRef = new bundle_1.ArkThisRef(thisType);
            newAssignStmt = new bundle_1.ArkAssignStmt(thisLocal, newThisRef);
            newAssignStmt.setCfg(newCfg_1);
            stmts_2.push(newAssignStmt);
            var args1 = [];
            // 字段赋值语句 用来捕获自己的字段 字段来自于可选参数 所以我们直接用 optionalpara
            // 输入参数 和 字段匹配 赋值
            for (var j = 0; j < optionalTypes.length; j++) {
                //得到对应字段
                var field = funcClass_1.getFieldWithName("cap" + j);
                if (field) {
                    var fieldSig = field.getSignature();
                    var newFieldRef = new bundle_1.ArkInstanceFieldRef(thisLocal, fieldSig);
                    // 添加对应类型的变量
                    var newLocal = new bundle_1.Local("$i" + j);
                    localArray_1.push(newLocal);
                    args1.push(newLocal);
                    newAssignStmt = new bundle_1.ArkAssignStmt(newLocal, newFieldRef);
                    newAssignStmt.setCfg(newCfg_1);
                    stmts_2.push(newAssignStmt);
                }
                else {
                    this.logger.log("!!!!!警告: 没有找到字段" + "cap" + j, loggerLevel + 3);
                }
            }
            // 调用原本指向的的函数 这是一个静态调用 先输入自己的字段 作为传入 在是自己的参数
            // 返回值就是期望类型 
            var returnLocal = new bundle_1.Local(("$r" + paraindex_1), methodSig.getType());
            var newStaticInvokeExpr = new bundle_1.ArkStaticInvokeExpr(methodSig, args1.concat(args2_1));
            localArray_1.push(returnLocal);
            newAssignStmt = new bundle_1.ArkAssignStmt(returnLocal, newStaticInvokeExpr);
            stmts_2.push(newAssignStmt);
            // 添加返回语句
            newReturnStmt = new bundle_1.ArkReturnStmt(returnLocal);
            newReturnStmt.setCfg(newCfg_1);
            stmts_2.push(newReturnStmt);
            newApplyBB.setStmts(stmts_2);
            newCfg_1.setStartingStmt(stmts_2[0]);
            newCfg_1.addBlock(newApplyBB);
            localSet = new Set(localArray_1);
            // 构建Body
            newBody = new bundle_1.ArkBody(localSet, newCfg_1);
            applyMethod.setBody(newBody);
            funcClass_1.addMethod(applyMethod);
            return bootstrapMethodSignature;
        }
        else {
            this.logger.log("警告!!!!!  没有找到 接口文件 ", loggerLevel + 1);
            return null;
        }
    };
    // 这个方法用来补齐 被调用的函数方法 和 调用的方法的变量差
    TypeChecker.prototype.checkType4CallerCallee = function (clallerMethod, calleeMethod, loggerLevel) {
        var _this = this;
        // 首先我们会遍历callee上的变量 把那些没有定义 即 不出现在任何 赋值表达式左边的变量放到一个
        if (calleeMethod.getBody()) {
            this.logger.log("检查函数方法调用和被调用的类型  caller: " + clallerMethod.getName()
                + "  clallee:  " + calleeMethod.getName(), loggerLevel + 1);
            var localsMap = calleeMethod.getBody().getLocals();
            var locals = Array.from(localsMap.values());
            // 对localsMap的删除会影响到 原本的数据结构
            var undefinedLocalsName_1 = new Set(localsMap.keys());
            // 遍历变量 
            locals.forEach(function (local) {
                _this.logger.log("监视变量: " + local + "所用语句", loggerLevel + 2);
                // 不要用什么 getUsedStmts  这并不会给我们所有使用到的语句
                calleeMethod.getCfg().getStmts().forEach(function (stmt) {
                    if (stmt instanceof bundle_1.ArkAssignStmt) {
                        if (stmt.getLeftOp() instanceof bundle_1.Local) {
                            if (stmt.getLeftOp().getName() === local.getName()) {
                                _this.logger.log(local.getName() + "出现在赋值左边", loggerLevel + 2);
                                // 被从Map中删去
                                undefinedLocalsName_1.delete(local.getName());
                            }
                        }
                    }
                });
            });
            //因为this 和 参数等变量 可能还保留在我们的 Map里 所以我们专门删除
            undefinedLocalsName_1.delete("this");
            var params = calleeMethod.getParameterInstances();
            params.forEach(function (para) {
                undefinedLocalsName_1.delete(para.getName());
            });
            // 剩下在 undefinedLocalsName 里的都是 没有被定义的
            // 这些变量一定是有一部分来自 caller的
            var clallerLocalsMap_1 = clallerMethod.getBody().getLocals();
            // 我们遍历剩下的没有定义的 Local
            var returnLocals_1 = [];
            locals.forEach(function (local) {
                if (undefinedLocalsName_1.has(local.getName())) {
                    _this.logger.log("在caller里寻找变量" + local, loggerLevel + 2);
                    var foundLocal = clallerLocalsMap_1.get(local.getName());
                    if (foundLocal) {
                        _this.logger.log("在caller找到变量" + local, loggerLevel + 2);
                        // 接下来要用foundLocal 的类型替换掉原来的
                        local.setType(foundLocal.getType());
                        _this.logger.log("把原有变量类型替换为" + foundLocal.getType(), loggerLevel + 2);
                        returnLocals_1.push(local);
                    }
                    else {
                        _this.logger.log("!!!警告: 没有在caller里找到变量" + local.getName(), loggerLevel + 2);
                    }
                }
            });
            // 把这些 添加的变量都当作参数 还要添加相应的 赋值语句
            // 我们遍历剩下的没有定义的 Local
            // 把这些local类型加到 当前方法签名里
            // 关键是怎么添加 因为目前得不到parameter类 只有拿local[] 当 parameter[]
            // 用我们自己的 类 
            var parameters_1 = [];
            returnLocals_1.forEach(function (local) {
                var newPara = new MethodParameter();
                newPara.setName(local.getName());
                newPara.setType(local.getType());
                // 这是一个小技巧 我们把 自己添加的外部输入 参数都标记从可选的
                newPara.setOptional(true);
                parameters_1.push(newPara);
            });
            var oldSubSig = calleeMethod.getSignature().getMethodSubSignature();
            parameters_1 = parameters_1.concat(oldSubSig.getParameters());
            var newSubSig = new bundle_1.MethodSubSignature(oldSubSig.getMethodName(), parameters_1, oldSubSig.getReturnType(), oldSubSig.isStatic());
            var newMethodSig = new bundle_1.MethodSignature(calleeMethod.getSignature().getDeclaringClassSignature(), newSubSig);
            // 把当前这个方法的签名设置为这个
            calleeMethod.setSignature(newMethodSig);
            // 添加赋值语句
            // 得到开始BB 
            var startBlock = calleeMethod.getCfg().getStartingBlock();
            var stmts = startBlock.getStmts();
            var newStmts_1 = [];
            // 添加赋值语句
            var index_1 = 0;
            returnLocals_1.forEach(function (local) {
                // 构建赋值语句
                var newRef = new bundle_1.ArkParameterRef(index_1, local.getType());
                var newAssignStmt = new bundle_1.ArkAssignStmt(local, newRef);
                newStmts_1.push(newAssignStmt);
                index_1++;
            });
            stmts.forEach(function (stmt) {
                if (stmt instanceof bundle_1.ArkAssignStmt) {
                    if (stmt.getRightOp() instanceof bundle_1.ArkParameterRef) {
                        // 把原有的参数索引加 index
                        var newRef = new bundle_1.ArkParameterRef(stmt.getRightOp().getIndex() + index_1, stmt.getRightOp().getType());
                        stmt.setRightOp(newRef);
                    }
                    newStmts_1.push(stmt);
                }
                else {
                    newStmts_1.push(stmt);
                }
            });
            startBlock.setStmts(newStmts_1);
        }
        // 我们发现 当我们改 函数类型对应的方法时 参数的修改不会再是之前我们想要的
        // 同名搜索法是 有问题的 因为 可能 产生的匿名方法他的 输入和输出 和我们最终产生的不一样
    };
    // 这个方法主要用来规范一个方法中出现的所有 调用表达式的推导
    TypeChecker.prototype.checkValues = function (arkMethod, loggerLevel) {
        // 因为这个方法会构造新的Local所以 引入index
        var id = 0;
        this.logger.log("开始检查调用表达式", loggerLevel);
        // 遍历所有语句
        // 遍历 一个方法里所有的语句
        var blocks = Array.from(arkMethod.getBody().getCfg().getBlocks());
        for (var i = 0; i < blocks.length; i++) {
            var stmts = blocks[i].getStmts();
            var stmtsNumber = stmts.length;
            for (var j = 0; j < stmtsNumber; j++) {
                var values = stmts[j].getUses();
                this.logger.log("检查语句: " + stmts[j], loggerLevel);
                for (var k = 0; k < values.length; k++) {
                    this.logger.log("检查值: " + values[k] + "类型是: " + values[k].getType(), loggerLevel + 1);
                    // 如果值是一个 Expr
                    if (values[k] instanceof bundle_1.AbstractExpr) {
                        if (values[k] instanceof bundle_1.AbstractInvokeExpr) {
                            this.logger.log("包含调用表达式: " + values[k], loggerLevel + 2);
                            var methodSig = values[k].getMethodSignature();
                            // 检查是否其是一个 函数 的静态调用
                            if (values[k] instanceof bundle_1.ArkStaticInvokeExpr) {
                                this.checkStaticInvoke(stmts[j], arkMethod, loggerLevel + 2);
                            }
                            // here we need to check if the called method is 
                            // @_UnknownProjectName/_UnknownFileName: .super()
                            // this is important because the method can be found in the scene
                            this.logger.log("调用方法为: " + methodSig, loggerLevel + 1);
                            // 我们检查这个方法是否已经被检查过
                            if (this.methodSigChecked(methodSig)) {
                                // 如果这个方法签名已经检查 
                                this.logger.log("该方法已经被检查: ", loggerLevel + 1);
                            }
                            // if not checked we  
                            else {
                                this.logger.log("该方法需要检查: ", loggerLevel + 1);
                                // 依据这个签名寻找该方法
                                var calledMethod = this.scene.getMethod(methodSig);
                                if (calledMethod) {
                                    this.logger.log("在项目中找到方法: " + methodSig, loggerLevel + 2);
                                    // 调用方法检查
                                    this.logger.log("跳转检查方法: " + methodSig, loggerLevel + 2);
                                    this.checkMethod(calledMethod, calledMethod.getDeclaringArkClass(), false, loggerLevel + 3);
                                    this.logger.log("跳转方法: " + methodSig + "检查完成", loggerLevel + 2);
                                    // 设置方法签名
                                    values[k].setMethodSignature(calledMethod.getSignature());
                                }
                                else {
                                    this.logger.log("没有在项目中找到方法: " + methodSig, loggerLevel + 2);
                                }
                            }
                            // 如果是一个实例调用表达式 还要检查base 的类型
                            if (values[k] instanceof bundle_1.ArkInstanceInvokeExpr) {
                                this.logger.log("值: " + values[k] + "是一个实例调用", loggerLevel + 1);
                                var base = values[k].getBase();
                                this.logger.log("base: " + base + " 类型是: " + base.getType(), loggerLevel + 1);
                                // if the base name is super
                                // we need to change the invoke to the staticinvoke
                                if (base.getName() === "super") {
                                    this.logger.log("这是一个对于父类方法的调用 我们会把base换成指向自己的this", loggerLevel + 1);
                                    var thisLocal = arkMethod.getBody().getLocals().get("this");
                                    if (thisLocal) {
                                        values[k].setBase(thisLocal);
                                        // delete old super local
                                        arkMethod.getBody().getLocals().delete("super");
                                        this.logger.log("更改后的stmt: " + values[k] + " 同时我们删除了super 变量", loggerLevel + 2);
                                    }
                                    else {
                                        this.logger.log("没有this变量让我们替换", loggerLevel + 1);
                                    }
                                }
                            }
                        }
                        else if (values[k] instanceof bundle_1.AbstractBinopExpr) {
                            this.logger.log("值: " + values[k] + "是一个二元表达式", loggerLevel + 1);
                            // 检查是否是 string + string
                            if (values[k].getOperator() === NormalBinaryOperator.Addition) {
                                if (values[k].getOp1().getType() instanceof bundle_1.StringType &&
                                    values[k].getOp2().getType() instanceof bundle_1.StringType) {
                                    this.logger.log("值: " + values[k] + "是一个字符串加法", loggerLevel + 1);
                                    //把字符串加法改为 对于方法concat的调用
                                    //建立一个 名为 concate 的方法签名
                                    var op1 = values[k].getOp1();
                                    var op2 = values[k].getOp2();
                                    // 构造参数
                                    var params = [];
                                    var para = new MethodParameter();
                                    para.setName("op2");
                                    para.setType(bundle_1.StringType.getInstance());
                                    params.push(para);
                                    var concatSubMethodSig = new bundle_1.MethodSubSignature("concat", params, bundle_1.StringType.getInstance(), false);
                                    // 构造一个 名为 java.lang 的文件签名 
                                    var javaFileSignature = new bundle_1.FileSignature("java", 'lang');
                                    var newClassSig = new bundle_1.ClassSignature("String", javaFileSignature, null);
                                    var concatMethodSig = new bundle_1.MethodSignature(newClassSig, concatSubMethodSig);
                                    var args = [];
                                    args.push(op2);
                                    if (op1 instanceof bundle_1.Local) {
                                        //  op1 直接作为 实例调用的base
                                        var newInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(op1, concatMethodSig, args);
                                        //  用这个构造好的表达式 代替原来的valeu
                                        stmts[j].replaceUse(values[k], newInvokeExpr);
                                        this.logger.log("构造之后的连接语句是: " + stmts[j], loggerLevel + 2);
                                    }
                                    else if (op1 instanceof bundle_1.Constant) {
                                        this.logger.log("额外添加字符变量", loggerLevel + 2);
                                        //建立一个新的Local 
                                        //新建一个Local String
                                        var newLocal = new bundle_1.Local("$temp" + id.toString(), bundle_1.StringType.getInstance());
                                        id++;
                                        //把这个变量加到 这个方法里
                                        var localNameMap = arkMethod.getBody().getLocals();
                                        localNameMap.set(newLocal.getName(), newLocal);
                                        //build 一个Assign 
                                        var newAssignStmt = new bundle_1.ArkAssignStmt(newLocal, op1);
                                        var newInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(newLocal, concatMethodSig, args);
                                        stmts[j].replaceUse(values[k], newInvokeExpr);
                                        //把这个newAssignStmt加到 当前语句的 前面
                                        this.logger.log("新构造的赋值语句是: " + stmts[j], loggerLevel + 2);
                                        this.logger.log("构造之后的连接语句是: " + stmts[j], loggerLevel + 2);
                                        stmtsNumber++;
                                        stmts.splice(j, 0, newAssignStmt);
                                        j++;
                                        blocks[i].setStmts(stmts);
                                    }
                                }
                            }
                            else {
                                // 调用自己的设置类型
                                values[k].setType();
                                this.logger.log("值: " + values[k] + "是一个二元表达式 类型是" + values[k].getType(), loggerLevel + 1);
                            }
                        }
                    }
                    // 如果值是一个 Ref
                    else if (values[k] instanceof bundle_1.AbstractRef) {
                        this.logger.log("值: " + values[k] + " 是一个引用类型", loggerLevel + 1);
                        if (values[k] instanceof bundle_1.ArkInstanceFieldRef) {
                            // 字段签名的 getType() 返回为未知
                            if (values[k].getType() instanceof bundle_1.UnknownType) {
                                this.logger.log("检测到未知实例字段引用:  " + values[k], loggerLevel + 2);
                                var base = values[k].getBase();
                                if (base) {
                                    this.logger.log("base: " + base.toString() + "类型: " + base.getType(), loggerLevel + 2);
                                    //我们专门为他们构造一个get 方法
                                    //返回类型为unknown
                                    var returnType = bundle_1.UnknownType.getInstance();
                                    var fieldName = values[k].getFieldName();
                                    console.log("字段名称: " + fieldName);
                                    var num = parseInt(fieldName);
                                    var ifNumberIndex = false;
                                    var arg = void 0;
                                    if (!isNaN(num)) {
                                        this.logger.log("这是一个数组的数字索引", loggerLevel + 3);
                                        ifNumberIndex = true;
                                        arg = new bundle_1.Constant(fieldName, bundle_1.NumberType.getInstance());
                                    }
                                    //是否是一个Local 
                                    else {
                                        var localIndex = arkMethod.getBody().getLocals().get(fieldName);
                                        if (localIndex) {
                                            this.logger.log("存在一个变量: " + fieldName + " 类型: " + localIndex.getType(), loggerLevel + 3);
                                            if (localIndex.getType() instanceof bundle_1.NumberType) {
                                                this.logger.log("这是一个数组的数字索引", loggerLevel + 3);
                                                ifNumberIndex = true;
                                                arg = localIndex;
                                            }
                                        }
                                    }
                                    if (ifNumberIndex) {
                                        //构造一个Instance
                                        //virtualinvoke $stack3.<java.util.ArrayList: java.lang.Object get(int)>(1);
                                        // build methodSubSig
                                        var newGetSubSig = new bundle_1.MethodSubSignature("get", [], returnType, false);
                                        // build a new fileSig
                                        var javaFileSignature = new bundle_1.FileSignature("java", 'util');
                                        // build a new classSig
                                        var newClassSig = new bundle_1.ClassSignature("ArrayList", javaFileSignature);
                                        //let newGetSig:                                        
                                        var newMethodSig = new bundle_1.MethodSignature(newClassSig, newGetSubSig);
                                        var args = [];
                                        args.push(arg);
                                        var newInsInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(base, newMethodSig, args);
                                        stmts[j].replaceUse(values[k], newInsInvokeExpr);
                                    }
                                    //不是数字索引 那就变成字段
                                    else {
                                        //有关于length 的
                                        if (fieldName === "length" && (base.getType().getName() === "Array")) {
                                            //l3 = virtualinvoke $stack4.<java.util.ArrayList: int size()>();
                                            var newGetSubSig = new bundle_1.MethodSubSignature("size", [], returnType, false);
                                            // build a new fileSig
                                            var javaFileSignature = new bundle_1.FileSignature("java", 'util');
                                            // build a new classSig
                                            var newClassSig = new bundle_1.ClassSignature("ArrayList", javaFileSignature);
                                            // let newGetSig:                                        
                                            var newMethodSig = new bundle_1.MethodSignature(newClassSig, newGetSubSig);
                                            var newInsInvokeExpr = new bundle_1.ArkInstanceInvokeExpr(base, newMethodSig, []);
                                            // replace old value
                                            stmts[j].replaceUse(values[k], newInsInvokeExpr);
                                            this.logger.log("用size()表示数组的长度: ", loggerLevel + 2);
                                        }
                                        //不是length属性便是普通字段
                                        else {
                                            //构建字段引用
                                            // TODO biuld the infer type for the field
                                            var newFieldSig = new bundle_1.FieldSignature(fieldName, bundle_1.ClassSignature.DEFAULT, returnType, false);
                                            var newFildRef = new bundle_1.ArkInstanceFieldRef(base, newFieldSig);
                                            stmts[j].replaceUse(values[k], newFildRef);
                                            this.logger.log("修改未知字段引用: " + stmts[j], loggerLevel + 2);
                                        }
                                    }
                                }
                                else {
                                    this.logger.log("不存在base", loggerLevel + 2);
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    // this method is used to check if a ArkStaticInvokeExpr invoke the super method
    // @_UnknownProjectName/_UnknownFileName: .super()
    // this is important because the method can be found in the scene
    TypeChecker.prototype.checkIfSuperCall = function (invokeExpr) {
    };
    TypeChecker.prototype.addToChecked = function (arkMethod) {
        var methodSig = arkMethod.getSignature();
        this.checkedMethods.set(this.genKey(methodSig), methodSig);
    };
    TypeChecker.prototype.dropFromNoCheck = function (arkMethod) {
        var methodSig = arkMethod.getSignature();
        this.toCheckMethods.delete(this.genKey(methodSig));
    };
    TypeChecker.prototype.methodChecked = function (arkMethod) {
        var methodSig = arkMethod.getSignature();
        if (this.checkedMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    };
    TypeChecker.prototype.methodSigChecked = function (methodSig) {
        if (this.checkedMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    };
    TypeChecker.prototype.methodNoChecked = function (arkMethod) {
        var methodSig = arkMethod.getSignature();
        if (this.toCheckMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    };
    TypeChecker.prototype.methodSigNoChecked = function (methodSig) {
        if (this.toCheckMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    };
    TypeChecker.prototype.addToNoChecked = function (arkMethod) {
        var methodSig = arkMethod.getSignature();
        this.toCheckMethods.set(this.genKey(methodSig), methodSig);
    };
    // 这个方法负责检查 一个方法里所有的函数类型变量
    TypeChecker.prototype.checkFunctionType = function (inputMethod, inputClass, logger, loggerLevel) {
        var _this = this;
        logger.log("开始检查方法的函数变量", loggerLevel);
        // 查看 Locals
        if (inputMethod.getBody()) {
            var localsMap = inputMethod.getBody().getLocals();
            // 遍历有没有functiontype
            var locals = Array.from(localsMap.values());
            locals.forEach(function (local) {
                if (local.getType() instanceof bundle_1.FunctionType) {
                    logger.log("在类 " + inputClass.getName() + " 方法 " +
                        inputMethod.getName() + "中发现函数类型: " + local.getName(), loggerLevel + 1);
                    var funcSig = local.getType().getMethodSignature();
                    logger.log("该函数变量指向方法: " + funcSig, loggerLevel + 1);
                    var funcMethod = _this.scene.getMethod(funcSig);
                    if (funcMethod) {
                        logger.log("找到所指方法 我们对该方法类型检查", loggerLevel + 2);
                        // 用匿名模式对这个方法进行类型检查
                        _this.checkMethod(funcMethod, funcMethod.getDeclaringArkClass(), true, loggerLevel + 3);
                    }
                    else {
                        logger.log("没有找到所指方法", loggerLevel + 2);
                    }
                }
            });
        }
    };
    // 这个方法负责检查 方法中的静态调用 函数方法
    // 这个函数用来更正 静态调用 函数类型时的 错误
    // 这种 静态调用 没有 函数签名 关键信息缺失 只知道一个 方法名 "func" (例子，当然可为别的名字)
    // 这种 func 多半是 方法内的一个 函数型变量名 
    // 解决方法 找到对应变量名 提取其函数类型 即 返回和输入 类型
    // 我们会把原有的 staticinvoke 全部改写为 ptrinvoke 在打印的过程中会被打成 接口调用
    // 变成 interfaceinvoke l0.<intToint: int apply(int)>(l2);
    // 构建一个 指针调用语句
    // 因为指针调用表达式的 inferType 还没有完成 所以 要解决
    // 这种情况只会发生在该方法变量里有函数变量时 
    TypeChecker.prototype.checkStaticInvoke = function (staticInvokeStmt, inputMethod, loggerLevel) {
        if (inputMethod.getBody()) {
            this.logger.log("该表达式还是一个静态调用进行静态调用检查", loggerLevel);
            this.logger.log("检查语句:  " + staticInvokeStmt, loggerLevel + 1);
            var localsMap = inputMethod.getBody().getLocals();
            var invokeExpr = staticInvokeStmt.getInvokeExpr();
            //得到函数名字
            var methodSig = invokeExpr.getMethodSignature();
            var methodName = methodSig.getMethodSubSignature().getMethodName();
            var classSig = methodSig.getDeclaringClassSignature();
            if (classSig.getClassName() === "") {
                this.logger.log("该方法:" + methodName + "来自未知类, 需要进行更换", loggerLevel + 1);
            }
            // 我们去变量里找到是否有同名的 函数类型变量
            if (localsMap.has(methodName)) {
                if (localsMap.get(methodName).getType() instanceof bundle_1.FunctionType) {
                    this.logger.log("找到方法:" + methodName + "同名的函数变量", loggerLevel + 1);
                    // 我们要把该静态调用语句换为指针调用
                    // 我们输入的参数是可以不变的
                    var newPtrExpr = new bundle_1.ArkPtrInvokeExpr(localsMap.get(methodName).getType().getMethodSignature(), localsMap.get(methodName), invokeExpr.getArgs(), invokeExpr.getRealGenericTypes());
                    staticInvokeStmt.replaceUse(invokeExpr, newPtrExpr);
                    this.logger.log("换成指针调用:" + staticInvokeStmt, loggerLevel + 2);
                    // 我们还要 推理类型
                    if (staticInvokeStmt instanceof bundle_1.ArkAssignStmt) {
                        if (staticInvokeStmt.getRightOp() instanceof bundle_1.ArkPtrInvokeExpr) {
                            if (staticInvokeStmt.getLeftOp().getType() instanceof bundle_1.UnknownType) {
                                staticInvokeStmt.getLeftOp().setType(localsMap.get(methodName).getType().getMethodSignature().getType());
                            }
                        }
                    }
                }
                else {
                    this.logger.log("!!!!!警告  没有找到方法:" + methodName + "同名的函数变量", loggerLevel + 1);
                }
            }
            else {
                this.logger.log("!!!!!警告  没有找到方法:" + methodName + "同名的函数变量", loggerLevel);
            }
        }
    };
    return TypeChecker;
}());
exports.TypeChecker = TypeChecker;
var FieldCategory;
(function (FieldCategory) {
    FieldCategory[FieldCategory["PROPERTY_DECLARATION"] = 0] = "PROPERTY_DECLARATION";
    FieldCategory[FieldCategory["PROPERTY_ASSIGNMENT"] = 1] = "PROPERTY_ASSIGNMENT";
    FieldCategory[FieldCategory["SHORT_HAND_PROPERTY_ASSIGNMENT"] = 2] = "SHORT_HAND_PROPERTY_ASSIGNMENT";
    FieldCategory[FieldCategory["SPREAD_ASSIGNMENT"] = 3] = "SPREAD_ASSIGNMENT";
    FieldCategory[FieldCategory["PROPERTY_SIGNATURE"] = 4] = "PROPERTY_SIGNATURE";
    FieldCategory[FieldCategory["ENUM_MEMBER"] = 5] = "ENUM_MEMBER";
    FieldCategory[FieldCategory["INDEX_SIGNATURE"] = 6] = "INDEX_SIGNATURE";
    FieldCategory[FieldCategory["GET_ACCESSOR"] = 7] = "GET_ACCESSOR";
})(FieldCategory || (FieldCategory = {}));
var ClassCategory;
(function (ClassCategory) {
    ClassCategory[ClassCategory["CLASS"] = 0] = "CLASS";
    ClassCategory[ClassCategory["STRUCT"] = 1] = "STRUCT";
    ClassCategory[ClassCategory["INTERFACE"] = 2] = "INTERFACE";
    ClassCategory[ClassCategory["ENUM"] = 3] = "ENUM";
    ClassCategory[ClassCategory["TYPE_LITERAL"] = 4] = "TYPE_LITERAL";
    ClassCategory[ClassCategory["OBJECT"] = 5] = "OBJECT";
})(ClassCategory || (ClassCategory = {}));
var RelationalBinaryOperator;
(function (RelationalBinaryOperator) {
    RelationalBinaryOperator["LessThan"] = "<";
    RelationalBinaryOperator["LessThanOrEqual"] = "<=";
    RelationalBinaryOperator["GreaterThan"] = ">";
    RelationalBinaryOperator["GreaterThanOrEqual"] = ">=";
    RelationalBinaryOperator["Equality"] = "==";
    RelationalBinaryOperator["InEquality"] = "!=";
    RelationalBinaryOperator["StrictEquality"] = "===";
    RelationalBinaryOperator["StrictInequality"] = "!==";
})(RelationalBinaryOperator || (RelationalBinaryOperator = {}));
var NormalBinaryOperator;
(function (NormalBinaryOperator) {
    // TODO: unfold it
    NormalBinaryOperator["NullishCoalescing"] = "??";
    // arithmetic
    NormalBinaryOperator["Exponentiation"] = "**";
    NormalBinaryOperator["Division"] = "/";
    NormalBinaryOperator["Addition"] = "+";
    NormalBinaryOperator["Subtraction"] = "-";
    NormalBinaryOperator["Multiplication"] = "*";
    NormalBinaryOperator["Remainder"] = "%";
    // shift
    NormalBinaryOperator["LeftShift"] = "<<";
    NormalBinaryOperator["RightShift"] = ">>";
    NormalBinaryOperator["UnsignedRightShift"] = ">>>";
    // Bitwise
    NormalBinaryOperator["BitwiseAnd"] = "&";
    NormalBinaryOperator["BitwiseOr"] = "|";
    NormalBinaryOperator["BitwiseXor"] = "^";
    // Logical
    NormalBinaryOperator["LogicalAnd"] = "&&";
    NormalBinaryOperator["LogicalOr"] = "||";
})(NormalBinaryOperator || (NormalBinaryOperator = {}));
var MethodParameter = /** @class */ (function () {
    function MethodParameter() {
        this.name = '';
        this.optional = false;
    }
    MethodParameter.prototype.getName = function () {
        return this.name;
    };
    MethodParameter.prototype.setName = function (name) {
        this.name = name;
    };
    MethodParameter.prototype.getType = function () {
        return this.type;
    };
    MethodParameter.prototype.setType = function (type) {
        this.type = type;
    };
    MethodParameter.prototype.isOptional = function () {
        return this.optional;
    };
    MethodParameter.prototype.setOptional = function (optional) {
        this.optional = optional;
    };
    return MethodParameter;
}());
// 这个函数用来 解析我们函数Sig里 option的 参数类型
function parseFunSigOptionalInputTypes(funcSig) {
    var inputTypes = [];
    var parameters = funcSig.getMethodSubSignature().getParameters();
    // 遍历parameters
    var ifOption = true;
    parameters.forEach(function (para) {
        // 如果这个参数是可选的代表是要从外部输入
        if (para.isOptional() && ifOption) {
            inputTypes.push(para.getType());
        }
        else {
            ifOption = false;
        }
    });
    return inputTypes;
}
// 这个函数用来 解析我们的函数Sig的输入和返回类型
// 只会返回 不是可选参数的类型
function parseFunSigMustInputTypes(funcSig) {
    var inputTypes = [];
    var parameters = funcSig.getMethodSubSignature().getParameters();
    // 遍历parameters
    var ifOption = true;
    parameters.forEach(function (para) {
        // 如果这个参数是可选的代表是要从外部输入
        if (para.isOptional()) {
        }
        else {
            ifOption = false;
        }
        if (!ifOption) {
            inputTypes.push(para.getType());
        }
    });
    return inputTypes;
}
// 这个函数负责构造 java.lang.Object 的 <init> 的 MethodSignature
function buildMethodSig4ObjectInit() {
    var newSubSig = new bundle_1.MethodSubSignature("<init>", [], bundle_1.VoidType.getInstance(), false);
    // 构造一个 名为 java.lang 的文件签名 
    var javaFileSignature = new bundle_1.FileSignature("java", 'lang');
    var newClassSig = new bundle_1.ClassSignature("Object", javaFileSignature, null);
    var newMethodSig = new bundle_1.MethodSignature(newClassSig, newSubSig);
    return newMethodSig;
}
