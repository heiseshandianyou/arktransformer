import { BigBook } from "./BigBook";

export function sayHello(reader: string): string{
  return "Hello" + reader;
}


export class Book{
  private static writer = "ljh";
  private id: number = 10;
  private name: string = "CUHK";

  constructor(id:number, name: string){
    
    const a = id;
    if (a > 10){
      this.id = a;
      this.name = name;
    }
  }

  public getBookId(){
    return this.id;
  }

  public static printBookWriter(){
    console.log(this.writer);
  }
  
}

class StudentList {
  public addMethod(){
    let studentList: Array<string> = new Array();
    studentList.push("Bob"); 
    let a: string = studentList[length];
  }
}
