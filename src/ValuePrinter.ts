import {MethodSignaturePrinter, FieldSignaturePrinter} from "./SignaturePrinter";

import {Local,AbstractRef, ArkThisRef, ArkParameterRef, Value, ArrayType,
    ArkArrayRef, ArkInstanceFieldRef, ArkStaticFieldRef,ArkCaughtExceptionRef,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,ArkNewExpr, ArkNewArrayExpr,
    MethodSignature, FieldSignature, ArkPtrInvokeExpr, Type, VoidType,
    AbstractExpr, ArkDeleteExpr, ArkAwaitExpr, ArkYieldExpr, ArkTypeOfExpr,ArkInstanceOfExpr,
    AbstractBinopExpr, ArkConditionExpr, ArkNormalBinopExpr,ArkCastExpr,
    ArkPhiExpr, ArkUnopExpr, FunctionType, StringType, 
    Constant, BooleanType, UnknownType} from "../lib/bundle";

import { TypePrinter } from "./TypePrinter";
import { Map  } from "./Map";
import { GetmethodsigwithnewName } from "./Factory";
import { MethodParameter } from "./CheckType";

// Value 类型是一个很宽泛的类型 包括Ref Expr Local  Constant 

export class ValuePrinter{
    private value: Value;
    constructor(value: Value){
        this.value = value;
    }
    public printValue():string{
        let output: string = "";
        //判断Value类型
        //1 是否是引用类型
        if(this.value instanceof AbstractRef){
            //1.1是否是Array引用
            if(this.value instanceof ArkArrayRef){
                output += this.printArrayRef();
            }
            //1.2 实例字段引用
            else if(this.value instanceof ArkInstanceFieldRef){
                output += this.printInstanceFieldRef();
            }
            //1.3静态字段引用
            else if(this.value instanceof ArkStaticFieldRef){
                output += this.printStaticFieldRef();
            }
            //1.4参数引用
            else if(this.value instanceof ArkParameterRef){
                output += this.printParaRef();
            }
            //1.5自应用
            else if(this.value instanceof ArkThisRef){
                output += this.printSelfRef();
            }
            //1.6捕捉异常引用
            else if(this.value instanceof ArkCaughtExceptionRef){
                output += "@caughtexception";
            }
            else{
                output += this.value.toString();
                console.log("没有识别到正确引用类型");
            }
        }
        //2 是否是 expr 类型
        else if (this.value instanceof AbstractExpr){
            //2.1是否是调用表达式
            if (this.value instanceof AbstractInvokeExpr){
                //2.1.1 实例调用表达式
                if (this.value instanceof ArkInstanceInvokeExpr){
                    let methodsig: MethodSignature = this.value.getMethodSignature();
                    //判断是不是构造方法
                    let methodName:string = methodsig.getMethodSubSignature().getMethodName();    
                    if (methodName === "constructor" || methodName === "<init>"){
                        //console.log("打印构造方法:" + methodsig.getDeclaringClassSignature().getClassName());
                        //是调用的构造方法
                        output += this.prtinSpecialinvoke();
                    }//判断是否是静态方法
                    else if(methodsig.getMethodSubSignature().isStatic()){
                        //是静态方法调用静态打印
                        output += this.printStaticinvoke();
                    }
                    //是否调用父类方法
                    else if( this.value.getBase().getName() === "this"){
                        output += this.prtinSpecialinvoke();
                    }
                    else{
                        //其他则是默认为 virtualinvoke
                        output += this.printvirtualinvoke();
                        //console.log("调用 virtualinvoke打印" + methodsig);
                    }
                }
                //2.1.2静态调用表达式
                else if (this.value instanceof ArkStaticInvokeExpr){
                    output += this.printStaticinvoke();
                }
                else if (this.value instanceof ArkPtrInvokeExpr){
                    console.log("打印了 ptrinvoke" + this.value);
                    output += this.printPtrExpr();
                }
                else{
                    console.log("找不到合适的调用表达式");
                    output += this.value.toString();
                }
            }
            //2.2是否是new表达式
            else if(this.value instanceof ArkNewExpr){
                output += this.printNewExpr();
            }
            //2.3 是否是 new数组表达式
            else if(this.value instanceof ArkNewArrayExpr){
                output += this.printNewArray();
            }
            //2.4 是否是 DeleteExpr表达式
            else if(this.value instanceof ArkDeleteExpr){
                console.log("打印了delete表达式");
                output += this.printArkDeleteExpr();
            }
            //2.5 是否是Await表达式
            else if(this.value instanceof ArkAwaitExpr){
                console.log("打印了await 表达式");
                output += this.printArkAwaitExpr();
            }
            //2.6是否是ArkYieldExpr
            else if(this.value instanceof ArkYieldExpr){
                console.log("打印了yield 表达式");
                output += this.printArkYieldExpr();
            }
            //2.7 是否是二元运算表达式AbstractBinopExpr
            else if(this.value instanceof AbstractBinopExpr){
                //2.7.1 条件二元表达式
                if (this.value instanceof ArkConditionExpr){
                    output += this.printConditionBinExpr();
                }
                //2.7.2普通二元表达式
                else if (this.value instanceof ArkNormalBinopExpr){
                    output += this.printNormalBinExpr();
                }
                else {
                    console.log("找不到合适的二元表达式: " + this.value.toString());
                    output += this.value.toString();
                }
                
            }
            //2.8ArkTypeOfExpr 
            else if (this.value instanceof ArkTypeOfExpr){
                output += this.printTypeofExpr();               
            }
            //2.9ArkInstanceOfExpr
            else if (this.value instanceof ArkInstanceOfExpr){
                output += this.printInstanceOfExpr();
            }
            //2.10 cast表达式
            else if (this.value instanceof ArkCastExpr){
                output += this.printCastExpr();
            }
            //2.11 phi 表达式
            else if (this.value instanceof ArkPhiExpr){
                output += this.printPhiExpr();
            }
            // 2.12 ArkUnopExpr 表达式
            else if(this.value instanceof ArkUnopExpr){
                output += this.printUnopExpr();
            }
            else {
                console.log("没有合适表达式");
                output += this.value.toString();
            }
            
        }
        else if (this.value instanceof Constant){
            //是否是字符串型
            if (this.value.getType() instanceof StringType){
                // output += '\"' + this.value.getValue() + '\"';
                output += '\"' + "StringConstant" + '\"';
            }
            else if (this.value.getType() instanceof BooleanType){
                if (this.value.toString() == "true"){
                    output += "1";
                }
                else{
                    output += "0";
                }
            }
            else{
                output += this.value.toString();
            }
            
        }
        else if (this.value instanceof Local){
            
            let outputString: string = Map.localNameMap(this.value.toString());
            outputString = Map.NameMap(outputString);
            output += outputString;
            

        }
        else {
            console.log("找不到合适的Value类型");
            output += this.value.toString();
        }
        return (output);
    }

