import * as fs from 'fs';
import * as path from 'path';
import { ValuePrinter } from './ValuePrinter';
import { StmtPrinter } from './StmtPrinter';
import { ArkIfStmt,BasicBlock, Local,
    MethodParameter,Type,MethodSubSignature, SceneConfig, 
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,
    MethodSignature, FieldSignature,
    AbstractExpr,} from "../lib/bundle";


export enum ClassCategory {
    CLASS = 0,
    STRUCT = 1,
    INTERFACE = 2,
    ENUM = 3,
    TYPE_LITERAL = 4,
    OBJECT = 5,
}

export class ClassPrinter{

    private arkClass: ArkClass;
    private arkFields: ArkField[];
    private arkMethods: ArkMethod[];
    private className: string;
    private classSignature: ClassSignature;
    private classcategory: ClassCategory;
    private qualifiedClassName: string;
    private finaloutput:string = "";

    constructor(arkclass: ArkClass){
        this.arkClass = arkclass;
        this.arkFields = this.arkClass.getFields();
        this.arkMethods = this.arkClass.getMethods(true);
        this.classSignature = this.arkClass.classSignature;
        this.className = this.classSignature.getClassName();
        this.classcategory = this.arkClass.getCategory();
        //生成该类的qualifiedclassName
        //用所属名称空间和所属文件拼接一起 用classSignature的toString 方法
        //但是我们删掉开头的@和文件名的后缀“.ts”
        this.qualifiedClassName = this.classSignature.toString();
        this.qualifiedClassName = Map.classSignatureMap(this.qualifiedClassName);
        console.log("构建" + this.qualifiedClassName + "打印机");
    }

    public print(){
        if (this.classcategory === ClassCategory.CLASS 
            || this.classcategory === ClassCategory.OBJECT
            || this.classcategory === ClassCategory.STRUCT){
            this.printClass();
        }
        else if (this.classcategory === ClassCategory.INTERFACE ){
            this.printInterface();
        }
    }
     
    public printClass():void{
        console.log("开始打印" + this.className + "类");
        //在指定路径下建立属于自己的输出文件
        //我们只会对类
        
                //创建文件名字为类名 this.classcategory === ClassCategory.CLASS 
            //&& this.className !== "_DEFAULT_ARK_CLASS"
                // 定义文件夹和文件的路径
                // 定义文件夹和文件的名字
                const folderName = 'jimpleoutput'; // 输出文件夹名字
                const fileNameString = this.className; // 要用作文件名的字符串
                const fileExtension = '.jimple'; // 文件扩展名

                // 使用字符串变量构建文件名
                const fileName = fileNameString + fileExtension; // 创建完整的文件名
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
                if (this.arkClass.getSuperClassName() != ""){
                    output += (" extends " + Map.classSignatureMap(this.arkClass.getSuperClassName()));
                }
                //有没有实现接口 接口我们只加了接口本身名字
                let interfaces: string[] = this.arkClass.getImplementedInterfaceNames();
                // 使用 join 拼接数组元素
                if (interfaces.length > 0){
                    const concatenatedString = interfaces.join(", ");
                    output += " implements " + concatenatedString + "\n{\n";
                }
                else{
                    output += "\n{\n";
                }
                //写到对应文件
                
                writeToFile(filePath, output);
                //开始打印字段
                this.arkFields.forEach((field)=>{
                    let fieldprinter: FiledPrinter = new FiledPrinter(field, filePath);
                    this.finaloutput += fieldprinter.printFiled();
                });
                //开始打印方法
                //打印初始方法
                let methodprinter: MethodPrinter;
                //先打印构造方法 <init>
                //检查有没有自定义构造方法  有些类是没有的
        
                this.arkMethods.forEach((method) => {
                    if (method.getName() == "constructor"){
                        methodprinter = new MethodPrinter(method, filePath);
                        this.finaloutput += methodprinter.printInit();
                    }
                    if (method.getName() != "constructor" 
                    && method.getName() != "@static_init"){
                        methodprinter = new MethodPrinter(method, filePath);
                        this.finaloutput += methodprinter.printMethod();
                    }

                });
                this.finaloutput += "\n}\n"
                appendToFile(filePath, this.finaloutput);     
                console.log("打印完成" + this.className + "类");
               
    }

