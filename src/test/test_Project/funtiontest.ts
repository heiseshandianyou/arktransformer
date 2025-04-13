//单独的函数 命名
function printOut(s: string){
    console.log(s);
}

//匿名函数
const myFunction = function(s: string){
    console.log(s);
}

//函数作为函数参数
function bigPrint(fn: (a: string) => void){
    fn("sdf");
}

//函数作为函数返回值
function createMultiplier(multiplier: number): (x: number) => number {
    return function(x: number): number {
        return x * multiplier;
    };
}


function createAdder(amount: number): (x: number) => number {
    return (x: number): number => x + amount;
}


function createCalculator(multiplier: number): (a: number, b: number) => number {
    return function(a: number, b: number): number {
        return (a + b) * multiplier;
    };
}