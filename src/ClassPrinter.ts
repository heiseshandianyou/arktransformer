import * as fs from 'fs';
import * as path from 'path';
import { Map } from './Map';
import { MethodPrinter } from './MethodPrinter';
import { FieldPrinter } from './FieldPrinter';
import { ArkNamespace, ArkClass, ArkField, ArkMethod,ClassSignature} from "../lib/bundle";

export class ClassPrinter{

    private arkClass: ArkClass;
    private arkFields: ArkField[];
    private arkMethods: ArkMethod[];
    private className: string;
    private classSignature: ClassSignature;
    private classcategory: ClassCategory;
    private qualifiedClassName: string;

    constructor(arkclass: ArkClass){
        this.arkClass = arkclass;
        this.arkFields = this.arkClass.getFields();
        this.arkMethods = this.arkClass.getMethods(true);
        this.classSignature = this.arkClass.classSignature;
        this.className = this.classSignature.getClassName();
        this.classcategory = this.arkClass.getCategory();
        if (this.classcategory === undefined 
            && this.className === "_DEFAULT_ARK_CLASS"){
                this.classcategory = ClassCategory.CLASS;
            }
        if (this.classcategory === undefined 
            && this.className === "@dummyClass"){
                this.classcategory = ClassCategory.CLASS;
            }

        //生成该类的qualifiedclassName
        //用所属名称空间和所属文件拼接一起 用classSignature的toString 方法
        //但是我们删掉开头的@和文件名的后缀“.ts”
        this.qualifiedClassName = this.classSignature.toString();
        this.qualifiedClassName = Map.classSignatureMap(this.qualifiedClassName);
    }

    public async print(){
        if (this.classcategory === ClassCategory.CLASS 
            || this.classcategory === ClassCategory.OBJECT
            || this.classcategory === ClassCategory.STRUCT
            || this.classcategory === ClassCategory.TYPE_LITERAL){
            await this.printClass();
        }
        else if (this.classcategory === ClassCategory.INTERFACE ){
            this.printInterface();
        }
        else {
            console.log("没有读取到类" + this.qualifiedClassName + "类型是" + this.classcategory);
        }
    }
     
    public async printClass():Promise<void>{
        //console.log("------------------------------------");
        //console.log("开始打印" + this.qualifiedClassName + "类");
        //在指定路径下建立属于自己的输出文件
        //创建文件名字为类名 this.classcategory === ClassCategory.CLASS 
        //&& this.className !== "_DEFAULT_ARK_CLASS"
        // 定义文件夹和文件的路径
        // 定义文件夹和文件的名字
        const folderName = 'jimpleOutput'; // 输出文件夹名字
        // //如果是_DEFAULT_ARK_CLASS 则我们在前面加文件名做区分
        // let fileNameString: string = this.className; // 要用作文件名的字符串
        
        // let declaringFileName: string = this.arkClass.getDeclaringArkFile().getName();
        // let decaringNameSpace: ArkNamespace | undefined = this.arkClass.getDeclaringArkNamespace();
        // let declaringNameSpaceName: string = "";
        // if (decaringNameSpace) {
        //     declaringNameSpaceName = decaringNameSpace.getName();
        // }
        
        // fileNameString = declaringFileName + declaringNameSpaceName + fileNameString;
            
        
        // fileNameString = Map.fileNameMap(Map.classSignatureMap(fileNameString));

        const fileExtension = '.jimple'; // 文件扩展名               
        const fileName = this.qualifiedClassName + fileExtension; // 创建完整的文件名
        // 定义文件夹和文件的路径
        const folderPath = path.join(__dirname, folderName);
        const filePath = path.join(folderPath, fileName);
        // 创建文件夹
        fs.mkdir(folderPath, { recursive: true }, (err) => {
            if (err) {
                console.error('Error creating folder:', err);
                return;
            }
        });
        
        //打印类标签
        let output: string;
        //类修饰符默认为public  文件名应该是全名
        output = "public class " + this.qualifiedClassName;
        //检查有没有继承的父类 父类我们加的是全名
        if (this.arkClass.getSuperClass()){
            output += (" extends " + 
                Map.classSignatureMap(this.arkClass.getSuperClass().getSignature().toString()));
        }
        else{
            output += (" extends java.lang.Object");
        }
        //有没有实现接口 接口我们只加了接口本身名字 接口也要全名？？
        let interfaces: string[] = this.arkClass.getImplementedInterfaceNames();
        // 使用 join 拼接数组元素
        if (interfaces.length > 0){
            const concatenatedString = interfaces.join(", ");
                output += " implements " + concatenatedString;
            }
        
        output += "\n{\n";

        //打印字段
        let fieldprinter: FieldPrinter;
        if (this.arkFields.length > 0){
            for (let i: number = 0; i < this.arkFields.length; i++ ){
                fieldprinter = new FieldPrinter(this.arkFields[i]);
                output += fieldprinter.printField();
            }
        }          
        let methodprinter: MethodPrinter;    
        for (let i:number = 0; i < this.arkMethods.length; i++){
            methodprinter = new MethodPrinter(this.arkMethods[i]);
            output += methodprinter.printMethod();
        }             
        output += "\n}\n"
        writeToFile(filePath, output); 
        output = "";    
        //console.log("打印完成" + this.qualifiedClassName + "类");
        //console.log("------------------------------------");       
    }

