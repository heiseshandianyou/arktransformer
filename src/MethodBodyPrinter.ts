import { Map } from "./Map";
import { CfgPrinter } from "./CfgPrinter";
import { Local, ArkBody} from "../lib/bundle";
import { TypePrinter } from "./TypePrinter";

export class MethodBodyPrinter{
    private arkBody: ArkBody;
    
    private locals: Set<Local> = new Set<Local>();


    constructor(inputBody: ArkBody){
        this.arkBody = inputBody;
    }
    public printBody():string{
        //判断是否有方法体
        if (this.arkBody == undefined){
            return ";\n";
        }
        else{
            let output: string = "\n{\n";
            this.locals = this.arkBody.getLocals().values();
            let typePrinter: TypePrinter;
            // 创建一个 string[]来存储分组后的 Set
            let groupedSets: string[] = [];
            // 遍历元素 Set
            this.locals.forEach(local => {
                //提取他们的type类型
                typePrinter = new TypePrinter(local.getType());
                let localname: string = typePrinter.printType();              
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
                output += Map.NameMap(localSet.replace(/void\s/g, 'object ')
                .replace(/@/g, '') + ";" + "\n");
            });            
            //接下来打印Cfg
            let cfgprinter: CfgPrinter = new CfgPrinter(this.arkBody.getCfg());
            output += cfgprinter.printCfg();
            output += "\n}\n"
            return output;
        }
    }
}