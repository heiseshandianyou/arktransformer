import {Type,ArkField} from "../lib/bundle";
import { modifiers2stringArray } from "./ClassPrinter"
import { TypePrinter } from "./TypePrinter";
import { Map } from "./Map";
export class FieldPrinter{
    private arkField: ArkField;
    private modifiers: string[];
    private fieldNmae: string;
    private fieldType: Type;
    
    constructor(inputFiled:ArkField) {
        this.arkField = inputFiled;
        
        //提取修饰符
        let modifier:number = this.arkField.getModifiers();
        this.modifiers = modifiers2stringArray(modifier);
        //提取类型
        this.fieldType = this.arkField.getType();
        //提取名字
        this.fieldNmae = this.arkField.getSignature().getFieldName();

    }

    public printField(): string{
        
        let output: string = "";
        if (this.modifiers.length > 0){
            output += this.modifiers.join(" ");
            output += " ";
        }
        
        let typeprinter: TypePrinter = new  TypePrinter(this.fieldType);
        output += typeprinter.printType();
        output += " " + Map.NameMap(this.fieldNmae) + ";\n";
        return (output);
    }
}