    public printInterface():void{
        //在指定路径下建立属于自己的输出文件
        if (this.classcategory === ClassCategory.INTERFACE
            && this.className !== "_DEFAULT_ARK_CLASS"){
            const folderName = 'jimpleoutput'; // 输出文件夹名字
            const fileNameString = this.qualifiedClassName; // 要用作文件名的字符串
            const fileExtension = '.jimple'; // 文件扩展名
            const fileName = fileNameString + fileExtension; // 创建完整的文件名
            const folderPath = path.join(__dirname, folderName);
            const filePath = path.join(folderPath, fileName);
            fs.mkdir(folderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error('Error creating folder:', err);
                    return;
                }
            });
            
            let output: string;
            //类修饰符默认为public  文件名应该是全名
            output = "public interface " + this.qualifiedClassName;
            //检查有没有继承的父类 父类我们加的是全名
            if (this.arkClass.getSuperClassName() != ""){
                output += (" extends " + Map.classSignatureMap(this.arkClass.getSuperClassName()));
            }
            else{
                output += (" extends java.lang.Object");
            }
            
            output += "\n{\n";
            
            //开始打印字段
            this.arkFields.forEach((field)=>{
                let fieldprinter: FieldPrinter = new FieldPrinter(field);
                output += fieldprinter.printField();
            });
            
            //开始打印方法
            let methodprinter: MethodPrinter;
            this.arkMethods.forEach((method) => {
                
                methodprinter = new MethodPrinter(method);
                output += methodprinter.printMethod();
            });
            
            output += "\n}\n"
            //写到对应文件
            writeToFile(filePath, output);
            output = "";
        }    
    }
}

export enum ClassCategory {
    CLASS = 0,
    STRUCT = 1,
    INTERFACE = 2,
    ENUM = 3,
    TYPE_LITERAL = 4,
    OBJECT = 5,
}

async function appendToFile(filePath: string, newText: string): Promise<void> {
    fs.appendFile(filePath, newText, (err) => {
        if (err) {
            console.error('写入文件时发生错误:' + filePath, err);
        }
    });
    
}

function writeToFile(filePath: string, newText: string): void {
    fs.writeFile(filePath, newText, (err) => {
        if (err) {
            console.error('写入文件时发生错误:' + filePath, err);
        }
    });
    
}

export function modifiers2stringArray(modifiers: number): string[] {
    let strs: string[] = [];
    for (let idx = 0; idx < MODIFIER_TYPE_STRINGS.length; idx++) {
        if (modifiers & 0x01) {
            strs.push(Map.modifierMap(MODIFIER_TYPE_STRINGS[idx]));
        }
        modifiers = modifiers >>> 1;
    }
    return strs;
}

const MODIFIER_TYPE_STRINGS = [
    'private',
    'protected',
    'public',
    'export',
    'static',
    'abstract',
    'async',
    'const',
    'accessor',
    'default',
    'in',
    'readonly',  
    'out',
    'override',
    'declare',
];

