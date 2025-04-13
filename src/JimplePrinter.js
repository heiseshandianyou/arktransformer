"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JimplePrinter = void 0;
var ClassPrinter_1 = require("./ClassPrinter");
var bundle_1 = require("../lib/bundle");
var JimplePrinter = /** @class */ (function () {
    function JimplePrinter(inputScene) {
        this.scene = bundle_1.Scene;
    }
    JimplePrinter.prototype.printScene = function () {
        //就先遍历所有当前的所有的类
        var classPrinter;
        var files = this.scene.getFiles();
        for (var i = 0; i < files.length; i++) {
            var classes = files[i].getClasses();
            for (var j = 0; j < classes.length; j++) {
                classPrinter = new ClassPrinter_1.ClassPrinter(classes[j]);
                classPrinter.print();
            }
        }
    };
    return JimplePrinter;
}());
exports.JimplePrinter = JimplePrinter;
