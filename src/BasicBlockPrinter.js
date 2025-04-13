"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicBlockPrinter = void 0;
var StmtPrinter_1 = require("./StmtPrinter");
var bundle_1 = require("../lib/bundle");
var BasicBlockPrinter = /** @class */ (function () {
    function BasicBlockPrinter(inputblock, ifstart) {
        var _this = this;
        this.stmts = [];
        this.successor = [];
        this.block = inputblock;
        this.stmts = this.block.getStmts();
        this.ifStart = ifstart;
        this.id = this.block.getId();
        this.block.getSuccessors().forEach(function (block) {
            _this.successor.push(block.getId());
        });
    }
    BasicBlockPrinter.prototype.printBlock = function () {
        var _this = this;
        //先打印label  开始BB不用打
        var output = "\n";
        if (this.ifStart) {
            //接下来遍历所有的stmt[],找到所有的assignmentstmt，判断是不是为idenetity
            var thisIdentityset_1 = [];
            var paraIdentityset_1 = [];
            var otherStmt_1 = [];
            this.stmts.forEach(function (stmt) {
                if (stmt instanceof bundle_1.ArkAssignStmt) {
                    //判断左对象
                    if (stmt.getRightOp() instanceof bundle_1.ArkThisRef) {
                        thisIdentityset_1.push(stmt);
                    }
                    else if (stmt.getRightOp() instanceof bundle_1.ArkParameterRef) {
                        paraIdentityset_1.push(stmt);
                    }
                    else {
                        otherStmt_1.push(stmt);
                    }
                }
                else {
                    otherStmt_1.push(stmt);
                }
            });
            var stmtprinter_1;
            //接下来先打印identityset里的
            thisIdentityset_1.forEach(function (stmt) {
                stmtprinter_1 = new StmtPrinter_1.StmtPrinter(stmt, _this.successor);
                output += stmtprinter_1.printIdentityStmt();
            });
            //打印para里的
            paraIdentityset_1.forEach(function (stmt) {
                stmtprinter_1 = new StmtPrinter_1.StmtPrinter(stmt, _this.successor);
                output += stmtprinter_1.printIdentityStmt();
            });
            //打印其他stmt
            for (var i = 0; i < otherStmt_1.length; i++) {
                var stmtprinter_2 = new StmtPrinter_1.StmtPrinter(otherStmt_1[i], this.successor);
                if (otherStmt_1[i] instanceof bundle_1.ArkIfStmt) {
                    output += stmtprinter_2.printStmt();
                    return output;
                }
                output += stmtprinter_2.printStmt();
            }
        }
        //不是开始BB
        else {
            output += "label".concat(this.id, ":") + "\n";
            for (var i = 0; i < this.stmts.length; i++) {
                var stmtprinter = new StmtPrinter_1.StmtPrinter(this.stmts[i], this.successor);
                if (this.stmts[i] instanceof bundle_1.ArkIfStmt) {
                    output += stmtprinter.printStmt();
                    return output;
                }
                output += stmtprinter.printStmt();
            }
        }
        //检查是否是最后的stmt是否为分支 且不是最后一个
        var lastStmt = this.block.getTail();
        if (lastStmt) {
            if (!lastStmt.isBranch()) {
                var stmtPrinter = new StmtPrinter_1.StmtPrinter(lastStmt, this.successor);
                if (this.successor.length > 0) {
                    if (this.successor[0] !== this.id + 1) {
                        output += stmtPrinter.printGotoStmt(this.successor[0]);
                    }
                }
            }
        }
        return output;
    };
    return BasicBlockPrinter;
}());
exports.BasicBlockPrinter = BasicBlockPrinter;
