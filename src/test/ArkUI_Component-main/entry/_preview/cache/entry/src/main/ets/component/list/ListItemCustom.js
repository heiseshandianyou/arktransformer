/*
 * @author 鼓捣JIA
 * @date 2023/12/15 22:04
 */
import router from '@ohos:router';
export default class ListItemCustom extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__name = new SynchedPropertySimpleOneWayPU(params.name, this, "name");
        this.__address = new SynchedPropertySimpleOneWayPU(params.address, this, "address");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
    }
    updateStateVars(params) {
        this.__name.reset(params.name);
        this.__address.reset(params.address);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__name.purgeDependencyOnElmtId(rmElmtId);
        this.__address.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__name.aboutToBeDeleted();
        this.__address.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get name() {
        return this.__name.get();
    }
    set name(newValue) {
        this.__name.set(newValue);
    }
    get address() {
        return this.__address.get();
    }
    set address(newValue) {
        this.__address.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("component/list/ListItemCustom.ets(14:5)");
            Column.onClick(() => {
                onJumpClick(this.address);
            });
            Column.alignItems(HorizontalAlign.Start);
            Column.padding(8);
            Column.width('100%');
            Column.height(40);
            Column.justifyContent(FlexAlign.Center);
            Column.backgroundColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Column.borderRadius(8);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Row.create();
            Row.debugLine("component/list/ListItemCustom.ets(15:7)");
            Row.width('100%');
            if (!isInitialRender) {
                Row.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.name);
            Text.debugLine("component/list/ListItemCustom.ets(16:9)");
            Text.fontSize(16);
            Text.margin({ left: 8 });
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("component/list/ListItemCustom.ets(20:9)");
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777229, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Image.debugLine("component/list/ListItemCustom.ets(21:9)");
            Image.height(16);
            Image.rotate({
                x: 0,
                y: 1,
                z: 0,
                centerX: '50%',
                centerY: '50%',
                angle: 180
            });
            Image.fillColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function onJumpClick(src) {
    router.pushUrl({
        url: src
    }, router.RouterMode.Standard, (err) => {
        if (err) {
            console.error(`Invoke pushUrl failed, code is ${err.code}, message is ${err.message}`);
            return;
        }
        console.info('Invoke pushUrl succeeded.');
    });
}
//# sourceMappingURL=ListItemCustom.js.map