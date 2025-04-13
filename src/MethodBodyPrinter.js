"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodBodyPrinter = void 0;
var Map_1 = require("./Map");
var CfgPrinter_1 = require("./CfgPrinter");
var TypePrinter_1 = require("./TypePrinter");
var MethodBodyPrinter = /** @class */ (function () {
    function MethodBodyPrinter(inputBody) {
        this.locals = new Set();
        this.arkBody = inputBody;
    }
    MethodBodyPrinter.prototype.printBody = function () {
        //判断是否有方法体
        if (this.arkBody == undefined) {
            return ";\n";
        }
        else {
            var output_1 = "\n{\n";
            this.locals = this.arkBody.getLocals().values();
            var typePrinter_1;
            // 创建一个 string[]来存储分组后的 Set
            var groupedSets_1 = [];
            // 遍历元素 Set
            this.locals.forEach(function (local) {
                //提取他们的type类型
                typePrinter_1 = new TypePrinter_1.TypePrinter(local.getType());
                var localname = typePrinter_1.printType();
                //遍历所有的string
                var spaceIndex;
                var firstPart;
                var found = false;
                groupedSets_1.forEach(function (localstring, index) {
                    // 找到第一个空格的位置
                    spaceIndex = localstring.indexOf(' ');
                    // 提取第一个空格之前的内容
                    firstPart = spaceIndex !== -1 ? localstring.substring(0, spaceIndex) : localstring;
                    //比较                   
                    if (firstPart === localname) {
                        groupedSets_1[index] = localstring + (", " + local.getName());
                        found = true;
                    }
                });
                // 如果没有找到，创建一个新的 string
                if (!found) {
                    var newtypestring = localname + " " + local.getName();
                    groupedSets_1.push(newtypestring);
                }
            });
            //遍历每一个Set
            groupedSets_1.forEach(function (localSet) {
                output_1 += Map_1.Map.NameMap(localSet.replace(/void\s/g, 'object ')
                    .replace(/@/g, '') + ";" + "\n");
            });
            //接下来打印Cfg
            var cfgprinter = new CfgPrinter_1.CfgPrinter(this.arkBody.getCfg());
            output_1 += cfgprinter.printCfg();
            output_1 += "\n}\n";
            return output_1;
        }
    };
    return MethodBodyPrinter;
}());
exports.MethodBodyPrinter = MethodBodyPrinter;
