"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var bundle_1 = require("../lib/bundle");
var config = new bundle_1.SceneConfig();
config.buildFromProjectDir("D:\\harmonyos\\typescript_project\\arktransformer\\src\\test\\test_Project\\polyMethod");
var scene = new bundle_1.Scene();
scene.buildSceneFromProjectDir(config);
console.log(scene);
console.log(scene.getFiles());
var selectFiles = scene.getFiles();
printJson(selectFiles[0]);
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
