import router from '@ohos:router';
class AddCity extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__AllCityCodeList = new ObservedPropertyObjectPU([110000, 120000, 130000, 140000, 150000, 210000, 220000, 230000, 310000, 320000, 330000, 340000, 350000, 360000, 370000, 500000, 410000, 420000, 530000, 810000], this, "AllCityCodeList");
        this.__AllCityNameList = new ObservedPropertyObjectPU(["北京市", "天津市", "河北省", "山西省", "内蒙古自治区", "辽宁省", "吉林省", "黑龙江省", "上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "重庆市", "河南省", "湖北省", "云南省", "香港市"]
        //接受数据
        , this, "AllCityNameList");
        this.__cityCodeList = new ObservedPropertyObjectPU([110000, 120000], this, "cityCodeList");
        this.__cityNameList = new ObservedPropertyObjectPU(["北京市", "天津市"], this, "cityNameList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.AllCityCodeList !== undefined) {
            this.AllCityCodeList = params.AllCityCodeList;
        }
        if (params.AllCityNameList !== undefined) {
            this.AllCityNameList = params.AllCityNameList;
        }
        if (params.cityCodeList !== undefined) {
            this.cityCodeList = params.cityCodeList;
        }
        if (params.cityNameList !== undefined) {
            this.cityNameList = params.cityNameList;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__AllCityCodeList.purgeDependencyOnElmtId(rmElmtId);
        this.__AllCityNameList.purgeDependencyOnElmtId(rmElmtId);
        this.__cityCodeList.purgeDependencyOnElmtId(rmElmtId);
        this.__cityNameList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__AllCityCodeList.aboutToBeDeleted();
        this.__AllCityNameList.aboutToBeDeleted();
        this.__cityCodeList.aboutToBeDeleted();
        this.__cityNameList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get AllCityCodeList() {
        return this.__AllCityCodeList.get();
    }
    set AllCityCodeList(newValue) {
        this.__AllCityCodeList.set(newValue);
    }
    get AllCityNameList() {
        return this.__AllCityNameList.get();
    }
    set AllCityNameList(newValue) {
        this.__AllCityNameList.set(newValue);
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
    onPageShow() {
        let params = router.getParams();
        this.cityCodeList = params["codes"];
        this.cityNameList = params["names"];
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/addCity.ets(20:5)");
            Column.width("100%");
            Column.height("100%");
            Column.backgroundColor("#87ceeb");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("pages/addCity.ets(21:7)");
            Row.height("10%");
            Row.width("95%");
            Row.onClick(() => {
                router.back({
                    url: "pages/Index",
                    params: {
                        codes: this.cityCodeList,
                        names: this.cityNameList
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
            Text.create("添加城市列表");
            Text.debugLine("pages/addCity.ets(22:9)");
            Text.fontSize(35);
            Text.fontColor(Color.White);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/addCity.ets(23:9)");
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel("完成");
            Button.debugLine("pages/addCity.ets(24:9)");
            Button.fontSize(26);
            Button.backgroundColor("");
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Row.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/addCity.ets(36:7)");
            Column.width("100%");
            Column.height("90%");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            List.create();
            List.debugLine("pages/addCity.ets(37:9)");
            if (!isInitialRender) {
                List.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const name = _item;
                {
                    const isLazyCreate = true;
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, isLazyCreate);
                        ListItem.debugLine("pages/addCity.ets(39:13)");
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const observedShallowRender = () => {
                        this.observeComponentCreation(itemCreation);
                        ListItem.pop();
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation(itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (this.cityNameList.includes(name)) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Column.create();
                                        Column.debugLine("pages/addCity.ets(41:17)");
                                        Column.height(90);
                                        Column.width("100%");
                                        Column.margin({ top: 20 });
                                        Column.backgroundColor("#4682b4");
                                        if (!isInitialRender) {
                                            Column.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Row.create();
                                        Row.debugLine("pages/addCity.ets(42:19)");
                                        Row.width("100%");
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(name);
                                        Text.debugLine("pages/addCity.ets(43:21)");
                                        Text.fontSize(35);
                                        Text.fontColor(Color.White);
                                        Text.width("60%");
                                        Text.margin({ top: 20, left: 20 });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create("已添加");
                                        Text.debugLine("pages/addCity.ets(45:21)");
                                        Text.backgroundColor("");
                                        Text.fontSize(18);
                                        Text.margin({ top: 5 });
                                        Text.opacity(0.8);
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(48:19)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Divider.create();
                                        Divider.debugLine("pages/addCity.ets(49:19)");
                                        Divider.strokeWidth(5);
                                        if (!isInitialRender) {
                                            Divider.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Column.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Column.create();
                                        Column.debugLine("pages/addCity.ets(53:17)");
                                        Column.height(90);
                                        Column.width("100%");
                                        Column.margin({ top: 20 });
                                        if (!isInitialRender) {
                                            Column.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Row.create();
                                        Row.debugLine("pages/addCity.ets(54:19)");
                                        Row.width("100%");
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(name);
                                        Text.debugLine("pages/addCity.ets(55:21)");
                                        Text.fontSize(35);
                                        Text.fontColor(Color.White);
                                        Text.width("60%");
                                        Text.margin({ top: 20, left: 20 });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(57:21)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Button.createWithLabel("添加");
                                        Button.debugLine("pages/addCity.ets(58:21)");
                                        Button.backgroundColor("");
                                        Button.fontSize(18);
                                        Button.margin({ right: 5 });
                                        Button.onClick(() => {
                                            //根据name 来索引
                                            let index = this.AllCityNameList.findIndex(obj => obj === name);
                                            //根据索引获得code
                                            let cityCode = this.AllCityCodeList[index];
                                            //加入队列
                                            this.cityNameList.push(name);
                                            this.cityCodeList.push(cityCode);
                                        });
                                        if (!isInitialRender) {
                                            Button.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Button.pop();
                                    Row.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(70:19)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Divider.create();
                                        Divider.debugLine("pages/addCity.ets(71:19)");
                                        Divider.strokeWidth(5);
                                        if (!isInitialRender) {
                                            Divider.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Column.pop();
                                });
                            }
                            if (!isInitialRender) {
                                If.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        If.pop();
                        ListItem.pop();
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.updateFuncByElmtId.set(elmtId, itemCreation);
                        this.observeComponentCreation((elmtId, isInitialRender) => {
                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                            If.create();
                            if (this.cityNameList.includes(name)) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Column.create();
                                        Column.debugLine("pages/addCity.ets(41:17)");
                                        Column.height(90);
                                        Column.width("100%");
                                        Column.margin({ top: 20 });
                                        Column.backgroundColor("#4682b4");
                                        if (!isInitialRender) {
                                            Column.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Row.create();
                                        Row.debugLine("pages/addCity.ets(42:19)");
                                        Row.width("100%");
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(name);
                                        Text.debugLine("pages/addCity.ets(43:21)");
                                        Text.fontSize(35);
                                        Text.fontColor(Color.White);
                                        Text.width("60%");
                                        Text.margin({ top: 20, left: 20 });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create("已添加");
                                        Text.debugLine("pages/addCity.ets(45:21)");
                                        Text.backgroundColor("");
                                        Text.fontSize(18);
                                        Text.margin({ top: 5 });
                                        Text.opacity(0.8);
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    Row.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(48:19)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Divider.create();
                                        Divider.debugLine("pages/addCity.ets(49:19)");
                                        Divider.strokeWidth(5);
                                        if (!isInitialRender) {
                                            Divider.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Column.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Column.create();
                                        Column.debugLine("pages/addCity.ets(53:17)");
                                        Column.height(90);
                                        Column.width("100%");
                                        Column.margin({ top: 20 });
                                        if (!isInitialRender) {
                                            Column.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Row.create();
                                        Row.debugLine("pages/addCity.ets(54:19)");
                                        Row.width("100%");
                                        if (!isInitialRender) {
                                            Row.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Text.create(name);
                                        Text.debugLine("pages/addCity.ets(55:21)");
                                        Text.fontSize(35);
                                        Text.fontColor(Color.White);
                                        Text.width("60%");
                                        Text.margin({ top: 20, left: 20 });
                                        if (!isInitialRender) {
                                            Text.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Text.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(57:21)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Button.createWithLabel("添加");
                                        Button.debugLine("pages/addCity.ets(58:21)");
                                        Button.backgroundColor("");
                                        Button.fontSize(18);
                                        Button.margin({ right: 5 });
                                        Button.onClick(() => {
                                            //根据name 来索引
                                            let index = this.AllCityNameList.findIndex(obj => obj === name);
                                            //根据索引获得code
                                            let cityCode = this.AllCityCodeList[index];
                                            //加入队列
                                            this.cityNameList.push(name);
                                            this.cityCodeList.push(cityCode);
                                        });
                                        if (!isInitialRender) {
                                            Button.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Button.pop();
                                    Row.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Blank.create();
                                        Blank.debugLine("pages/addCity.ets(70:19)");
                                        if (!isInitialRender) {
                                            Blank.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Blank.pop();
                                    this.observeComponentCreation((elmtId, isInitialRender) => {
                                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                        Divider.create();
                                        Divider.debugLine("pages/addCity.ets(71:19)");
                                        Divider.strokeWidth(5);
                                        if (!isInitialRender) {
                                            Divider.pop();
                                        }
                                        ViewStackProcessor.StopGetAccessRecording();
                                    });
                                    Column.pop();
                                });
                            }
                            if (!isInitialRender) {
                                If.pop();
                            }
                            ViewStackProcessor.StopGetAccessRecording();
                        });
                        If.pop();
                        ListItem.pop();
                    };
                    if (isLazyCreate) {
                        observedShallowRender();
                    }
                    else {
                        observedDeepRender();
                    }
                }
            };
            this.forEachUpdateFunction(elmtId, this.AllCityNameList, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        List.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new AddCity(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=addCity.js.map