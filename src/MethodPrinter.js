"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodPrinter = void 0;
var ClassPrinter_1 = require("./ClassPrinter");
var Map_1 = require("./Map");
var MethodBodyPrinter_1 = require("./MethodBodyPrinter");
var TypePrinter_1 = require("./TypePrinter");
var MethodPrinter = /** @class */ (function () {
    function MethodPrinter(inputMethod) {
        this.arkMethod = inputMethod;
        this.methodName = Map_1.Map.NameMap(this.arkMethod.getName());
        if (this.methodName === "@instance_init") {
            this.methodName = "instance_init";
        }
        if (this.methodName === "@static_init") {
            this.methodName = "<clinit>";
        }
        if (this.methodName === "constructor") {
            this.methodName = "<init>";
        }
        this.modifiers = (0, ClassPrinter_1.modifiers2stringArray)(this.arkMethod.getModifiers());
        this.returntype = this.arkMethod.getReturnType();
        this.parameters = this.arkMethod.getParameters();
    }
    //打印方法
    MethodPrinter.prototype.printMethod = function () {
        // if (this.methodName == "<clinit>"){
        //     if (this.arkMethod.getBody()){
        //         if (this.arkMethod.getBody().getCfg().getStmts().length <= 2 ){
        //             return "";
        //         }
        //     }
        // }
        //修饰符 返回类型  名字 参数
        var output = "\n";
        if (this.methodName == "<init>") {
            output += "public ";
        }
        else if (this.methodName == "<clinit>") {
            output += "static ";
        }
        else if (this.modifiers.length > 0) {
            output += this.modifiers.join(" ");
            output += " ";
        }
        var typeprinter;
        if (this.methodName == "<init>") {
            output += "void " + Map_1.Map.methodNmaeMap(this.methodName) + " ";
        }
        else {
            typeprinter = new TypePrinter_1.TypePrinter(this.returntype);
            output += typeprinter.printType() + " " + Map_1.Map.methodNmaeMap(this.methodName) + " ";
        }
        var paraTypes = this.parameters.map(function (parameter) { return parameter.getType(); });
        var paraString = [];
        for (var i = 0; i < paraTypes.length; i++) {
            typeprinter = new TypePrinter_1.TypePrinter(paraTypes[i]);
            paraString.push(typeprinter.printType());
        }
        output += "(" + paraString.join(", ") + ")";
        //接下来打印 方法体
        var bodyPrinter = new MethodBodyPrinter_1.MethodBodyPrinter(this.arkMethod.getBody());
        output += bodyPrinter.printBody();
        return output;
    };
    //用来打印constructor 被优化
    MethodPrinter.prototype.printInit = function () {
        var output = "";
        output += "\npublic void <init>";
        //打印参数列表
        output += "(";
        var typeprinter;
        var paraString = [];
        this.parameters.forEach(function (parameter) {
            typeprinter = new TypePrinter_1.TypePrinter(parameter.getType());
            paraString.push(typeprinter.printType());
        });
        output += paraString.join(", ") + ")";
        //打印方法体 这里需要特别构筑
        var bodyPrinter = new MethodBodyPrinter_1.MethodBodyPrinter(this.arkMethod.getBody());
        output += bodyPrinter.printBody();
        return output;
    };
    return MethodPrinter;
}());
exports.MethodPrinter = MethodPrinter;
