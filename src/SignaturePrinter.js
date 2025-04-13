"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSigPrinter = exports.NamespaceSignaturePrinter = exports.FieldSignaturePrinter = exports.MethodSignaturePrinter = void 0;
var bundle_1 = require("../lib/bundle");
var TypePrinter_1 = require("./TypePrinter");
var Map_1 = require("./Map");
var MethodSignaturePrinter = /** @class */ (function () {
    function MethodSignaturePrinter(inputsig, values) {
        this.methodSignature = inputsig;
        this.values = values;
    }
    //< classtype : 返回类型 函数名（参数类型）>
    MethodSignaturePrinter.prototype.printMethodSig = function () {
        //得到函数名
        var methodname = this.methodSignature.getMethodSubSignature().getMethodName();
        if (methodname == "constructor") {
            methodname = "<init>";
        }
        if (methodname == "@instance_init") {
            methodname = "instance_init";
        }
        if (methodname == "@static_init") {
            methodname = "<clinit>";
        }
        if (methodname == "catch") {
            methodname = "Catch";
        }
        var output = "<";
        var declaredclasstype = this.methodSignature.getDeclaringClassSignature().getType();
        //得到classtype
        var typeprinter = new TypePrinter_1.TypePrinter(declaredclasstype);
        output += typeprinter.printType() + " : ";
        //得到返回类型
        if (methodname == "<init>" || methodname == "<clinit>" || methodname == "instance_init") {
            output += " void ";
        }
        else {
            typeprinter = new TypePrinter_1.TypePrinter(this.methodSignature.getType());
            output += typeprinter.printType() + " ";
        }
        output += Map_1.Map.methodNmaeMap(methodname);
        //参数类型 这里和methodprinter那里一样
        //得到参数类型
        var argsType = this.methodSignature.getMethodSubSignature().getParameterTypes();
        var argsTypeString = [];
        if (this.values.length > argsType.length) {
            var i = this.values.length - argsType.length;
            // console.log("找到了不一样");
            // console.log(argsType);
            // console.log(this.values);
            for (i = this.values.length - i; i < this.values.length; i++) {
                argsType.push(this.values[i].getType());
            }
            // console.log(argsType);
        }
        argsType.forEach(function (argType) {
            typeprinter = new TypePrinter_1.TypePrinter(argType);
            argsTypeString.push(typeprinter.printType());
        });
        output += "( " + argsTypeString.join(", ") + ")>";
        return output;
    };
    return MethodSignaturePrinter;
}());
exports.MethodSignaturePrinter = MethodSignaturePrinter;
var FieldSignaturePrinter = /** @class */ (function () {
    function FieldSignaturePrinter(inputsig) {
        this.fieldSignature = inputsig;
    }
    //如果不是类的字段 而是名称空间的字段怎么办？？
    //< classtype : 字段类型 字段名>
    FieldSignaturePrinter.prototype.printFieldSig = function () {
        if (this.fieldSignature.getDeclaringSignature() instanceof bundle_1.ClassSignature) {
            var output = "<";
            var declaredclasstype = this.fieldSignature.getDeclaringSignature().getType();
            //得到classtype
            var typeprinter = new TypePrinter_1.TypePrinter(declaredclasstype);
            output += typeprinter.printType() + " : ";
            //得到字段类型
            typeprinter = new TypePrinter_1.TypePrinter(this.fieldSignature.getType());
            output += typeprinter.printType() + " ";
            //得到字段名
            var fieldName = this.fieldSignature.getFieldName();
            output += Map_1.Map.NameMap(fieldName);
            return output + ">";
        }
        //如果是名称空间的字段 就<文件名.名称空间名 : 字段类型  字段名 >
        else if (this.fieldSignature.getDeclaringSignature() instanceof bundle_1.NamespaceSignature) {
            console.log("打印");
            var output = "<";
            var declaredNameSpaceSig = this.fieldSignature.getDeclaringSignature();
            var nameSpaceSigPrinter = new NamespaceSignaturePrinter(declaredNameSpaceSig);
            output += nameSpaceSigPrinter.printNameSpaceSig();
            output += ": ";
            var typeprinter = void 0;
            //得到字段类型
            typeprinter = new TypePrinter_1.TypePrinter(this.fieldSignature.getType());
            output += typeprinter.printType() + " ";
            //得到字段名
            var fieldName = this.fieldSignature.getFieldName();
            output += fieldName;
            return output + ">";
        }
        return "";
    };
    return FieldSignaturePrinter;
}());
exports.FieldSignaturePrinter = FieldSignaturePrinter;
var NamespaceSignaturePrinter = /** @class */ (function () {
    function NamespaceSignaturePrinter(inputNameSig) {
        this.NameSpaceSig = inputNameSig;
    }
    NamespaceSignaturePrinter.prototype.printNameSpaceSig = function () {
        var output = "";
        if (this.NameSpaceSig.declaringNamespaceSignature) {
            var spaceSigPrinter = new NamespaceSignaturePrinter(this.NameSpaceSig.declaringNamespaceSignature);
            output += (spaceSigPrinter.printNameSpaceSig() + '.' + this.NameSpaceSig.namespaceName);
        }
        else {
            var fileSigPrinter = new FileSigPrinter(this.NameSpaceSig.declaringFileSignature);
            output += fileSigPrinter.printFileSig() + "." + this.NameSpaceSig.namespaceName;
        }
        return output;
    };
    return NamespaceSignaturePrinter;
}());
exports.NamespaceSignaturePrinter = NamespaceSignaturePrinter;
var FileSigPrinter = /** @class */ (function () {
    function FileSigPrinter(inputSig) {
        this.fileSig = inputSig;
    }
    FileSigPrinter.prototype.printFileSig = function () {
        //输出是 项目名.文件名
        var output = "";
        output += (this.fileSig.getProjectName() + "." + Map_1.Map.fileNameMap(this.fileSig.getFileName()));
        return output;
    };
    return FileSigPrinter;
}());
exports.FileSigPrinter = FileSigPrinter;