    //打印未知的实例字段引用
    //打成virtualInvoke的形式
    ////virtualinvoke base.< classtype : 返回类型 函数名（参数类型） >（参数名）
    public printRightUnknownInsFiledRef(): string{

        let output: string = "";
        let fieldName: string = this.value.getFieldName();
        if (this.value.getBase().getType() instanceof ArrayType && fieldName.includes("length")){
            output += "lengthof " + this.value.getBase().getName();
        }
        else {
            output += "virtualinvoke ";
            output += this.value.getBase().getName();
            output += ".<";
            // 用base类型作为classtype
            let typeprinter: TypePrinter = new TypePrinter(this.value.getBase().getType());
            output += typeprinter.printType();
            //返回类型采用object 函数名 get 参数类型 object 参数名是 字段名
            output += " : java.lang.Object get (java.lang.Object) > (";
            
            if (fieldName.includes('temp') || /^\d+$/.test(fieldName)){
                
            }
            else{
                fieldName = fieldName.replace(/\'/g, '');
                fieldName = '\"' + fieldName + '\"';
            }
            output += fieldName;
            
            output += ")"
        }
        
        console.log("打印未知实例字段" + fieldName);
        return output;
    }

    public printLeftUnknownInsFiledRef(): string{
        let output: string = "virtualinvoke ";
        output += this.value.getBase().getName();
        output += " .< ";
        // 用base类型作为classtype
        let typeprinter: TypePrinter = new TypePrinter(this.value.getBase().getType());
        output += typeprinter.printType();
        //返回类型采用object 函数名 get 参数类型 object 参数名是 字段名
        output += " : object set (object) > (";
        output += this.value.getFieldName();
        output += " )"
        return output;
    }


    //打印ptrinvoke
    private printPtrExpr():string{
        // 默认是对 函数的调用
        //interfaceinvoke l0.<java.util.function.Function: java.lang.Object apply(java.lang.Object)>(l1);
        let funcPtrLocal: Local = this.value.getFuncPtrLocal();
        console.log("函数指针变量: " + funcPtrLocal);

        let output: string = "";
        output += "interfaceinvoke " + funcPtrLocal + ".<";
        let funcSig: MethodSignature = this.value.getMethodSignature();
        // 接下来我们要分析 方法的返回值 和输入值 
        let inputTypes: Type[] = [];
        let parameters: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
        // 遍历parameters
        let ifOption: Boolean = true;
        parameters.forEach(para => {
            // 如果这个
            if (para.isOptional()){

            }
            else {
                ifOption = false;
            }
            if (!ifOption) {
                inputTypes.push(para.getType());
            }
        });
        
        let returnType: Type = funcSig.getMethodSubSignature().getReturnType();
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
        console.log("构造的接口名字为: " + interfaceName);
        //得到项目名称
        let projectName: string = funcSig.getDeclaringClassSignature().getDeclaringFileSignature().getProjectName();
        output += (projectName + ".funcInterfaceFile." +interfaceName + ": ");
        // 打印返回类型
        let typePrinter: TypePrinter;
        typePrinter = new TypePrinter(returnType);
        output += typePrinter.printType();
        output += " apply(";
        // 打印参数类型
        let inputArray: string[] = [];
        inputTypes.forEach((type) => {
            typePrinter = new TypePrinter(type);
            inputArray.push(typePrinter.printType());
        });
        output += inputArray.join(",");
        output += ")>";
        let args: Value[] = this.value.getArgs();
        
        //接下来打印（参数名1，参数名2）
        
        let argsString: string[] = [];
        let valuePrinter: ValuePrinter;
        args.forEach((arg) => {
            valuePrinter = new ValuePrinter(arg);
            argsString.push(valuePrinter.printValue());
        });
        output += "(" + argsString.join(", ") + ")";
        return output;
        
    }


    //打印数组引用  base[index]
    private printArrayRef():string{
        let output:string = "";
        let valuePrinter: ValuePrinter;
        valuePrinter = new ValuePrinter(this.value.getBase());
        output += valuePrinter.printValue();
        output += "[";
        //打印index (Value类)
        valuePrinter = new ValuePrinter(this.value.getIndex());
        output += valuePrinter.printValue();
        output += "]";
        return output;
    }
    //打印自引用
    private printSelfRef():string{
        let output: string = "";
        output += "@this: ";
        //打印classType
        let typeprinter: TypePrinter = new TypePrinter(this.value.getType());
        output += typeprinter.printType();
        return output;
    }
    //打印参数引用
    private printParaRef(): string{
        let output:string = "";
        output += '@parameter' + this.value.index + ': ';
        let typeprinter: TypePrinter = new TypePrinter(this.value.getType());
        output += typeprinter.printType();
        return output;
    }
    //打印实例字段引用
    private printInstanceFieldRef(): string{
        let output: string = "";
        //base. 字段签名
        //先打印base 一个Value
        let basePrinter: ValuePrinter = new ValuePrinter(this.value.getBase());
        output += basePrinter.printValue() + ".";
        let fieldSig: FieldSignature = this.value.getFieldSignature();
        //打印一个字段标签
        let fieldSigPrinter: FieldSignaturePrinter = new FieldSignaturePrinter(fieldSig);
        output += fieldSigPrinter.printFieldSig();
        return output;
    }
    //打印静态字段引用
    private printStaticFieldRef(): string{
        
        let output:string = "";
        let fieldSigPrinter: FieldSignaturePrinter = new FieldSignaturePrinter(this.value.getFieldSignature());
        output += fieldSigPrinter.printFieldSig();
        return output;
    }
    //打印静态调用
    private printStaticinvoke(): string{
        let output: string = "";
        //判断是不是打印静态调用super 我们不打印super
        if (this.value.getMethodSignature().getMethodSubSignature().getMethodName() === "super"){
            return output;
        }
        //Staticinvoke < classtype : 返回类型 函数名（参数类型） >（参数名）
        output += "staticinvoke ";
        
        let methodsignature: MethodSignature = this.value.getMethodSignature();
        //接下来打印方法签名   < ..... >
        let args: Value[] = this.value.getArgs();
        let methodSigPrinter: MethodSignaturePrinter 
        = new MethodSignaturePrinter(methodsignature, args);
        output += methodSigPrinter.printMethodSig();
        //接下来打印（参数名1，参数名2）
        
        let argsString: string[] = [];
        let valuePrinter: ValuePrinter;
        args.forEach((arg) => {
            valuePrinter = new ValuePrinter(arg);
            argsString.push(valuePrinter.printValue());
        });
        output += "(" + argsString.join(", ") + ")";
        return output;
    }

    //用来打印specailinvoke 
    private prtinSpecialinvoke(): string{
        let output: string = "";
        //specialinvoke base.< classtype : 返回类型 函数名（参数类型） >（参数名）
        output += "specialinvoke ";
        //打印base base即调用者是一个Local类型 实现了Value 接口
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getBase());
        output += valuePrinter.printValue() + ".";
        //接下来调用方法签名 <.....>
        let methodsignature: MethodSignature = this.value.getMethodSignature();
        let args: Value[] = this.value.getArgs();
        let methodSigPrinter: MethodSignaturePrinter = new MethodSignaturePrinter(methodsignature, args);
        output += methodSigPrinter.printMethodSig();
        //接下来打印（参数名1，参数名2）
        
        let argsString: string[] = [];
        args.forEach((arg) => {
            valuePrinter = new ValuePrinter(arg);
            argsString.push(valuePrinter.printValue());
        });
        output += "(" + argsString.join(", ") + ")";
        return output;
    }

