"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var Logger = /** @class */ (function () {
    function Logger() {
        // 确保日志目录存在
        this.logFilePath = path.join(__dirname, 'output.log');
        this.createLogFile();
    }
    Logger.prototype.createLogFile = function () {
        // 创建日志文件，如果文件已存在则不进行任何操作
        fs.writeFile(this.logFilePath, '', function (err) {
            if (err) {
                console.error('Error creating log file:', err);
            }
            else {
            }
        });
    };
    Logger.prototype.appendToLog = function (message) {
        // 直接追加消息到日志文件
        var logMessage = "".concat(message, "\n");
        fs.appendFile(this.logFilePath, logMessage, function (err) {
            if (err) {
                console.error('Error writing to log file:', err);
            }
            else {
            }
        });
    };
    return Logger;
}());
exports.default = Logger;
