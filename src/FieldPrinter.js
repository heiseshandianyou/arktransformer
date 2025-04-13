"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldPrinter = void 0;
var ClassPrinter_1 = require("./ClassPrinter");
var TypePrinter_1 = require("./TypePrinter");
var Map_1 = require("./Map");
var FieldPrinter = /** @class */ (function () {
    function FieldPrinter(inputFiled) {
        this.arkField = inputFiled;
        //提取修饰符
        var modifier = this.arkField.getModifiers();
        this.modifiers = (0, ClassPrinter_1.modifiers2stringArray)(modifier);
        //提取类型
        this.fieldType = this.arkField.getType();
        //提取名字
        this.fieldNmae = this.arkField.getSignature().getFieldName();
    }
    FieldPrinter.prototype.printField = function () {
        var output = "";
        if (this.modifiers.length > 0) {
            output += this.modifiers.join(" ");
            output += " ";
        }
        var typeprinter = new TypePrinter_1.TypePrinter(this.fieldType);
        output += typeprinter.printType();
        output += " " + Map_1.Map.NameMap(this.fieldNmae) + ";\n";
        return (output);
    };
    return FieldPrinter;
}());
exports.FieldPrinter = FieldPrinter;
