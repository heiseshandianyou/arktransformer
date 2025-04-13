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
var fs = require("fs");
var path = require("path");
var bundle_1 = require("../lib/bundle");
var ClassPrinter_1 = require("./ClassPrinter");
var NewArkView_1 = require("./NewArkView");
// 读取配置文件建立项目
//const scene = buildScenefromconfig()
//
//读取一个文件夹里的文件
var config = new bundle_1.SceneConfig();
config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\functionTest");
var scene = new bundle_1.Scene();
scene.buildSceneFromProjectDir(config);
//
//const config_path = "./src/component.json";
console.log("start");
//config.buildFromJson(config_path);
// config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\taint");
// const scene = new Scene();
// scene.buildSceneFromProjectDir(config);
//doTaint(scene);
var newArkView = new NewArkView_1.NewArkView(scene);
//打印所有文件名
console.log(newArkView.getFileNames());
console.log("文件数: " + newArkView.getFileNames().length);
//console.log(Array.from(scene.getSdkArkFilesMap().keys()));
//console.log(newArkView.getClassNames());
console.log("类数:  " + newArkView.getClasses().length);
//let selectClass: ArkClass = selectFiles[0].getClassWithName("_DEFAULT_ARK_CLASS");
//let selectMethod: ArkMethod = selectClass.getMethodWithName("onJumpClick");
//let stmts: Stmt[] = selectMethod.getBody().getCfg().getStmts();
//console.log(stmts[4].getRightOp());
// //我们可以主动调用语句打印
//let stmtPrinter: StmtPrinter = new StmtPrinter(stmts[4], [0]);
//console.log(stmtPrinter.printStmt());
// //调用value 打印
// let valuePrinter: ValuePrinter = new ValuePrinter(stmts[4].getRightOp());
// console.log(valuePrinter.printValue());
//console.log(stmts[4].getRightOp().getFieldSignature());
//let filedPrinter: FieldSignaturePrinter = new FieldSignaturePrinter(stmts[4].getRightOp().getFieldSignature());
//console.log(filedPrinter.printFieldSig());
//NewArkView.myInferFiledReftypeInMethoed(selectMethod);
//let stmts: Stmt[] = selectMethod.getBody().getCfg().getStmts();
//console.log(stmts[7]);
//printJson((newArkView.getFiles())[0]);
newArkView.checkType();
newArkView.printClasses();
writeJimpleFileNamesToTxt();
//const rightOP = stmts[7].getRightOp();
//console.log(rightOP);
function printJson(file) {
    var printer = new bundle_1.JsonPrinter(file);
    var json = printer.dump();
    var ir = JSON.parse(json);
    // 将 JSON 字符串写入 output.json 文件
    fs.writeFile('output.json', json, function (err) {
        if (err) {
            console.error('Error writing to file', err);
        }
        else {
            console.log('JSON data has been written to output.json');
        }
    });
}
function printJsonClass(clazz) {
}
function selectClassPrint(fileName, className) {
    var selectClass = scene.getFiles().filter(function (file) { return file.getName() === fileName; })
        .flatMap(function (file) { return file.getClassWithName(className); });
    var clazz = selectClass[0];
    var classPrinter = new ClassPrinter_1.ClassPrinter(clazz);
    classPrinter.print();
}
function writeToFile(filename, content) {
    fs.writeFile(filename, content, function (err) {
        if (err) {
            console.error('Error writing to file:', err);
        }
        else {
            console.log("Output written to ".concat(filename));
        }
    });
}
function buildScenefromconfig() {
    // build from json
    //这个路径是从项目根目录下开始的
    var config = new bundle_1.SceneConfig();
    config.buildFromJson("src\\test\\weather_predict.json");
    console.log(config);
    var projectScene = new bundle_1.Scene();
    projectScene.buildBasicInfo(config);
    projectScene.buildScene4HarmonyProject();
    projectScene.collectProjectImportInfos();
    //const creater = new DummyMainCreater(projectScene);
    //creater.createDummyMain();
    return projectScene;
}
function doTaint(inputScene) {
    console.log(inputScene.getFiles());
    var defaultMethod = inputScene.getFiles()[0].getDefaultClass().getDefaultArkMethod();
    var method = bundle_1.ModelUtils.getMethodWithName("T1", defaultMethod);
    var source = bundle_1.ModelUtils.getMethodWithName("source", defaultMethod);
    var sink = bundle_1.ModelUtils.getMethodWithName("sink", defaultMethod);
    if (method) {
        var blocks = Array.from(method.getCfg().getBlocks());
        var block = blocks[0];
        var stmt = block.getStmts()[method.getParameters().length];
        var problem = new bundle_1.TiantAnalysisChecker(stmt, method);
        problem.setSinks([sink]);
        problem.setSources([source]);
        console.log(problem.classMap);
        var solver = new bundle_1.TiantAnalysisSolver(problem, inputScene);
        solver.solve();
    }
}
function writeJimpleFileNamesToTxt() {
    return __awaiter(this, void 0, void 0, function () {
        var folderPath, outputFile, files, jimpleFileNames, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    folderPath = 'D:\\harmonyos\\typescript_project\\arktransformer\\src\\jimpleoutput';
                    outputFile = './outputClasses.txt';
                    return [4 /*yield*/, fs.promises.readdir(folderPath)];
                case 1:
                    files = _a.sent();
                    jimpleFileNames = files
                        .filter(function (file) { return file.endsWith('.jimple'); })
                        .map(function (file) { return path.basename(file, '.jimple'); });
                    // 将文件名写入输出文件，每个文件名一行
                    return [4 /*yield*/, fs.promises.writeFile(outputFile, jimpleFileNames.join('\n'))];
                case 2:
                    // 将文件名写入输出文件，每个文件名一行
                    _a.sent();
                    console.log("File names written to ".concat(outputFile));
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error reading files or writing output:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// module.setImportValuableClass();
// module.checkType();
// let declareClasses: ArkClass[] = module.getDeclaredClasses();
// let importClass: ArkClass[] = module.getImportClasses();
// let declareClassesNames: string[] = module.getDeclaredClassesNames();
// let importClassesNames: string[] = module.getImportClassesNames();
// console.log("module名:" + module.getModuleName());
// console.log(declareClasses.length);
// console.log(declareClassesNames);
// let thisclass: ArkClass = declareClasses[1];
// let classprinter: ClassPrinter = new ClassPrinter(thisclass);
// classprinter.printClass();
//let classes: ArkClass[] = scene.getClasses();
// classes.forEach((classe)=>{
//     let transformer: ClassPrinter = new ClassPrinter(classe);
//     console.log("-----------");
//     transformer.printClass();
//     console.log("-----------");
// });
