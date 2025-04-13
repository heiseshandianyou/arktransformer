class UnaryTest{
    public test(x: number){
        if (!(x === 1)){
            x = 2;
        }
        if (x){
            x = 2;
        }
        if ( ~(x)){
            x = 3;
        }
        if (!(x === 1) && (x != 2)){
            x = 4;
        }
    }
}