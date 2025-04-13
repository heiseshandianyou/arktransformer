export class cityView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.casts = [];
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.casts !== undefined) {
            this.casts = params.casts;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    weatherImage(weather, parent = null) {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (weather === "晴") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777224, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.debugLine("viewmod/cityView.ets(10:9)");
                        Image.width(30);
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (weather === "阴") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.debugLine("viewmod/cityView.ets(13:9)");
                        Image.width(30);
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (weather === "多云") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.debugLine("viewmod/cityView.ets(16:9)");
                        Image.width(30);
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (weather === "小雨") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.debugLine("viewmod/cityView.ets(19:9)");
                        Image.width(30);
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (weather === "雪") {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        Image.create({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                        Image.debugLine("viewmod/cityView.ets(22:9)");
                        Image.width(30);
                        if (!isInitialRender) {
                            Image.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                });
            }
            else //展示数据
             {
                If.branchId(1);
            }
            if (!isInitialRender) {
                If.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        If.pop();
    }
    //展示数据
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("viewmod/cityView.ets(27:5)");
            Column.width("100%");
            Column.height("100%");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //当天数据
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const cast = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    If.create();
                    if (this.casts[0] === cast) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                //图片
                                Row.create();
                                Row.debugLine("viewmod/cityView.ets(32:11)");
                                //图片
                                Row.height("30%");
                                if (!isInitialRender) {
                                    //图片
                                    Row.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                If.create();
                                if (cast.dayweather === "晴") {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            Image.create({ "id": 16777224, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                            Image.debugLine("viewmod/cityView.ets(34:15)");
                                            Image.width(260);
                                            if (!isInitialRender) {
                                                Image.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    });
                                }
                                else {
                                    If.branchId(1);
                                }
                                if (!isInitialRender) {
                                    If.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            If.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                If.create();
                                if (cast.dayweather === "阴") {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                            Image.debugLine("viewmod/cityView.ets(37:15)");
                                            Image.width(260);
                                            if (!isInitialRender) {
                                                Image.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    });
                                }
                                else {
                                    If.branchId(1);
                                }
                                if (!isInitialRender) {
                                    If.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            If.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                If.create();
                                if (cast.dayweather === "多云") {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                            Image.debugLine("viewmod/cityView.ets(40:15)");
                                            Image.width(260);
                                            if (!isInitialRender) {
                                                Image.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    });
                                }
                                else {
                                    If.branchId(1);
                                }
                                if (!isInitialRender) {
                                    If.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            If.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                If.create();
                                if (cast.dayweather === "小雨") {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            Image.create({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                            Image.debugLine("viewmod/cityView.ets(43:15)");
                                            Image.width(260);
                                            if (!isInitialRender) {
                                                Image.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    });
                                }
                                else {
                                    If.branchId(1);
                                }
                                if (!isInitialRender) {
                                    If.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            If.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                If.create();
                                if (cast.dayweather === "雪") {
                                    this.ifElseBranchUpdateFunction(0, () => {
                                        this.observeComponentCreation((elmtId, isInitialRender) => {
                                            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                            Image.create({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.example.myapplication", "moduleName": "entry" });
                                            Image.debugLine("viewmod/cityView.ets(46:15)");
                                            Image.width(260);
                                            if (!isInitialRender) {
                                                Image.pop();
                                            }
                                            ViewStackProcessor.StopGetAccessRecording();
                                        });
                                    });
                                }
                                else {
                                    If.branchId(1);
                                }
                                if (!isInitialRender) {
                                    If.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            If.pop();
                            //图片
                            Row.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Column.create();
                                Column.debugLine("viewmod/cityView.ets(50:11)");
                                Column.margin({ top: 10 });
                                if (!isInitialRender) {
                                    Column.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                //温度
                                Row.create();
                                Row.debugLine("viewmod/cityView.ets(52:13)");
                                if (!isInitialRender) {
                                    //温度
                                    Row.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Text.create(cast.dayweather);
                                Text.debugLine("viewmod/cityView.ets(53:15)");
                                Text.fontSize(30);
                                Text.fontColor(Color.White);
                                Text.fontWeight(FontWeight.Bold);
                                if (!isInitialRender) {
                                    Text.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            Text.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Text.create("  " + cast.daytemp + " ~ " + cast.nighttemp + "度");
                                Text.debugLine("viewmod/cityView.ets(56:15)");
                                Text.fontSize(30);
                                Text.fontColor(Color.White);
                                Text.fontWeight(FontWeight.Bold);
                                if (!isInitialRender) {
                                    Text.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            Text.pop();
                            //温度
                            Row.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Row.create();
                                Row.debugLine("viewmod/cityView.ets(60:13)");
                                if (!isInitialRender) {
                                    Row.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Text.create(cast.daywind + "风");
                                Text.debugLine("viewmod/cityView.ets(61:15)");
                                Text.fontSize(30);
                                Text.fontColor(Color.White);
                                Text.fontWeight(FontWeight.Bold);
                                if (!isInitialRender) {
                                    Text.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            Text.pop();
                            this.observeComponentCreation((elmtId, isInitialRender) => {
                                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                Text.create(cast.daypower + "级");
                                Text.debugLine("viewmod/cityView.ets(64:15)");
                                Text.fontSize(30);
                                Text.fontColor(Color.White);
                                Text.fontWeight(FontWeight.Bold);
                                if (!isInitialRender) {
                                    Text.pop();
                                }
                                ViewStackProcessor.StopGetAccessRecording();
                            });
                            Text.pop();
                            Row.pop();
                            Column.pop();
                        });
                    }
                    else {
                        If.branchId(1);
                    }
                    if (!isInitialRender) {
                        If.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.casts, forEachItemGenFunction);
            if (!isInitialRender) {
                //当天数据
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        //当天数据
        ForEach.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //近期天气
            Column.create();
            Column.debugLine("viewmod/cityView.ets(73:7)");
            //近期天气
            Column.width("100%");
            //近期天气
            Column.height("30%");
            if (!isInitialRender) {
                //近期天气
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create("近期天气查询");
            Text.debugLine("viewmod/cityView.ets(74:9)");
            Text.fontSize(26);
            Text.margin({ top: 30 });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("viewmod/cityView.ets(75:9)");
            Row.width("80%");
            Row.height("90%");
            Row.backgroundColor("#ffbab8b8");
            Row.justifyContent(FlexAlign.SpaceAround);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const cast = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create();
                    Column.debugLine("viewmod/cityView.ets(77:13)");
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(cast.date.substring(5));
                    Text.debugLine("viewmod/cityView.ets(78:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.weatherImage.bind(this)(cast.dayweather);
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(cast.daytemp.toString());
                    Text.debugLine("viewmod/cityView.ets(80:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Line.create();
                    Line.debugLine("viewmod/cityView.ets(81:15)");
                    Line.width(20);
                    Line.height(80);
                    Line.startPoint([10, 0]);
                    Line.endPoint([10, 70]);
                    Line.stroke(Color.Black);
                    Line.strokeWidth(3);
                    Line.strokeDashArray([10, 3]);
                    if (!isInitialRender) {
                        Line.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create(cast.nighttemp.toString());
                    Text.debugLine("viewmod/cityView.ets(85:15)");
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                this.weatherImage.bind(this)(cast.nightweather);
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.casts, forEachItemGenFunction);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Row.pop();
        //近期天气
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=cityView.js.map