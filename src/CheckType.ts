//负责对每个arkfile进行类型检查和修改
//至于函数，不处理保持原状
import { TypeInference, ArkIfStmt,BasicBlock, Local, ModelUtils, StringType, ArrayType, UnclearReferenceType,
     Type,MethodSubSignature, SceneConfig, FileSignature, inferSimpleTypeInMethod,
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt, AbstractRef,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt, NeverType, AbstractBinopExpr,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,
    MethodSignature, FieldSignature,ImportInfo,ArkPtrInvokeExpr, VoidType, UnionType,
    AbstractExpr, UnknownType, ArkConditionExpr, Constant, BooleanType, FunctionType, NumberType,
    ArkNormalBinopExpr, ArkSignatureBuilder, ArkNewExpr} from "../lib/bundle";


import Logger from "./Logger1";

import { Logger2 } from "./Logger2";

// 这个方法会检查所有的方法，改变返回类型  通过改变 方法签名
export function checkReturnType(inputMethod: ArkMethod){
    //if(inputMethod.getReturnType() instanceof UnknownType)
    if(true){
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
                    //console.log("返回类型：" + Array.from(returnTypes));
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
                    
                }
            }
    }
}

//这个方法主要用来检查控制流 目前只实现了对于三元表达式的勘误
//1 三元表达式的错误
//2 switch语句的错误 // TODO 
export function checkControlFlow(inputMethod: ArkMethod){
    console.log("开始检查方法是否含有三元表达式");
    if (inputMethod.getBody()){
        // 得到有BB
        let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
        let maxID = blocks.length; 
        for (let i: number = 0; i < maxID; i++){
            let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
            let orderBlocks: BasicBlock[] = blocks.sort((a, b) => a.getId() - b.getId());
            
            let stmts: Stmt[] = orderBlocks[i].getStmts();
            for (let j: number = 0; j < stmts.length; j++){
                if (stmts[j] instanceof ArkIfStmt && j != stmts.length - 1){
                    //我们要创建新的BB 且要收集后两个赋值语句
                    //ifstmt       
                    //assign
                    if (stmts[j + 1] instanceof ArkAssignStmt &&
                        stmts[j + 2] instanceof ArkAssignStmt
                    ){
                        console.log("在id 为" + orderBlocks[i].getId() 
                        + "的BB中找到三元表达式");
                        console.log(stmts[j]);
                        console.log(stmts[j+1]);
                        console.log(stmts[j+2]);
                        //把原有的Blcok分成两半 
                        
                        //原有的Block  0123 4 5  67
                        let newStmts: Stmt[] = stmts.slice(j+3, stmts.length);
                        //创建一个Block
                        let newBlock1 = new BasicBlock();
                        newBlock1.setId(maxID);
                        maxID++;
                        newBlock1.setStmts(newStmts);

                        let newBlock2 = new BasicBlock();
                        newBlock2.setId(maxID);
                        maxID++;
                        newBlock2.addStmt(stmts[j + 1]);

                        let newBlock3 = new BasicBlock();
                        newBlock3.setId(maxID);
                        maxID++;
                        newBlock3.addStmt(stmts[j + 2]);
                        
                        //加到Block到CFG
                        inputMethod.getBody().getCfg().addBlock(newBlock1);
                        inputMethod.getBody().getCfg().addBlock(newBlock2);
                        inputMethod.getBody().getCfg().addBlock(newBlock3);


                        //原有的Blcok的后继者是block2 和 block3
                        if(!orderBlocks[i].setSuccessorBlock(0, newBlock2)){
                            orderBlocks[i].addSuccessorBlock(newBlock2);
                        }
                        if(!orderBlocks[i].setSuccessorBlock(1, newBlock3)){
                            orderBlocks[i].addSuccessorBlock(newBlock3);
                        }
                        //block1 的后继者是原有block的
                        orderBlocks[i].getSuccessors().forEach(nextBlock =>{
                            newBlock1.addSuccessorBlock(nextBlock);
                        });
                        //原有的Block要删掉之后语句  缺少对应的API 
                        // 在打印端实现逻辑  遇到一个if就不再打印
            
                        //这个新Block2的前者是之前的Blcok 后者是原有block
                        newBlock2.addSuccessorBlock(newBlock1);
                        newBlock2.addPredecessorBlock(orderBlocks[i]);

                        newBlock3.addSuccessorBlock(newBlock1);
                        newBlock3.addPredecessorBlock(orderBlocks[i]);
                       
                        stmts = stmts.slice(0, j);
                        orderBlocks[i].setStmts(stmts);
                        console.log("为在id 为" + orderBlocks[i].getId() 
                        + "的BB后添加" + newBlock1.getId() + " "
                        + newBlock1.getId() + " "
                        + newBlock2.getId() + " " 
                        + newBlock3.getId() + " 三个BB");
                        //console.log(Array.from(inputMethod.getBody().getCfg().getBlocks()));
                    }
                }
            }
        }

    }
    else {
        console.log("该方法没有方法体");
    }

}

export function inferTypes(scene: Scene) {
    scene.getSdkArkFilesMap().forEach(file => {
        ModelUtils.buildGlobalMap(file, scene.sdkGlobalMap);
    });
    scene.filesMap.forEach(file => {
        ModelUtils.getAllClassesInFile(file).forEach(arkClass => {
            TypeInference.inferGenericType(arkClass.getGenericsTypes(),arkClass);
            arkClass.getFields().forEach(arkField => TypeInference.inferTypeInArkField(arkField));
            const defaultArkMethod = arkClass.getDefaultArkMethod();
            if (defaultArkMethod) {
                TypeInference.inferTypeInMethod(defaultArkMethod);
            }
            arkClass.getMethods(true).forEach(arkMethod => TypeInference.inferTypeInMethod(arkMethod));
        });
    });
    scene.getMethodsMap(true);
}

export function inferSimpleTypes(scene: Scene) {

    for (let arkFile of scene.getFiles()) {
        for (let arkClass of arkFile.getClasses()) {
            for (let arkMethod of arkClass.getMethods()) {
                TypeInference.inferSimpleTypeInMethod(arkMethod);
            }
        }
    }
}


// 对于存在的ifcomponent做解析
// 这是个什么 需要例子
export function checkIfComponent(inputMethod: ArkMethod){
    //遍历每一个语句，是否一个赋值语句右边是一个ConditionExpr
    console.log("检查方法:  " + inputMethod.getName() + "  是否含有 if组件");
    if (inputMethod.getBody()){
        let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
        let maxID = blocks.length; 
        // 动态遍历每一个BB
        for (let i: number = 0; i < maxID; i++){
            let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
            // 按照id顺序排列 BB
            let orderBlocks: BasicBlock[] = blocks.sort((a, b) => a.getId() - b.getId());
            let stmts: Stmt[] = orderBlocks[i].getStmts();
            for (let j: number = 0; j < stmts.length; j++){
                if (stmts[j] instanceof ArkAssignStmt){
                    if (stmts[j].getRightOp() instanceof ArkConditionExpr){
                        console.log("语句" + stmts[j] + "含有if组件");
                        //我们把老Block分成两半
                        let newStmts: Stmt[] = stmts.slice(j+1, stmts.length);
                        //创建一个Block
                        let newBlock1 = new BasicBlock();
                        newBlock1.setId(maxID);
                        maxID++;
                        newBlock1.setStmts(newStmts);
                        //新建一个IF语句加到原有Block后面
                        let newIfStmt: ArkIfStmt = new ArkIfStmt(stmts[j].getRightOp());
                        //stmts[j] = newIfStmt;

                        //新建两个BB
                        let newBlock2 = new BasicBlock();
                        newBlock2.setId(maxID);
                        maxID++;
                        let trueBool: Constant = new Constant('true', BooleanType.getInstance());
                        let newAssignStmt1: ArkAssignStmt = new ArkAssignStmt(stmts[j].getLeftOp(), trueBool);
                        newBlock2.addStmt(newAssignStmt1);

                        let newBlock3 = new BasicBlock();
                        newBlock3.setId(maxID);
                        maxID++;
                        let falseBool: Constant = new Constant('false', BooleanType.getInstance());
                        let newAssignStmt2: ArkAssignStmt = new ArkAssignStmt(stmts[j].getLeftOp(), falseBool);
                        newBlock3.addStmt(newAssignStmt2);

                        //加到Block到CFG
                        inputMethod.getBody().getCfg().addBlock(newBlock1);
                        inputMethod.getBody().getCfg().addBlock(newBlock2);
                        inputMethod.getBody().getCfg().addBlock(newBlock3);

                        //原有的Blcok的后继者是block2 和 block3
                        if(!orderBlocks[i].setSuccessorBlock(0, newBlock2)){
                            orderBlocks[i].addSuccessorBlock(newBlock2);
                        }
                        if(!orderBlocks[i].setSuccessorBlock(1, newBlock3)){
                            orderBlocks[i].addSuccessorBlock(newBlock3);
                        }
                        //block1 的后继者是原有block的
                        orderBlocks[i].getSuccessors().forEach(nextBlock =>{
                            newBlock1.addSuccessorBlock(nextBlock);
                        });

                        //这个新Block2 3的前者是之前的Blcok 后者是block1
                        newBlock2.addSuccessorBlock(newBlock1);
                        newBlock2.addPredecessorBlock(orderBlocks[i]);

                        newBlock3.addSuccessorBlock(newBlock1);
                        newBlock3.addPredecessorBlock(orderBlocks[i]);
                       
                        //把原先Block的这句assStmt换成 If
                        stmts[j] = newIfStmt;
                        stmts = stmts.slice(0, j+1);
                        orderBlocks[i].setStmts(stmts);
                        console.log("添加if语句:  " + newIfStmt);
                    }
                    
                }
            }
        }

    }
}

// 这个方法用来 检查一个类里面的 @instance_init 是否 含有this 
// 如果没有的话会被添加 一个名字为this 的local
// instance_init  由constructor调用 
// 在这里还实现了 如果没有 父类 则我们会添加 对于 object.lang.java 的 init 方法的调用

export function checkInstance4this(arkClass: ArkClass){
    console.log("开始检查" + arkClass.getName() + "的实例初始函数@instance_init");

    let instanceMethod: ArkMethod = arkClass.getMethodWithName("@instance_init");
    if (instanceMethod){
        //得到Locals
        let methodBody: ArkBody = instanceMethod.getBody();
        if (methodBody){
            let localsMap: Map<String, Local> = methodBody.getLocals();
            if (!localsMap.has("this")){
                console.log("该类初始方法没有this变量");
                // 新建一个local 
                let thisType: ClassType = new ClassType(instanceMethod.getDeclaringArkClass().getSignature());
                let thisLocal: Local = new Local("this", thisType);
                localsMap.set("this", thisLocal);
                methodBody.setLocals(new Set(localsMap.values()));
                console.log("添加local变量");
            }
            let thisLocal: Local = localsMap.get("this");
            if (!arkClass.getSuperClass()) {
                console.log(arkClass.getName() + 
                "没有父类我们构造一个对java.lang.Object的调用", 3);
                if (arkClass.getMethodWithName("constructor")) {
                    if (arkClass.getMethodWithName("constructor").getBody()) {
                        let stmts: Stmt[] = arkClass.getMethodWithName("constructor").getBody().getCfg().getStmts();
                        let initExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
                        let initStmt: ArkInvokeStmt = new ArkInvokeStmt(initExpr);
                        stmts.splice(0, 0, initStmt);
                        arkClass.getMethodWithName("constructor").getBody().getCfg().getStartingBlock().setStmts(stmts);
                    }
                    else {
                        console.log("该类构造方法没有方法体");
                    }
                }
                else {
                    console.log("该类没有构造方法");
                }
              
            }
        }
    }
    else{
        console.log(arkClass.getName() + "没有实例初始函数");
    }
    let staticMethod: ArkMethod = arkClass.getMethodWithName("@static_init");
    if (staticMethod){
        //得到Locals
        let methodBody: ArkBody = staticMethod.getBody();
        if (methodBody){
            let localsMap: Map<String, Local> = methodBody.getLocals();
            if (!localsMap.has("this")){
                // 新建一个local 
                let thisType: ClassType = new ClassType(staticMethod.getDeclaringArkClass().getSignature());
                let thisLocal: Local = new Local("this", thisType);
                localsMap.set("this", thisLocal);
            }
        }
    }
    else{
        console.log(arkClass.getName() + "没有静态初始函数");
    }
}

// 这个函数很奇怪 
// 遍历所有语句 检查是否有用到但是没有出现在local中的local
// 如果有 我们会把他加到方法中local 集合中
// 这针对的是 缺失local的问题 
export function checkNodeclaredValue(inputMethod: ArkMethod){
    // 遍历一个方法的所有语句
    console.log("检查方法:  " + inputMethod.getName() + "是否有使用到却没有声明的变量");
    if (inputMethod.getBody()){
        if (inputMethod.getBody().getCfg()){
            let localsMap: Map<String, Local> = inputMethod.getBody().getLocals();
            let localsSet: Set<Local> = new Set(localsMap.values());
            // 遍历 所有语句
            // 遍历每个语句用到的value
            for (const stmt of inputMethod.getBody().getCfg().getStmts()){
                let values: Value[] = stmt.getUses();
                for(const value of values){
                    if (value instanceof Local){
                        if (!localsMap.has(value.getName())){
                            localsSet.add(value);
                            console.log("添加变量" + value.getName());
                        }
                    }
                }
                inputMethod.getBody().setLocals(localsSet);
            }          
        }
    }
}



