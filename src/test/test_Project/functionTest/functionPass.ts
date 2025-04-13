class FunctionFactory {

    public static sink(input: number) {
        console.log(input);
    }

    public main() {
        const add =  FunctionFactory.createInt();
        const fun1 = FunctionFactory.createFunction1();
        const fun2 = FunctionFactory.createFunction(fun1, add);
        let result: number = fun2(10);
        FunctionFactory.sink(result);
    }

    public static createInt(): number {
        return 5;
    }
    
    public static createFunction(func: (x: number) => number, add: number): (x: number) => number {
        return (x: number) => func(x) + add;
    }

    
    public static createFunction1(): (x: number) => number {
        return (x: number) => x + 1;
    }
}
