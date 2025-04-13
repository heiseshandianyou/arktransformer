// 使用 super 的例子
class AnimalWithSound {
    constructor() {
        console.log("Animal created");
    }
    
    sound(): void {
        console.log("Some sound");
    }
}

class DogWithSound extends AnimalWithSound {
    constructor() {
        super(); // 调用父类构造函数
    }
    
    sound(): void {
        super.sound(); // 调用父类的 sound 方法
        console.log("Woof!");
    }
}