    public printInterface():void{
        //在指定路径下建立属于自己的输出文件
        if (this.classcategory === ClassCategory.INTERFACE
            && this.className !== "_DEFAULT_ARK_CLASS"){
            //创建文件名字为类名 this.classcategory === ClassCategory.CLASS 
            //&& this.className !== "_DEFAULT_ARK_CLASS"
            // 定义文件夹和文件的路径
            // 定义文件夹和文件的名字
            const folderName = 'jimpleoutput'; // 输出文件夹名字
            const fileNameString = this.className; // 要用作文件名的字符串
            const fileExtension = '.jimple'; // 文件扩展名

            // 使用字符串变量构建文件名
            const fileName = fileNameString + fileExtension; // 创建完整的文件名
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
            output = "public interface " + this.qualifiedClassName;
            //检查有没有继承的父类 父类我们加的是全名
            if (this.arkClass.getSuperClassName() != ""){
                output += (" extends " + Map.classSignatureMap(this.arkClass.getSuperClassName()));
            }
            
            output += "\n{\n";
            
            //写到对应文件
            writeToFile(filePath, output);
            //开始打印字段
            this.arkFields.forEach((field)=>{
                let fieldprinter: FiledPrinter = new FiledPrinter(field, filePath);
                this.finaloutput += fieldprinter.printFiled();
            });
            //开始打印方法
            //先打印构造方法
            //检查有没有自定义构造方法
            let methodprinter: MethodPrinter;
            this.arkMethods.forEach((method) => {
                if (method.getName() == "constructor"){
                    methodprinter = new MethodPrinter(method, filePath);
                    this.finaloutput += methodprinter.printInit();
                }
            });
            //打印一般方法
            this.arkMethods.forEach((method) => {
                if (method.getName() != "constructor"){
                    methodprinter = new MethodPrinter(method, filePath);
                    this.finaloutput += methodprinter.printMethod();
                }
            });
            this.finaloutput += "\n}\n"
            appendToFile(filePath, this.finaloutput);
        }    
    }
}

export class MethodPrinter{

    private arkMethod: ArkMethod;
    private modifiers: string[];
    private methodName: string;
    private returntype: Type;
    private parameters: MethodParameter[];
    private outputPath: string;
    

    constructor(inputMethod: ArkMethod, outputpath: string){
        this.arkMethod = inputMethod;
        this.methodName = Map.NameMap(this.arkMethod.getName());
        if (this.methodName === "@instance_init"){
            this.methodName = "instance_init";
        }
        if (this.methodName === "constructor"){
            this.methodName = "<init>";
        }
        this.modifiers = modifiers2stringArray(this.arkMethod.getModifiers());
        if (this.modifiers.length == 0){
            this.modifiers.push("public");
        }
        this.returntype = this.arkMethod.getReturnType();
        this.parameters = this.arkMethod.getParameters();
        this.outputPath = outputpath;
        
    }
    //打印方法
    public printMethod(): string{
        //修饰符 返回类型  名字 参数
        let output: string = "\n";
        output += this.modifiers.join(" ");   
        output += " " + this.returntype.toString() + " " + this.methodName + " ";
        //这里要改成Typeprinter
        let paraTypes: Type[] = this.parameters.map((parameter) => parameter.getType());
        let paraString: String[] = paraTypes.map((para) => para.toString());
        output += "(" + paraString.join(", ") + ")";
        
        //接下来打印 方法体
        let bodyPrinter: MethodBodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody(), this.outputPath);
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
        output += paraString.join(", ") +  ")\n";
        //打印方法体 这里需要特别构筑
        let bodyPrinter: MethodBodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody(), this.outputPath);
        output += bodyPrinter.printBody();
        return output;
    }
}

export class FiledPrinter{
    private arkFiled: ArkField;
    private modifiers: string[];
    private fieldNmae: string;
    private outputPath: string;
    private fieldType: Type;
    
    constructor(inputFiled:ArkField, outputpath: string) {
        this.arkFiled = inputFiled;
        this.outputPath = outputpath;
        //提取修饰符
        let modifier:number = this.arkFiled.getModifiers();
        this.modifiers = modifiers2stringArray(modifier);
        //提取类型
        this.fieldType = this.arkFiled.getType();
        //提取名字
        this.fieldNmae = this.arkFiled.getSignature().getFieldName();

    }

