import {JsonPrinter, ModelUtils, BasicBlock, SceneConfig, FieldSignature,Scene, ArkFile, ArkNamespace, TiantAnalysisChecker,
    ArkClass, ArkField, ArkMethod, MethodSignature, Cfg, PrinterBuilder, TiantAnalysisSolver,
    SourceMethodPrinter, DotMethodPrinter, ArkBody, Stmt, ModuleScene, DummyMainCreater} from "../../lib/bundle";


const scene = buildScenefromconfig()

scene.inferTypes()
console.log(scene.getFiles());
const defaultMethod = scene.getFiles()[0].getDefaultClass().getDefaultArkMethod();
let method = ModelUtils.getMethodWithName("T1",defaultMethod!);
let source = ModelUtils.getMethodWithName("source",defaultMethod!);
let sink = ModelUtils.getMethodWithName("sink",defaultMethod!);
if(method){
    const problem = new TiantAnalysisChecker([...method.getCfg().getBlocks()][0].getStmts()[method.getParameters().length],method);
    problem.setSinks([sink!]);
    problem.setSources([source!]);
    const solver = new TiantAnalysisSolver(problem, scene);
    solver.solve();
}

function buildScenefromconfig():Scene{
    // build from json
    //这个路径是从项目根目录下开始的
    let config: SceneConfig = new SceneConfig();
    config.buildFromJson("src\\test\\taint.json");
    console.log(config);
    let projectScene: Scene = new Scene();
    projectScene.buildBasicInfo(config);
    projectScene.buildScene4HarmonyProject();
    projectScene.collectProjectImportInfos();
    //const creater = new DummyMainCreater(projectScene);
    //creater.createDummyMain();
    return projectScene;

}