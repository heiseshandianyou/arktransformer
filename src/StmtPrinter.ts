import { ValuePrinter } from './ValuePrinter';
import { ArkIfStmt,Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkInvokeStmt, FunctionType,
    ArkInstanceFieldRef,  ArkSwitchStmt, ClassSignature,Type,
    AbstractInvokeExpr, ArkThrowStmt, UnknownType, VoidType, MethodSignature} from "../lib/bundle";
import { TypePrinter } from './TypePrinter';
import { Map } from './Map';
import { MethodParameter } from './CheckType';

export class StmtPrinter{
    private stmt: Stmt;
    private successor: number[];
    constructor(inputstmt: Stmt, successor: number[]){
        this.stmt = inputstmt;
        this.successor = successor;
    }

    

    public printStmt(): string{
        let output:string = "";
        //根据不同stmt类型打印
        //1. Ifstmt
        if (this.stmt instanceof ArkIfStmt){
            
            output += this.printIfStmt();
            output += " goto " + `label${this.successor[0]}` + ";\n";
            output += "goto " + `label${this.successor[1]}`;
        }
        //2. AssignStmt
        else if(this.stmt instanceof ArkAssignStmt){
            output += this.printAssignmentStmt();
        }
        //3. 调用Stmt
        else if(this.stmt instanceof ArkInvokeStmt){
            output += this.printInvokeStmt();
        }
        //4. ArkReturnStmt
        else if (this.stmt instanceof ArkReturnStmt){
            output += this.printReturnStmt();
        }
        //5. ArkReturnVoidStmt
        else if (this.stmt instanceof ArkReturnVoidStmt){
            output += this.printReturnVoidStmt();
        }
        //6. ArkSwitchStmt
        else if (this.stmt instanceof ArkSwitchStmt){
            console.log("打印switch");
            output += this.printSwitchStmt();
        }
        //7. ArkThrowStmt
        else if (this.stmt instanceof ArkThrowStmt){
            output += this.printThrowStmt();
        }
        else{
            console.log("未识别语句");
            output = this.stmt.toString();
        }
        if (output){
            return output + ";\n";
        }
        else{
            return "";
        }
    }

    //用来打印If语句
    private printIfStmt(): string{
        let output: string = "if ";
        let exprPrinter: ValuePrinter = new ValuePrinter(this.stmt.getConditionExprExpr());
        output += exprPrinter.printValue();
        return output;
    }

