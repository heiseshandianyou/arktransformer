class Parent1 {
    number: number = 0; // 字段直接初始化，无构造函数

    public say(){
        console.log("sssss")
    }
}

class Child1 extends Parent1 {
    constructor() {
        // 隐式调用 super()
        super();
        console.log("Child1 的构造方法");
        const c1 = new Parent1();
        if (c1) {
            console.log("sds");
        }
        super.say();
    }
}

// 测试
const c1 = new Child1();
// 输出: Child1 的构造方法

class Parent2 {
    constructor(message: string) {
        console.log(`Parent2 的构造方法,message = ${message}`);
    }
}

class Child2 extends Parent2 {
    constructor(message: string) {
        super(message); // 显式调用，传递参数
        console.log("Child2 的构造方法");
    }
}

// 测试
const c2 = new Child2("Hello");
// 输出:
// Parent2 的构造方法，message = Hello
// Child2 的构造方法


class Parent3 {
    constructor(number: number); // 声明重载
    constructor(number: number, extra?: string) { // 可选参数
        console.log(`Parent3 的构造方法,number = ${number}, extra = ${extra || "none"}`);
    }
}



class Child3 extends Parent3 {
    constructor() {
        super(42); // 显式调用，选择一个构造函数
        console.log("Child3 的构造方法");
    }
}

// 测试
const c3 = new Child3();
// 输出:
// Parent3 的构造方法，number = 42, extra = none
// Child3 的构造方法