/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
class AlertDialogPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // autoCancel 点击遮障层时，是否关闭弹窗
        , this, "selectTab");
        this.__autoCancel = new ObservedPropertySimplePU(true
        // alignment 弹窗在竖直方向上的对齐方式
        , this, "autoCancel");
        this.__alignment = new ObservedPropertySimplePU(DialogAlignment.Default, this, "alignment");
        this.__alignmentList = new ObservedPropertyObjectPU([
            DialogAlignment.Default,
            DialogAlignment.TopStart,
            DialogAlignment.Top,
            DialogAlignment.TopEnd,
            DialogAlignment.CenterStart,
            DialogAlignment.Center,
            DialogAlignment.CenterEnd,
            DialogAlignment.BottomStart,
            DialogAlignment.Bottom,
            DialogAlignment.BottomEnd,
        ], this, "alignmentList");
        this.__alignmentValueList = new ObservedPropertyObjectPU([
            { value: 'Default' },
            { value: 'TopStart' },
            { value: 'Top' },
            { value: 'TopEnd' },
            { value: 'CenterStart' },
            { value: 'Center' },
            { value: 'CenterEnd' },
            { value: 'BottomStart' },
            { value: 'Bottom' },
            { value: 'BottomEnd' },
        ]
        // offset 弹窗相对alignment所在位置的偏移量
        , this, "alignmentValueList");
        this.__offset_dx = new ObservedPropertySimplePU(0, this, "offset_dx");
        this.__offset_dy = new ObservedPropertySimplePU(0
        //gridCount 弹窗容器宽度所占用栅格数
        , this, "offset_dy");
        this.__gridCount = new ObservedPropertySimplePU(6, this, "gridCount");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.autoCancel !== undefined) {
            this.autoCancel = params.autoCancel;
        }
        if (params.alignment !== undefined) {
            this.alignment = params.alignment;
        }
        if (params.alignmentList !== undefined) {
            this.alignmentList = params.alignmentList;
        }
        if (params.alignmentValueList !== undefined) {
            this.alignmentValueList = params.alignmentValueList;
        }
        if (params.offset_dx !== undefined) {
            this.offset_dx = params.offset_dx;
        }
        if (params.offset_dy !== undefined) {
            this.offset_dy = params.offset_dy;
        }
        if (params.gridCount !== undefined) {
            this.gridCount = params.gridCount;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__autoCancel.purgeDependencyOnElmtId(rmElmtId);
        this.__alignment.purgeDependencyOnElmtId(rmElmtId);
        this.__alignmentList.purgeDependencyOnElmtId(rmElmtId);
        this.__alignmentValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__offset_dx.purgeDependencyOnElmtId(rmElmtId);
        this.__offset_dy.purgeDependencyOnElmtId(rmElmtId);
        this.__gridCount.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__autoCancel.aboutToBeDeleted();
        this.__alignment.aboutToBeDeleted();
        this.__alignmentList.aboutToBeDeleted();
        this.__alignmentValueList.aboutToBeDeleted();
        this.__offset_dx.aboutToBeDeleted();
        this.__offset_dy.aboutToBeDeleted();
        this.__gridCount.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get autoCancel() {
        return this.__autoCancel.get();
    }
    set autoCancel(newValue) {
        this.__autoCancel.set(newValue);
    }
    get alignment() {
        return this.__alignment.get();
    }
    set alignment(newValue) {
        this.__alignment.set(newValue);
    }
    get alignmentList() {
        return this.__alignmentList.get();
    }
    set alignmentList(newValue) {
        this.__alignmentList.set(newValue);
    }
    get alignmentValueList() {
        return this.__alignmentValueList.get();
    }
    set alignmentValueList(newValue) {
        this.__alignmentValueList.set(newValue);
    }
    get offset_dx() {
        return this.__offset_dx.get();
    }
    set offset_dx(newValue) {
        this.__offset_dx.set(newValue);
    }
    get offset_dy() {
        return this.__offset_dy.get();
    }
    set offset_dy(newValue) {
        this.__offset_dy.set(newValue);
    }
    get gridCount() {
        return this.__gridCount.get();
    }
    set gridCount(newValue) {
        this.__gridCount.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/dialog/AlertDialogPage.ets(56:5)");
            Column.height('100%');
            Column.width('100%');
            Column.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 导航栏---------------------------------------------------------------------
            Column.create();
            Column.debugLine("pages/dialog/AlertDialogPage.ets(58:7)");
            if (!isInitialRender) {
                // 导航栏---------------------------------------------------------------------
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new Title(this, { pageTitle: 'AlertDialog 警告弹窗' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'AlertDialog 警告弹窗'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TitleTab(this, { selectTab: this.__selectTab, interface: false, property: true, common: false }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        interface: false, property: true, common: false
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 导航栏---------------------------------------------------------------------
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件预览区---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/dialog/AlertDialogPage.ets(63:7)");
            if (!isInitialRender) {
                // 组件预览区---------------------------------------------------------------------
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 组件预览区---------------------------------------------------------------------
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/dialog/AlertDialogPage.ets(64:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('AlertDialogParamWithConfirm');
            Text.debugLine("pages/dialog/AlertDialogPage.ets(65:9)");
            Text.fontSize(16);
            Text.height(40);
            Text.padding(8);
            Text.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.borderRadius(8);
            Text.margin({ bottom: 30 });
            Text.onClick(() => {
                AlertDialog.show({
                    title: 'Title',
                    message: 'AlertDialogParamWithConfirm',
                    autoCancel: this.autoCancel,
                    alignment: this.alignment,
                    offset: { dx: this.offset_dx, dy: this.offset_dy },
                    gridCount: this.gridCount,
                    confirm: {
                        value: 'confirm',
                        action: () => {
                        }
                    }
                });
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('AlertDialogParamWithButtons');
            Text.debugLine("pages/dialog/AlertDialogPage.ets(88:9)");
            Text.fontSize(16);
            Text.height(40);
            Text.padding(8);
            Text.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.borderRadius(8);
            Text.onClick(() => {
                AlertDialog.show({
                    title: 'Title',
                    message: 'AlertDialogParamWithButtons',
                    autoCancel: this.autoCancel,
                    alignment: this.alignment,
                    offset: { dx: this.offset_dx, dy: this.offset_dy },
                    gridCount: this.gridCount,
                    primaryButton: {
                        value: 'primaryButton',
                        action: () => {
                        }
                    },
                    secondaryButton: {
                        value: 'secondaryButton',
                        action: () => {
                        }
                    }
                });
            });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/dialog/AlertDialogPage.ets(116:7)");
            if (!isInitialRender) {
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件配置区---------------------------------------------------------------------
            Column.create();
            Column.debugLine("pages/dialog/AlertDialogPage.ets(118:7)");
            // 组件配置区---------------------------------------------------------------------
            Column.padding({ left: 12, right: 12 });
            // 组件配置区---------------------------------------------------------------------
            Column.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            // 组件配置区---------------------------------------------------------------------
            Column.margin({ left: 20, right: 20, top: 16, bottom: 16 });
            // 组件配置区---------------------------------------------------------------------
            Column.borderRadius(16);
            if (!isInitialRender) {
                // 组件配置区---------------------------------------------------------------------
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件属性 tab
            Column.create();
            Column.debugLine("pages/dialog/AlertDialogPage.ets(120:9)");
            // 组件属性 tab
            Column.visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                // 组件属性 tab
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSwitch(this, { name: 'autoCancel', isOn: this.__autoCancel }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'autoCancel'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/dialog/AlertDialogPage.ets(122:11)");
            Divider.color({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSelect(this, {
                        name: 'alignment',
                        selectItem: this.__alignment,
                        itemsList: this.__alignmentList,
                        valuesList: this.__alignmentValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'alignment'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/dialog/AlertDialogPage.ets(129:11)");
            Divider.color({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'offset_dx', value: this.__offset_dx, min: -200, max: 200 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'offset_dx', min: -200, max: 200
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/dialog/AlertDialogPage.ets(131:11)");
            Divider.color({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'offset_dy', value: this.__offset_dy, min: -200, max: 200 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'offset_dy', min: -200, max: 200
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/dialog/AlertDialogPage.ets(133:11)");
            Divider.color({ "id": 16777244, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Divider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'gridCount', value: this.__gridCount, min: 2, max: 8 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'gridCount', min: 2, max: 8
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 组件属性 tab
        Column.pop();
        // 组件配置区---------------------------------------------------------------------
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new AlertDialogPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=AlertDialogPage.js.map