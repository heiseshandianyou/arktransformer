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
exports.TypePrinter = exports.Map = exports.MethodBodyPrinter = exports.FiledPrinter = exports.MethodPrinter = exports.ClassPrinter = exports.ClassCategory = void 0;
var fs = require("fs");
var path = require("path");
var StmtPrinter_1 = require("./StmtPrinter");
var bundle_1 = require("../lib/bundle");
var ClassCategory;
(function (ClassCategory) {
    ClassCategory[ClassCategory["CLASS"] = 0] = "CLASS";
    ClassCategory[ClassCategory["STRUCT"] = 1] = "STRUCT";
    ClassCategory[ClassCategory["INTERFACE"] = 2] = "INTERFACE";
    ClassCategory[ClassCategory["ENUM"] = 3] = "ENUM";
    ClassCategory[ClassCategory["TYPE_LITERAL"] = 4] = "TYPE_LITERAL";
    ClassCategory[ClassCategory["OBJECT"] = 5] = "OBJECT";
})(ClassCategory || (exports.ClassCategory = ClassCategory = {}));
var ClassPrinter = /** @class */ (function () {
    function ClassPrinter(arkclass) {
        this.finaloutput = "";
        this.arkClass = arkclass;
        this.arkFields = this.arkClass.getFields();
        this.arkMethods = this.arkClass.getMethods(true);
        this.classSignature = this.arkClass.classSignature;
        this.className = this.classSignature.getClassName();
        this.classcategory = this.arkClass.getCategory();
        //生成该类的qualifiedclassName
        //用所属名称空间和所属文件拼接一起 用classSignature的toString 方法
        //但是我们删掉开头的@和文件名的后缀“.ts”
        this.qualifiedClassName = this.classSignature.toString();
        this.qualifiedClassName = Map.classSignatureMap(this.qualifiedClassName);
        console.log("构建" + this.qualifiedClassName + "打印机");
    }
    ClassPrinter.prototype.print = function () {
        if (this.classcategory === ClassCategory.CLASS
            || this.classcategory === ClassCategory.OBJECT
            || this.classcategory === ClassCategory.STRUCT) {
            this.printClass();
        }
        else if (this.classcategory === ClassCategory.INTERFACE) {
            this.printInterface();
        }
    };
    ClassPrinter.prototype.printClass = function () {
        var _this = this;
        console.log("开始打印" + this.className + "类");
        //在指定路径下建立属于自己的输出文件
        //我们只会对类
        //创建文件名字为类名 this.classcategory === ClassCategory.CLASS 
        //&& this.className !== "_DEFAULT_ARK_CLASS"
        // 定义文件夹和文件的路径
        // 定义文件夹和文件的名字
        var folderName = 'jimpleoutput'; // 输出文件夹名字
        var fileNameString = this.className; // 要用作文件名的字符串
        var fileExtension = '.jimple'; // 文件扩展名
        // 使用字符串变量构建文件名
        var fileName = fileNameString + fileExtension; // 创建完整的文件名
        // 定义文件夹和文件的路径
        var folderPath = path.join(__dirname, folderName);
        var filePath = path.join(folderPath, fileName);
        // 创建文件夹
        fs.mkdir(folderPath, { recursive: true }, function (err) {
            if (err) {
                console.error('Error creating folder:', err);
                return;
            }
        });
        //打印类标签
        var output;
        //类修饰符默认为public  文件名应该是全名
        output = "public class " + this.qualifiedClassName;
        //检查有没有继承的父类 父类我们加的是全名
        if (this.arkClass.getSuperClassName() != "") {
            output += (" extends " + Map.classSignatureMap(this.arkClass.getSuperClassName()));
        }
        //有没有实现接口 接口我们只加了接口本身名字
        var interfaces = this.arkClass.getImplementedInterfaceNames();
        // 使用 join 拼接数组元素
        if (interfaces.length > 0) {
            var concatenatedString = interfaces.join(", ");
            output += " implements " + concatenatedString + "\n{\n";
        }
        else {
            output += "\n{\n";
        }
        //写到对应文件
        writeToFile(filePath, output);
        //开始打印字段
        this.arkFields.forEach(function (field) {
            var fieldprinter = new FiledPrinter(field, filePath);
            _this.finaloutput += fieldprinter.printFiled();
        });
        //开始打印方法
        //打印初始方法
        var methodprinter;
        //先打印构造方法 <init>
        //检查有没有自定义构造方法  有些类是没有的
        this.arkMethods.forEach(function (method) {
            if (method.getName() == "constructor") {
                methodprinter = new MethodPrinter(method, filePath);
                _this.finaloutput += methodprinter.printInit();
            }
            if (method.getName() != "constructor"
                && method.getName() != "@static_init") {
                methodprinter = new MethodPrinter(method, filePath);
                _this.finaloutput += methodprinter.printMethod();
            }
        });
        this.finaloutput += "\n}\n";
        appendToFile(filePath, this.finaloutput);
        console.log("打印完成" + this.className + "类");
    };
    ClassPrinter.prototype.printInterface = function () {
        var _this = this;
        //在指定路径下建立属于自己的输出文件
        if (this.classcategory === ClassCategory.INTERFACE
            && this.className !== "_DEFAULT_ARK_CLASS") {
            //创建文件名字为类名 this.classcategory === ClassCategory.CLASS 
            //&& this.className !== "_DEFAULT_ARK_CLASS"
            // 定义文件夹和文件的路径
            // 定义文件夹和文件的名字
            var folderName = 'jimpleoutput'; // 输出文件夹名字
            var fileNameString = this.className; // 要用作文件名的字符串
            var fileExtension = '.jimple'; // 文件扩展名
            // 使用字符串变量构建文件名
            var fileName = fileNameString + fileExtension; // 创建完整的文件名
            // 定义文件夹和文件的路径
            var folderPath = path.join(__dirname, folderName);
            var filePath_1 = path.join(folderPath, fileName);
            // 创建文件夹
            fs.mkdir(folderPath, { recursive: true }, function (err) {
                if (err) {
                    console.error('Error creating folder:', err);
                    return;
                }
            });
            //打印类标签
            var output = void 0;
            //类修饰符默认为public  文件名应该是全名
            output = "public interface " + this.qualifiedClassName;
            //检查有没有继承的父类 父类我们加的是全名
            if (this.arkClass.getSuperClassName() != "") {
                output += (" extends " + Map.classSignatureMap(this.arkClass.getSuperClassName()));
            }
            output += "\n{\n";
            //写到对应文件
            writeToFile(filePath_1, output);
            //开始打印字段
            this.arkFields.forEach(function (field) {
                var fieldprinter = new FiledPrinter(field, filePath_1);
                _this.finaloutput += fieldprinter.printFiled();
            });
            //开始打印方法
            //先打印构造方法
            //检查有没有自定义构造方法
            var methodprinter_1;
            this.arkMethods.forEach(function (method) {
                if (method.getName() == "constructor") {
                    methodprinter_1 = new MethodPrinter(method, filePath_1);
                    _this.finaloutput += methodprinter_1.printInit();
                }
            });
            //打印一般方法
            this.arkMethods.forEach(function (method) {
                if (method.getName() != "constructor") {
                    methodprinter_1 = new MethodPrinter(method, filePath_1);
                    _this.finaloutput += methodprinter_1.printMethod();
                }
            });
            this.finaloutput += "\n}\n";
            appendToFile(filePath_1, this.finaloutput);
        }
    };
    return ClassPrinter;
}());
exports.ClassPrinter = ClassPrinter;
var MethodPrinter = /** @class */ (function () {
    function MethodPrinter(inputMethod, outputpath) {
        this.arkMethod = inputMethod;
        this.methodName = Map.NameMap(this.arkMethod.getName());
        if (this.methodName === "@instance_init") {
            this.methodName = "instance_init";
        }
        if (this.methodName === "constructor") {
            this.methodName = "<init>";
        }
        this.modifiers = modifiers2stringArray(this.arkMethod.getModifiers());
        if (this.modifiers.length == 0) {
            this.modifiers.push("public");
        }
        this.returntype = this.arkMethod.getReturnType();
        this.parameters = this.arkMethod.getParameters();
        this.outputPath = outputpath;
    }
    //打印方法
    MethodPrinter.prototype.printMethod = function () {
        //修饰符 返回类型  名字 参数
        var output = "\n";
        output += this.modifiers.join(" ");
        output += " " + this.returntype.toString() + " " + this.methodName + " ";
        //这里要改成Typeprinter
        var paraTypes = this.parameters.map(function (parameter) { return parameter.getType(); });
        var paraString = paraTypes.map(function (para) { return para.toString(); });
        output += "(" + paraString.join(", ") + ")";
        //接下来打印 方法体
        var bodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody(), this.outputPath);
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
            typeprinter = new TypePrinter(parameter.getType());
            paraString.push(typeprinter.printType());
        });
        output += paraString.join(", ") + ")\n";
        //打印方法体 这里需要特别构筑
        var bodyPrinter = new MethodBodyPrinter(this.arkMethod.getBody(), this.outputPath);
        output += bodyPrinter.printBody();
        return output;
    };
    return MethodPrinter;
}());
exports.MethodPrinter = MethodPrinter;
var FiledPrinter = /** @class */ (function () {
    function FiledPrinter(inputFiled, outputpath) {
        this.arkFiled = inputFiled;
        this.outputPath = outputpath;
        //提取修饰符
        var modifier = this.arkFiled.getModifiers();
        this.modifiers = modifiers2stringArray(modifier);
        //提取类型
        this.fieldType = this.arkFiled.getType();
        //提取名字
        this.fieldNmae = this.arkFiled.getSignature().getFieldName();
    }
    FiledPrinter.prototype.printFiled = function () {
        var output = "";
        output += this.modifiers.join(" ");
        var typeprinter = new TypePrinter(this.fieldType);
        output += " " + typeprinter.printType();
        output += " " + this.fieldNmae + ";\n";
        return (output);
    };
    return FiledPrinter;
}());
exports.FiledPrinter = FiledPrinter;
var MethodBodyPrinter = /** @class */ (function () {
    function MethodBodyPrinter(inputBody, outputPath) {
        this.locals = new Set();
        this.arkBody = inputBody;
        this.outputPath = outputPath;
    }
    MethodBodyPrinter.prototype.printBody = function () {
        //判断是否有方法体
        if (this.arkBody == undefined) {
            return ";\n";
        }
        else {
            var output_1 = "\n{\n";
            this.locals = this.arkBody.getLocals().values();
            // 创建一个 string[]来存储分组后的 Set
            var groupedSets_1 = [];
            // 遍历元素 Set
            this.locals.forEach(function (local) {
                //提取他们的type类型
                var localname = Map.classSignatureMap(local.getType().toString());
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
                output_1 += Map.NameMap(localSet + ";" + "\n");
            });
            //接下来打印Cfg
            var cfgprinter = new CfgPrinter(this.arkBody.getCfg());
            output_1 += cfgprinter.printCfg();
            output_1 += "\n}\n";
            return output_1;
        }
    };
    return MethodBodyPrinter;
}());
exports.MethodBodyPrinter = MethodBodyPrinter;
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
        var output = "";
        var BBprinter = new BasicBlockPrinter(this.startBlock, true);
        var startid = this.startBlock.getId();
        output += BBprinter.printBlock();
        //按顺序打印
        this.orderBlocks.forEach(function (block) {
            if (block.getId() != startid) {
                BBprinter = new BasicBlockPrinter(block, false);
                output += BBprinter.printBlock();
            }
        });
        return output;
    };
    return CfgPrinter;
}());
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
            otherStmt_1.forEach(function (stmt) {
                var stmtprinter = new StmtPrinter_1.StmtPrinter(stmt, _this.successor);
                output += stmtprinter.printStmt();
            });
        }
        //不是开始BB
        else {
            output += "label".concat(this.id, ":") + "\n";
            this.stmts.forEach(function (stmt) {
                var stmtprinter = new StmtPrinter_1.StmtPrinter(stmt, _this.successor);
                output += stmtprinter.printStmt();
            });
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
var Map = /** @class */ (function () {
    function Map() {
    }
    Map.classSignatureMap = function (input) {
        //原本的类签名tostring
        // @demo_Project/demo_Project/src/models/book.ts: helloworld
        //
        return (input
            .replace(/^@/, '') //删掉开头的@
            .replace(/\//g, '.') //把/ 变成 .
            .replace(/\.ts: /g, 'ts.') //.ts: 变为ts.
            .replace(/\.ets: /g, 'ets.') //.ts: 变为ets.
            .replace(/:\s*$/, '.') //删掉最后的:
            .replace(/[.\s]+$/, '')
            .replace(/ /g, '.') // 所有空格变成点
            .replace(/:/g, '') //删除所有:
            .replace(/[-()]/g, '_'));
    };
    Map.initMethodMap = function (input) {
        return input;
    };
    Map.cinitMethodMap = function (input) {
        return input;
    };
    Map.NameMap = function (input) {
        return (input.replace(/-/g, '_'));
    };
    Map.typeMap = function (input) {
        return (input.replace(/[-()]/g, '_'));
    };
    return Map;
}());
exports.Map = Map;
//用来打印Type类
var TypePrinter = /** @class */ (function () {
    function TypePrinter(inputtype) {
        this.type = inputtype;
    }
    TypePrinter.prototype.printType = function () {
        var output = "";
        if (this.type instanceof bundle_1.ClassType) {
            //jimple需要返回fullyqualifiedname     
            output += Map.classSignatureMap(this.type.toString());
        }
        else {
            output += this.type.toString();
        }
        return (output);
    };
    return TypePrinter;
}());
exports.TypePrinter = TypePrinter;
function appendToFile(filePath, newText) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            fs.appendFile(filePath, newText, function (err) {
                if (err) {
                    console.error('写入文件时发生错误:', err);
                }
                else {
                    console.log('文件已成功写入。' + filePath);
                }
            });
            return [2 /*return*/];
        });
    });
}
function writeToFile(filePath, newText) {
    fs.writeFile(filePath, newText, function (err) {
        if (err) {
            console.error('写入文件时发生错误:', err);
        }
        else {
            console.log('文件已成功写入。' + filePath);
        }
    });
}
//将修饰符从number转为string[]
function modifiers2stringArray(modifiers) {
    var strs = [];
    for (var idx = 0; idx < MODIFIER_TYPE_STRINGS.length; idx++) {
        if (modifiers & 0x01) {
            strs.push(MODIFIER_TYPE_STRINGS[idx]);
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
    'final', //原本是 readonly
    'out',
    'override',
    'declare',
];
