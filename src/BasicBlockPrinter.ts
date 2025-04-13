
import { StmtPrinter } from './StmtPrinter';
import { ArkIfStmt, BasicBlock,Stmt,ArkAssignStmt, ArkThisRef, ArkParameterRef} from "../lib/bundle";


export class BasicBlockPrinter{
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
            for (let i:number = 0; i < otherStmt.length; i++){
                let stmtprinter: StmtPrinter = new StmtPrinter(otherStmt[i], this.successor);
                if (otherStmt[i] instanceof ArkIfStmt){
                    output += stmtprinter.printStmt();
                    return output;
                }
                output += stmtprinter.printStmt();
            }

        }
        //不是开始BB
        else{
            output += `label${this.id}:` + "\n";

            for (let i:number = 0; i < this.stmts.length; i++){
                let stmtprinter: StmtPrinter = new StmtPrinter(this.stmts[i], this.successor);
                if (this.stmts[i] instanceof ArkIfStmt){
                    output += stmtprinter.printStmt();
                    return output;
                }
                output += stmtprinter.printStmt();
            }
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