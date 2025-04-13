export default class CustomSelect extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__name = new SynchedPropertySimpleOneWayPU(params.name, this, "name");
        this.__valuesList = new SynchedPropertyObjectTwoWayPU(params.valuesList, this, "valuesList");
        this.__itemsList = new SynchedPropertyObjectTwoWayPU(params.itemsList, this, "itemsList");
        this.__selectItem = new SynchedPropertyObjectTwoWayPU(params.selectItem, this, "selectItem");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
        this.__name.reset(params.name);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__valuesList.purgeDependencyOnElmtId(rmElmtId);
        this.__itemsList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectItem.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__valuesList.aboutToBeDeleted();
        this.__itemsList.aboutToBeDeleted();
        this.__selectItem.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get name() {
        return this.__name.get();
    }
    set name(newValue) {
        this.__name.set(newValue);
    }
    get valuesList() {
        return this.__valuesList.get();
    }
    set valuesList(newValue) {
        this.__valuesList.set(newValue);
    }
    get itemsList() {
        return this.__itemsList.get();
    }
    set itemsList(newValue) {
        this.__itemsList.set(newValue);
    }
    get selectItem() {
        return this.__selectItem.get();
    }
    set selectItem(newValue) {
        this.__selectItem.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("component/controller/CustomSelect.ets(16:5)");
            Column.width('100%');
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("component/controller/CustomSelect.ets(17:7)");
            Row.width('100%');
            Row.height(50);
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.name);
            Text.debugLine("component/controller/CustomSelect.ets(18:9)");
            Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("component/controller/CustomSelect.ets(20:9)");
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Select.create(this.valuesList);
            Select.debugLine("component/controller/CustomSelect.ets(21:9)");
            Select.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Select.value(this.valuesList[0].value);
            Select.onSelect((index, _) => {
                this.selectItem = this.itemsList[index];
            });
            if (!isInitialRender) {
                Select.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Select.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
//# sourceMappingURL=CustomSelect.js.map