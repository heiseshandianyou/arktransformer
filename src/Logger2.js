"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger2 = void 0;
var fs = require("fs");
var path = require("path");
var Logger2 = /** @class */ (function () {
    // 构造函数，接收日志文件夹路径和可选的前缀
    function Logger2(logDir, prefix) {
        if (prefix === void 0) { prefix = ""; }
        this.prefix = prefix;
        this.logDir = logDir;
        // 确保日志文件夹存在，如果不存在则创建
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir, { recursive: true });
        }
    }
    // 格式化日志消息，添加缩进
    Logger2.prototype.formatMessage = function (message, indent) {
        var timestamp = new Date().toISOString();
        var prefixPart = this.prefix ? "[".concat(this.prefix, "] ") : "";
        var indentSpaces = "  ".repeat(indent); // 每个缩进用两个空格
        return "".concat(timestamp, " ").concat(prefixPart).concat(indentSpaces).concat(message, "\n");
    };
    // 写入日志到文件
    Logger2.prototype.writeToFile = function (message, indent) {
        var formattedMessage = this.formatMessage(message, indent);
        // 日志文件名使用日期，例如 "2025-03-21.log"
        var date = new Date().toISOString().split("T")[0];
        var logFilePath = path.join(this.logDir, "".concat(date, ".log"));
        // 追加写入文件
        fs.appendFileSync(logFilePath, formattedMessage, "utf8");
    };
    // 公开的日志方法，接收消息和缩进级别
    Logger2.prototype.log = function (message, indent) {
        if (indent === void 0) { indent = 0; }
        this.writeToFile(message, indent);
    };
    // 设置新的前缀（可选）
    Logger2.prototype.setPrefix = function (prefix) {
        this.prefix = prefix;
    };
    return Logger2;
}());
exports.Logger2 = Logger2;
