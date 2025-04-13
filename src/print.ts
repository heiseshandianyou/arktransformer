import * as fs from 'fs';

import {JsonPrinter, ModelUtils, BasicBlock, SceneConfig, FieldSignature,Scene, ArkFile, ArkNamespace, 
    ArkClass, ArkField, ArkMethod, MethodSignature, Cfg, PrinterBuilder, 
    SourceMethodPrinter, DotMethodPrinter, ArkBody, Stmt, ModuleScene, DummyMainCreater} from "../lib/bundle";

let config: SceneConfig = new SceneConfig();


config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\polyMethod");
const scene = new Scene();
scene.buildSceneFromProjectDir(config);
console.log(scene);
console.log(scene.getFiles());
let selectFiles: ArkFile[] = scene.getFiles();
printJson(selectFiles[0]);


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