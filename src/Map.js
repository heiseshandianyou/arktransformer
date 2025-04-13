"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = exports.StringMap = void 0;
var StringMap = /** @class */ (function () {
    function StringMap() {
    }
    //这个方法旨在把那些文件名改成包名形式为我们每个Arkmodule赋值
    // A/B/C.ts => A.B.Cts
    StringMap.PackageMap = function (input) {
        return input.replace(/\s+/g, '')
            .replace(/\./g, '')
            .replace(/\//g, '.');
    };
    //这个方法用来消除文件名的.
    //A.ts => Ats
    StringMap.FileNameMap = function (input) {
        return input.replace(/\s+/g, '')
            .replace(/\./g, '')
            .replace(/\//g, '.');
    };
    return StringMap;
}());
exports.StringMap = StringMap;
var Map = /** @class */ (function () {
    function Map() {
    }
    //
    Map.fileNameMap = function (input) {
        return (input
            //.变成下划线
            .replace(/\//g, '.') //把/ 变成 .;
            .replace(/@/g, '') //删掉所有@
            .replace(/\.ts/g, 'ts'));
    };
    Map.classSignatureMap = function (input) {
        //原本的类签名tostring
        // @demo_Project/demo_Project/src/models/book.ts: helloworld
        //
        return (input
            .replace(/\.ts: /g, 'ts.') //.ts: 变为ts.
            .replace(/\.ets: /g, 'ets.') //.ts: 变为ets.
            .replace(/@/g, '') //删掉所有@
            .replace(/\//g, '.') //把/ 变成 .
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
    //名字中不能出现 - 用 _ 代替
    Map.NameMap = function (input) {
        return input.replace(/-/g, '_')
            .replace(/interface/g, 'Interface');
    };
    Map.NameSpaceSigMap = function (input) {
        return input.replace(/-/g, '_');
    };
    Map.typeMap = function (input) {
        return (input.replace(/[<>]/g, '_'));
    };
    //这个方法用来将modifier里一些jimple不支持的删掉
    Map.modifierMap = function (input) {
        return (input
            .replace(/[-()]/g, '_')
            .replace(/export/g, '')
            .replace(/readonly/g, '')
            .replace(/async/g, '')
            .replace(/const/g, '')
            .replace(/accessor/g, '')
            .replace(/default/g, '')
            .replace(/in/g, '')
            .replace(/out/g, '')
            .replace(/override/g, '')
            .replace(/declare/g, ''));
    };
    //这个方法用来消除方法名中的@
    Map.methodNmaeMap = function (input) {
        return (input.replace(/[@]/g, '')
            .replace(/-/g, '_'));
    };
    //这个方法用来消除参数名名中的@
    Map.localNameMap = function (input) {
        return (input.replace(/[@]/g, ''));
    };
    return Map;
}());
exports.Map = Map;
