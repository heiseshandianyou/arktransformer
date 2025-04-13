import * as fs from 'fs';
import * as path from 'path';
import {JsonPrinter, ModelUtils, BasicBlock, SceneConfig, FieldSignature,Scene, ArkFile, ArkNamespace, 
    ArkClass, ArkField, ArkMethod, MethodSignature, Cfg, PrinterBuilder, TiantAnalysisChecker, TiantAnalysisSolver, 
    SourceMethodPrinter, DotMethodPrinter, ArkBody, Stmt, ModuleScene, DummyMainCreater} from "../lib/bundle";
import { ClassPrinter } from './ClassPrinter';
import { FunctionTransformer } from './FunctionTransformer';
import { ArkView } from './ArkView';
import { ArkModule } from './ArkModule';
import { JimplePrinter } from './JimplePrinter';
import { NewArkView } from './NewArkView';
import { StmtPrinter } from './StmtPrinter';

import { FieldSignaturePrinter } from './SignaturePrinter';


// 读取配置文件建立项目
//const scene = buildScenefromconfig()

//

//读取一个文件夹里的文件
let config: SceneConfig = new SceneConfig();
config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\functionTest");
const scene = new Scene();
scene.buildSceneFromProjectDir(config);

//


//const config_path = "./src/component.json";
console.log("start");

//config.buildFromJson(config_path);

// config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\taint");
// const scene = new Scene();
// scene.buildSceneFromProjectDir(config);



//doTaint(scene);

let newArkView: NewArkView = new NewArkView(scene);
//打印所有文件名
console.log(newArkView.getFileNames());
console.log( "文件数: " + newArkView.getFileNames().length);
//console.log(Array.from(scene.getSdkArkFilesMap().keys()));
//console.log(newArkView.getClassNames());
console.log( "类数:  " + newArkView.getClasses().length);


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

function printJson(file: ArkFile){
    let printer: JsonPrinter = new JsonPrinter(file);
    let json = printer.dump();
    let ir = JSON.parse(json);

    // 将 JSON 字符串写入 output.json 文件
    fs.writeFile('output.json', json, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('JSON data has been written to output.json');
        }
    });
}

function printJsonClass(clazz: ArkClass){

}

function selectClassPrint(fileName: string, className: string){
    let selectClass = scene.getFiles().filter(file => file.getName() === fileName)
    .flatMap(file => file.getClassWithName(className))
    let clazz: ArkClass = selectClass[0];
    let classPrinter: ClassPrinter = new ClassPrinter(clazz);
    classPrinter.print();
}

function writeToFile(filename: string, content: string): void {
    fs.writeFile(filename, content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log(`Output written to ${filename}`);
        }
    });
}

function buildScenefromconfig():Scene{
    // build from json
    //这个路径是从项目根目录下开始的
    let config: SceneConfig = new SceneConfig();
    config.buildFromJson("src\\test\\weather_predict.json");
    console.log(config);
    let projectScene: Scene = new Scene();
    projectScene.buildBasicInfo(config);
    projectScene.buildScene4HarmonyProject();
    projectScene.collectProjectImportInfos();
    //const creater = new DummyMainCreater(projectScene);
    //creater.createDummyMain();
    return projectScene;

}

function doTaint(inputScene: Scene){
    console.log(inputScene.getFiles());
    const defaultMethod = inputScene.getFiles()[0].getDefaultClass().getDefaultArkMethod();
    let method = ModelUtils.getMethodWithName("T1",defaultMethod!);
    let source = ModelUtils.getMethodWithName("source",defaultMethod!);
    let sink = ModelUtils.getMethodWithName("sink",defaultMethod!);
    if(method){
        let blocks: BasicBlock[] = Array.from(method.getCfg().getBlocks());
        let block: BasicBlock = blocks[0];
        let stmt: Stmt = block.getStmts()[method.getParameters().length];
        const problem = new TiantAnalysisChecker(stmt,method);

        problem.setSinks([sink!]);
        problem.setSources([source!]);
        console.log(problem.classMap);
        const solver = new TiantAnalysisSolver(problem, inputScene);
        solver.solve();
    }
}

async function writeJimpleFileNamesToTxt(): Promise<void> {
    try {
        // 使用示例
        const folderPath = 'D:\\harmonyos\\typescript_project\\arktransformer\\src\\jimpleoutput'; // 替换为你的文件夹路径
        const outputFile = './outputClasses.txt';   // 输出文件路径
        // 读取指定文件夹内的所有文件
        const files = await fs.promises.readdir(folderPath);
        
        // 筛选出以 .jimple 结尾的文件，并提取文件名（去掉后缀）
        const jimpleFileNames = files
            .filter(file => file.endsWith('.jimple'))
            .map(file => path.basename(file, '.jimple'));

        // 将文件名写入输出文件，每个文件名一行
        await fs.promises.writeFile(outputFile, jimpleFileNames.join('\n'));
        
        console.log(`File names written to ${outputFile}`);
    } catch (error) {
        console.error('Error reading files or writing output:', error);
    }
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