// 这个方法会检查所有if条件语句 有些条件语句是不规范的
// 所谓不规范的语句就是 未知类型 和 未知类型作比较
// 我们会把他变成 addtemp = a.equal(b) 然后再
// 修改原来的ifstmt(addtemp == 0 ) 或者 ==1
// 该问题来自于类型不完善 所以暂时不调用
// 如果有需要在类型检查之后再调用
export function checkIfStmt(inputMethod: ArkMethod) {
    if (inputMethod.getBody()){
        console.log("检查方法:  " + inputMethod.getName() + "的if语句");
        //遍历所有Stmt
        let id: number = 0;
        // 遍历 一个方法里所有的语句
        let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
        for (let j: number = 0; j < blocks.length; j++ ) {
            let stmts: Stmt[] = blocks[j].getStmts();
            let length: number = stmts.length;
            for (let i: number = 0; i < length; i++) {
                if (stmts[i] instanceof ArkIfStmt) {
                    let conditionExpr: ArkConditionExpr = stmts[i].getConditionExprExpr();
                    let op1: Value = conditionExpr.getOp1();
                    let op2: Value = conditionExpr.getOp2();
                    let operator: RelationalBinaryOperator = conditionExpr.getOperator();
                    
                    // ArkConditionExpr 的左右两个值 类型都是未知

                    if (op1.getType() instanceof UnknownType){
                        if (op2.getType() instanceof UnknownType) {
                            // 不经如此 我们还保证每个 操作符是 等于或者不等于
                            if (operator === RelationalBinaryOperator.Equality 
                                || operator === RelationalBinaryOperator.InEquality
                                || operator === RelationalBinaryOperator.StrictEquality
                                || operator === RelationalBinaryOperator.StrictInequality) {
                                    console.log("找到未知条件表达式:  " + + stmts[i].toString());
                                    
                                    //新建一个Local bool类型
                                    let newLocal: Local = new Local("$addTemp" + id.toString(), BooleanType.getInstance());
                                    id++;
                                    //把这个变量加到 这个方法里
                                    let localNameMap: Map<string, Local> = inputMethod.getBody().getLocals();
                                    localNameMap.set(newLocal.getName(), newLocal);
                                    //添加对应的equal Stmt 这是一个virtualinvoke
                                    //建立一个 名为 equals 的方法签名

                                    let equalSubMethodSig: MethodSubSignature = new MethodSubSignature("equals", [], BooleanType.getInstance(), false);
                                    let equalMethodSig: MethodSignature = new MethodSignature(ClassSignature.DEFAULT, equalSubMethodSig);
                                    // 设置一个ArkInstanceInvokeExpr
                                    // 尝试把 返回类型改成boolean
                                    let args: Value[] = [];
                                    args.push(op2);
                                    let newInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(op1, equalMethodSig, args);
                                    // 设置一个assignStmt 把 这个表达式赋值给 newLocal
                                    let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newInvokeExpr);
                                    //构造新的Ifstmt
                                    let newCondExpr: ArkConditionExpr;
                                    if (operator === RelationalBinaryOperator.Equality || operator === RelationalBinaryOperator.StrictEquality) {
                                        //等于则看是否等于1
                                        let const1: Constant = new Constant("1", NumberType.getInstance());
                                        newCondExpr = new ArkConditionExpr(newLocal, const1, RelationalBinaryOperator.Equality);
                                    }
                                    else {
                                        //不等于则看是否等于0
                                        let const0: Constant = new Constant("0", NumberType.getInstance());
                                        newCondExpr = new ArkConditionExpr(newLocal, const0, RelationalBinaryOperator.Equality);
                                    }
                                    let newIfStmt: ArkIfStmt = new ArkIfStmt(newCondExpr); 
                                    //修改原来的BB
                                    stmts[i] = newAssignStmt;
                                    stmts.splice(i+1, 0, newIfStmt);
                                }              
                        }
                    }
                }
                if (stmts[i] instanceof ArkAssignStmt) {
                    //查看右边的的值
                    let rightOp: Value = stmts[i].getRightOp();
                    if (rightOp instanceof ArkNormalBinopExpr) {
                        let op1: Value = rightOp.getOp1();
                        let op2: Value = rightOp.getOp2(); 
                        if ((op1.getType() instanceof StringType 
                        || op2.getType() instanceof StringType)
                        && rightOp.getOperator() === NormalBinaryOperator.Addition) {
                            console.log("修改字符串加法: " + stmts[i].toString());
                            // 保持原有AssStmt不动 把右边换成一个invoke
                            // build 一个instanceInvoke
                            //建立一个 名为 equals 的方法签名
                            let concatSubMethodSig: MethodSubSignature = new MethodSubSignature("concat", [], StringType.getInstance(), false);
                            let concatMethodSig: MethodSignature = new MethodSignature(ClassSignature.DEFAULT, concatSubMethodSig);
                            let args: Value[] = [];
                            args.push(op2);
                            if (op1 instanceof Local) {
                                let newInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(op1, concatMethodSig, args);
                                //build a AssStmt
                                let newAssignStmt2: ArkAssignStmt  = new ArkAssignStmt(stmts[i].getLeftOp(), newInvokeExpr);
                                stmts[i] = newAssignStmt2; 
                            }
                            else if (op1 instanceof Constant) {
                                console.log("额外添加字符变量");
                                //建立一个新的Local 
                                //新建一个Local String
                                let newLocal: Local = new Local("$addTemp" + id.toString(), StringType.getInstance());
                                id++;
                                //把这个变量加到 这个方法里
                                let localNameMap: Map<string, Local> = inputMethod.getBody().getLocals();
                                localNameMap.set(newLocal.getName(), newLocal);
                                //build 一个Assign 
                                let newAssignStmt: ArkAssignStmt  = new ArkAssignStmt(newLocal, op1);
                                //
                                let newInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(newLocal, concatMethodSig, args);
                                //build a AssStmt
                                let newAssignStmt2: ArkAssignStmt  = new ArkAssignStmt(stmts[i].getLeftOp(), newInvokeExpr);
                                stmts[i] = newAssignStmt2; 
                                //把这个newAssignStmt加到 i 前面
                                stmts.splice(i, 0, newAssignStmt);
                            }
                                        
                        }
                    }
                    //这部分负责构造 未知字段引用 
                    if (rightOp instanceof ArkInstanceFieldRef){
                        // 字段签名的 getType() 返回为未知
                        if (rightOp.getType() instanceof UnknownType){
                            console.log("检测到未知实例字段: " + stmts[i].toString());
                            console.log("右边的变量: " + rightOp.toString() + "类型: " + rightOp.getType());
                            let base: Local = rightOp.getBase();
                            if (base) {
                                console.log("base: " + base.toString() + "类型: " + base.getType());
                                //我们专门为他们构造一个get 方法
                                //推导左侧值的类型作为我们的返回类型
                                let returnType: Type = UnknownType.getInstance();
                                let leftOp: Value = stmts[i].getLeftOp();
                                //到这个方法里的变量里去找这个Local
                                let leftLocal: Local = inputMethod.getBody().getLocals().get(leftOp.getName());
                                if (leftLocal) {
                                    let usedStmts: Stmt[] = leftLocal.getUsedStmts();
                                    //遍历每个Stmt 我们要知道 Local的类型
                                    for (let h: number = 0; h < usedStmts.length; h++) {                                      
                                        if (returnType instanceof UnknownType) {
                                            //得到类型名
                                            returnType = inferLocalinStmt(leftLocal, usedStmts[h]);                                                                                                                      
                                        }
                                    }
                                }
                                else {
                                    console.log("不存在本地变量: " + leftOp.getName());
                                }
                                let fieldName: string = rightOp.getFieldName();
                                console.log("字段名称: " + fieldName);
                                const num = parseInt(fieldName);
                                let ifNumberIndex: Boolean = false;
                                let arg: Value;
                                if (!isNaN(num)) {
                                    console.log("这是一个数组的数字索引");
                                    ifNumberIndex = true;
                                    arg = new Constant(fieldName, NumberType.getInstance());    
                                }
                                    //是否是一个Local 
                                else {
                                    let localIndex: Local = inputMethod.getBody().getLocals().get(fieldName);
                                    if (localIndex) {
                                        console.log("存在一个变量" + fieldName + "类型" + localIndex.getType());
                                        if (localIndex.getType() instanceof NumberType) {
                                            console.log("这是一个数组的数字索引");
                                            ifNumberIndex = true;
                                            arg = localIndex;
                                        }
                                    }

                                }
                                if (ifNumberIndex) {
                                    //构造一个Instance
                                    //virtualinvoke $stack3.<java.util.ArrayList: java.lang.Object get(int)>(1);
                                    // build methodSubSig
                                    let newGetSubSig: MethodSubSignature = new MethodSubSignature("get", [], returnType, false);
                                    // build a new classSig
                                    let newClassSig: ClassSignature = new ClassSignature("java.util.ArrayList", FileSignature.DEFAULT);
                                    //let newGetSig:                                        
                                    let newMethodSig: MethodSignature = new MethodSignature(newClassSig, newGetSubSig); 
                                    let args: Value[] = [];
                                    args.push(arg);
                                    let newInsInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(base, newMethodSig, args);
                                    let newAssignStmt: ArkAssignStmt  = new ArkAssignStmt(stmts[i].getLeftOp(), newInsInvokeExpr);
                                    stmts[i] = newAssignStmt;
                                    console.log("修改了数组索引: " + stmts[i]);
                                }
                                //不是数字索引 那就变成字段
                                else {
                                    //有关于length 的
                                    if (fieldName === "length" && (base.getType().getName() === "Array") ) {
                                        //l3 = virtualinvoke $stack4.<java.util.ArrayList: int size()>();
                                        let newGetSubSig: MethodSubSignature = new MethodSubSignature("size", [], returnType, false);
                                        // build a new classSig
                                        let newClassSig: ClassSignature = new ClassSignature("java.util.ArrayList", FileSignature.DEFAULT);
                                        //let newGetSig:                                        
                                        let newMethodSig: MethodSignature = new MethodSignature(newClassSig, newGetSubSig); 
                                        let newInsInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(base, newMethodSig, []);
                                        let newAssignStmt: ArkAssignStmt  = new ArkAssignStmt(stmts[i].getLeftOp(), newInsInvokeExpr);
                                        stmts[i] = newAssignStmt;
                                        console.log("用size()表示数组的长度: " + stmts[i]);
                                    }
                                    //不是length属性便是普通字段
                                    else {
                                        // 如果base 确实是 一个classtype我们可以先去那个 class里找一下对应字段
                                        // if (base.getType() instanceof ClassType) {
                                        //     let classSig: ClassSignature = base.getType().getClassSignature();
                                        //     //从scene里找 但目前这个函数看不到scene 统一是object
                                        // }
                                        //构建字段引用
                                        let newFieldSig: FieldSignature = new FieldSignature( fieldName, ClassSignature.DEFAULT, returnType, false);
                                        let newFildRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(base, newFieldSig);
                                        let newAssignStmt: ArkAssignStmt  = new ArkAssignStmt(stmts[i].getLeftOp(), newFildRef);
                                        stmts[i] = newAssignStmt;
                                        console.log("修改未知字段引用: " + stmts[i]);
                                    }

                                }   
                                                                 
                            }
                            else {
                                console.log("不存在base");
                            }
                        
                        }
                    }
                }
            }
            blocks[j].setStmts(stmts);
        }
    }
}

export function checkStaticInvoke4Method(inputMethod: ArkMethod) {
    let logger: Logger = new Logger();
    if (inputMethod.getBody()){
        inputMethod.getCfg().getStmts().forEach(stmt => {
            if (stmt.containsInvokeExpr()) {
                if (stmt.getInvokeExpr() instanceof ArkStaticInvokeExpr) {
                    checkStaticInvoke(stmt, inputMethod, logger);
                }
            }
        });

    }
}

//这个类用作检查一个项目的类型

class TypeChecker{

    public scene: Scene;
    public logger: Logger2;
    // 这个map保存着已经检查过的方法签名
    public checkedMethods: Map<String, MethodSignature>;
    // 这个map保存着需要检查的方法签名
    public toCheckMethods: Map<String, MethodSignature>;
    
    constructor(scene: Scene) {
        this.scene = scene;
        this.logger = new Logger2("logfile");
        this.checkedMethods = new Map();
        this.toCheckMethods = new Map();
        // 遍历所有的 方法 全部加到 待检查的map里
        this.getFiles().forEach(file => {
            ModelUtils.getAllClassesInFile(file).forEach(arkClass => {
                checkInstance4this(arkClass);
                arkClass.getMethods(true)
                .forEach(arkMethod =>{
                    this.addToNoChecked(arkMethod);
                });
            });
        });
    }
    //得到所有的文件
    public getFiles(): ArkFile[] {
        return this.scene.getFiles();
    }

	// 遍历所有语句 检查是否有用到但是没有出现在local中的local
	// 如果有 我们会把他加到方法中local 集合中
	// 这针对的是 缺失local的问题 
	public checkNodeclaredValue(inputMethod: ArkMethod, logger: Logger2, loggerLevel: number){
		// 遍历一个方法的所有语句
		logger.log("检查方法:  " + inputMethod.getName() + "是否有使用到却没有声明的变量", loggerLevel);
		if (inputMethod.getBody()){
			if (inputMethod.getBody().getCfg()){
				let localsMap: Map<String, Local> = inputMethod.getBody().getLocals();
				let localsSet: Set<Local> = new Set(localsMap.values());
				// 遍历 所有语句
				// 遍历每个语句用到的value
				for (const stmt of inputMethod.getBody().getCfg().getStmts()){
					let values: Value[] = stmt.getUses();
					for(const value of values){
						if (value instanceof Local){
							if (!localsMap.has(value.getName())){
								localsSet.add(value);
								logger.log("添加变量" + value.getName(), loggerLevel);
							}
						}
					}
					inputMethod.getBody().setLocals(localsSet);
				}          
			}
		}
	}


    // 这个是检查类型的总方法
    public checkType() {
        this.scene.inferType();
        // 调用自带的类型推断
        this.logger.log("开始对项目进行类型检查", 0);
        this.logger.log("------------------------------", 0);
        // 构建一个文件 用来装 函数接口
        buildFunctionInterface(this.scene);
        let files: ArkFile[] = this.scene.getFiles();
        // 开始遍历每个文件
        files.forEach(file => {
        this.logger.log("开始检查文件" + file.getName(), 1);
        // 开始遍历所有 类
        ModelUtils.getAllClassesInFile(file).forEach(arkClass => {
            this.logger.log("开始检查类" + arkClass.getName(), 1);
            // 检查instance_init方法 是否有包含 this 变量
            checkInstance4this(arkClass);
            // 开始遍历方法
            arkClass.getMethods(true).forEach(arkMethod =>{
                checkType4AMethod(arkMethod, arkClass, this.scene, this.logger, 3);
            });
        });
    });
    }

	// 这个方法 遍历所有语句 查看语句中的所有值
	
