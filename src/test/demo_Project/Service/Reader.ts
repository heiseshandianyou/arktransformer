import {Book} from "../Book"

export class Reader{
    
    private readBook: Book;

    constructor(readBook: Book) {
        this.readBook = readBook;
        Book.printBookWriter();
    }

    public getId(){
        const a = this.readBook.getBookId();
        console.log(a);
    }

}