    public printFiled(): string{
        let output: string = "";
        output += this.modifiers.join(" ");
        
        let typeprinter: TypePrinter = new  TypePrinter(this.fieldType);
        output += " " + typeprinter.printType();
        output += " " + this.fieldNmae + ";\n";
        return (output);
    }
}

export class MethodBodyPrinter{
    private arkBody: ArkBody;
    private outputPath: string;
    private locals: Set<Local> = new Set<Local>();


    constructor(inputBody: ArkBody, outputPath: string){
        this.arkBody = inputBody;
        this.outputPath = outputPath;
    }
    public printBody():string{
        //判断是否有方法体
        if (this.arkBody == undefined){
            return ";\n";
        }
        else{
            let output: string = "\n{\n";
            this.locals = this.arkBody.getLocals().values();
            
            // 创建一个 string[]来存储分组后的 Set
            let groupedSets: string[] = [];
            // 遍历元素 Set
            this.locals.forEach(local => {
                //提取他们的type类型
                let localname: string = Map.classSignatureMap(local.getType().toString());
                //遍历所有的string
                let spaceIndex: number;
                let firstPart: string;
                let found: boolean = false;
                groupedSets.forEach((localstring, index) =>{
                    // 找到第一个空格的位置
                     spaceIndex = localstring.indexOf(' ');
                    // 提取第一个空格之前的内容
                    firstPart = spaceIndex !== -1 ? localstring.substring(0, spaceIndex) : localstring;            
                    //比较                   
                    if (firstPart === localname){
                        groupedSets[index] = localstring + (", " + local.getName());
                        found = true;
                    }
                });            
                // 如果没有找到，创建一个新的 string
                if (!found) {
                    let newtypestring = localname + " " + local.getName();
                    groupedSets.push(newtypestring);
                }
            });
            //遍历每一个Set
            groupedSets.forEach((localSet) => {
                output += Map.NameMap(localSet + ";" + "\n");
            });            
            //接下来打印Cfg
            let cfgprinter: CfgPrinter = new CfgPrinter(this.arkBody.getCfg());
            output += cfgprinter.printCfg();
            output += "\n}\n"
            return output;
        }
    }
}

class CfgPrinter{
    private cfg: Cfg;
    private blocks: Set<BasicBlock>;
    private orderBlocks: BasicBlock[];
    private startBlock: BasicBlock;

    constructor(inputcfg: Cfg){
        this.cfg = inputcfg;
        this.blocks = this.cfg.getBlocks();
        this.startBlock = this.cfg.getStartingBlock();
        // 将 Set 转换为数组
        const arrayFromSet = Array.from(this.blocks);
        // 根据 id排序
        this.orderBlocks = arrayFromSet.sort((a, b) => a.getId() - b.getId());
    }

    public printCfg(): string{
        //先打印开始BB
        let output = "";
        let BBprinter: BasicBlockPrinter = new BasicBlockPrinter(this.startBlock, true);
        let startid: number = this.startBlock.getId();
        output += BBprinter.printBlock();
        //按顺序打印
        this.orderBlocks.forEach((block) =>{
            if(block.getId() != startid){
                BBprinter = new BasicBlockPrinter(block, false);
                output += BBprinter.printBlock();
            }
        });
        return output;
    }
}

class BasicBlockPrinter{
    private block: BasicBlock;
    private stmts: Stmt[] = [];
    private ifStart:boolean;
    private id: number;
    private successor: number[] = [];
    