    public checkType4Stmts(arkMethod: ArkMethod, arkClass: ArkClass, loggerLevel: number, isAnonymous: boolean) {
        if (arkMethod.getBody()) {
            if (arkMethod.isAnonymousMethod() && !isAnonymous) {
                this.logger.log("方法: " + arkMethod.getName() + "是一个匿名方法 加入到待检查区", loggerLevel);
                this.addToNoChecked(arkMethod);
                return;
            }
            let fullChecked: boolean = true;
            let localsMap: Map<string, Local> = arkMethod.getBody().getLocals();
            this.logger.log("对方法: " + arkMethod.getName() + " 语句逐句类型检测", loggerLevel);
            // 还是逐个BB查找
            let blocks: BasicBlock[] = Array.from(arkMethod.getBody().getCfg().getBlocks());
            blocks.forEach(block => {
                this.logger.log("检查BB id: " + block.getId(), loggerLevel + 1);
                let stmts: Stmt[] = block.getStmts();
                stmts.forEach(stmt => {
                    this.logger.log("检查语句 : " + stmt, loggerLevel + 1);
                    // 遍历这个语句 使用的value
                    let values: Value[] = stmt.getUses();
                    // 对于这个value 
                    this.logger.log("语句包含值 : " + values, loggerLevel + 2);
                    // 遍历Value
                    values.forEach(value => {
                        if (fullChecked) {
                            this.logger.log("检查值 : " + value, loggerLevel + 3);
                            // 如果是一个 local
                            if (value instanceof Local) {
                                let localType: Type = value.getType();
                                this.logger.log("检查值 : " + value + "是一个local 类型是" + localType, loggerLevel + 4);
                                // 检查这个 变量是否在local里
                                if (!localsMap.has(value.getName())) {
                                    this.logger.log("值 : " + value + "没有在该方法集合中发现", loggerLevel + 5);
                                    this.logger.log("把方法: " + arkMethod.getName() + "加到需要待定集合中", loggerLevel + 5);
                                }
                                else {
                                    this.logger.log("值 : " + value + "在方法集合中", loggerLevel + 5);
                                    // 我们用集合中的Local来替代这个
                                    stmt.replaceUse(value, localsMap.get(value.getName()));
                                    value = localsMap.get(value.getName());
                                    // 检查是否为一个函数类型
                                    if (value.getType instanceof FunctionType) {
                                        this.logger.log("值 : " + value + "是一个函数类型 所致方法为" + value.getType.getMethodSignature(), loggerLevel + 5);
                                        // 看是否函数方法已经被分析过了
                                        //在scene中 利用得到的 Sig 来搜索对应方法 
                                        let funcSig: MethodSignature = value.getType().getMethodSignature();
                                        if (this.checkedMethods.has(this.genKey(funcSig))) {
                                            this.logger.log("我们已经检查过了方法: " + funcSig);
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
            this.logger.log("方法: " + arkMethod.getName() + "没有方法体", loggerLevel)
        }
    }

    public genKey(methodSig1: MethodSignature):string {
        let key: string = "";
        key += methodSig1.getDeclaringClassSignature().getClassName();
        key += "." + methodSig1.getMethodSubSignature().getMethodName();
        
        return key;
    }

    // 这是一个 检查一个方法类型的总方法
    // 分为两种模式 是否作为 函数方法检查 和 普通方法检查
    // 我们检查完成一个方法后 会把它从待检测去掉 加到已经检查
    // 同时我们还会更新他的 方法签名
    public checkMethod(arkMethod: ArkMethod, arkClass: ArkClass, ifAnony: boolean, loggerLevel: number, callerMethod?:ArkMethod): boolean{
        if (this.methodChecked(arkMethod)) {
            this.logger.log("方法" + arkMethod.getName() + "已经被检查过", loggerLevel);
            return true;
        }
		// 普通方法的模式
        if (!ifAnony) {
            this.logger.log("方法模式: 开始检查方法: " + arkMethod.getName(), loggerLevel);
            if (arkMethod.isAnonymousMethod) {
                this.logger.log("方法是匿名的跳过", loggerLevel + 1);
                return false;
            }
            // 先检查控制流
            // 1 检查三元表达式
            this.checkControlFlow(arkMethod, this.logger, loggerLevel + 1);
            
            // 2 检查if 组件
            this.checkIfComponent(arkMethod, this.logger, loggerLevel + 1);
            
            //检查是否有使用了但没有在方法中的变量
            this.checkNodeclaredValue(arkMethod,this.logger,loggerLevel+1);

			// 检查该方法内的local是否有函数类型
			// 遍历所有 local 如果有local 我们会去检查
			this.checkFunctionType4Method(arkMethod, arkClass, loggerLevel+1);

			// 检查 所有的 value  
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
				checkControlFlow(arkMethod);
				// 2 检查if 组件
				checkIfComponent(arkMethod);
				
				//检查是否有使用了但没有在方法中的变量
				this.checkNodeclaredValue(arkMethod,this.logger,loggerLevel+1);
				
			}
        }
        

    }

    public checkIfComponent(inputMethod: ArkMethod, logger: Logger2, loggerLevel: number){
        //遍历每一个语句，是否一个赋值语句右边是一个ConditionExpr
        logger.log("检查方法:  " + inputMethod.getNmae() + "  是否含有 if组件", loggerLevel);
        if (inputMethod.getBody()){
            let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
            let maxID = blocks.length; 
            // 动态遍历每一个BB
            for (let i: number = 0; i < maxID; i++){
                let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
                // 按照id顺序排列 BB
                let orderBlocks: BasicBlock[] = blocks.sort((a, b) => a.getId() - b.getId());
                let stmts: Stmt[] = orderBlocks[i].getStmts();
                for (let j: number = 0; j < stmts.length; j++){
                    if (stmts[j] instanceof ArkAssignStmt){
                        if (stmts[j].getRightOp() instanceof ArkConditionExpr){
                            logger.log("语句" + stmts[j] + "含有if组件", loggerLevel + 1);
                            //我们把老Block分成两半
                            let newStmts: Stmt[] = stmts.slice(j+1, stmts.length);
                            //创建一个Block
                            let newBlock1 = new BasicBlock();
                            newBlock1.setId(maxID);
                            maxID++;
                            newBlock1.setStmts(newStmts);
                            //新建一个IF语句加到原有Block后面
                            let newIfStmt: ArkIfStmt = new ArkIfStmt(stmts[j].getRightOp());
                            //stmts[j] = newIfStmt;
    
                            //新建两个BB
                            let newBlock2 = new BasicBlock();
                            newBlock2.setId(maxID);
                            maxID++;
                            let trueBool: Constant = new Constant('true', BooleanType.getInstance());
                            let newAssignStmt1: ArkAssignStmt = new ArkAssignStmt(stmts[j].getLeftOp(), trueBool);
                            newBlock2.addStmt(newAssignStmt1);
    
                            let newBlock3 = new BasicBlock();
                            newBlock3.setId(maxID);
                            maxID++;
                            let falseBool: Constant = new Constant('false', BooleanType.getInstance());
                            let newAssignStmt2: ArkAssignStmt = new ArkAssignStmt(stmts[j].getLeftOp(), falseBool);
                            newBlock3.addStmt(newAssignStmt2);
    
                            //加到Block到CFG
                            inputMethod.getBody().getCfg().addBlock(newBlock1);
                            inputMethod.getBody().getCfg().addBlock(newBlock2);
                            inputMethod.getBody().getCfg().addBlock(newBlock3);
    
                            //原有的Blcok的后继者是block2 和 block3
                            if(!orderBlocks[i].setSuccessorBlock(0, newBlock2)){
                                orderBlocks[i].addSuccessorBlock(newBlock2);
                            }
                            if(!orderBlocks[i].setSuccessorBlock(1, newBlock3)){
                                orderBlocks[i].addSuccessorBlock(newBlock3);
                            }
                            //block1 的后继者是原有block的
                            orderBlocks[i].getSuccessors().forEach(nextBlock =>{
                                newBlock1.addSuccessorBlock(nextBlock);
                            });
    
                            //这个新Block2 3的前者是之前的Blcok 后者是block1
                            newBlock2.addSuccessorBlock(newBlock1);
                            newBlock2.addPredecessorBlock(orderBlocks[i]);
    
                            newBlock3.addSuccessorBlock(newBlock1);
                            newBlock3.addPredecessorBlock(orderBlocks[i]);
                           
                            //把原先Block的这句assStmt换成 If
                            stmts[j] = newIfStmt;
                            stmts = stmts.slice(0, j+1);
                            orderBlocks[i].setStmts(stmts);
                            logger.log("添加if语句:  " + newIfStmt, loggerLevel + 1);
                        }
                        
                    }
                }
            }
    
        }
    }

    public checkControlFlow(inputMethod: ArkMethod, logger: Logger2, loggerLevel: number){
        logger.log("开始检查方法是否含有三元表达式", loggerLevel);
        if (inputMethod.getBody()){
            // 得到有BB
            let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
            let maxID = blocks.length; 
            for (let i: number = 0; i < maxID; i++){
                let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
                let orderBlocks: BasicBlock[] = blocks.sort((a, b) => a.getId() - b.getId());
                
                let stmts: Stmt[] = orderBlocks[i].getStmts();
                for (let j: number = 0; j < stmts.length; j++){
                    if (stmts[j] instanceof ArkIfStmt && j != stmts.length - 1){
                        //我们要创建新的BB 且要收集后两个赋值语句
                        //ifstmt       
                        //assign
                        if (stmts[j + 1] instanceof ArkAssignStmt &&
                            stmts[j + 2] instanceof ArkAssignStmt
                        ){
                            logger.log("在id 为" + orderBlocks[i].getId() 
                            + "的BB中找到三元表达式", loggerLevel+1);
                            logger.log(stmts[j], loggerLevel+2);
                            logger.log(stmts[j+1], loggerLevel+2);
                            logger.log(stmts[j+2], loggerLevel+2);
                            //把原有的Blcok分成两半 
                            
                            //原有的Block  0123 4 5  67
                            let newStmts: Stmt[] = stmts.slice(j+3, stmts.length);
                            //创建一个Block
                            let newBlock1 = new BasicBlock();
                            newBlock1.setId(maxID);
                            maxID++;
                            newBlock1.setStmts(newStmts);
    
                            let newBlock2 = new BasicBlock();
                            newBlock2.setId(maxID);
                            maxID++;
                            newBlock2.addStmt(stmts[j + 1]);
    
                            let newBlock3 = new BasicBlock();
                            newBlock3.setId(maxID);
                            maxID++;
                            newBlock3.addStmt(stmts[j + 2]);
                            
                            //加到Block到CFG
                            inputMethod.getBody().getCfg().addBlock(newBlock1);
                            inputMethod.getBody().getCfg().addBlock(newBlock2);
                            inputMethod.getBody().getCfg().addBlock(newBlock3);
    
    
                            //原有的Blcok的后继者是block2 和 block3
                            if(!orderBlocks[i].setSuccessorBlock(0, newBlock2)){
                                orderBlocks[i].addSuccessorBlock(newBlock2);
                            }
                            if(!orderBlocks[i].setSuccessorBlock(1, newBlock3)){
                                orderBlocks[i].addSuccessorBlock(newBlock3);
                            }
                            //block1 的后继者是原有block的
                            orderBlocks[i].getSuccessors().forEach(nextBlock =>{
                                newBlock1.addSuccessorBlock(nextBlock);
                            });
                            //原有的Block要删掉之后语句  缺少对应的API 
                            // 在打印端实现逻辑  遇到一个if就不再打印
                
                            //这个新Block2的前者是之前的Blcok 后者是原有block
                            newBlock2.addSuccessorBlock(newBlock1);
                            newBlock2.addPredecessorBlock(orderBlocks[i]);
    
                            newBlock3.addSuccessorBlock(newBlock1);
                            newBlock3.addPredecessorBlock(orderBlocks[i]);
                           
                            stmts = stmts.slice(0, j);
                            orderBlocks[i].setStmts(stmts);
                            logger.log("为在id 为" + orderBlocks[i].getId() 
                            + "的BB后添加" + newBlock1.getId() + " "
                            + newBlock1.getId() + " "
                            + newBlock2.getId() + " " 
                            + newBlock3.getId() + " 三个BB"+  loggerLevel+1);
                            //console.log(Array.from(inputMethod.getBody().getCfg().getBlocks()));
                        }
                    }
                }
            }
    
        }
        else {
            logger.log("该方法没有方法体", loggerLevel);
        }
    
    }


	// 这个方法检查 方法中是否有函数类型变量
	public checkFunctionType4Method(inputMethod: ArkMethod, inputClass: ArkClass, loggerLevel: number){
		this.logger.log("检查方法: " + inputMethod.getName() + "是否有函数类型变量", loggerLevel);
		let localsMap: Map<string, Local> = inputMethod.getBody().getLocals();
        // 遍历有没有functiontype
        let locals: Local[] =  Array.from(localsMap.values());
        locals.forEach((local) => {
            if ( local.getType() instanceof FunctionType) {
                this.logger.log("在类: " + inputClass.getName() + " 方法: " + 
                    inputMethod.getName() + "中发现函数类型变量: " + local.getName(), loggerLevel + 1); 
                let funcSig: MethodSignature = local.getType().getMethodSignature();
                let funcMethod: ArkMethod = this.scene.getMethod(funcSig);
                if (funcMethod) {
					this.logger.log("我们在项目中发现了所指的方法", loggerLevel + 1);
					// 是否该方法已经被检查
					if (this.methodChecked(funcMethod)) {
						this.logger.log("该方法已经被检查", loggerLevel + 2);
					}
					// 如果没有被检查则检查 函数方法
					else {
						 // 把这个方法的修饰符设置成 public static
						funcMethod.setModifiers(20);
						if (funcMethod.getBody()) {
							this.logger.log("该方法有方法体", loggerLevel + 1);
							// 如果方法没有被检查我们需要调用方法检查
							this.checkMethod(funcMethod, funcMethod.getDeclaringArkClass, true, loggerLevel + 2, inputMethod);
							// 我们假设在经历过检查之后 函数方法的类型 包括签名已经完备
							funcSig = funcMethod.getSignature();
							let inputTypes: Type[] = parseFunSigMustInputTypes(funcSig);
							let returnType: Type = funcSig.getMethodSubSignature().getReturnType();
							//funcSig = funcMethod.getSignature();
							this.logger.log("函数方法输入类型是" + inputTypes, loggerLevel + 1);
							this.logger.log("函数方法输出类型是" + returnType, loggerLevel + 1);
							// 接下来我们会为他构造一个函数接口
							// 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
							const funcInterFaceFileSignature = new FileSignature(this.scene.getProjectName(), 'funcInterfaceFile');
							let interfaceFile: ArkFile = this.scene.getFile(funcInterFaceFileSignature);
							if (interfaceFile) {
								this.logger.log("找到 函数接口文件 开始构造函数对应接口", loggerLevel + 2);
								// 根据输入和输出信息来寻找是否已经存在对应的接口
								let funcType: string;
								let inputTypesString: string = "";
								let returnTypesString: string = "";
								let interfaceName: string = "";
								// 如果没有输入 也没有 输出 (void) 那就归为 Runnable
								if (inputTypes.length === 0 && returnType instanceof VoidType) {
									funcType = "Runnable";
									interfaceName = funcType;
								}
								// 至少有 一个输入或者输出 我们统一构造为一个输入类型1+2+输出类型+Function的接口
								else {
									funcType = "Function";
									if (inputTypes.length === 0) {
										inputTypesString = "void";
									}
									else {
										inputTypes.forEach(type => {
											inputTypesString += type.toString();
										});
									}
									returnTypesString = returnType.toString();
									interfaceName = inputTypesString + "To" + returnTypesString + funcType;
								   
								}
								this.logger.log("构造的接口名字为: " + interfaceName, loggerLevel + 2);
								// 在这个文件里 搜索 有没有和 接口名同名的方法 没有就构造一个
								if (interfaceFile.getClassWithName(interfaceName)) {
									this.logger.log("接口文件中 已有 对应的接口类", loggerLevel + 2);
								}
								// 构造对应接口类
								else {
									this.logger.log("接口文件中 没有 对应的接口类", loggerLevel + 2);
									// 开始构造 对应的类
									const interFaceClass = new ArkClass();
									interFaceClass.setDeclaringArkFile(interfaceFile);
									const interFaceClassSignature = new ClassSignature( interfaceName,
									interFaceClass.getDeclaringArkFile().getFileSignature(), interFaceClass.getDeclaringArkNamespace()?.getSignature() || null);
									interFaceClass.setSignature(interFaceClassSignature);
									// 把类的 类别设置为接口
									interFaceClass.setCategory(ClassCategory.INTERFACE);
									interfaceFile.addArkClass(interFaceClass);
		
									// 开始构造方法  没有方法体 且 修饰符为 public abstract
									// 方法名统一设置为 apply
									let interfaceMethod: ArkMethod = new ArkMethod();
									interfaceMethod.setDeclaringArkClass(interFaceClass);
		
									// 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
									let interfaceMethodSubSig: MethodSubSignature = 
										new MethodSubSignature('apply', 
											funcSig.getMethodSubSignature().getParameters(),
											returnType,
											false
										);
								
									let interfaceMethodSignature = new MethodSignature(interfaceMethod.getDeclaringArkClass().getSignature(),
										interfaceMethodSubSig);
									interfaceMethod.setSignature(interfaceMethodSignature);
									// 设置修饰符
									interfaceMethod.setModifiers(36);
									interFaceClass.addMethod(interfaceMethod);
									this.logger.log("接口方法构造完成: " + interfaceMethodSignature, loggerLevel + 2);
								}
								// 接口构造完成 开始构造 生成语句
								// 首先我们先遍历这个方法的 语句 看这个函数Local是否出现在 赋值的左边
								// 遍历所有的 BB
								let ifNeedGenFunction: Boolean = true;
								// 遍历这个Local的使用的语句
								inputMethod.getBody().getCfg().getStmts().forEach((stmt) => {
									if (stmt instanceof ArkAssignStmt) {
										if (stmt.getLeftOp().getType() instanceof FunctionType) {
											if (stmt.getLeftOp().getType().getMethodSignature().isMatch(funcSig)) {
												ifNeedGenFunction = false;
											}                                   
										}
									}
								});
								// 构造函数类
								let bootstrapSig: MethodSignature = this.createFunctionClass(funcSig, loggerLevel + 2);
								// 构建创造函数语句
								if (ifNeedGenFunction) {
									let firstUse: boolean = true;
									this.logger.log("没有找到函数变量的赋值语句 开始遍历所有语句找到合适插入位置", loggerLevel + 1);
										if (inputMethod.getBody()) {
											let basicBlocks:Set<BasicBlock> = inputMethod.getBody().getCfg().getBlocks();
											// 这里我们暂时认定 遍历顺序就是 执行顺序
											// TODO 按照真正的执行顺序遍历语句	
											basicBlocks.forEach(block => { 
												if (firstUse) {
													let stmts: Stmt[] = block.getStmts();
													for (let i: number = 1; i < stmts.length; i++) {
														//找到第一次使用的位置并且插入
														let values: Value[] = stmts[i].getUses();
														values.forEach((value) => {
															if (value.getType() instanceof FunctionType && firstUse) {
																if (value.getType().getMethodSignature().isMatch(funcSig)) {
																	this.logger.log("找到函数使用",loggerLevel + 2);
																	this.logger.log("在语句: " + stmts[i] + "之前开始构建函数生成语句", loggerLevel + 2);
																	// 生成一个静态调用语句  输入为 可选参数
																	if (bootstrapSig) {
																		let paras: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
																		let args: Local[] = [];
																		for (let i: number = 0; i < paras.length; i++) {
																			if (paras[i].isOptional()) {																					let arg: Local = new Local(paras[i].getName(), paras[i].getType());
																					args.push(arg);
																			}
																			else{
																				break;
																			}
																		}
																			
																		let newStaticInvokeExpr: ArkStaticInvokeExpr = new ArkStaticInvokeExpr(bootstrapSig, args);
																		let genStmt: ArkAssignStmt = new ArkAssignStmt(value, newStaticInvokeExpr);
																		genStmt.setCfg(inputMethod.getBody().getCfg());
																		stmts.splice(i, 0, genStmt);
																		block.setStmts(stmts);
																		this.logger.log("成功构建语句" + genStmt, loggerLevel + 3);
																		firstUse = false;
																	}
																	else {
																		this.logger.log("警告!!!!!  没有找到生成的函数类", loggerLevel + 2);
																	}
																}
																}
														});
													}                                           
												}                                   
											});
										}
										else {
											this.logger.log("警告!!!!:   没有找到" + inputMethod.getSignature() + " 方法体", loggerLevel + 1);
										}
										
								}								
							}
						}		
						

					}
				}
                    
            }
        });
        	
	}

	//这个方法用来为每个 函数 产生一个具体实现的类
	//我们现在拥有一个 methodSig 其中 可选的参数表示需要捕捉和输入的参数 必选的参数表示一定要有的
	public createFunctionClass(methodSig: MethodSignature, loggerLevel: number): MethodSignature|null {
		// 类的名字 方法的全局名字 + $
		let declaredClassSig: ClassSignature = methodSig.getDeclaringClassSignature();
		let className: string = methodSig.getMethodSubSignature().getMethodName();
		className = declaredClassSig.toString() + "." + className + "$";
		this.logger.log("开始构造函数类:" + className, loggerLevel + 1);
		// 开始构造类 这个类我们沿用 之前
		// 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
		const funcInterFaceFileSignature = new FileSignature(this.scene.getProjectName(), 'funcInterfaceFile');
		let interfaceFile: ArkFile = this.scene.getFile(funcInterFaceFileSignature);
		if (interfaceFile) {
			this.logger.log("找到 函数接口文件 接下来开始构造函数类", loggerLevel + 1);
			const funcClass = new ArkClass();
			funcClass.setDeclaringArkFile(interfaceFile);
			const funcClassSignature = new ClassSignature( className,
				funcClass.getDeclaringArkFile().getFileSignature(), funcClass.getDeclaringArkNamespace()?.getSignature() || null);
				funcClass.setSignature(funcClassSignature);
			// 把类的 类别设置为类
			funcClass.setCategory(ClassCategory.CLASS);
			interfaceFile.addArkClass(funcClass);
			this.logger.log("开始构造函数类:" + className, loggerLevel + 1);
			// 不用设置 修饰符 因为我们的 printer 默认public
			// 开始构造字段
			// 得到 可选类型
			this.logger.log("开始构造字段", loggerLevel + 2);
			let optionalTypes: Type[] = parseFunSigOptionalInputTypes(methodSig);
			let filedIndex: number = 0;
			optionalTypes.forEach(type => {
				let newField: ArkField = new ArkField();
				newField.setCategory(FieldCategory.PROPERTY_DECLARATION);
				newField.setDeclaringArkClass(funcClass);
				// 创建字段签名
				let fieldName: string = "cap" + filedIndex;
				filedIndex++;
				let newFieldSig: FieldSignature = new FieldSignature( fieldName, funcClassSignature, type, false);
				newField.setSignature(newFieldSig);
				// 添加到类里面
				funcClass.addField(newField);
				this.logger.log("构造字段: " + fieldName, loggerLevel + 3);
			});
			// 开始构造方法
			
			// 1. 开始构造<init>
			let initMethod: ArkMethod = new ArkMethod();
			initMethod.setDeclaringArkClass(funcClass);
	
			// 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
			// 创建一个新 方法签名  输入类型和 bootstrap 一样都是可选类型 返回类型是 void
			// 构建参数列表
			let initParameters: MethodParameter[] = [];
			let paraindex: number = 0;
			optionalTypes.forEach(type => {
				let newPara = new MethodParameter();
				newPara.setName("$r" + paraindex);
				newPara.setType(type);
				newPara.setOptional(false);
				initParameters.push(newPara);
				paraindex++;
			});
	
			// 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
			// 我们从外部得到这个类型
			let initMethodSubSig: MethodSubSignature = 
				new MethodSubSignature('<init>', 
					initParameters,
					VoidType.getInstance(), false);
							
			let initMethodSignature = new MethodSignature(initMethod.getDeclaringArkClass().getSignature(),
				initMethodSubSig);
			initMethod.setSignature(initMethodSignature);
			// 设置修饰符 init 的修饰符为 public 
			initMethod.setModifiers(4);
			funcClass.addMethod(initMethod);
	
			// 开始构造方法体
			// 构造CFG
			let newCfg: Cfg = new Cfg();
			// 构造BB 
			let newInitBB: BasicBlock = new BasicBlock();
			let stmts: Stmt[] = [];
			// 构造 local set 和 local array
			let localSet: Set<Local>;
			let localArray: Local[] = [];
			let i = 0;
			// 把 参数构造成 Local
			initParameters.forEach( (para)=> {
				let newLocal: Local = new Local(para.getName(), para.getType());
				localArray.push(newLocal);
				// 构造参数赋值语句
				let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
				let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
				newAssignStmt.setCfg(newCfg);
				stmts.push(newAssignStmt);
				i++;
			});
			
			
			// 这部分在 参数赋值之后构造
			// 添加变量 指向自己类实例的变量 
			let thisType: ClassType = new ClassType(funcClassSignature);
			let thisLocal: Local = new Local("this", thisType);
			localArray.push(thisLocal);
			
			// 添加一个 this 赋值语句
			let newThisRef: ArkThisRef = new ArkThisRef(thisType);
			let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(thisLocal, newThisRef);
			newAssignStmt.setCfg(newCfg);
			stmts.push(newAssignStmt);
	
			// 加一个调用 java.lang.Object 的 <init>语句
			// 需要构造一个 MethodSignature
			let initExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
			let initStmt: ArkInvokeStmt = new ArkInvokeStmt(initExpr);
			initStmt.setCfg(newCfg);
			stmts.push(initStmt);
	
			// 输入参数 和 字段匹配 赋值
			for (let j: number = 0; j < localArray.length - 1; j++) {
				//得到对应字段
				let field: ArkField = funcClass.getFieldWithName("cap" + j);
				if (field) {
					let fieldSig: FieldSignature = field.getSignature();
					
					let newFieldRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(thisLocal, fieldSig);
					newAssignStmt = new ArkAssignStmt(newFieldRef, localArray[j]);
					newAssignStmt.setCfg(newCfg);
					stmts.push(newAssignStmt);
				}
				else {
					this.logger.log("!!!!!警告: 没有找到字段" + "cap" + j, loggerLevel + 3);
				}
				
	
			}
	
			//添加返回语句
			let returnVoidStmt:ArkReturnVoidStmt  = new ArkReturnVoidStmt();
			returnVoidStmt.setCfg(newCfg);
			stmts.push(returnVoidStmt);
			newInitBB.setStmts(stmts);
			
			newCfg.setStartingStmt(stmts[0]);
			newCfg.addBlock(newInitBB);
			localSet = new Set(localArray);
			// 构建Body
			let newBody: ArkBody = new ArkBody(localSet, newCfg);
			initMethod.setBody(newBody);
	
	
			// 2. bootstrap$方法 
			let bootstrapMethod: ArkMethod = new ArkMethod();
			bootstrapMethod.setDeclaringArkClass(funcClass);
	
			// 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
			// 创建一个新 方法签名
			// 构建参数列表
			let bootstrapParameters: MethodParameter[] = [];
			paraindex = 0;
			optionalTypes.forEach(type => {
				let newPara = new MethodParameter();
				newPara.setName("$r" + paraindex);
				newPara.setType(type);
				newPara.setOptional(false);
				bootstrapParameters.push(newPara);
				paraindex++;
			});
	
			// 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
			// 我们 根据得到的 方法签名构造一个
			let funcType: FunctionType = new FunctionType(methodSig);
			let bootstrapMethodSubSig: MethodSubSignature = 
				new MethodSubSignature('bootstrap$', 
					bootstrapParameters,
					funcType, true);
							
			let bootstrapMethodSignature: MethodSignature = new MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(),
				bootstrapMethodSubSig);
			bootstrapMethod.setSignature(bootstrapMethodSignature);
			// 设置修饰符 bootstrapMethod 的修饰符为 public static
			bootstrapMethod.setModifiers(20);
			// 开始构造方法体
			// 构造BB 
			newCfg = new Cfg();
			let newBootStrapBB: BasicBlock = new BasicBlock();
			stmts = [];
			// 构造 local set
			localArray = [];
			localSet = new Set<Local>();
			i = 0;
			bootstrapParameters.forEach( (para)=> {
				let newLocal: Local = new Local(para.getName(), para.getType());
				localArray.push(newLocal);
				// 构造参数赋值语句
				let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
				let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
				newAssignStmt.setCfg(newCfg);
				stmts.push(newAssignStmt);
				i++;
			});
	
			
			
			// 这部分在 参数赋值之后构造
			// 添加变量 指向自己类实例的变量 
			thisType = new ClassType(funcClassSignature);
			thisLocal = new Local(("$r"+paraindex), thisType);
			paraindex++;
			localArray.push(thisLocal);
			
			// 添加一个实例化 自己类型的语句
			let instanceExpr: ArkNewExpr = new ArkNewExpr(thisType);
			newAssignStmt = new ArkAssignStmt(thisLocal, instanceExpr);
			newAssignStmt.setCfg(newCfg);
			stmts.push(newAssignStmt);
	
			// 添加调用自己 <init> 方法的语句
			let newInstanceExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(thisLocal, initMethodSignature, localArray.slice(0, -1));
			let newInstanceStmt: ArkInvokeStmt = new ArkInvokeStmt(newInstanceExpr);
			newInstanceStmt.setCfg(newCfg);
			stmts.push(newInstanceStmt);
	
	
			// 添加返回语句
			let newReturnStmt: ArkReturnStmt = new ArkReturnStmt(thisLocal);
			newReturnStmt.setCfg(newCfg);
			stmts.push(newReturnStmt);
			newBootStrapBB.setStmts(stmts);
	
			newCfg.setStartingStmt(stmts[0]);
			newCfg.addBlock(newBootStrapBB);
			localSet = new Set(localArray);
			// 构建Body
			newBody = new ArkBody(localSet, newCfg);
			bootstrapMethod.setBody(newBody);
			funcClass.addMethod(bootstrapMethod);
	
	
			// 构建 方法 apply
			let applyMethod: ArkMethod = new ArkMethod();
			applyMethod.setDeclaringArkClass(funcClass);
	
			// 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
			// 创建一个新 方法签名 参数是一个方法的必选参数  返回的是方法的参数
			// 构建参数列表
			let applyParameters: MethodParameter[] = [];
			paraindex = 0;
			let mustParas: Type[] = parseFunSigMustInputTypes(methodSig);
			mustParas.forEach(type => {
				let newPara = new MethodParameter();
				newPara.setName("$r" + paraindex);
				newPara.setType(type);
				newPara.setOptional(false);
				applyParameters.push(newPara);
				paraindex++;
			});
	
			
			// 我们 根据得到的 方法签名构造一个 apply 
			// apply 的输入和输出是 函数must的参数
			
			let applyMethodSubSig: MethodSubSignature = 
				new MethodSubSignature('apply',
					applyParameters,
					methodSig.getType(), true);
							
			let applyMethodSignature: MethodSignature = new MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(),
				applyMethodSubSig);
			applyMethod.setSignature(applyMethodSignature);
			// 设置修饰符 applyMethod 的修饰符为 public 
			applyMethod.setModifiers(4);
			// 开始构造方法体
			// 构造BB 
			newCfg = new Cfg();
			let newApplyBB: BasicBlock = new BasicBlock();
			stmts = [];
			// 构造 local set
			localArray = [];
			localSet = new Set<Local>();
			i = 0;
			// 添加参数 获取语句
			let args2: Local[] = [];
			applyParameters.forEach( (para)=> {
				let newLocal: Local = new Local(para.getName(), para.getType());
				localArray.push(newLocal);
				args2.push(newLocal);
				// 构造参数赋值语句
				let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
				let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
				newAssignStmt.setCfg(newCfg);
				stmts.push(newAssignStmt);
				i++;
			});
	
				   
			// 这部分在 参数赋值之后构造
			// 添加变量 指向自己类实例的变量 
			thisType = new ClassType(funcClassSignature);
			thisLocal = new Local(("$r"+paraindex), thisType);
			paraindex++;
			localArray.push(thisLocal);
	
			// 添加一个 自我赋值语句
			newThisRef = new ArkThisRef(thisType);
			newAssignStmt = new ArkAssignStmt(thisLocal, newThisRef);
			newAssignStmt.setCfg(newCfg);
			stmts.push(newAssignStmt);
	
			let args1: Local[] = [];
			// 字段赋值语句 用来捕获自己的字段 字段来自于可选参数 所以我们直接用 optionalpara
			// 输入参数 和 字段匹配 赋值
			for (let j: number = 0; j < optionalTypes.length; j++) {
				//得到对应字段
				let field: ArkField = funcClass.getFieldWithName("cap" + j);
				if (field) {
					let fieldSig: FieldSignature = field.getSignature();
					
					let newFieldRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(thisLocal, fieldSig);
					// 添加对应类型的变量
					let newLocal: Local = new Local("$i" + j);
					localArray.push(newLocal);
					args1.push(newLocal);
					newAssignStmt = new ArkAssignStmt(newLocal, newFieldRef);
					newAssignStmt.setCfg(newCfg);
					stmts.push(newAssignStmt);
				}
				else {
					this.logger.log("!!!!!警告: 没有找到字段" + "cap" + j, loggerLevel + 3);
				}
				
	
			}
	
			// 调用原本指向的的函数 这是一个静态调用 先输入自己的字段 作为传入 在是自己的参数
			// 返回值就是期望类型 
			let returnLocal: Local = new Local(("$r"+paraindex),methodSig.getType());
			let newStaticInvokeExpr: ArkStaticInvokeExpr = new ArkStaticInvokeExpr(methodSig, args1.concat(args2));
			localArray.push(returnLocal);
			newAssignStmt = new ArkAssignStmt(returnLocal, newStaticInvokeExpr);
			stmts.push(newAssignStmt);
	
	
			// 添加返回语句
			newReturnStmt = new ArkReturnStmt(returnLocal);
			newReturnStmt.setCfg(newCfg);
			stmts.push(newReturnStmt);
			newApplyBB.setStmts(stmts);
	
			newCfg.setStartingStmt(stmts[0]);
			newCfg.addBlock(newApplyBB);
			localSet = new Set(localArray);
			// 构建Body
			newBody = new ArkBody(localSet, newCfg);
			applyMethod.setBody(newBody);
			funcClass.addMethod(applyMethod);
			return bootstrapMethodSignature;
		}
		else {
			this.logger.log("警告!!!!!  没有找到 接口文件 ", loggerLevel + 1);
			return null;
		}
	}


	// 这个方法用来补齐 被调用的函数方法 和 调用的方法的变量差
	public checkType4CallerCallee(clallerMethod: ArkMethod, calleeMethod: ArkMethod, loggerLevel: number){
		// 首先我们会遍历callee上的变量 把那些没有定义 即 不出现在任何 赋值表达式左边的变量放到一个
		if (calleeMethod.getBody()) {
			this.logger.log("检查函数方法调用和被调用的类型  caller: " + calleeMethod.getName() 
			+ "  clallee:  " + calleeMethod.getName(), loggerLevel + 1);
			

			let localsMap: Map<string, Local> = calleeMethod.getBody().getLocals();
			let locals: Local[] =  Array.from(localsMap.values());
			// 对localsMap的删除会影响到 原本的数据结构
			let undefinedLocalsName: Set<string> = new Set(localsMap.keys());
	
			// 遍历变量 
			locals.forEach(local => {
				this.logger.log("监视变量: " + local + "所用语句", loggerLevel + 2);
				// 不要用什么 getUsedStmts  这并不会给我们所有使用到的语句
				calleeMethod.getCfg().getStmts().forEach((stmt) => {           
					if (stmt instanceof ArkAssignStmt) {
						if (stmt.getLeftOp() instanceof Local) {
							if (stmt.getLeftOp().getName() === local.getName()) {
								this.logger.log(local.getName() + "出现在赋值左边", loggerLevel + 2);
								// 被从Map中删去
								undefinedLocalsName.delete(local.getName());
																				  
							}
						}                   
					}
				});
			});
			//因为this 和 参数等变量 可能还保留在我们的 Map里 所以我们专门删除
			undefinedLocalsName.delete("this");
			let params: Value[] = calleeMethod.getParameterInstances();
			params.forEach((para) => {
				undefinedLocalsName.delete(para.getName());
			});
	
			// 剩下在 undefinedLocalsName 里的都是 没有被定义的
			// 这些变量一定是有一部分来自 caller的
			let clallerLocalsMap: Map<string, Local> = clallerMethod.getBody().getLocals();
			// 我们遍历剩下的没有定义的 Local
			let returnLocals: Local[] = []; 
			locals.forEach(local => {
				if (undefinedLocalsName.has(local.getName())) {
					this.logger.log("在caller里寻找变量" + local, loggerLevel + 2);
					let foundLocal: Local = clallerLocalsMap.get(local.getName());
					if (foundLocal) {
						this.logger.log("在caller找到变量" + local, loggerLevel + 2);
						// 接下来要用foundLocal 的类型替换掉原来的
						local.setType(foundLocal.getType());
						this.logger.log("把原有变量类型替换为" + foundLocal.getType(), loggerLevel + 2);
						returnLocals.push(local); 
						
					}
					else {
						this.logger.log("!!!警告: 没有在caller里找到变量" + local.getName(), loggerLevel + 2);
					}
				}
			});
	
			// 把这些 添加的变量都当作参数 还要添加相应的 赋值语句
			// 我们遍历剩下的没有定义的 Local
			
			// 把这些local类型加到 当前方法签名里
			// 关键是怎么添加 因为目前得不到parameter类 只有拿local[] 当 parameter[]
			
			// 用我们自己的 类 
			let parameters: MethodParameter[] = [];
			returnLocals.forEach(local => {
				let newPara: MethodParameter = new MethodParameter();
				newPara.setName(local.getName());
				newPara.setType(local.getType())
				// 这是一个小技巧 我们把 自己添加的外部输入 参数都标记从可选的
				newPara.setOptional(true);
				parameters.push(newPara);
			});
					
			let oldSubSig: MethodSubSignature = calleeMethod.getSignature().getMethodSubSignature();
			parameters = parameters.concat(oldSubSig.getParameters());
			let newSubSig: MethodSubSignature = new MethodSubSignature(oldSubSig.getMethodName(), parameters, oldSubSig.getReturnType(), oldSubSig.isStatic());
			let newMethodSig: MethodSignature = new MethodSignature(calleeMethod.getSignature().getDeclaringClassSignature(), newSubSig);
			// 把当前这个方法的签名设置为这个
			calleeMethod.setSignature(newMethodSig);
			// 添加赋值语句
			// 得到开始BB 
			let startBlock: BasicBlock = calleeMethod.getCfg().getStartingBlock();
			let stmts: Stmt[] = startBlock.getStmts();
			let newStmts: Stmt[] = [];
			// 添加赋值语句
			let index: number = 0;
			returnLocals.forEach(local => {
				// 构建赋值语句
				let newRef: ArkParameterRef = new ArkParameterRef(index, local.getType());
				let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(local, newRef);
				newStmts.push(newAssignStmt);
				index++;
			});
			
			stmts.forEach(stmt => {
				if (stmt instanceof ArkAssignStmt) {
					if (stmt.getRightOp() instanceof ArkParameterRef) {
						// 把原有的参数索引加 index
						let newRef: ArkParameterRef = new ArkParameterRef(stmt.getRightOp().getIndex() + index, stmt.getRightOp().getType());
						stmt.setRightOp(newRef);
					}
					newStmts.push(stmt);
				}
				else {
					newStmts.push(stmt);
				}
				
			});
	
			startBlock.setStmts(newStmts);
		}
		// 我们发现 当我们改 函数类型对应的方法时 参数的修改不会再是之前我们想要的
		// 同名搜索法是 有问题的 因为 可能 产生的匿名方法他的 输入和输出 和我们最终产生的不一样
		
	}


    // 这个方法主要用来规范一个方法中出现的所有 调用表达式的推导
    public checkValues(arkMethod: ArkMethod, loggerLevel: number) {
        // 因为这个方法会构造新的Local所以 引入index
		let id: number = 0;
        this.logger.log("开始检查调用表达式", loggerLevel);
        // 遍历所有语句
        // 遍历 一个方法里所有的语句
		
        let blocks: BasicBlock[] = Array.from(arkMethod.getBody().getCfg().getBlocks());
        for (let i: number = 0; i < blocks.length; i++ ) {
            let stmts: Stmt[] = blocks[i].getStmts();
			let stmtsNumber = stmts.length;
            for (let j: number = 0; j < stmtsNumber; j++) {
                let values: Value[] = stmts[j].getUses();
                for (let k: number = 0; k < values.length; k++) {
					// 如果值是一个 Expr
					if (values[k] instanceof AbstractExpr) {
						if (values[k] instanceof AbstractInvokeExpr) {
							this.logger.log("语句: " + stmts[j] + "包含调用值", loggerLevel + 1);
							let methodSig: MethodSignature = values[k].getMethodSignature();
							// 检查是否其是一个 函数 的静态调用
							if (values[k] instanceof ArkStaticInvokeExpr) {
								this.checkStaticInvoke(stmts[j], arkMethod, loggerLevel + 2);
							}
							this.logger.log("调用方法为: " + methodSig, loggerLevel + 1);
							// 我们检查这个方法是否已经被检查过
							if (this.methodSigChecked(methodSig)) {
								// 如果这个方法签名已经检查 
								this.logger.log("该方法已经被检查: ", loggerLevel + 1);
							}
							// 没有检查则需要重新检查
							else {
								this.logger.log("该方法需要检查: ", loggerLevel + 1);
								// 依据这个签名寻找该方法
								let calledMethod: ArkMethod = this.scene.getMethod(methodSig);
								if (methodSig) {
									this.logger.log("在项目中找到方法: " + methodSig, loggerLevel + 2);
									// 调用方法检查
									
									this.logger.log("跳转检查方法: " + methodSig, loggerLevel + 2);
									this.checkMethod(calledMethod, calledMethod.getDeclaringArkClass(), false, loggerLevel + 3);
									this.logger.log("跳转方法: " + methodSig + "检查完成", loggerLevel + 2);
									// 设置方法签名
									values[k].setMethodSignature(calledMethod);
								}
								else {
									this.logger.log("没有在项目中找到方法: " + methodSig, loggerLevel + 2);
								}
								
							}
							// 如果是一个实例调用语句 还要检查base 的类型
							if (values[k] instanceof ArkInstanceInvokeExpr) {
								this.logger.log("值: " + values[k] + "是一个实例调用", loggerLevel + 1);
								let base: Local = values[k].getBase();
								this.logger.log("base: " + base + " 类型是: " + base.getType());
							}
						}
						else if (values[k] instanceof AbstractBinopExpr){
							this.logger.log("值: " + values[k] + "是一个二元表达式", loggerLevel + 1);
							// 检查是否是 string + string
							if (values[k].getOperator() === NormalBinaryOperator.Addition) {
								if (values[k].getOp1().getType() instanceof StringType && 
								values[k].getOp2().getType() instanceof StringType) {
									this.logger.log("值: " + values[k] + "是一个字符串加法", loggerLevel + 1);
									//把字符串加法改为 对于方法concat的调用
									//建立一个 名为 concate 的方法签名
									let op1: Value = values[k].getOp1();
									let op2: Value = values[k].getOp2();
									// 构造参数
									let params: MethodParameter[] = [];
									let para: MethodParameter = new MethodParameter();
									para.setName("op2");
									para.setType(StringType.getInstance());
									params.push(para);
	
									let concatSubMethodSig: MethodSubSignature = new MethodSubSignature("concat", params, StringType.getInstance(), false);
									// 构造一个 名为 java.lang 的文件签名 
									const javaFileSignature = new FileSignature("java", 'lang');
									let newClassSig: ClassSignature = new ClassSignature("String", javaFileSignature, null);
									let concatMethodSig: MethodSignature = new MethodSignature(newClassSig, concatSubMethodSig);
									
									let args: Value[] = [];
									args.push(op2);
									if (op1 instanceof Local) {
										//  op1 直接作为 实例调用的base
										let newInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(op1, concatMethodSig, args);
										//  用这个构造好的表达式 代替原来的valeu
										stmts[j].replaceUse(values[k] ,newInvokeExpr);
										this.logger.log("构造之后的连接语句是: " + stmts[j], loggerLevel + 2);
									}
									else if (op1 instanceof Constant) {
										this.logger.log("额外添加字符变量", loggerLevel + 2);
										//建立一个新的Local 
										//新建一个Local String
										let newLocal: Local = new Local("$temp" + id.toString(), StringType.getInstance());
										id++;
										//把这个变量加到 这个方法里
										let localNameMap: Map<string, Local> = arkMethod.getBody().getLocals();
										localNameMap.set(newLocal.getName(), newLocal);
										//build 一个Assign 
										let newAssignStmt: ArkAssignStmt  = new ArkAssignStmt(newLocal, op1);
										
										let newInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(newLocal, concatMethodSig, args);
										stmts[j].replaceUse(values[k] ,newInvokeExpr);
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
					else if (values[k] instanceof AbstractRef){
						this.logger.log("值: " + values[k] + " 是一个引用类型", loggerLevel + 1);
						if (values[k] instanceof ArkInstanceFieldRef){
							// 字段签名的 getType() 返回为未知
							if (values[k].getType() instanceof UnknownType){
								this.logger.log("检测到未知实例字段引用:  " + values[k], loggerLevel + 2);
								let base: Local = values[k].getBase();
								if (base) {
									this.logger.log("base: " + base.toString() + "类型: " + base.getType(), loggerLevel + 2);
									//我们专门为他们构造一个get 方法
									//返回类型为unknown
									let returnType: Type = UnknownType.getInstance();
									let fieldName: string = values[k].getFieldName();
									console.log("字段名称: " + fieldName);
									const num = parseInt(fieldName);
									let ifNumberIndex: Boolean = false;
									let arg: Value;
									if (!isNaN(num)) {
										this.logger.log("这是一个数组的数字索引", loggerLevel + 3);
										ifNumberIndex = true;
										arg = new Constant(fieldName, NumberType.getInstance());    
									}
										//是否是一个Local 
									else {
										let localIndex: Local = arkMethod.getBody().getLocals().get(fieldName);
										if (localIndex) {
											this.logger.log("存在一个变量: " + fieldName + " 类型: " + localIndex.getType(), loggerLevel + 3);
											if (localIndex.getType() instanceof NumberType) {
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
										let newGetSubSig: MethodSubSignature = new MethodSubSignature("get", [], returnType, false);
										// build a new fileSig
										const javaFileSignature = new FileSignature("java", 'util');
										// build a new classSig
										let newClassSig: ClassSignature = new ClassSignature("ArrayList", javaFileSignature);
										//let newGetSig:                                        
										let newMethodSig: MethodSignature = new MethodSignature(newClassSig, newGetSubSig); 
										let args: Value[] = [];
										args.push(arg);
										let newInsInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(base, newMethodSig, args);
										stmts[j].replaceUse(values[k], newInsInvokeExpr);
									}
									//不是数字索引 那就变成字段
									else {
										//有关于length 的
										if (fieldName === "length" && (base.getType().getName() === "Array") ) {
											//l3 = virtualinvoke $stack4.<java.util.ArrayList: int size()>();
											let newGetSubSig: MethodSubSignature = new MethodSubSignature("size", [], returnType, false);
											// build a new fileSig
											const javaFileSignature = new FileSignature("java", 'util');
											// build a new classSig
											let newClassSig: ClassSignature = new ClassSignature("ArrayList", javaFileSignature);
											// let newGetSig:                                        
											let newMethodSig: MethodSignature = new MethodSignature(newClassSig, newGetSubSig); 
											let newInsInvokeExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(base, newMethodSig, []);
											// replace old value
											stmts[j].replaceUse(values[k], newInsInvokeExpr);
											this.logger.log("用size()表示数组的长度: ", loggerLevel + 2);
										}
										//不是length属性便是普通字段
										else {
											//构建字段引用
											// TODO biuld the infer type for the field
											let newFieldSig: FieldSignature = new FieldSignature( fieldName, ClassSignature.DEFAULT, returnType, false);
											let newFildRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(base, newFieldSig);
											
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


    }


    public addToChecked(arkMethod: ArkMethod) {
        let methodSig: MethodSignature = arkMethod.getSignature();
        this.checkedMethods.set(this.genKey(methodSig), methodSig);
    }

	public dropFromNoCheck(arkMethod: ArkMethod) {
		let methodSig: MethodSignature = arkMethod.getSignature();
		this.toCheckMethods.delete(this.genKey(methodSig));
	}

    public methodChecked(arkMethod: ArkMethod): boolean{
        let methodSig: MethodSignature = arkMethod.getSignature();
        if (this.checkedMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    }

    public methodSigChecked(methodSig: MethodSignature): boolean{
        if (this.checkedMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    }

    public methodNoChecked(arkMethod: ArkMethod): boolean{
        let methodSig: MethodSignature = arkMethod.getSignature();
        if (this.toCheckMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    }

    public methodSigNoChecked(methodSig: MethodSignature): boolean{
        if (this.toCheckMethods.has(this.genKey(methodSig))) {
            return true;
        }
        else {
            return false;
        }
    }

    public addToNoChecked(arkMethod: ArkMethod) {
        let methodSig: MethodSignature = arkMethod.getSignature();
        this.toCheckMethods.set(this.genKey(methodSig), methodSig);
    }

    // 这个方法负责检查 一个方法里所有的函数类型变量
    public checkFunctionType(inputMethod: ArkMethod, inputClass: ArkClass, logger: Logger2, loggerLevel: number) {
        logger.log("开始检查方法的函数变量", loggerLevel);
        // 查看 Locals
        if (inputMethod.getBody()) {
            let localsMap: Map<string, Local> = inputMethod.getBody().getLocals();
            // 遍历有没有functiontype
            let locals: Local[] =  Array.from(localsMap.values());
            locals.forEach((local) => {
                if ( local.getType() instanceof FunctionType) {
                    logger.log("在类 " + inputClass.getName() + " 方法 " + 
                        inputMethod.getName() + "中发现函数类型: " + local.getName(), loggerLevel + 1); 
                    let funcSig: MethodSignature = local.getType().getMethodSignature();
					logger.log("该函数变量指向方法: " + funcSig, loggerLevel + 1);
                    let funcMethod: ArkMethod = this.scene.getMethod(funcSig);
                    if (funcMethod) {
						logger.log("找到所指方法 我们对该方法类型检查", loggerLevel + 2);
						// 用匿名模式对这个方法进行类型检查
						this.checkMethod(funcMethod, funcMethod.getDeclaringArkClass, true, loggerLevel + 3);
                    }
					else {
						logger.log("没有找到所指方法", loggerLevel + 2);
					}

                }
            });
        }
    }

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
	public checkStaticInvoke( staticInvokeStmt: Stmt, inputMethod: ArkMethod, loggerLevel: number) {
		if (inputMethod.getBody()){ 
			this.logger.log("开始对方法: " + inputMethod.getName() + "进行静态调用检查", loggerLevel);
			this.logger.log("检查语句:  " + staticInvokeStmt, loggerLevel + 1);
			
			let localsMap: Map<string, Local> = inputMethod.getBody().getLocals();
			let invokeExpr: AbstractInvokeExpr = staticInvokeStmt.getInvokeExpr();
			//得到函数名字
			let methodSig: MethodSignature = invokeExpr.getMethodSignature();
			let methodName: string = methodSig.getMethodSubSignature().getMethodName();
			let classSig: ClassSignature = methodSig.getDeclaringClassSignature();
			if (classSig.getClassName() === "") {
				this.logger.log("该方法:" + methodName + "来自未知类, 需要进行更换", loggerLevel + 1);
			}
			// 我们去变量里找到是否有同名的 函数类型变量
			if (localsMap.has(methodName)) {
				if (localsMap.get(methodName).getType() instanceof FunctionType) {
					this.logger.log("找到方法:" + methodName + "同名的函数变量");
					// 我们要把该静态调用语句换为指针调用
					// 我们输入的参数是可以不变的
					let newPtrExpr: ArkPtrInvokeExpr = 
					new ArkPtrInvokeExpr(localsMap.get(methodName).getType().getMethodSignature(), localsMap.get(methodName), invokeExpr.getArgs(), invokeExpr.getRealGenericTypes());                
					staticInvokeStmt.replaceUse(invokeExpr, newPtrExpr);
					this.logger.log("换成指针调用:" + staticInvokeStmt, loggerLevel + 2);
					// 我们还要 推理类型
					if (staticInvokeStmt instanceof ArkAssignStmt) {
						if (staticInvokeStmt.getRightOp() instanceof ArkPtrInvokeExpr) {
							if (staticInvokeStmt.getLeftOp().getType() instanceof UnknownType) {
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
	}

}


function checkType4Stmts(arkMethod: ArkMethod, arkClass: ArkClass, scene: Scene, 
    logger: Logger2, loggerLevel: number){
    if (arkMethod.getBody()) {
        let fullChecked: boolean = true;
        let localsMap: Map<string, Local> = arkMethod.getBody().getLocals();
        logger.log("对方法: " + arkMethod.getName() + " 语句逐句类型检测", loggerLevel);
        // 还是逐个BB查找
        let blocks: BasicBlock[] = Array.from(arkMethod.getBody().getCfg().getBlocks());
        blocks.forEach(block => {
            logger.log("检查BB id: " + block.getId(), loggerLevel + 1);
            let stmts: Stmt[] = block.getStmts();
            stmts.forEach(stmt => {
                logger.log("检查语句 : " + stmt, loggerLevel + 1);
                // 遍历这个语句 使用的value
                let values: Value[] = stmt.getUses();
                // 对于这个value 
                logger.log("语句包含值 : " + values, loggerLevel + 2);
                // 遍历Value
                values.forEach(value => {
                    if (fullChecked) {
                        logger.log("检查值 : " + value, loggerLevel + 3);
                    // 如果是一个 local
                    if (value instanceof Local) {
                        let localType: Type = value.getType();
                        logger.log("检查值 : " + value + "是一个local 类型是" + localType, loggerLevel + 4);
                        // 检查这个 变量是否在local里
                        if (!localsMap.has(value.getName())) {
                            logger.log("值 : " + value + "没有在该方法集合中发现", loggerLevel + 5);
                            logger.log("把方法: " + arkMethod.getName() + "加到需要待定集合中", loggerLevel + 5);
                            fullChecked = false;
                        }
                        else {
                            logger.log("值 : " + value + "在方法集合中", loggerLevel + 5);
                            // 我们用集合中的Local来替代这个
                            stmt.replaceUse(value, localsMap.get(value.getName()));
                            value = localsMap.get(value.getName());
                            // 检查是否为一个函数类型
                            if (value.getType instanceof FunctionType) {
                                logger.log("值 : " + value + "是一个函数类型 所致方法为" + value.getType.getMethodSignature(), loggerLevel + 5);
                                // 看是否函数方法已经被分析过了
                                //在scene中 利用得到的 Sig 来搜索对应方法 
                                let funcSig: MethodSignature = value.getType().getMethodSignature();
                                
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
        logger.log("方法: " + arkMethod.getName() + "没有方法体", loggerLevel)
    }
}



//这是一个总的方法的类型检查
function checkType4AMethod(arkMethod: ArkMethod, arkClass: ArkClass, scene: Scene, logger: Logger2, loggerLevel: number) {
    
    logger.log("对方法: " + arkMethod.getName() + "类型检测", loggerLevel);
    // 1. 检查控制流
    checkControlFlow(arkMethod);
    // 2. 检查是否有 if 组件
    checkIfComponent(arkMethod);
    // 3. 检查条件语句 暂时跳过
    //checkIfStmt(arkMethod);
    
    
    checkNodeclaredValue(arkMethod); // 建议整合
    inferFunctionType(arkMethod, logger);
    //this.myInferFiledReftypeInMethoed(arkMethod);
    checkReturnType(arkMethod); // 加到一个方法最后
    
    // checkIfComponent(arkMethod);
    // checkIfStmt(arkMethod);
    checkFunctionType4Method(arkMethod, arkClass, scene);
    checkStaticInvoke4Method(arkMethod); 
}


// 这个函数会检查 一个方法的语句是否 用到了ArkPtrInvokeExpr 指针调用表达式
// 因为 在许多方法里 指针调用的 函数类型 没有直接指向方法中对应的函数类型
// 所以我们会依据调用的函数名 去寻找方法中同名的 函数类型变量
// 更新调用的方法签名
// 这个操作是可以合并的
function inferFunctionType(arkMethod: ArkMethod, logger: Logger2): void{
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

// 这个函数用来更正 静态调用 函数类型时的 错误
// 这种 静态调用 没有 函数签名 关键信息缺失 只知道一个 方法名 "func" (例子，当然可为别的名字)
// 这种 func 多半是 方法内的一个 函数型变量名 
// 解决方法 找到对应变量名 提取其函数类型 即 返回和输入 类型
// 我们会把原有的 staticinvoke 全部改写为 ptrinvoke
// 变成 interfaceinvoke l0.<intToint: int apply(int)>(l2);
// 构建一个 指针调用语句
// 因为指针调用表达式的 inferType 还没有完成 所以 要解决

function checkStaticInvoke( staticInvokeStmt: Stmt, inputMethod: ArkMethod, logger: Logger) {
    if (inputMethod.getBody()){ 
        logger.appendToLog("开始对方法: " + inputMethod.getName() + "进行静态调用检查");
        logger.appendToLog("检查语句:  " + staticInvokeStmt);
        
        let localsMap: Map<string, Local> = inputMethod.getBody().getLocals();
        let invokeExpr: AbstractInvokeExpr = staticInvokeStmt.getInvokeExpr();
        //得到函数名字
        let methodSig: MethodSignature = invokeExpr.getMethodSignature();
        let methodName: string = methodSig.getMethodSubSignature().getMethodName();
        let classSig: ClassSignature = methodSig.getDeclaringClassSignature();
        if (classSig.getClassName() === "") {
            logger.appendToLog("该方法:" + methodName + "来自未知类, 需要进行更换");
        }
        // 我们去变量里找到是否有同名的 函数类型变量
        if (localsMap.has(methodName)) {
            if (localsMap.get(methodName).getType() instanceof FunctionType) {
                logger.appendToLog("找到方法:" + methodName + "同名的函数变量");
                // 我们要把该静态调用语句换为指针调用
                // 我们输入的参数是可以不变的
                let newPtrExpr: ArkPtrInvokeExpr = 
                new ArkPtrInvokeExpr(localsMap.get(methodName).getType().getMethodSignature(), localsMap.get(methodName), invokeExpr.getArgs(), invokeExpr.getRealGenericTypes());                
                staticInvokeStmt.replaceUse(invokeExpr, newPtrExpr);
                logger.appendToLog("换成指针调用:" + staticInvokeStmt);
                // 我们还要 推理类型
                if (staticInvokeStmt instanceof ArkAssignStmt) {
                    if (staticInvokeStmt.getRightOp() instanceof ArkPtrInvokeExpr) {
                        if (staticInvokeStmt.getLeftOp().getType() instanceof UnknownType) {
                            staticInvokeStmt.getLeftOp().setType(localsMap.get(methodName).getType().getMethodSignature().getType());
                        }
                    }
                }
            }
            else {
                logger.appendToLog("!!!!!警告  没有找到方法:" + methodName + "同名的函数变量");
            }
        }
        else {
            logger.appendToLog("!!!!!警告  没有找到方法:" + methodName + "同名的函数变量");
        }
    }
}

// 这个函数负责构造 java.lang.Object 的 <init> 的 MethodSignature

function buildMethodSig4ObjectInit(): MethodSignature {
    let newSubSig: MethodSubSignature = 
        new MethodSubSignature("<init>", [], VoidType.getInstance(), false);
    // 构造一个 名为 java.lang 的文件签名 
    const javaFileSignature = new FileSignature("java", 'lang');
    let newClassSig: ClassSignature = new ClassSignature("Object", javaFileSignature, null);
    let newMethodSig: MethodSignature = new MethodSignature(newClassSig, newSubSig);
    return newMethodSig
}




//这个方法用来为每个 函数 产生一个具体实现的类
//我们现在拥有一个 methodSig 其中 可选的参数表示需要捕捉和输入的参数 必选的参数表示一定要有的
function createFunctionClass(methodSig: MethodSignature, scene: Scene, logger: Logger, interFaceClass: ArkClass): MethodSignature|null {
    // 类的名字 方法的全局名字 + $
    let declaredClassSig: ClassSignature = methodSig.getDeclaringClassSignature();
    let className: string = methodSig.getMethodSubSignature().getMethodName();
    className = declaredClassSig.toString() + "." + className + "$";
    logger.appendToLog("开始构造函数类:" + className);
    // 开始构造类 这个类我们沿用 之前
    // 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
    const funcInterFaceFileSignature = new FileSignature(scene.getProjectName(), 'funcInterfaceFile');
    let interfaceFile: ArkFile = scene.getFile(funcInterFaceFileSignature);
    if (interfaceFile) {
        logger.appendToLog("找到 函数接口文件 接下来开始构造函数类");
        const funcClass = new ArkClass();
        funcClass.setDeclaringArkFile(interfaceFile);
        const funcClassSignature = new ClassSignature( className,
            funcClass.getDeclaringArkFile().getFileSignature(), funcClass.getDeclaringArkNamespace()?.getSignature() || null);
            funcClass.setSignature(funcClassSignature);
        // 把类的 类别设置为类
        funcClass.setCategory(ClassCategory.CLASS);
        interfaceFile.addArkClass(funcClass);
        logger.appendToLog("开始构造函数类:" + className);
        // 添加接口
        funcClass.addImplementedInterfaceName(interFaceClass.getName());
        // 不用设置 修饰符 因为我们的 printer 默认public
        // 开始构造字段
        // 得到 可选类型
        logger.appendToLog("开始构造字段")
        let optionalTypes: Type[] = parseFunSigOptionalInputTypes(methodSig);
        let filedIndex: number = 0;
        optionalTypes.forEach(type => {
            let newField: ArkField = new ArkField();
            newField.setCategory(FieldCategory.PROPERTY_DECLARATION);
            newField.setDeclaringArkClass(funcClass);
            // 创建字段签名
            let fieldName: string = "cap" + filedIndex;
            filedIndex++;
            let newFieldSig: FieldSignature = new FieldSignature( fieldName, funcClassSignature, type, false);
            newField.setSignature(newFieldSig);
            // 添加到类里面
            funcClass.addField(newField);
            logger.appendToLog("构造字段: " + fieldName);
        });
        // 开始构造方法
        
        // 1. 开始构造<init>
        let initMethod: ArkMethod = new ArkMethod();
        initMethod.setDeclaringArkClass(funcClass);

        // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
        // 创建一个新 方法签名  输入类型和 bootstrap 一样都是可选类型 返回类型是 void
        // 构建参数列表
        let initParameters: MethodParameter[] = [];
        let paraindex: number = 0;
        optionalTypes.forEach(type => {
            let newPara = new MethodParameter();
            newPara.setName("$r" + paraindex);
            newPara.setType(type);
            newPara.setOptional(false);
            initParameters.push(newPara);
            paraindex++;
        });

        // 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
        // 我们从外部得到这个类型
        let initMethodSubSig: MethodSubSignature = 
            new MethodSubSignature('<init>', 
                initParameters,
                VoidType.getInstance(), false);
                        
        let initMethodSignature = new MethodSignature(initMethod.getDeclaringArkClass().getSignature(),
            initMethodSubSig);
        initMethod.setSignature(initMethodSignature);
        // 设置修饰符 init 的修饰符为 public 
        initMethod.setModifiers(4);
        funcClass.addMethod(initMethod);

        // 开始构造方法体
        // 构造CFG
        let newCfg: Cfg = new Cfg();
        // 构造BB 
        let newInitBB: BasicBlock = new BasicBlock();
        let stmts: Stmt[] = [];
        // 构造 local set 和 local array
        let localSet: Set<Local>;
        let localArray: Local[] = [];
        let i = 0;
        // 把 参数构造成 Local
        initParameters.forEach( (para)=> {
            let newLocal: Local = new Local(para.getName(), para.getType());
            localArray.push(newLocal);
            // 构造参数赋值语句
            let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
            let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
            newAssignStmt.setCfg(newCfg);
            stmts.push(newAssignStmt);
            i++;
        });
        
        
        // 这部分在 参数赋值之后构造
        // 添加变量 指向自己类实例的变量 
        let thisType: ClassType = new ClassType(funcClassSignature);
        let thisLocal: Local = new Local("this", thisType);
        localArray.push(thisLocal);
        
        // 添加一个 this 赋值语句
        let newThisRef: ArkThisRef = new ArkThisRef(thisType);
        let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(thisLocal, newThisRef);
        newAssignStmt.setCfg(newCfg);
        stmts.push(newAssignStmt);

        // 加一个调用 java.lang.Object 的 <init>语句
        // 需要构造一个 MethodSignature
        let initExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(thisLocal, buildMethodSig4ObjectInit(), []);
        let initStmt: ArkInvokeStmt = new ArkInvokeStmt(initExpr);
        initStmt.setCfg(newCfg);
        stmts.push(initStmt);

        // 输入参数 和 字段匹配 赋值
        for (let j: number = 0; j < localArray.length - 1; j++) {
            //得到对应字段
            let field: ArkField = funcClass.getFieldWithName("cap" + j);
            if (field) {
                let fieldSig: FieldSignature = field.getSignature();
                logger.appendToLog("找到字段" + "cap" + j);
                let newFieldRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(thisLocal, fieldSig);
                newAssignStmt = new ArkAssignStmt(newFieldRef, localArray[j]);
                newAssignStmt.setCfg(newCfg);
                stmts.push(newAssignStmt);
            }
            else {
                logger.appendToLog("!!!!!警告: 没有找到字段" + "cap" + j);
            }
            

        }

        //添加返回语句
        let returnVoidStmt:ArkReturnVoidStmt  = new ArkReturnVoidStmt();
        returnVoidStmt.setCfg(newCfg);
        stmts.push(returnVoidStmt);
        newInitBB.setStmts(stmts);
        
        newCfg.setStartingStmt(stmts[0]);
        newCfg.addBlock(newInitBB);
        localSet = new Set(localArray);
        // 构建Body
        let newBody: ArkBody = new ArkBody(localSet, newCfg);
        initMethod.setBody(newBody);


        // 2. bootstrap$方法 
        let bootstrapMethod: ArkMethod = new ArkMethod();
        bootstrapMethod.setDeclaringArkClass(funcClass);

        // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
        // 创建一个新 方法签名
        // 构建参数列表
        let bootstrapParameters: MethodParameter[] = [];
        paraindex = 0;
        optionalTypes.forEach(type => {
            let newPara = new MethodParameter();
            newPara.setName("$r" + paraindex);
            newPara.setType(type);
            newPara.setOptional(false);
            bootstrapParameters.push(newPara);
            paraindex++;
        });

        // 方法的返回类型是目标方法的 接口类型 这里应该是 functiontype
        // 我们 根据得到的 方法签名构造一个
        let classType: ClassType = new FunctionType(interFaceClass.getSignature());
        let bootstrapMethodSubSig: MethodSubSignature = 
            new MethodSubSignature('bootstrap$', 
                bootstrapParameters,
                classType, true);
                        
        let bootstrapMethodSignature: MethodSignature = new MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(),
            bootstrapMethodSubSig);
        bootstrapMethod.setSignature(bootstrapMethodSignature);
        // 设置修饰符 bootstrapMethod 的修饰符为 public static
        bootstrapMethod.setModifiers(20);
        // 开始构造方法体
        // 构造BB 
        newCfg = new Cfg();
        let newBootStrapBB: BasicBlock = new BasicBlock();
        stmts = [];
        // 构造 local set
        localArray = [];
        localSet = new Set<Local>();
        i = 0;
        bootstrapParameters.forEach( (para)=> {
            let newLocal: Local = new Local(para.getName(), para.getType());
            localArray.push(newLocal);
            // 构造参数赋值语句
            let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
            let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
            newAssignStmt.setCfg(newCfg);
            stmts.push(newAssignStmt);
            i++;
        });

        
        
        // 这部分在 参数赋值之后构造
        // 添加变量 指向自己类实例的变量 
        thisType = new ClassType(funcClassSignature);
        thisLocal = new Local(("$r"+paraindex), thisType);
        paraindex++;
        localArray.push(thisLocal);
        
        // 添加一个实例化 自己类型的语句
        let instanceExpr: ArkNewExpr = new ArkNewExpr(thisType);
        newAssignStmt = new ArkAssignStmt(thisLocal, instanceExpr);
        newAssignStmt.setCfg(newCfg);
        stmts.push(newAssignStmt);

        // 添加调用自己 <init> 方法的语句
        let newInstanceExpr: ArkInstanceInvokeExpr = new ArkInstanceInvokeExpr(thisLocal, initMethodSignature, localArray.slice(0, -1));
        let newInstanceStmt: ArkInvokeStmt = new ArkInvokeStmt(newInstanceExpr);
        newInstanceStmt.setCfg(newCfg);
        stmts.push(newInstanceStmt);


        // 添加返回语句
        let newReturnStmt: ArkReturnStmt = new ArkReturnStmt(thisLocal);
        newReturnStmt.setCfg(newCfg);
        stmts.push(newReturnStmt);
        newBootStrapBB.setStmts(stmts);

        newCfg.setStartingStmt(stmts[0]);
        newCfg.addBlock(newBootStrapBB);
        localSet = new Set(localArray);
        // 构建Body
        newBody = new ArkBody(localSet, newCfg);
        bootstrapMethod.setBody(newBody);
        funcClass.addMethod(bootstrapMethod);


        // 构建 方法 apply
        let applyMethod: ArkMethod = new ArkMethod();
        applyMethod.setDeclaringArkClass(funcClass);

        // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
        // 创建一个新 方法签名 参数是一个方法的必选参数  返回的是方法的参数
        // 构建参数列表
        let applyParameters: MethodParameter[] = [];
        paraindex = 0;
        let mustParas: Type[] = parseFunSigMustInputTypes(methodSig);
        mustParas.forEach(type => {
            let newPara = new MethodParameter();
            newPara.setName("$r" + paraindex);
            newPara.setType(type);
            newPara.setOptional(false);
            applyParameters.push(newPara);
            paraindex++;
        });

        
        // 我们 根据得到的 方法签名构造一个 apply 
        // apply 的输入和输出是 函数must的参数
        
        let applyMethodSubSig: MethodSubSignature = 
            new MethodSubSignature('apply',
                applyParameters,
                methodSig.getType(), true);
                        
        let applyMethodSignature: MethodSignature = new MethodSignature(bootstrapMethod.getDeclaringArkClass().getSignature(),
            applyMethodSubSig);
        applyMethod.setSignature(applyMethodSignature);
        // 设置修饰符 applyMethod 的修饰符为 public 
        applyMethod.setModifiers(4);
        // 开始构造方法体
        // 构造BB 
        newCfg = new Cfg();
        let newApplyBB: BasicBlock = new BasicBlock();
        stmts = [];
        // 构造 local set
        localArray = [];
        localSet = new Set<Local>();
        i = 0;
        // 添加参数 获取语句
        let args2: Local[] = [];
        applyParameters.forEach( (para)=> {
            let newLocal: Local = new Local(para.getName(), para.getType());
            localArray.push(newLocal);
            args2.push(newLocal);
            // 构造参数赋值语句
            let newParaRef: ArkParameterRef = new ArkParameterRef(i, para.getType());
            let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(newLocal, newParaRef);
            newAssignStmt.setCfg(newCfg);
            stmts.push(newAssignStmt);
            i++;
        });

               
        // 这部分在 参数赋值之后构造
        // 添加变量 指向自己类实例的变量 
        thisType = new ClassType(funcClassSignature);
        thisLocal = new Local(("$r"+paraindex), thisType);
        paraindex++;
        localArray.push(thisLocal);

        // 添加一个 自我赋值语句
        newThisRef = new ArkThisRef(thisType);
        newAssignStmt = new ArkAssignStmt(thisLocal, newThisRef);
        newAssignStmt.setCfg(newCfg);
        stmts.push(newAssignStmt);

        let args1: Local[] = [];
        // 字段赋值语句 用来捕获自己的字段 字段来自于可选参数 所以我们直接用 optionalpara
        // 输入参数 和 字段匹配 赋值
        for (let j: number = 0; j < optionalTypes.length; j++) {
            //得到对应字段
            let field: ArkField = funcClass.getFieldWithName("cap" + j);
            if (field) {
                let fieldSig: FieldSignature = field.getSignature();
                logger.appendToLog("找到字段" + "cap" + j);
                let newFieldRef: ArkInstanceFieldRef = new ArkInstanceFieldRef(thisLocal, fieldSig);
                // 添加对应类型的变量
                let newLocal: Local = new Local("$i" + j);
                localArray.push(newLocal);
                args1.push(newLocal);
                newAssignStmt = new ArkAssignStmt(newLocal, newFieldRef);
                newAssignStmt.setCfg(newCfg);
                stmts.push(newAssignStmt);
            }
            else {
                logger.appendToLog("!!!!!警告: 没有找到字段" + "cap" + j);
            }
            

        }

        // 调用原本指向的的函数 这是一个静态调用 先输入自己的字段 作为传入 在是自己的参数
        // 返回值就是期望类型 
        let returnLocal: Local = new Local(("$r"+paraindex),methodSig.getType());
        let newStaticInvokeExpr: ArkStaticInvokeExpr = new ArkStaticInvokeExpr(methodSig, args1.concat(args2));
        localArray.push(returnLocal);
        newAssignStmt = new ArkAssignStmt(returnLocal, newStaticInvokeExpr);
        stmts.push(newAssignStmt);


        // 添加返回语句
        newReturnStmt = new ArkReturnStmt(returnLocal);
        newReturnStmt.setCfg(newCfg);
        stmts.push(newReturnStmt);
        newApplyBB.setStmts(stmts);

        newCfg.setStartingStmt(stmts[0]);
        newCfg.addBlock(newApplyBB);
        localSet = new Set(localArray);
        // 构建Body
        newBody = new ArkBody(localSet, newCfg);
        applyMethod.setBody(newBody);
        funcClass.addMethod(applyMethod);
        return bootstrapMethodSignature;
    }
    else {
        logger.appendToLog("警告!!!!!  没有找到 接口文件 ");
        return null;
    }
}

// 这个函数用来 解析我们函数Sig里 option的 参数类型
export function parseFunSigOptionalInputTypes(funcSig: MethodSignature): Type[]{
    let inputTypes: Type[] = [];
    let parameters: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
    // 遍历parameters
    let ifOption: Boolean = true;
    parameters.forEach(para => {
    // 如果这个参数是可选的代表是要从外部输入
        if (para.isOptional() && ifOption){
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
export function parseFunSigMustInputTypes(funcSig: MethodSignature): Type[] {
   
    let inputTypes: Type[] = [];
    let parameters: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
    // 遍历parameters
    let ifOption: Boolean = true;
    parameters.forEach(para => {
    // 如果这个参数是可选的代表是要从外部输入
        if (para.isOptional()){

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



// 我们发现 生成的匿名方法 往往都是歪瓜裂枣， 类型 变量 需要进一步的规范 所以我们写一下这个函数
// 记住 变量的原本名字在 调用方法和匿名方法 的变量类型推理 扮演着重要角色 所以
// 该函数 在格式化变量名之前调用 (虽然这个函数现在还没有写出来bushi)

// 这个函数对后续函数接口的生成对应类型也有影响 所以必须在 接口生成之前调用
// 这个函数会成为之后的检擦变量的参考 给我好好写 
// 输入时两个 ArkMethod 第一个表示 claller  第二个是callee
function checkLocalTypeinFuncMethod(clallerMethod: ArkMethod, calleeMethod: ArkMethod, logger: Logger) {
    //创建日志
    
    // 首先我们会遍历callee上的变量 把那些没有定义 即 不出现在任何 赋值表达式左边的变量放到一个
    if (calleeMethod.getBody()) {
        logger.appendToLog("检查函数方法类型  caller: " + calleeMethod.getName() + "  clallee:  " + calleeMethod.getName());
        let localsMap: Map<string, Local> = calleeMethod.getBody().getLocals();
        let locals: Local[] =  Array.from(localsMap.values());
        // 对localsMap的删除会影响到 原本的数据结构
        let undefinedLocalsName: Set<string> = new Set(localsMap.keys());

        // 遍历变量 
        locals.forEach(local => {
            logger.appendToLog("监视变量: " + local + "所用语句");
            // 不要用什么 getUsedStmts  这并不会给我们所有使用到的语句
            calleeMethod.getCfg().getStmts().forEach((stmt) => {           
                if (stmt instanceof ArkAssignStmt) {
                    if (stmt.getLeftOp() instanceof Local) {
                        if (stmt.getLeftOp().getName() === local.getName()) {
                            logger.appendToLog(local.getName() + "出现在赋值左边");
                            // 被从Map中删去
                            undefinedLocalsName.delete(local.getName());
                                                                              
                        }
                    }                   
                }
            });
        });
        //因为this 和 参数等变量 可能还保留在我们的 Map里 所以我们专门删除
        undefinedLocalsName.delete("this");
        let params: Value[] = calleeMethod.getParameterInstances();
        params.forEach((para) => {
            undefinedLocalsName.delete(para.getName());
        });

        // 剩下在 undefinedLocalsName 里的都是 没有被定义的
        // 这些变量一定是有一部分来自 caller的
        let clallerLocalsMap: Map<string, Local> = clallerMethod.getBody().getLocals();
        // 我们遍历剩下的没有定义的 Local
        let returnLocals: Local[] = []; 
        locals.forEach(local => {
            if (undefinedLocalsName.has(local.getName())) {
                logger.appendToLog("在caller里寻找变量" + local);
                let foundLocal: Local = clallerLocalsMap.get(local.getName());
                if (foundLocal) {
                    logger.appendToLog("在caller找到变量" + local);
                    // 接下来要用foundLocal 的类型替换掉原来的
                    local.setType(foundLocal.getType());
                    logger.appendToLog("把原有变量类型替换为" + foundLocal.getType());
                    returnLocals.push(local); 
                    
                }
                else {
                    logger.appendToLog("!!!警告: 没有在caller里找到变量" + local.getName());
                }
            }
        });

        // 我们还把之前那些未知类型的给统一 遍历语句 
        // 检查静态调用语句 静态调用语句 可能用来调用一个 函数 导致类型失效

        calleeMethod.getCfg().getStmts().forEach(stmt => {
            if (stmt.containsInvokeExpr()) {
                if (stmt.getInvokeExpr() instanceof ArkStaticInvokeExpr) {
                    checkStaticInvoke(stmt, calleeMethod, logger);
                }
            }
        });
        // 用 赋值语句 来推导类型
        calleeMethod.getCfg().getStmts().forEach(stmt => {
            if (stmt instanceof ArkAssignStmt) {
                const leftOp = stmt.getLeftOp();
                if (leftOp instanceof Local) {
                    const leftOpType = leftOp.getType();
                    if (leftOpType instanceof UnknownType) {
                        const rightOp = stmt.getRightOp();
                        leftOp.setType(rightOp.getType());
                    }
                }
            }
        });
        // 把这些 添加的变量都当作参数 还要添加相应的 赋值语句
        // 我们遍历剩下的没有定义的 Local
        
        // 把这些local类型加到 当前方法签名里
        // 关键是怎么添加 因为目前得不到parameter类 只有拿local[] 当 parameter[]
        
        // 用我们自己的 类 
        let parameters: MethodParameter[] = [];
        returnLocals.forEach(local => {
            let newPara: MethodParameter = new MethodParameter();
            newPara.setName(local.getName());
            newPara.setType(local.getType())
            // 这是一个小技巧 我们把 自己添加的外部输入 参数都标记从可选的
            newPara.setOptional(true);
            parameters.push(newPara);
        });
                
        let oldSubSig: MethodSubSignature = calleeMethod.getSignature().getMethodSubSignature();
        parameters = parameters.concat(oldSubSig.getParameters());
        let newSubSig: MethodSubSignature = new MethodSubSignature(oldSubSig.getMethodName(), parameters, oldSubSig.getReturnType(), oldSubSig.isStatic());
        let newMethodSig: MethodSignature = new MethodSignature(calleeMethod.getSignature().getDeclaringClassSignature(), newSubSig);
        // 把当前这个方法的签名设置为这个
        calleeMethod.setSignature(newMethodSig);
        // 添加赋值语句
        // 得到开始BB 
        let startBlock: BasicBlock = calleeMethod.getCfg().getStartingBlock();
        let stmts: Stmt[] = startBlock.getStmts();
        let newStmts: Stmt[] = [];
        // 添加赋值语句
        let index: number = 0;
        returnLocals.forEach(local => {
            // 构建赋值语句
            let newRef: ArkParameterRef = new ArkParameterRef(index, local.getType());
            let newAssignStmt: ArkAssignStmt = new ArkAssignStmt(local, newRef);
            newStmts.push(newAssignStmt);
            index++;
        });
        
        stmts.forEach(stmt => {
            if (stmt instanceof ArkAssignStmt) {
                if (stmt.getRightOp() instanceof ArkParameterRef) {
                    // 把原有的参数索引加 index
                    let newRef: ArkParameterRef = new ArkParameterRef(stmt.getRightOp().getIndex() + index, stmt.getRightOp().getType());
                    stmt.setRightOp(newRef);
                }
                newStmts.push(stmt);
            }
            else {
                newStmts.push(stmt);
            }
            
        });

        startBlock.setStmts(newStmts);
        // 返回构造需要的 参数
        return returnLocals;
    }
    // 我们发现 当我们改 函数类型对应的方法时 参数的修改不会再是之前我们想要的
    // 同名搜索法是 有问题的 因为 可能 产生的匿名方法他的 输入和输出 和我们最终产生的不一样
    
}


// 这个函数会检查输入类 是否含有 函数类型 有的话 会检索当前类下的对应方法
// 检查 这个方法的输入类型 输出类型
// 找到在句子里 第一次使用的语句 在前面加一个赋值语句 来表示动态调用产生 lambda 表达式

export function checkFunctionType4Method(inputMethod: ArkMethod, inputClass: ArkClass, scene: Scene) {
    let logger: Logger = new Logger();
    // 查看 Locals
    if (inputMethod.getBody()) {
        let localsMap: Map<string, Local> = inputMethod.getBody().getLocals();
        // 遍历有没有functiontype
        let locals: Local[] =  Array.from(localsMap.values());
        locals.forEach((local) => {
            if ( local.getType() instanceof FunctionType) {
                logger.appendToLog("在类 " + inputClass.getName() + " 方法 " + 
                    inputMethod.getName() + "中发现函数类型: " + local.getName()); 
                let funcSig: MethodSignature = local.getType().getMethodSignature();
                let funcMethod: ArkMethod = scene.getMethod(funcSig);
                if (funcMethod && funcMethod.getBody()) {
                    // 把这个方法的修饰符设置成 
                    funcMethod.setModifiers(20);
                    checkLocalTypeinFuncMethod(inputMethod, funcMethod, logger);
                    checkReturnType(funcMethod);
                    funcSig = funcMethod.getSignature();
                    
                    // 更新 local 的类型
                    // 接下来我们要分析 方法的返回
                    let newFuncType: FunctionType = new FunctionType(funcSig, local.getType().getRealGenericTypes());
                    local.setType(newFuncType);
                    logger.appendToLog("在类 " + inputClass.getName() + " 中发现方法: " + funcSig.getMethodSubSignature().getMethodName());
                    
                    let inputTypes: Type[] = parseFunSigMustInputTypes(funcSig);
                    let returnType: Type = funcSig.getMethodSubSignature().getReturnType();
                    //funcSig = funcMethod.getSignature();
                    logger.appendToLog("输入类型是" + inputTypes);
                    logger.appendToLog("输出类型是" + returnType);

                    // 接下来 我们会build 一个对应输入类型和输出类型的接口 
                    // 格式为 IntString2Void 
                    // 首先要建立一个类 ArkClass 参考一下 dummyMain 是怎么建立的
                    
                    // 得到scene中那个被构造的文件 我们通过构造一个 文件签名来检索他
                    const funcInterFaceFileSignature = new FileSignature(scene.getProjectName(), 'funcInterfaceFile');
                    let interfaceFile: ArkFile = scene.getFile(funcInterFaceFileSignature);
                    if (interfaceFile) {
                        logger.appendToLog("找到 函数接口文件");
                        // 根据输入和输出信息来寻找是否已经存在对应的接口
                        let funcType: string;
                        let inputTypesString: string = "";
                        let returnTypesString: string = "";
                        let interfaceName: string = "";
                        // 如果没有输入 也没有 输出 (void) 那就归为 Runnable
                        if (inputTypes.length === 0 && returnType instanceof VoidType) {
                            funcType = "Runnable";
                            interfaceName = funcType;
                        }
                        // 至少有 一个输入或者输出 我们统一构造为一个输入类型1+2+输出类型+Function的接口
                        else {
                            funcType = "Function";
                            if (inputTypes.length === 0) {
                                inputTypesString = "void";
                            }
                            else {
                                inputTypes.forEach(type => {
                                    inputTypesString += type.toString();
                                });
                            }
                            returnTypesString = returnType.toString();
                            interfaceName = inputTypesString + "To" + returnTypesString + funcType;
                           
                        }
                        logger.appendToLog("构造的接口名字为: " + interfaceName);
                        // 在这个文件里 搜索 也没有和 接口名同名的方法 没有就构造一个
                        let interFuncFaceClass: ArkClass = interfaceFile.getClassWithName(interfaceName);
                        if (interFuncFaceClass) {
                            logger.appendToLog("接口文件中 已有 对应的接口类");
                        }
                        else {
                            logger.appendToLog("接口文件中 没有 对应的接口类");
                            // 开始构造 对应的类
                            const interFaceClass = new ArkClass();
                            interFaceClass.setDeclaringArkFile(interfaceFile);
                            const interFaceClassSignature = new ClassSignature( interfaceName,
                                interFaceClass.getDeclaringArkFile().getFileSignature(), interFaceClass.getDeclaringArkNamespace()?.getSignature() || null);
                            interFaceClass.setSignature(interFaceClassSignature);
                            // 把类的 类别设置为接口
                            interFaceClass.setCategory(ClassCategory.INTERFACE);
                            interfaceFile.addArkClass(interFaceClass);

                            // 开始构造方法  没有方法体 且 修饰符为 public abstract
                            // 方法名统一设置为 apply
                            let interfaceMethod: ArkMethod = new ArkMethod();
                            interfaceMethod.setDeclaringArkClass(interFaceClass);

                            // 设置方法签名  我们可以从之前的方法签名那里得到我们的参数
                            let interfaceMethodSubSig: MethodSubSignature = 
                            new MethodSubSignature('apply', 
                                funcSig.getMethodSubSignature().getParameters(),
                                returnType,
                                false
                            );
                        
                            let interfaceMethodSignature = new MethodSignature(interfaceMethod.getDeclaringArkClass().getSignature(),
                                interfaceMethodSubSig);
                            interfaceMethod.setSignature(interfaceMethodSignature);
                            // 设置修饰符
                            interfaceMethod.setModifiers(36);
                            interFaceClass.addMethod(interfaceMethod);
                            logger.appendToLog("接口方法构造完成: ");
                            logger.appendToLog(interfaceMethodSignature);
                            interFuncFaceClass = interFaceClass;
                        }
                                               
                        // 接口构造完成 开始构造 生成语句
                        // 首先我们先遍历这个方法的 语句 看这个函数Local是否出现在 赋值的左边
                        // 遍历所有的 BB
                        let ifNeedGenFunction: Boolean = true;
                        // 遍历这个Local的使用的语句
                        logger.appendToLog("方法遍历使用语句");


                        inputMethod.getBody().getCfg().getStmts().forEach((stmt) => {
                            if (stmt instanceof ArkAssignStmt) {
                                if (stmt.getLeftOp().getType() instanceof FunctionType) {
                                    if (stmt.getLeftOp().getType().getMethodSignature().isMatch(funcSig)) {
                                        ifNeedGenFunction = false;
                                    }                                   
                                }
                            }
                        });
                        let bootstrapSig: MethodSignature = createFunctionClass(funcSig, scene, logger, interFuncFaceClass);
                        if (ifNeedGenFunction) {
                            let firstUse: boolean = true;
                            logger.appendToLog("没有找到函数变量的赋值语句 开始遍历所有语句找到合适插入位置");
                            if (inputMethod.getBody()) {
                                let basicBlocks:Set<BasicBlock> = inputMethod.getBody().getCfg().getBlocks();
                                // 这里我们暂时认定 遍历顺序就是 执行顺序
                                basicBlocks.forEach(block => { 
                                    if (firstUse) {
                                        let stmts: Stmt[] = block.getStmts();
                                        for (let i: number = 1; i < stmts.length; i++) {
                                            //找到第一次使用的位置并且插入
                                            let values: Value[] = stmts[i].getUses();
                                            values.forEach((value) => {
                                                if (value.getType() instanceof FunctionType && firstUse) {
                                                    if (value.getType().getMethodSignature().isMatch(funcSig)) {
                                                        logger.appendToLog("找到函数类使用");
                                                        logger.appendToLog("在语句: " + stmts[i] + "之前开始构建函数生成语句");
                                                        // 生成一个静态调用语句  输入为 可选参数
                                                        if (bootstrapSig) {
                                                            let paras: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
                                                            let args: Local[] = [];
                                                            for (let i: number = 0; i < paras.length; i++) {
                                                                if (paras[i].isOptional()) {
                                                                    let arg: Local = new Local(paras[i].getName(), paras[i].getType());
                                                                    args.push(arg);
                                                                }
                                                                else{
                                                                    break;
                                                                }
                                                            }
                                                            
                                                            let newStaticInvokeExpr: ArkStaticInvokeExpr = new ArkStaticInvokeExpr(bootstrapSig, args);
                                                            let genStmt: ArkAssignStmt = new ArkAssignStmt(value, newStaticInvokeExpr);
                                                            genStmt.setCfg(inputMethod.getBody().getCfg());
                                                            stmts.splice(i, 0, genStmt);
                                                            block.setStmts(stmts);
                                                            logger.appendToLog("成功构建语句" + genStmt);
                                                            firstUse = false;
                                                        }
                                                        else {
                                                            logger.appendToLog("警告!!!!!  没有找到函数类生成");
                                                        }
                                                    }
                                                }
                                            });
                                        }                                           
                                    }                                   
                                });
                            }
                            else {
                                logger.appendToLog("警告!!!!:   没有找到" + inputMethod.getSignature() + " 方法体");
                            }
                        
                        }
                        checkReturnType(inputMethod);
                                      
                    }
                    else {
                        logger.appendToLog("警告!!!!:   没有找到 函数接口文件");
                    }

                }
                else {
                    logger.appendToLog("没有在类 " + inputClass.getName() + " 中发现方法: " + funcSig.getMethodSubSignature().getMethodName());
                }
            }
        });
    }
}

// 这天地万般，势必与我久周旋

export function buildFunctionInterface(scene: Scene): void{
    const funcInterFaceFile = new ArkFile();
    funcInterFaceFile.setScene(scene);
    const funcInterFaceFileSignature = new FileSignature(scene.getProjectName(), 'funcInterfaceFile');
    funcInterFaceFile.setFileSignature(funcInterFaceFileSignature);
    scene.getFilesMap().set(funcInterFaceFile.getFileSignature().toString(), funcInterFaceFile);
}


function inferLocalinStmt(local: Local, stmt: Stmt): Type {

    let type: Type = UnknownType.getInstance();
    if (stmt instanceof ArkAssignStmt) {
        //Local在左边
        let leftOP: Value = stmt.getLeftOp();
        if (leftOP instanceof Local) {
            if (local.getName() === leftOP.getName()) {
                //得到右边的类型
                type = stmt.getRightOp().getType();
            }
        }
    }
    else if (stmt instanceof ArkIfStmt) {
        
        let conditionExpr: ArkConditionExpr = stmt.getConditionExprExpr();
        if (local.toString() === conditionExpr.getOp1().toString()) {
            if (type instanceof UnknownType) {
                type = conditionExpr.getOp2().getType();
            }
        }
        else if (local.toString() === conditionExpr.getOp2().toString()) {
            if (type instanceof UnknownType) {
                type = conditionExpr.getOp1().getType();
            }
        }
        
    }
    return type;
}


export enum FieldCategory {
    PROPERTY_DECLARATION = 0,
    PROPERTY_ASSIGNMENT = 1,
    SHORT_HAND_PROPERTY_ASSIGNMENT = 2,
    SPREAD_ASSIGNMENT = 3,
    PROPERTY_SIGNATURE = 4,
    ENUM_MEMBER = 5,
    INDEX_SIGNATURE = 6,
    GET_ACCESSOR = 7,
}

enum ClassCategory {
    CLASS = 0,
    STRUCT = 1,
    INTERFACE = 2,
    ENUM = 3,
    TYPE_LITERAL = 4,
    OBJECT = 5,
}

export enum RelationalBinaryOperator {
    LessThan = '<',
    LessThanOrEqual = '<=',
    GreaterThan = '>',
    GreaterThanOrEqual = '>=',
    Equality = '==',
    InEquality = '!=',
    StrictEquality = '===',
    StrictInequality = '!==',
}

export enum NormalBinaryOperator {
    // TODO: unfold it
    NullishCoalescing = '??',

    // arithmetic
    Exponentiation = '**',
    Division = '/',
    Addition = '+',
    Subtraction = '-',
    Multiplication = '*',
    Remainder = '%',

    // shift
    LeftShift = '<<',
    RightShift = '>>',
    UnsignedRightShift = '>>>',

    // Bitwise
    BitwiseAnd = '&',
    BitwiseOr = '|',
    BitwiseXor = '^',

    // Logical
    LogicalAnd = '&&',
    LogicalOr = '||',
}

// //这个函数负责检查有没有 空值合并运算符 “??” 负责整理控制流
// export function checkNullishCoalescing(inputMethod: ArkMethod){
//     if (inputMethod.getBody()){
//         let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
//         let maxID = blocks.length; 
//         for (let i: number = 0; i < maxID; i++){
//             let blocks: BasicBlock[] = Array.from(inputMethod.getBody().getCfg().getBlocks());
//             let orderBlocks: BasicBlock[] = blocks.sort((a, b) => a.getId() - b.getId());
            
//             let stmts: Stmt[] = orderBlocks[i].getStmts();
//             for (let j: number = 0; j < stmts.length; j++){
//                 if (stmts[j] instanceof ArkAssignStmt){
//                     // 该语句是一个赋值语句 并且 右操作数是一个 ArkNormalBinopExpr
//                     if (stmts[j].getRightOp() instanceof ArkNormalBinopExpr) {
//                         if (stmts[j].getRightOp().getOperator() === NormalBinaryOperator.NullishCoalescing) {
//                             console.log("找到空值合并运算符: " + stmts[j].toString());
//                             //把原有的Blcok分成两半 
//                             //原有的Block  0123 4 5  67
//                             let newStmts: Stmt[] = stmts.slice(j+1, stmts.length);
//                             //创建一个Block  newBlock1 
//                             let newBlock1 = new BasicBlock();
//                             newBlock1.setId(maxID);
//                             maxID++;
//                             newStmts.forEach(stmt =>{
//                                 newBlock1.addStmt(stmt);
//                             });
                            

//                             //创建一个新的Block newBlock2 只有一个语句
//                         }
//                     }
                    
//                     ){
//                         console.log("找到undefined");
//                         //把原有的Blcok分成两半 
                        
//                         //原有的Block  0123 4 5  67
//                         let newStmts: Stmt[] = stmts.slice(j+3, stmts.length);
//                         //创建一个Block
//                         let newBlock1 = new BasicBlock();
//                         newBlock1.setId(maxID);
//                         maxID++;
//                         newStmts.forEach(stmt =>{
//                             newBlock1.addStmt(stmt);
//                         });

//                         let newBlock2 = new BasicBlock();
//                         newBlock2.setId(maxID);
//                         maxID++;
//                         newBlock2.addStmt(stmts[j + 1]);

//                         let newBlock3 = new BasicBlock();
//                         newBlock3.setId(maxID);
//                         maxID++;
//                         newBlock3.addStmt(stmts[j + 2]);
                        
//                         //加到Block到CFG
//                         inputMethod.getBody().getCfg().addBlock(newBlock1);
//                         inputMethod.getBody().getCfg().addBlock(newBlock2);
//                         inputMethod.getBody().getCfg().addBlock(newBlock3);


//                         //原有的Blcok的后继者是block2 和 block3
//                         if(!orderBlocks[i].setSuccessorBlock(0, newBlock2)){
//                             orderBlocks[i].addSuccessorBlock(newBlock2);
//                         }
//                         if(!orderBlocks[i].setSuccessorBlock(1, newBlock3)){
//                             orderBlocks[i].addSuccessorBlock(newBlock3);
//                         }
//                         //block1 的后继者是原有block的
//                         orderBlocks[i].getSuccessors().forEach(nextBlock =>{
//                             newBlock1.addSuccessorBlock(nextBlock);
//                         });
//                         //原有的Block要删掉之后语句  缺少对应的API 
//                         // 在打印端实现逻辑  遇到一个if就不再打印
            
//                         //这个新Block2的前者是之前的Blcok 后者是原有block
//                         newBlock2.addSuccessorBlock(newBlock1);
//                         newBlock2.addPredecessorBlock(orderBlocks[i]);

//                         newBlock3.addSuccessorBlock(newBlock1);
//                         newBlock3.addPredecessorBlock(orderBlocks[i]);
                       
//                         let ids: number[] = [];
//                         orderBlocks[i].getSuccessors().forEach(block => {
//                             ids.push(block.getId());
//                         });
//                         //console.log(Array.from(inputMethod.getBody().getCfg().getBlocks()));
//                     }
//                 }
//             }
//         }

//     }
// }

// export function checkInvokeExpr(inputMethod: ArkMethod){
//     let stmts: Stmt[] = inputMethod.getBody().getCfg().getStmts();
//         for (const stmt of stmts){
//             if (stmt instanceof ArkInvokeStmt) {
//                 let invokeExpr: AbstractInvokeExpr = stmt.getInvokeExpr();
//                 let methodSig: MethodSignature = invokeExpr.getMethodSignature();
                
//                 let classSig: ClassSignature = methodSig.getDeclaringClassSignature();
//                 //if (classSig.getClassName == ""){
//                 if (true){
//                     //检查签名中参数的数目和实际参数数目
//                     let parameters: MethodParameter[] = methodSig.getMethodSubSignature().getParameters();
//                     let args: Value[] = invokeExpr.getArgs();
//                     if (parameters.length < args.length){
//                         //重新构造一个MethodParameter[]
//                         let newParas: MethodParameter[] = [];
//                         for (const arg of args){
                            
//                                 let newPara: MethodParameter = new MethodParameter();
                                
//                                 newPara.setType(arg.getType());
//                                 newParas.push(newPara);
                            
                            
//                         }
//                         let newSubSig: MethodSubSignature = new MethodSubSignature(methodSig.getMethodSubSignature().getMethodName(), newParas, methodSig.getMethodSubSignature().getReturnType(), methodSig.getMethodSubSignature().isStatic());
//                         let newSig: MethodSignature = new MethodSignature(classSig, newSubSig);
//                         invokeExpr.setMethodSignature(newSig);
//                         console.log("更正" + newSig);
//                     }
//                 }
//             }
//         }
// }

export class MethodParameter {
    private name: string = '';
    private type!: Type;
    private optional: boolean = false;


    constructor() {
    }

    public getName() {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getType() {
        return this.type;
    }

    public setType(type: Type) {
        this.type = type;
    }

    public isOptional() {
        return this.optional;
    }

    public setOptional(optional: boolean) {
        this.optional = optional;
    }

   
}

