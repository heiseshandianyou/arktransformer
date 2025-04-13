import { Map } from "./Map"; 

import {Type, ClassType, FunctionType, NeverType, UnionType, 
    ArrayType, UnknownType, NumberType, StringType, VoidType,
    MethodSignature} from "../lib/bundle";
import { MethodSignaturePrinter } from "./SignaturePrinter";
import { MethodParameter } from "./CheckType";

//用来打印Type类
export class TypePrinter{
    private type: Type;
    constructor(inputtype: Type){
        this.type = inputtype;
    }
    public printType():string{
        let output:string = "";
        if (this.type instanceof ClassType){
            //jimple需要返回fullyqualifiedname
            let classString: string = Map.classSignatureMap(this.type.toString());
            if (classString === "_UnknownProjectName._UnknownFileName") {
                classString = "java.lang.Object";
            }
            if (classString === "_UnknownProjectName._UnknownFileName.java.util.ArrayList") {
                classString = "java.util.ArrayList";
            }  
            output += classString;
            
        }
        else if (this.type instanceof FunctionType){
            // 这个也要改 改成对应的类名
            let funcSig: MethodSignature = this.type.getMethodSignature();
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
            
            //得到项目名称
            let projectName: string = funcSig.getDeclaringClassSignature().getDeclaringFileSignature().getProjectName();
            output += (projectName + ".funcInterfaceFile." + interfaceName);    
            
        }
        else if (this.type instanceof NeverType){
            output += "void";
        }
        else if (this.type instanceof UnionType){
            output += "java.lang.Object";
        }
        else if (this.type instanceof ArrayType){
            let basetype: Type = this.type.getBaseType();
            let typeprinter: TypePrinter = new TypePrinter(basetype);
            output += typeprinter.printType();
            for (let i = 0; i < this.type.getDimension(); i++) {
                output += '[]';
            }
        }
        else if (this.type instanceof UnknownType){
            output += "java.lang.Object";
        }
        else if (this.type instanceof NumberType){
            output += "int"
        }
        else if (this.type instanceof StringType){
            output += "java.lang.String"
        }
        else{
            output += this.type.toString();
        }
        if (output.includes("<")){
            return "java.util.ArrayList";
        }
        return (output);
    }

}