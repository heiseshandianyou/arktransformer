import {Value, Type, FileSignature, ClassType,NamespaceSignature, MethodSignature, FieldSignature, ClassSignature} from "../lib/bundle";

import {TypePrinter} from "./TypePrinter";

import { Map } from "./Map";

export class MethodSignaturePrinter{
    private values: Value[];
    private methodSignature: MethodSignature;
    constructor(inputsig: MethodSignature, values: Value[]){
        this.methodSignature = inputsig;
        this.values = values;
    }
    //< classtype : 返回类型 函数名（参数类型）>
    public printMethodSig():string{


        //得到函数名
        let methodname:string = this.methodSignature.getMethodSubSignature().getMethodName();
        if (methodname == "constructor"){
            methodname = "<init>";
        }
        if (methodname == "@instance_init"){
            methodname = "instance_init";
        }
        if (methodname == "@static_init"){
            methodname = "<clinit>";
        }
        if (methodname == "catch"){
            methodname = "Catch";
        }
        let output:string = "<"; 
        let declaredclasstype: ClassType = this.methodSignature.getDeclaringClassSignature().getType();
        //得到classtype
        let typeprinter: TypePrinter = new TypePrinter(declaredclasstype);
        output += typeprinter.printType() + " : ";
        //得到返回类型
        if (methodname == "<init>" || methodname == "<clinit>" || methodname == "instance_init"){
            output += " void "
        } else{
            typeprinter = new TypePrinter(this.methodSignature.getType());
            output += typeprinter.printType() + " ";
            
            
        }
       
        output += Map.methodNmaeMap(methodname);
        //参数类型 这里和methodprinter那里一样
        //得到参数类型
        let argsType: Type[] = this.methodSignature.getMethodSubSignature().getParameterTypes();
        let argsTypeString: String[] = []; 
       
        if (this.values.length > argsType.length){
            let i: number = this.values.length - argsType.length;
            // console.log("找到了不一样");
            // console.log(argsType);
            // console.log(this.values);
            for (i =  this.values.length - i; i < this.values.length; i++){
                argsType.push(this.values[i].getType());               
            }
            // console.log(argsType);
        }

        argsType.forEach((argType) => {
            typeprinter = new TypePrinter(argType);
            argsTypeString.push(typeprinter.printType());
        });
                  
        
        output += "( " + argsTypeString.join(", ") + ")>";
        return output;
    }
} 

export class FieldSignaturePrinter{
    private fieldSignature: FieldSignature;
    constructor(inputsig: FieldSignature){
        this.fieldSignature = inputsig;
    }
    //如果不是类的字段 而是名称空间的字段怎么办？？


    //< classtype : 字段类型 字段名>
    public printFieldSig():string{
        if (this.fieldSignature.getDeclaringSignature() instanceof ClassSignature){
            let output:string = "<"; 
        
            let declaredclasstype: ClassType = this.fieldSignature.getDeclaringSignature().getType();
            //得到classtype
            let typeprinter: TypePrinter = new TypePrinter(declaredclasstype);
            output += typeprinter.printType() + " : ";
            //得到字段类型
            typeprinter = new TypePrinter(this.fieldSignature.getType());
            output += typeprinter.printType() + " ";
            //得到字段名
            let fieldName:string = this.fieldSignature.getFieldName();
            output += Map.NameMap(fieldName);
            return output + ">";
        }
        //如果是名称空间的字段 就<文件名.名称空间名 : 字段类型  字段名 >
        else if (this.fieldSignature.getDeclaringSignature() instanceof NamespaceSignature){
            console.log("打印");
            let output:string = "<"; 
            let declaredNameSpaceSig: NamespaceSignature = this.fieldSignature.getDeclaringSignature();
            let nameSpaceSigPrinter: NamespaceSignaturePrinter = new NamespaceSignaturePrinter(declaredNameSpaceSig);
            output += nameSpaceSigPrinter.printNameSpaceSig();
            output += ": "
            let typeprinter: TypePrinter;
            //得到字段类型
            typeprinter = new TypePrinter(this.fieldSignature.getType());
            output += typeprinter.printType() + " ";
            //得到字段名
            let fieldName:string = this.fieldSignature.getFieldName();
            output += fieldName;
            return output + ">";
        }
        return "";
    }

}

export class NamespaceSignaturePrinter{
    private NameSpaceSig: NamespaceSignature;
    constructor(inputNameSig: NamespaceSignature) {
        this.NameSpaceSig = inputNameSig;
    }

    public printNameSpaceSig(): string{
        let output: string = "";
        if (this.NameSpaceSig.declaringNamespaceSignature) {
            let spaceSigPrinter: NamespaceSignaturePrinter = new NamespaceSignaturePrinter(this.NameSpaceSig.declaringNamespaceSignature);
            output += (spaceSigPrinter.printNameSpaceSig() + '.' + this.NameSpaceSig.namespaceName);
        } else {
            let fileSigPrinter: FileSigPrinter = new FileSigPrinter(this.NameSpaceSig.declaringFileSignature);
            output += fileSigPrinter.printFileSig() + "." + this.NameSpaceSig.namespaceName;

        }
        return output;
    }
}

export class FileSigPrinter{
    private fileSig: FileSignature;

    constructor(inputSig: FileSignature){
        this.fileSig = inputSig;
    }

    public printFileSig(): string{
        //输出是 项目名.文件名
        let output: string = "";
        output += (this.fileSig.getProjectName() + "." + Map.fileNameMap(this.fileSig.getFileName()));
        return output;
    }
}