    public printIdentityStmt(): string{
        let output = "";
        //判断是不是this
        if (this.stmt.getRightOp() instanceof ArkThisRef){
            //先打印左边的值
            let leftvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getLeftOp());
            output += leftvalueprinter.printValue();
            output += " := ";
            //在打印右边的值
            let rightvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getRightOp());
            output += rightvalueprinter.printValue();
        }
        //参数赋值
        else{
            //先打印左边的值
            let leftvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getLeftOp());
            output += leftvalueprinter.printValue();
            output += " := ";
            //在打印右边的值
            let rightvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getRightOp());
            output += rightvalueprinter.printValue();
            
        }
        return output += ";\n";
    }

    public printAssignmentStmt(): string{
        let output:string = "";
        // if (this.stmt.getLeftOp().getType() instanceof FunctionType 
        //     && this.stmt.getRightOp().getType() instanceof FunctionType
        // ) {
            
        //     if (this.stmt.getLeftOp().getType().getMethodSignature().isMatch(this.stmt.getRightOp().getType().getMethodSignature())) {
        //         console.log("打印了函数生成语句: " + this.stmt);
        //         let leftvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getLeftOp());
        //         output += leftvalueprinter.printValue();
        //         output += " = ";
        //         let funcSig: MethodSignature = this.stmt.getRightOp().getType().getMethodSignature();
        //         output += "dynamicinvoke \"apply\" <"
        //         // 接下来我们要分析 方法的返回值
        //         let inputTypes: Type[] = [];
        //         let parameters: MethodParameter[] = funcSig.getMethodSubSignature().getParameters();
        //         // 遍历parameters
        //         let ifOption: Boolean = true;
        //         let inputParaNames: string[] = [];
        //         let inputParaTypes: Type[] = [];
        //         // 这个字符串是全部的参数 包括选择
        //         let allParametersTypes: Type[] = funcSig.getMethodSubSignature().getParameterTypes();

        //         // inputTypes 装的都是 不是选择的
        //         parameters.forEach(para => {
        //             // 如果这个
        //             if (para.isOptional() && ifOption){
        //                 inputParaNames.push(para.getName());
        //                 inputParaTypes.push(para.getType())
        //             }
        //             else {
        //                 ifOption = false;
        //             }
        //             if (!ifOption) {
        //                 inputTypes.push(para.getType());
        //             }
        //         });

        //         let returnType: Type = funcSig.getMethodSubSignature().getReturnType();
        //         let funcType: string;
        //         let inputTypesString: string = "";
        //         let returnTypesString: string = "";
        //         let interfaceName: string = "";
        //         // 如果没有输入 也没有 输出 (void) 那就归为 Runnable
        //         if (inputTypes.length === 0 && returnType instanceof VoidType) {
        //             funcType = "Runnable";
        //             interfaceName = funcType;
        //         }
        //         // 至少有 一个输入或者输出 我们统一构造为一个输入类型1+2+输出类型+Function的接口
        //         else {
        //             funcType = "Function";
        //             if (inputTypes.length === 0) {
        //                 inputTypesString = "void";
        //             }
        //             else {
        //                 inputTypes.forEach(type => {
        //                     inputTypesString += type.toString();
        //                 });
        //             }
        //             returnTypesString = returnType.toString();
        //             interfaceName = inputTypesString + "To" + returnTypesString + funcType;
                   
        //         }
        //         console.log("构造的接口名字为: " + interfaceName);
        //         //得到项目名称
        //         let projectName: string = funcSig.getDeclaringClassSignature().getDeclaringFileSignature().getProjectName();
        //         output += (projectName + ".funcInterfaceFile." + interfaceName + " (" );    
        //         // 打印需要输入的类型
                
        //         let typePrinter: TypePrinter;
        //         let inputParaTypesString: string[] = []
        //         inputParaTypes.forEach(type => {
        //             typePrinter = new TypePrinter(type);
        //             inputParaTypesString.push(typePrinter.printType());
        //         });
        //         output += (inputParaTypesString.join(",") + ")>(");
        //         output += (inputParaNames.join(",") + ")")
        //         output += (" <java.lang.invoke.LambdaMetafactory: java.lang.invoke.CallSite metafactory(java.lang.invoke.MethodHandles$Lookup,java.lang.String,java.lang.invoke.MethodType,java.lang.invoke.MethodType,java.lang.invoke.MethodHandle,java.lang.invoke.MethodType)>")
        //         output += "(methodtype: ";
        //         typePrinter = new TypePrinter(returnType);
        //         let outputString: string = typePrinter.printType();
        //         output +=  outputString;
        //         output += " __METHODTYPE__(";
        //         let inputTypesArray: string[] = [];
        //         let allinputTypesArray: string[] = [];
        //         inputTypes.forEach((type) => {
        //             typePrinter = new TypePrinter(type);
        //             inputTypesArray.push(typePrinter.printType());
        //         });
        //         allParametersTypes.forEach((type) => {
        //             typePrinter = new TypePrinter(type);
        //             allinputTypesArray.push(typePrinter.printType());
        //         });

        //         let inputString: string = inputTypesArray.join(",")
        //         output += inputString;
        //         output += "), methodhandle: \"REF_INVOKE_STATIC\" <";
        //         //这里加的是方法在哪个类声明 类的名字
        //         let classSig: ClassSignature = funcSig.getDeclaringClassSignature();
        //         output += Map.classSignatureMap(classSig.toString());
        //         output += ": ";
        //         typePrinter = new TypePrinter(returnType);
        //         output += typePrinter.printType();
        //         output += " ";
        //         //加方法名字
        //         let funcName: string = Map.methodNmaeMap(funcSig.getMethodSubSignature().getMethodName());
        //         output += funcName;
        //         output += ("(" + allinputTypesArray.join(",") + ")>,methodtype: " + outputString + " __METHODTYPE__(" 
        //             + inputString + "))"
        //         );
        //         return output;
        //     }
        // }
        //左Value = 右Value 
        let leftvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getLeftOp());
        output += leftvalueprinter.printValue();
        output += " = ";
        let rightvalueprinter: ValuePrinter = new ValuePrinter(this.stmt.getRightOp());
        //判断是否是 没有base的的实例字段引用
        if (this.stmt.getRightOp() instanceof ArkInstanceFieldRef){
            if (this.stmt.getRightOp().getType() instanceof UnknownType){
                output += rightvalueprinter.printRightUnknownInsFiledRef();
            }
            else {
                output += rightvalueprinter.printValue();
            }
        }
        
        else {
            output += rightvalueprinter.printValue();
        }
        
        return output.replace(/\svoid\s/g, ' object ');
    }

    public printInvokeStmt(): string{
        let output:string = "";
        let invokeExpr: AbstractInvokeExpr = this.stmt.getInvokeExpr();
        let exprPrinter: ValuePrinter;
        exprPrinter = new ValuePrinter(invokeExpr);
        output += exprPrinter.printValue();
        // if (checkArgNumber(output) > 0){
        //     console.log("不符合");
        // }
        return output;
    }
    
    private printReturnStmt(): string{
        let output: string = "return ";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.stmt.getOp());
        output += valuePrinter.printValue();
        return output;
    }

    private printReturnVoidStmt(): string{
        return "return";
    }

    public printSwitchStmt(): string{
        let strs: string[] = [];
        strs.push('switch(' + this.stmt.key + ') {');
        let nextblock: number = this.successor[0];
        for (const c of this.stmt.cases) {
            strs.push('case ');
            strs.push(c.toString());
            strs.push(': ');
            strs.push(this.printGotoStmt(nextblock));
            nextblock ++;
            strs.push(',\n');
        }

        strs.push('default : ');
        strs.push(this.printGotoStmt(nextblock));
        strs.push('\n}');
        const str = strs.join('');
        return str;

    }

    public printGotoStmt(index: number): string{
        return ("goto label" + index + ";\n");
    }

    public printThrowStmt():string{
        let output: string = "";
        let valuePrinter: ValuePrinter = new ValuePrinter(this.stmt.getOp());
        output += "throw " + valuePrinter.printValue();
        return output;
    }

    
}


