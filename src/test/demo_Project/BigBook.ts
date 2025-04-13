import { Book, sayHello } from "./Book";

export class BigBook extends Book{

    public size: number = 15;

    constructor(id: number, name:string){
        super(id, name);
        sayHello(name);
    }
}