import { ArkIfStmt,BasicBlock, Local,
    MethodParameter,Type,MethodSubSignature, SceneConfig, 
    Scene, ArkFile, ArkNamespace, ArkClass, ArkField, ArkMethod, 
    Cfg,ArkBody, ClassSignature, Stmt, ArkReturnStmt, ArkReturnVoidStmt,
    ArkAssignStmt, ArkThisRef, ArkParameterRef, Value, ArkInvokeStmt,
    ClassType, ArkInstanceFieldRef,  ArkSwitchStmt,
    AbstractInvokeExpr, ArkStaticInvokeExpr, ArkInstanceInvokeExpr,
    MethodSignature, FieldSignature,ImportInfo,
    AbstractExpr} from "../lib/bundle";

import { ArkModule } from "./ArkModule";

//这个类是最上层的类  聚合了所有的ArkModule
export class ArkView{

    private scene: Scene;
    private modules: Set<ArkModule> = new Set();

    //这个Map有助于我们通过全称名字找到对应的module
    private nametoModule: Map<string, ArkModule> = new Map();
    //这个Map有助于我们通过绝对路径找到module
    private path2Module: Map<string, ArkModule> = new Map();
    

    constructor(inputscene: Scene){
        this.scene = inputscene;
        this.buildModles();
        this.buidPath2ModuleMap();
        this.modules.forEach((module) => {
            module.setImportValuableClass();
            module.buildSimpleMap();
            module.setInitSimpleMap();
            console.log("模块" + module.getModuleName());
            console.log(module.getSimple2FullMap());           
        });
        this.typeCheckModules();
    }
    //这个方法建立了模块
    public buildModles():void{
        let arkFiles: ArkFile[] = this.scene.getFiles();
        arkFiles.forEach((file) => {
            let newModule: ArkModule = new ArkModule(file, this);
            this.modules.add(newModule);
        });
        //把所有的模块输入Map
        this.modules.forEach((module) => {
            module.buildSimpleMap();
            this.nametoModule.set(module.getModuleName(), module);
        });
        
    }

    public buildGlobalModule():void{

    }

    //这里实现全局的类 我们把所有全局的对象都塞到一个全局的module中 

    //从输入的name返回Module
    public getModdulebyName(moduleName: string):ArkModule | null{
        return this.nametoModule.get(moduleName) || null;
    } 

    //从输入的absPath返回Module
    public getModdulebyPath(absPath: string):ArkModule | null{
        return this.path2Module.get(absPath) || null;
    } 
    
    //返回Module以Array
    public getModules(): ArkModule[]{
        return Array.from(this.modules.values())
    }

    public getModuleNames(): string[]{


        let moduleNames: string[] = [];
        this.getModules().forEach((module) => {
            moduleNames.push(module.getModuleName());
        });
        return moduleNames;

    }

    private buidPath2ModuleMap():void{
        let abspath: string;
        this.modules.forEach((module) => {
            abspath = module.getFile().getFilePath().replace(/\\\\/g, '\\');
            this.path2Module.set(abspath, module);
        });
    }

    public getPath2ModuleMap(): Map<string, ArkModule>{
        return this.path2Module;
    }

    // 这个方法会把改view中所有的类打印为jimple格式储存到文件夹下
    public printClassesToJimple(){
        //遍历每一个module 调用他们的print
        
        this.modules.forEach((module) =>{          
            module.printModule();
        });
    }

    //这个方法会调用所有module的typecheck方法
    public typeCheckModules(){
        //先调用已有的
        this.modules.forEach((module) =>{          
            module.checkType();
        });
        
    }

}