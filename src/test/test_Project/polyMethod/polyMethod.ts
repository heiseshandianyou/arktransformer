class polyMethod{
    name: string;
    age: number;

    // 构造函数重载签名
    constructor(name: string);
    constructor(name: string, age: number);
    constructor(name: string, age?: number) {
        this.name = name;
        this.age = age ?? 0; // 如果 age 未提供，则默认值为 0
    }

    sss(name: string):void;
    sss(name: string, age: number):void;
    sss(name: string, age?: number):void {
        this.name = name;
        this.age = age ?? 0; // 如果 age 未提供，则默认值为 0
    }

    displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    } 
}