    constructor(inputblock: BasicBlock, ifstart: boolean){
        this.block = inputblock;
        this.stmts = this.block.getStmts();
        this.ifStart = ifstart;
        this.id = this.block.getId();
        this.block.getSuccessors().forEach((block:BasicBlock) =>{
            this.successor.push(block.getId());
        });
    }
    public printBlock(): string{
        //先打印label  开始BB不用打
        let output:string = "\n";
        if(this.ifStart){
            //接下来遍历所有的stmt[],找到所有的assignmentstmt，判断是不是为idenetity
            let thisIdentityset: Stmt[] = [];
            let paraIdentityset: Stmt[] = [];
            let otherStmt: Stmt[] = [];
            this.stmts.forEach((stmt) => {
                if (stmt instanceof ArkAssignStmt){
                    //判断左对象
                    if (stmt.getRightOp() instanceof ArkThisRef ){
                        thisIdentityset.push(stmt);
                    }
                    else if (stmt.getRightOp() instanceof ArkParameterRef){
                        paraIdentityset.push(stmt);
                    }
                    else{
                        otherStmt.push(stmt);
                    }                  
                }
                else {
                    otherStmt.push(stmt);
                }
            });
            
            let stmtprinter: StmtPrinter;
            //接下来先打印identityset里的
            thisIdentityset.forEach((stmt) => {
                stmtprinter = new StmtPrinter(stmt, this.successor);
                output += stmtprinter.printIdentityStmt();
            });
            //打印para里的
            paraIdentityset.forEach((stmt) => {
                stmtprinter = new StmtPrinter(stmt, this.successor);
                output += stmtprinter.printIdentityStmt();
            });
            //打印其他stmt
            otherStmt.forEach((stmt) => {
                let stmtprinter: StmtPrinter = new StmtPrinter(stmt, this.successor);
                output += stmtprinter.printStmt();
            });
            
        }
        //不是开始BB
        else{
            output += `label${this.id}:` + "\n";
            this.stmts.forEach((stmt) =>{
                let stmtprinter: StmtPrinter = new StmtPrinter(stmt, this.successor);
                output += stmtprinter.printStmt();
            });
        }
        //检查是否是最后的stmt是否为分支 且不是最后一个
        let lastStmt: Stmt = this.block.getTail();
        if (lastStmt){
            if (!lastStmt.isBranch()){
                let stmtPrinter: StmtPrinter = new StmtPrinter(lastStmt, this.successor);
                if (this.successor.length > 0){
                    if (this.successor[0] !== this.id + 1){
                        output += stmtPrinter.printGotoStmt(this.successor[0]);
                    }
                    
                }
            }
        }
        

        return output;
    }
} 


export class Map{

    public static classSignatureMap(input: string):string{
        //原本的类签名tostring
        // @demo_Project/demo_Project/src/models/book.ts: helloworld
        //
        return (input
            .replace(/^@/, '')//删掉开头的@
            .replace(/\//g, '.') //把/ 变成 .
            .replace(/\.ts: /g, 'ts.')//.ts: 变为ts.
            .replace(/\.ets: /g, 'ets.')//.ts: 变为ets.
            .replace(/:\s*$/, '.')//删掉最后的:
            .replace(/[.\s]+$/, '')
            .replace(/ /g, '.') // 所有空格变成点
            .replace(/:/g, '')//删除所有:
            .replace(/[-()]/g, '_')
            );
    }

    public static initMethodMap(input: string):string{
        return input;
    }

    public static cinitMethodMap(input: string):string{
        return input;
    }

    public static NameMap(input: string):string{
        return (input.replace(/-/g, '_'));
    }

    public static typeMap(input: string):string{
        return (input.replace(/[-()]/g, '_'));
    }

    

} 

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
            output += Map.classSignatureMap(this.type.toString());
            
        }
        else{
            output += this.type.toString();
        }
        return (output);
    }

}

async function appendToFile(filePath: string, newText: string): Promise<void> {
    fs.appendFile(filePath, newText, (err) => {
        if (err) {
            console.error('写入文件时发生错误:', err);
        } else {
            console.log('文件已成功写入。' + filePath);
        }
    });
}

function writeToFile(filePath: string, newText: string): void {
    fs.writeFile(filePath, newText, (err) => {
        if (err) {
            console.error('写入文件时发生错误:', err);
        } else {
            console.log('文件已成功写入。' + filePath);
        }
    });
}

//将修饰符从number转为string[]
function modifiers2stringArray(modifiers: number): string[] {
    let strs: string[] = [];
    for (let idx = 0; idx < MODIFIER_TYPE_STRINGS.length; idx++) {
        if (modifiers & 0x01) {
            strs.push(MODIFIER_TYPE_STRINGS[idx]);
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
    'final',  //原本是 readonly
    'out',
    'override',
    'declare',
];