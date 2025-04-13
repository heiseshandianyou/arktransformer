import { ValuePrinter } from './ValuePrinter';
import { StmtPrinter } from './StmtPrinter';
import { BasicBlockPrinter } from './BasicBlockPrinter';
import { BasicBlock,Cfg } from "../lib/bundle";

export class CfgPrinter{
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
        let BBprinter: BasicBlockPrinter;
        let output = "";
        if (!this.startBlock){
            //按顺序打印
            this.orderBlocks.forEach((block) =>{
                
                BBprinter = new BasicBlockPrinter(block, false);
                output += BBprinter.printBlock();
                
            });
            return output;
        }
        BBprinter = new BasicBlockPrinter(this.startBlock, true);
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
