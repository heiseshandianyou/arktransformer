import router from '@ohos:router';
import { cityView } from '@bundle:com.example.myapplication/entry/ets/viewmod/cityView';
import getweatherUtil from '@bundle:com.example.myapplication/entry/ets/viewmod/Getweather';
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__cityIndex = new ObservedPropertySimplePU(0
        //城市代码集合
        , this, "cityIndex");
        this.__cityCodeList = new ObservedPropertyObjectPU([110000, 120000]
        //城市名字集合
        , this, "cityCodeList");
        this.__cityNameList = new ObservedPropertyObjectPU([]
        //城市信息集合
        , this, "cityNameList");
        this.__cityWeatherList = new ObservedPropertyObjectPU([], this, "cityWeatherList");
        this.tabController = new TabsController();
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.cityIndex !== undefined) {
            this.cityIndex = params.cityIndex;
        }
        if (params.cityCodeList !== undefined) {
            this.cityCodeList = params.cityCodeList;
        }
        if (params.cityNameList !== undefined) {
            this.cityNameList = params.cityNameList;
        }
        if (params.cityWeatherList !== undefined) {
            this.cityWeatherList = params.cityWeatherList;
        }
        if (params.tabController !== undefined) {
            this.tabController = params.tabController;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__cityIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__cityCodeList.purgeDependencyOnElmtId(rmElmtId);
        this.__cityNameList.purgeDependencyOnElmtId(rmElmtId);
        this.__cityWeatherList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__cityIndex.aboutToBeDeleted();
        this.__cityCodeList.aboutToBeDeleted();
        this.__cityNameList.aboutToBeDeleted();
        this.__cityWeatherList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get cityIndex() {
        return this.__cityIndex.get();
    }
    set cityIndex(newValue) {
        this.__cityIndex.set(newValue);
    }
    get cityCodeList() {
        return this.__cityCodeList.get();
    }
    set cityCodeList(newValue) {
        this.__cityCodeList.set(newValue);
    }
    get cityNameList() {
        return this.__cityNameList.get();
    }
    set cityNameList(newValue) {
        this.__cityNameList.set(newValue);
    }
    get cityWeatherList() {
        return this.__cityWeatherList.get();
    }
    set cityWeatherList(newValue) {
        this.__cityWeatherList.set(newValue);
    }
    //按钮样式
    tabBuilder(index, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Circle.create({ width: 10, height: 10 });
            Circle.debugLine("pages/Index.ets(23:5)");
            Circle.fill(this.cityIndex === index ? Color.White : Color.Grey);
            Circle.opacity(0.4);
            if (!isInitialRender) {
                Circle.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
    }
    onPageShow() {
        let params = router.getParams();
        if (params != null) {
            //清空数据
            this.cityWeatherList = [];
            this.cityNameList = [];
            this.cityCodeList = params["codes"];
            this.initDate();
        }
    }
    //获取数据
    aboutToAppear() {
        this.initDate();
    }
    //初始化方法
    async initDate() {
        //得到访问结果
        let result = await getweatherUtil.getWeathers(this.cityCodeList);
        //对结果遍历
        for (let i = 0; i < result.length; i++) {
            let ACityWeathger = result[i];
            this.cityWeatherList.push(ACityWeathger);
            let cityName = result[i].forecasts[0].city;
            this.cityNameList.push(cityName);
        }
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/Index.ets(59:5)");
            Column.width("100%");
            Column.height("100%");
            Column.backgroundColor("#87CEEB");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/Index.ets(60:7)");
            Row.width("100%");
            Row.height("10%");
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.onClick(() => {
                AlertDialog.show({
                    title: "删除",
                    message: `确定删除${this.cityNameList[this.cityIndex]}吗`,
                    confirm: {
                        value: "确定",
                        action: () => {
                            this.cityNameList =
                                this.cityNameList.filter(item => item !== this.cityNameList[this.cityIndex]);
                            this.cityCodeList =
                                this.cityCodeList.filter(item => item !== this.cityCodeList[this.cityIndex]);
                            this.cityWeatherList =
                                this.cityWeatherList.filter(item => item !== this.cityWeatherList[this.cityIndex]);
                        }
                    }
                });
            });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("添加");
            Button.debugLine("pages/Index.ets(61:9)");
            Button.fontSize(25);
            Button.fontColor(Color.Gray);
            Button.opacity(0.7);
            Button.backgroundColor("#87CEEB");
            Button.margin({ bottom: 15 });
            Button.onClick(() => {
                router.pushUrl({
                    url: "pages/addCity",
                    params: {
                        codes: this.cityCodeList,
                        names: this.cityNameList
                    }
                });
            });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("删除");
            Button.debugLine("pages/Index.ets(77:9)");
            Button.fontSize(25);
            Button.fontColor(Color.Gray);
            Button.opacity(0.7);
            Button.backgroundColor("#87CEEB");
            Button.margin({ bottom: 15 });
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/Index.ets(102:7)");
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.cityNameList[this.cityIndex]);
            Text.debugLine("pages/Index.ets(103:9)");
            Text.fontSize(40);
            Text.fontColor(Color.Orange);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //城市信息布局
            Tabs.create({ barPosition: BarPosition.Start, controller: this.tabController });
            Tabs.debugLine("pages/Index.ets(108:7)");
            //城市信息布局
            Tabs.barWidth(30);
            //城市信息布局
            Tabs.barHeight(40);
            //城市信息布局
            Tabs.onChange((index) => {
                this.cityIndex = index;
            });
            if (!isInitialRender) {
                //城市信息布局
                Tabs.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const cityWeather = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    TabContent.create(() => {
                        {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                if (isInitialRender) {
                                    ViewPU.create(new cityView(this, { casts: cityWeather.forecasts[0].casts }, undefined, elmtId));
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                        }
                    });
                    TabContent.tabBar({ builder: () => {
                            this.tabBuilder.call(this, this.cityWeatherList.findIndex(obj => obj === cityWeather));
                        } });
                    TabContent.debugLine("pages/Index.ets(110:11)");
                    if (!isInitialRender) {
                        TabContent.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                TabContent.pop();
            };
            this.forEachUpdateFunction(elmtId, this.cityWeatherList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        //城市信息布局
        Tabs.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new Index(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=Index.js.map