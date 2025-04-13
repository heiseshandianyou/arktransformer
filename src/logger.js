"use strict";
/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.LOG_MODULE_TYPE = exports.LOG_LEVEL = void 0;
var log4js_1 = require("log4js");
var LOG_LEVEL;
(function (LOG_LEVEL) {
    LOG_LEVEL["ERROR"] = "ERROR";
    LOG_LEVEL["WARN"] = "WARN";
    LOG_LEVEL["INFO"] = "INFO";
    LOG_LEVEL["DEBUG"] = "DEBUG";
    LOG_LEVEL["TRACE"] = "TRACE";
})(LOG_LEVEL || (exports.LOG_LEVEL = LOG_LEVEL = {}));
var LOG_MODULE_TYPE;
(function (LOG_MODULE_TYPE) {
    LOG_MODULE_TYPE["DEFAULT"] = "default";
    LOG_MODULE_TYPE["ARKANALYZER"] = "ArkAnalyzer";
    LOG_MODULE_TYPE["HOMECHECK"] = "HomeCheck";
    LOG_MODULE_TYPE["TOOL"] = "Tool";
})(LOG_MODULE_TYPE || (exports.LOG_MODULE_TYPE = LOG_MODULE_TYPE = {}));
var ConsoleLogger = /** @class */ (function () {
    function ConsoleLogger() {
    }
    ConsoleLogger.configure = function (logFilePath, arkanalyzer_level, tool_level) {
        if (arkanalyzer_level === void 0) { arkanalyzer_level = LOG_LEVEL.ERROR; }
        if (tool_level === void 0) { tool_level = LOG_LEVEL.INFO; }
        (0, log4js_1.configure)({
            appenders: {
                file: {
                    type: 'fileSync',
                    filename: "".concat(logFilePath),
                    maxLogSize: 5 * 1024 * 1024,
                    backups: 5,
                    compress: true,
                    encoding: 'utf-8',
                    layout: {
                        type: 'pattern',
                        pattern: '[%d] [%p] [%z] [%X{module}] - [%X{tag}] %m',
                    },
                },
                console: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '[%d] [%p] [%z] [ArkAnalyzer] - %m',
                    },
                },
            },
            categories: {
                default: {
                    appenders: ['console'],
                    level: 'info',
                    enableCallStack: false,
                },
                ArkAnalyzer: {
                    appenders: ['file'],
                    level: arkanalyzer_level,
                    enableCallStack: true,
                },
                Tool: {
                    appenders: ['file'],
                    level: tool_level,
                    enableCallStack: true,
                },
            },
        });
    };
    ConsoleLogger.getLogger = function (log_type, tag) {
        if (tag === void 0) { tag = '-'; }
        var logger;
        if (log_type === LOG_MODULE_TYPE.DEFAULT || log_type === LOG_MODULE_TYPE.ARKANALYZER) {
            logger = (0, log4js_1.getLogger)(log_type);
        }
        else {
            logger = (0, log4js_1.getLogger)(LOG_MODULE_TYPE.TOOL);
        }
        logger.addContext('module', log_type);
        logger.addContext('tag', tag);
        return logger;
    };
    return ConsoleLogger;
}());
exports.default = ConsoleLogger;