    //用来打印 virtualinvoke
    private printvirtualinvoke(): string{
        let output: string = "";
        //virtualinvoke base.< classtype : 返回类型 函数名（参数类型） >（参数名）
        output += "virtualinvoke ";
        //打印base base即调用者是一个Local类型 实现了Value 接口
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getBase());
        output += valuePrinter.printValue() + ".";
        //接下来调用方法签名 <.....>
        let methodsignature: MethodSignature = this.value.getMethodSignature();
        let args: Value[] = this.value.getArgs();
        let methodSigPrinter: MethodSignaturePrinter = new MethodSignaturePrinter(methodsignature, args);
        output += methodSigPrinter.printMethodSig();
        //接下来打印（参数名1，参数名2）
        
        let argsString: string[] = [];
        args.forEach((arg) => {
            valuePrinter = new ValuePrinter(arg);
            argsString.push(Map.NameMap(valuePrinter.printValue()));
        });
        output += "(" + argsString.join(", ") + ")";
        
        return output;
    }   
    
    //打印new表达式
    private printNewExpr():string{
        let output: string = "";
        output += "new" + " ";
        //打印classtype
        let typeprinter: TypePrinter = new TypePrinter(this.value.getType());
        return output += typeprinter.printType();
    } 
    //打印newarray表达式
    private printNewArray(): string{
        let output: string = "";
        output += "newarray (";
        //打印basetype
        let typeprinter: TypePrinter = new TypePrinter(this.value.getBaseType());
        output += typeprinter.printType() + ")";
        //打印size Value 类
        if (this.value.getSize() == 0){
            output += "[" + 1 + "]";
        }
        else{
            output += "[" + this.value.getSize()+ "]";
        }
        
        return output;
    }
    //打印delete表达式  //'delete ' + 字段引用
    private printArkDeleteExpr(): string{
        let output: string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getField());
        output += valuePrinter.printValue();
        return output;
    }
    //打印await表达式  //'await ' + Promise是一个Vlue
    private printArkAwaitExpr(): string{
        let output: string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getPromise());
        output += valuePrinter.printValue();
        return output;
    }
    //打印yield表达式
    private printArkYieldExpr(): string{
        let output: string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getYieldValue());
        output += valuePrinter.printValue();
        return output;
    }
    //打印条件二元表达式
    private printConditionBinExpr(): string{
        let output:string = "";
        let valuePrinter: ValuePrinter;
        valuePrinter = new ValuePrinter(this.value.getOp1());
        output += valuePrinter.printValue();
        output += " ";
        //下面的语句会把 === 和 ！== 变为 == 和 !=
        let operator: RelationalBinaryOperator = this.value.getOperator();
        if (operator.toString() === "==="){
            operator = RelationalBinaryOperator.Equality;
        }
        if (operator == RelationalBinaryOperator.StrictInequality){
            operator = RelationalBinaryOperator.InEquality;
        }
        output += operator + " ";
        valuePrinter = new ValuePrinter(this.value.getOp2());
        let op2String: string = valuePrinter.printValue();
        if (this.value.getOp1().getType() instanceof UnknownType) {
           if (op2String === "0") {
            console.log("打印了 左侧未知右侧为0 的条件表达式: " + this.value.toString());
            output += "null";
            return output;
           }
        }
        output += valuePrinter.printValue();
        return output;
    }
    //打印普通二元表达式
    private printNormalBinExpr():string{
        let output:string = "";
        let operator: NormalBinaryOperator = this.value.getOperator();
        let valuePrinter: ValuePrinter;
        //判断是不是 ** 幂运算
        if (operator === NormalBinaryOperator.Exponentiation){
            output += "staticinvoke <java.lang.Math: number pow(number,number)>" 
            //打印参数
            valuePrinter = new ValuePrinter(this.value.getOp1());
            output += "(" + valuePrinter.printValue() + ", ";
            valuePrinter = new ValuePrinter(this.value.getOp2());
            output += valuePrinter.printValue() + ")";
            return output;
        }
        //合并空值运算符 
        if (operator === NormalBinaryOperator.NullishCoalescing) {
            valuePrinter = new ValuePrinter(this.value.getOp1());
            console.log("打印了合并空值" + this.value.toString());
            output += valuePrinter.printValue();
            return output;
        }
        valuePrinter = new ValuePrinter(this.value.getOp1());
        output += valuePrinter.printValue();
        output += " ";
        //下面的语句会把 && 和 || 变为 & | 
        // //把 ?? 变成 &
        // if (operator === NormalBinaryOperator.NullishCoalescing){
        //     operator = NormalBinaryOperator.BitwiseAnd;
        // } 
        if (operator === NormalBinaryOperator.LogicalAnd){
            operator = NormalBinaryOperator.BitwiseAnd;
        }
        if (operator === NormalBinaryOperator.LogicalOr){
            operator = NormalBinaryOperator.BitwiseOr;
        }
        output += operator + " ";
        valuePrinter = new ValuePrinter(this.value.getOp2());
        output += valuePrinter.printValue();
        return output;
    }
    //打印typeof表达式
    private printTypeofExpr(): string{
        let output:string = "";
        //virtualinvoke name.<java.lang.Object: string getClassName()>()
        output += "virtualinvoke ";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getOp());
        output += valuePrinter.printValue();
        output += ".<java.lang.Object: string getClassName()>()";
        return output;
    }
    //打印 ArkInstanceOfExpr表达式
    private printInstanceOfExpr(): string{
        let output:string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getOp());
        let typeprinter: TypePrinter = new TypePrinter(this.value.getType());
        output += valuePrinter.printValue() + " instanceof " + typeprinter.printType();
        return output;
    }
    //打印 ArkCastExpr 
    private printCastExpr(): string{
        let output: string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.value.getOp());
        let typeprinter: TypePrinter = new TypePrinter(this.value.getType());
        output += "(" + typeprinter.printType() + ") " + valuePrinter.printValue();
        return output;
    }
    //打印 ArkPhiExpr表达式
    private printPhiExpr(): string{
        let strs: string[] = [];
        strs.push('phi(');
        if (this.value.args.length > 0) {
            for (const arg of this.value.args) {
                strs.push(arg.toString());
                strs.push(', ');
            }
            strs.pop();
        }
        strs.push(')');
        return strs.join(''); 
    }
    //unoexpr
    private printUnopExpr(): string{
        let output: string = "";
        let operator: UnaryOperator = this.value.getOperator();
        let op: Value = this.value.getOp();
        let valuePrinter: ValuePrinter = new ValuePrinter(op);
        //判断操作符
        if (operator === UnaryOperator.BitwiseNot || operator === UnaryOperator.LogicalNot){
            output += valuePrinter.printValue() + " ^ -1";
        }
        else{
            output += operator + valuePrinter.printValue();
        }
        
        return output;
    }
}

enum NormalBinaryOperator {
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

enum RelationalBinaryOperator {
    LessThan = '<',
    LessThanOrEqual = '<=',
    GreaterThan = '>',
    GreaterThanOrEqual = '>=',
    Equality = '==',
    InEquality = '!=',
    StrictEquality = '===',
    StrictInequality = '!==',
}

export enum UnaryOperator {
    Neg = '-',
    BitwiseNot = '~',
    LogicalNot = '!'
}