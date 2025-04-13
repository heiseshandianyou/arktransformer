"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassCategory = exports.ClassPrinter = void 0;
exports.modifiers2stringArray = modifiers2stringArray;
var fs = require("fs");
var path = require("path");
var Map_1 = require("./Map");
var MethodPrinter_1 = require("./MethodPrinter");
var FieldPrinter_1 = require("./FieldPrinter");
var ClassPrinter = /** @class */ (function () {
    function ClassPrinter(arkclass) {
        this.arkClass = arkclass;
        this.arkFields = this.arkClass.getFields();
        this.arkMethods = this.arkClass.getMethods(true);
        this.classSignature = this.arkClass.classSignature;
        this.className = this.classSignature.getClassName();
        this.classcategory = this.arkClass.getCategory();
        if (this.classcategory === undefined
            && this.className === "_DEFAULT_ARK_CLASS") {
            this.classcategory = ClassCategory.CLASS;
        }
        if (this.classcategory === undefined
            && this.className === "@dummyClass") {
            this.classcategory = ClassCategory.CLASS;
        }
        //生成该类的qualifiedclassName
        //用所属名称空间和所属文件拼接一起 用classSignature的toString 方法
        //但是我们删掉开头的@和文件名的后缀“.ts”
        this.qualifiedClassName = this.classSignature.toString();
        this.qualifiedClassName = Map_1.Map.classSignatureMap(this.qualifiedClassName);
    }
    ClassPrinter.prototype.print = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.classcategory === ClassCategory.CLASS
                            || this.classcategory === ClassCategory.OBJECT
                            || this.classcategory === ClassCategory.STRUCT
                            || this.classcategory === ClassCategory.TYPE_LITERAL)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.printClass()];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (this.classcategory === ClassCategory.INTERFACE) {
                            this.printInterface();
                        }
                        else {
                            console.log("没有读取到类" + this.qualifiedClassName + "类型是" + this.classcategory);
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ClassPrinter.prototype.printClass = function () {
        return __awaiter(this, void 0, void 0, function () {
            var folderName, fileExtension, fileName, folderPath, filePath, output, interfaces, concatenatedString, fieldprinter, i, methodprinter, i;
            return __generator(this, function (_a) {
                folderName = 'jimpleOutput';
                fileExtension = '.jimple';
                fileName = this.qualifiedClassName + fileExtension;
                folderPath = path.join(__dirname, folderName);
                filePath = path.join(folderPath, fileName);
                // 创建文件夹
                fs.mkdir(folderPath, { recursive: true }, function (err) {
                    if (err) {
                        console.error('Error creating folder:', err);
                        return;
                    }
                });
                //类修饰符默认为public  文件名应该是全名
                output = "public class " + this.qualifiedClassName;
                //检查有没有继承的父类 父类我们加的是全名
                if (this.arkClass.getSuperClass()) {
                    output += (" extends " +
                        Map_1.Map.classSignatureMap(this.arkClass.getSuperClass().getSignature().toString()));
                }
                else {
                    output += (" extends java.lang.Object");
                }
                interfaces = this.arkClass.getImplementedInterfaceNames();
                // 使用 join 拼接数组元素
                if (interfaces.length > 0) {
                    concatenatedString = interfaces.join(", ");
                    output += " implements " + concatenatedString;
                }
                output += "\n{\n";
                if (this.arkFields.length > 0) {
                    for (i = 0; i < this.arkFields.length; i++) {
                        fieldprinter = new FieldPrinter_1.FieldPrinter(this.arkFields[i]);
                        output += fieldprinter.printField();
                    }
                }
                for (i = 0; i < this.arkMethods.length; i++) {
                    methodprinter = new MethodPrinter_1.MethodPrinter(this.arkMethods[i]);
                    output += methodprinter.printMethod();
                }
                output += "\n}\n";
                writeToFile(filePath, output);
                output = "";
                return [2 /*return*/];
            });
        });
    };
    ClassPrinter.prototype.printInterface = function () {
        //在指定路径下建立属于自己的输出文件
        if (this.classcategory === ClassCategory.INTERFACE
            && this.className !== "_DEFAULT_ARK_CLASS") {
            var folderName = 'jimpleoutput'; // 输出文件夹名字
            var fileNameString = this.qualifiedClassName; // 要用作文件名的字符串
            var fileExtension = '.jimple'; // 文件扩展名
            var fileName = fileNameString + fileExtension; // 创建完整的文件名
            var folderPath = path.join(__dirname, folderName);
            var filePath = path.join(folderPath, fileName);
            fs.mkdir(folderPath, { recursive: true }, function (err) {
                if (err) {
                    console.error('Error creating folder:', err);
                    return;
                }
            });
            var output_1;
            //类修饰符默认为public  文件名应该是全名
            output_1 = "public interface " + this.qualifiedClassName;
            //检查有没有继承的父类 父类我们加的是全名
            if (this.arkClass.getSuperClassName() != "") {
                output_1 += (" extends " + Map_1.Map.classSignatureMap(this.arkClass.getSuperClassName()));
            }
            else {
                output_1 += (" extends java.lang.Object");
            }
            output_1 += "\n{\n";
            //开始打印字段
            this.arkFields.forEach(function (field) {
                var fieldprinter = new FieldPrinter_1.FieldPrinter(field);
                output_1 += fieldprinter.printField();
            });
            //开始打印方法
            var methodprinter_1;
            this.arkMethods.forEach(function (method) {
                methodprinter_1 = new MethodPrinter_1.MethodPrinter(method);
                output_1 += methodprinter_1.printMethod();
            });
            output_1 += "\n}\n";
            //写到对应文件
            writeToFile(filePath, output_1);
            output_1 = "";
        }
    };
    return ClassPrinter;
}());
exports.ClassPrinter = ClassPrinter;
var ClassCategory;
(function (ClassCategory) {
    ClassCategory[ClassCategory["CLASS"] = 0] = "CLASS";
    ClassCategory[ClassCategory["STRUCT"] = 1] = "STRUCT";
    ClassCategory[ClassCategory["INTERFACE"] = 2] = "INTERFACE";
    ClassCategory[ClassCategory["ENUM"] = 3] = "ENUM";
    ClassCategory[ClassCategory["TYPE_LITERAL"] = 4] = "TYPE_LITERAL";
    ClassCategory[ClassCategory["OBJECT"] = 5] = "OBJECT";
})(ClassCategory || (exports.ClassCategory = ClassCategory = {}));
function appendToFile(filePath, newText) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.appendFile(filePath, newText, function (err) {
                if (err) {
                    console.error('写入文件时发生错误:' + filePath, err);
                }
            });
            return [2 /*return*/];
        });
    });
}
function writeToFile(filePath, newText) {
    fs.writeFile(filePath, newText, function (err) {
        if (err) {
            console.error('写入文件时发生错误:' + filePath, err);
        }
    });
}
function modifiers2stringArray(modifiers) {
    var strs = [];
    for (var idx = 0; idx < MODIFIER_TYPE_STRINGS.length; idx++) {
        if (modifiers & 0x01) {
            strs.push(Map_1.Map.modifierMap(MODIFIER_TYPE_STRINGS[idx]));
        }
        modifiers = modifiers >>> 1;
    }
    return strs;
}
var MODIFIER_TYPE_STRINGS = [
    'private',
    'protected',
    'public',
    'export',
    'static',
    'abstract',
    'async',
    'const',
    'accessor',
    'default',
    'in',
    'readonly',
    'out',
    'override',
    'declare',
];
