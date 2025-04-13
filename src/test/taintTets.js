"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var bundle_1 = require("../../lib/bundle");
var scene = buildScenefromconfig();
scene.inferTypes();
console.log(scene.getFiles());
var defaultMethod = scene.getFiles()[0].getDefaultClass().getDefaultArkMethod();
var method = bundle_1.ModelUtils.getMethodWithName("T1", defaultMethod);
var source = bundle_1.ModelUtils.getMethodWithName("source", defaultMethod);
var sink = bundle_1.ModelUtils.getMethodWithName("sink", defaultMethod);
if (method) {
    var problem = new bundle_1.TiantAnalysisChecker(__spreadArray([], method.getCfg().getBlocks(), true)[0].getStmts()[method.getParameters().length], method);
    problem.setSinks([sink]);
    problem.setSources([source]);
    var solver = new bundle_1.TiantAnalysisSolver(problem, scene);
    solver.solve();
}
function buildScenefromconfig() {
    // build from json
    //这个路径是从项目根目录下开始的
    var config = new bundle_1.SceneConfig();
    config.buildFromJson("src\\test\\taint.json");
    console.log(config);
    var projectScene = new bundle_1.Scene();
    projectScene.buildBasicInfo(config);
    projectScene.buildScene4HarmonyProject();
    projectScene.collectProjectImportInfos();
    //const creater = new DummyMainCreater(projectScene);
    //creater.createDummyMain();
    return projectScene;
}
