"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArkView = void 0;
var ArkModule_1 = require("./ArkModule");
//这个类是最上层的类  聚合了所有的ArkModule
var ArkView = /** @class */ (function () {
    function ArkView(inputscene) {
        this.modules = new Set();
        //这个Map有助于我们通过全称名字找到对应的module
        this.nametoModule = new Map();
        //这个Map有助于我们通过绝对路径找到module
        this.path2Module = new Map();
        this.scene = inputscene;
        this.buildModles();
        this.buidPath2ModuleMap();
        this.modules.forEach(function (module) {
            module.setImportValuableClass();
            module.buildSimpleMap();
            module.setInitSimpleMap();
            console.log("模块" + module.getModuleName());
            console.log(module.getSimple2FullMap());
        });
        this.typeCheckModules();
    }
    //这个方法建立了模块
    ArkView.prototype.buildModles = function () {
        var _this = this;
        var arkFiles = this.scene.getFiles();
        arkFiles.forEach(function (file) {
            var newModule = new ArkModule_1.ArkModule(file, _this);
            _this.modules.add(newModule);
        });
        //把所有的模块输入Map
        this.modules.forEach(function (module) {
            module.buildSimpleMap();
            _this.nametoModule.set(module.getModuleName(), module);
        });
    };
    ArkView.prototype.buildGlobalModule = function () {
    };
    //这里实现全局的类 我们把所有全局的对象都塞到一个全局的module中 
    //从输入的name返回Module
    ArkView.prototype.getModdulebyName = function (moduleName) {
        return this.nametoModule.get(moduleName) || null;
    };
    //从输入的absPath返回Module
    ArkView.prototype.getModdulebyPath = function (absPath) {
        return this.path2Module.get(absPath) || null;
    };
    //返回Module以Array
    ArkView.prototype.getModules = function () {
        return Array.from(this.modules.values());
    };
    ArkView.prototype.getModuleNames = function () {
        var moduleNames = [];
        this.getModules().forEach(function (module) {
            moduleNames.push(module.getModuleName());
        });
        return moduleNames;
    };
    ArkView.prototype.buidPath2ModuleMap = function () {
        var _this = this;
        var abspath;
        this.modules.forEach(function (module) {
            abspath = module.getFile().getFilePath().replace(/\\\\/g, '\\');
            _this.path2Module.set(abspath, module);
        });
    };
    ArkView.prototype.getPath2ModuleMap = function () {
        return this.path2Module;
    };
    // 这个方法会把改view中所有的类打印为jimple格式储存到文件夹下
    ArkView.prototype.printClassesToJimple = function () {
        //遍历每一个module 调用他们的print
        this.modules.forEach(function (module) {
            module.printModule();
        });
    };
    //这个方法会调用所有module的typecheck方法
    ArkView.prototype.typeCheckModules = function () {
        //先调用已有的
        this.modules.forEach(function (module) {
            module.checkType();
        });
    };
    return ArkView;
}());
exports.ArkView = ArkView;
