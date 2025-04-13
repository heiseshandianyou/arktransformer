import * as fs from "fs";
import * as path from "path";

export class Logger2 {
  private prefix: string; // 日志前缀
  private logDir: string; // 日志文件夹路径

  // 构造函数，接收日志文件夹路径和可选的前缀
  constructor(logDir: string, prefix: string = "") {
    this.prefix = prefix;
    this.logDir = logDir;

    // 确保日志文件夹存在，如果不存在则创建
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  // 格式化日志消息，添加缩进
  private formatMessage(message: string, indent: number): string {
    const timestamp = new Date().toISOString();
    const prefixPart = this.prefix ? `[${this.prefix}] ` : "";
    const indentSpaces = "  ".repeat(indent); // 每个缩进用两个空格
    return `${timestamp} ${prefixPart}${indentSpaces}${message}\n`;
  }

  // 写入日志到文件
  private writeToFile(message: string, indent: number): void {
    const formattedMessage = this.formatMessage(message, indent);

    // 日志文件名使用日期，例如 "2025-03-21.log"
    const date = new Date().toISOString().split("T")[0];
    const logFilePath = path.join(this.logDir, `${date}.log`);

    // 追加写入文件
    fs.appendFileSync(logFilePath, formattedMessage, "utf8");
  }

  // 公开的日志方法，接收消息和缩进级别
  public log(message: string, indent: number = 0): void {
    this.writeToFile(message, indent);
  }

  // 设置新的前缀（可选）
  public setPrefix(prefix: string): void {
    this.prefix = prefix;
  }
}
