"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypePrinter = void 0;
var Map_1 = require("./Map");
var bundle_1 = require("../lib/bundle");
//用来打印Type类
var TypePrinter = /** @class */ (function () {
    function TypePrinter(inputtype) {
        this.type = inputtype;
    }
    TypePrinter.prototype.printType = function () {
        var output = "";
        if (this.type instanceof bundle_1.ClassType) {
            //jimple需要返回fullyqualifiedname
            var classString = Map_1.Map.classSignatureMap(this.type.toString());
            if (classString === "_UnknownProjectName._UnknownFileName") {
                classString = "java.lang.Object";
            }
            if (classString === "_UnknownProjectName._UnknownFileName.java.util.ArrayList") {
                classString = "java.util.ArrayList";
            }
            output += classString;
        }
        else if (this.type instanceof bundle_1.FunctionType) {
            // 这个也要改 改成对应的类名
            var funcSig = this.type.getMethodSignature();
            var inputTypes_1 = [];
            var parameters = funcSig.getMethodSubSignature().getParameters();
            // 遍历parameters
            var ifOption_1 = true;
            parameters.forEach(function (para) {
                // 如果这个
                if (para.isOptional()) {
                }
                else {
                    ifOption_1 = false;
                }
                if (!ifOption_1) {
                    inputTypes_1.push(para.getType());
                }
            });
            var returnType = funcSig.getMethodSubSignature().getReturnType();
            var funcType = void 0;
            var inputTypesString_1 = "";
            var returnTypesString = "";
            var interfaceName = "";
            // 如果没有输入 也没有 输出 (void) 那就归为 Runnable
            if (inputTypes_1.length === 0 && returnType instanceof bundle_1.VoidType) {
                funcType = "Runnable";
                interfaceName = funcType;
            }
            // 至少有 一个输入或者输出 我们统一构造为一个输入类型1+2+输出类型+Function的接口
            else {
                funcType = "Function";
                if (inputTypes_1.length === 0) {
                    inputTypesString_1 = "void";
                }
                else {
                    inputTypes_1.forEach(function (type) {
                        inputTypesString_1 += type.toString();
                    });
                }
                returnTypesString = returnType.toString();
                interfaceName = inputTypesString_1 + "To" + returnTypesString + funcType;
            }
            //得到项目名称
            var projectName = funcSig.getDeclaringClassSignature().getDeclaringFileSignature().getProjectName();
            output += (projectName + ".funcInterfaceFile." + interfaceName);
        }
        else if (this.type instanceof bundle_1.NeverType) {
            output += "void";
        }
        else if (this.type instanceof bundle_1.UnionType) {
            output += "java.lang.Object";
        }
        else if (this.type instanceof bundle_1.ArrayType) {
            var basetype = this.type.getBaseType();
            var typeprinter = new TypePrinter(basetype);
            output += typeprinter.printType();
            for (var i = 0; i < this.type.getDimension(); i++) {
                output += '[]';
            }
        }
        else if (this.type instanceof bundle_1.UnknownType) {
            output += "java.lang.Object";
        }
        else if (this.type instanceof bundle_1.NumberType) {
            output += "int";
        }
        else if (this.type instanceof bundle_1.StringType) {
            output += "java.lang.String";
        }
        else {
            output += this.type.toString();
        }
        if (output.includes("<")) {
            return "java.util.ArrayList";
        }
        return (output);
    };
    return TypePrinter;
}());
exports.TypePrinter = TypePrinter;
