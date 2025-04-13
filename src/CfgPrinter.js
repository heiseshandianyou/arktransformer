"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CfgPrinter = void 0;
var BasicBlockPrinter_1 = require("./BasicBlockPrinter");
var CfgPrinter = /** @class */ (function () {
    function CfgPrinter(inputcfg) {
        this.cfg = inputcfg;
        this.blocks = this.cfg.getBlocks();
        this.startBlock = this.cfg.getStartingBlock();
        // 将 Set 转换为数组
        var arrayFromSet = Array.from(this.blocks);
        // 根据 id排序
        this.orderBlocks = arrayFromSet.sort(function (a, b) { return a.getId() - b.getId(); });
    }
    CfgPrinter.prototype.printCfg = function () {
        //先打印开始BB
        var BBprinter;
        var output = "";
        if (!this.startBlock) {
            //按顺序打印
            this.orderBlocks.forEach(function (block) {
                BBprinter = new BasicBlockPrinter_1.BasicBlockPrinter(block, false);
                output += BBprinter.printBlock();
            });
            return output;
        }
        BBprinter = new BasicBlockPrinter_1.BasicBlockPrinter(this.startBlock, true);
        var startid = this.startBlock.getId();
        output += BBprinter.printBlock();
        //按顺序打印
        this.orderBlocks.forEach(function (block) {
            if (block.getId() != startid) {
                BBprinter = new BasicBlockPrinter_1.BasicBlockPrinter(block, false);
                output += BBprinter.printBlock();
            }
        });
        return output;
    };
    return CfgPrinter;
}());
exports.CfgPrinter = CfgPrinter;
