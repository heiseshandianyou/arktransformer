interface User {
  name: string;
  age: number;
  like?: string;//可选属性
  greet(message: string): void; // 方法签名
  readonly model: string;
  (source: string, subString: string): boolean; // 函数签名
  (source: string, subString: string): number; // 函数签名
}

