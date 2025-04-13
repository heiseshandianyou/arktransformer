export default class TitleTab extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new SynchedPropertySimpleTwoWayPU(params.selectTab, this, "selectTab");
        this.__interface = new SynchedPropertySimpleOneWayPU(params.interface, this, "interface");
        this.__property = new SynchedPropertySimpleOneWayPU(params.property, this, "property");
        this.__common = new SynchedPropertySimpleOneWayPU(params.common, this, "common");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
        this.__interface.reset(params.interface);
        this.__property.reset(params.property);
        this.__common.reset(params.common);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__interface.purgeDependencyOnElmtId(rmElmtId);
        this.__property.purgeDependencyOnElmtId(rmElmtId);
        this.__common.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__interface.aboutToBeDeleted();
        this.__property.aboutToBeDeleted();
        this.__common.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get interface() {
        return this.__interface.get();
    }
    set interface(newValue) {
        this.__interface.set(newValue);
    }
    get property() {
        return this.__property.get();
    }
    set property(newValue) {
        this.__property.set(newValue);
    }
    get common() {
        return this.__common.get();
    }
    set common(newValue) {
        this.__common.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create({ space: 32 });
            Row.debugLine("component/title/TitleTab.ets(14:5)");
            Row.height(40);
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
            Row.alignItems(VerticalAlign.Center);
            Row.padding({ bottom: 4 });
            Row.backgroundColor({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            If.create();
            if (this.interface) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        If.create();
                        if (this.selectTab === 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.debugLine("component/title/TitleTab.ets(17:11)");
                                    Column.width(60);
                                    Column.height(24);
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.justifyContent(FlexAlign.Center);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Column.transition({ type: TransitionType.Insert, opacity: 0.5, scale: { x: 0.85, y: 0.85 } });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('接口');
                                    Text.debugLine("component/title/TitleTab.ets(18:13)");
                                    Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.fontWeight(500);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('接口');
                                    Text.debugLine("component/title/TitleTab.ets(31:11)");
                                    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.width(60);
                                    Text.onClick(() => {
                                        Context.animateTo({ duration: 200 }, () => {
                                            this.selectTab = 0;
                                        });
                                    });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                            });
                        }
                        if (!isInitialRender) {
                            If.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    If.pop();
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
            if (this.property) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        If.create();
                        if (this.selectTab === 1) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.debugLine("component/title/TitleTab.ets(45:11)");
                                    Column.width(60);
                                    Column.height(24);
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.justifyContent(FlexAlign.Center);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Column.transition({ type: TransitionType.Insert, opacity: 0.5, scale: { x: 0.85, y: 0.85 } });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('属性');
                                    Text.debugLine("component/title/TitleTab.ets(46:13)");
                                    Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.fontWeight(500);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('属性');
                                    Text.debugLine("component/title/TitleTab.ets(60:11)");
                                    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.width(60);
                                    Text.onClick(() => {
                                        Context.animateTo({ duration: 200 }, () => {
                                            this.selectTab = 1;
                                        });
                                    });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                            });
                        }
                        if (!isInitialRender) {
                            If.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    If.pop();
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
            if (this.common) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation((elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        If.create();
                        if (this.selectTab === 2) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Column.create();
                                    Column.debugLine("component/title/TitleTab.ets(74:11)");
                                    Column.width(60);
                                    Column.height(24);
                                    Column.alignItems(HorizontalAlign.Center);
                                    Column.justifyContent(FlexAlign.Center);
                                    Column.borderRadius(12);
                                    Column.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Column.transition({ type: TransitionType.Insert, opacity: 0.5, scale: { x: 0.85, y: 0.85 } });
                                    if (!isInitialRender) {
                                        Column.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('通用');
                                    Text.debugLine("component/title/TitleTab.ets(75:13)");
                                    Text.fontColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.fontWeight(500);
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                                Column.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                                this.observeComponentCreation((elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    Text.create('通用');
                                    Text.debugLine("component/title/TitleTab.ets(88:11)");
                                    Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
                                    Text.textAlign(TextAlign.Center);
                                    Text.width(60);
                                    Text.onClick(() => {
                                        Context.animateTo({ duration: 200 }, () => {
                                            this.selectTab = 2;
                                        });
                                    });
                                    if (!isInitialRender) {
                                        Text.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                });
                                Text.pop();
                            });
                        }
                        if (!isInitialRender) {
                            If.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    });
                    If.pop();
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
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=TitleTab.js.map