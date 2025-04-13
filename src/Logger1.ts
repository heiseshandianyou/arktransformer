import * as fs from 'fs';
import * as path from 'path';

export default class Logger {
    private logFilePath: string;

    constructor() {
        // 确保日志目录存在
        this.logFilePath = path.join(__dirname, 'output.log');
        this.createLogFile();
    }

    private createLogFile() {
        // 创建日志文件，如果文件已存在则不进行任何操作
        fs.writeFile(this.logFilePath, '', (err) => {
            if (err) {
                console.error('Error creating log file:', err);
            } else {
                
            }
        });
    }

    public appendToLog(message: string) {
        // 直接追加消息到日志文件
        const logMessage = `${message}\n`;
        fs.appendFile(this.logFilePath, logMessage, (err) => {
            if (err) {
                console.error('Error writing to log file:', err);
            } else {
                
            }
        });
    }
}

