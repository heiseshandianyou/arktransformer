
import { ClassPrinter } from './ClassPrinter';
import {Scene, ArkFile, ArkClass} from "../lib/bundle";

export class JimplePrinter{
    private scene: Scene;
    constructor(inputScene: Scene){
        this.scene = Scene;
    }
    public printScene(){
        //就先遍历所有当前的所有的类
        let classPrinter: ClassPrinter;
        let files: ArkFile[] = this.scene.getFiles();
        for (let i:number = 0; i < files.length; i++){
            let classes: ArkClass[] = files[i].getClasses();
            for (let j: number = 0; j < classes.length; j++){
                classPrinter = new ClassPrinter(classes[j]);
                classPrinter.print();
            }
        }        
    }
}