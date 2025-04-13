import { modifiers2stringArray } from './ClassPrinter';
import { Map } from './Map';
import { MethodBodyPrinter } from './MethodBodyPrinter';
import { TypePrinter } from './TypePrinter';
import { MethodParameter,Type,ArkMethod } from "../lib/bundle";

export class MethodPrinter{

    private arkMethod: ArkMethod;
    private modifiers: string[];
    private methodName: string;
    private returntype: Type;
    private parameters: MethodParameter[];
    
    

    constructor(inputMethod: ArkMethod){
        this.arkMethod = inputMethod;
        this.methodName = Map.NameMap(this.arkMethod.getName());
        if (this.methodName === "@instance_init"){
            this.methodName = "instance_init";
        }
        if (this.methodName === "@static_init"){
            this.methodName = "<clinit>";
        }
        if (this.methodName === "constructor"){
            this.methodName = "<init>";
        }
        this.modifiers = modifiers2stringArray(this.arkMethod.getModifiers());
        
        this.returntype = this.arkMethod.getReturnType();
        this.parameters = this.arkMethod.getParameters();
        
        
    }

   
    //打印方法
    public printMethod(): string{
        
        // if (this.methodName == "<clinit>"){
        //     if (this.arkMethod.getBody()){
        //         if (this.arkMethod.getBody().getCfg().getStmts().length <= 2 ){
        //             return "";
        //         }
        //     }
        // }

        //修饰符 返回类型  名字 参数
        let output: string = "\n";
        if (this.methodName == "<init>"){
            output += "public ";
        }else if (this.methodName == "<clinit>"){
            output += "static ";
        }
        else if (this.modifiers.length > 0){
            output += this.modifiers.join(" ");
            output += " ";
        }
        let typeprinter: TypePrinter;
        if (this.methodName == "<init>"){
            output += "void " + Map.methodNmaeMap(this.methodName) + " ";
        }
        else{
            typeprinter = new TypePrinter(this.returntype);
            output += typeprinter.printType() + " " + Map.methodNmaeMap(this.methodName) + " ";
        }
        
        
        let paraTypes: Type[] = this.parameters.map((parameter) => parameter.getType());
        let paraString: String[] = [];
        for (let i: number = 0; i < paraTypes.length; i++){
            typeprinter = new TypePrinter(paraTypes[i]);
            paraString.push(typeprinter.printType());
        }
        output += "(" + paraString.join(", ") + ")";
        
        //接下来打印 方法体
        let bodyPrinter: MethodBodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody());
        output += bodyPrinter.printBody();
        return output;
    }

    //用来打印constructor 被优化
    public printInit(): string{
        let output: string = "";
        output += "\npublic void <init>";
        //打印参数列表
        output += "("
        let typeprinter: TypePrinter;
        let paraString: string[] = [];
        this.parameters.forEach((parameter) =>{
            typeprinter = new TypePrinter(parameter.getType());
            paraString.push(typeprinter.printType());
        });
        output += paraString.join(", ") +  ")";
        //打印方法体 这里需要特别构筑
        let bodyPrinter: MethodBodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody());
        output += bodyPrinter.printBody();
        return output;
    }
}