/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
class SideBarContainerPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(0, this, "selectTab");
        this.normalIcon = { "id": 16777226, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" };
        this.selectedIcon = { "id": 16777219, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" };
        this.__arr = new ObservedPropertyObjectPU([1, 2, 3], this, "arr");
        this.__current = new ObservedPropertySimplePU(1
        //--> interface
        // type 侧边栏的显示类型
        , this, "current");
        this.__type = new ObservedPropertySimplePU(SideBarContainerType.Embed, this, "type");
        this.__typeList = new ObservedPropertyObjectPU([
            SideBarContainerType.Embed,
            SideBarContainerType.Overlay
        ], this, "typeList");
        this.__typeValueList = new ObservedPropertyObjectPU([
            { value: 'Embed' },
            { value: 'Overlay' }
        ]
        //--> property
        // showSideBar 是否显示侧边栏
        , this, "typeValueList");
        this.__showSideBar = new ObservedPropertySimplePU(true
        // showControlButton 是否显示控制按钮
        , this, "showSideBar");
        this.__showControlButton = new ObservedPropertySimplePU(true
        // sideBarWidth 侧边栏的宽度
        , this, "showControlButton");
        this.__sideBarWidth = new ObservedPropertySimplePU(60
        // sideBarPosition 侧边栏显示位置
        , this, "sideBarWidth");
        this.__sideBarPosition = new ObservedPropertySimplePU(SideBarPosition.Start, this, "sideBarPosition");
        this.__sideBarPositionList = new ObservedPropertyObjectPU([
            SideBarPosition.Start,
            SideBarPosition.End
        ], this, "sideBarPositionList");
        this.__sideBarPositionValueList = new ObservedPropertyObjectPU([
            { value: 'Start' },
            { value: 'End' }
        ], this, "sideBarPositionValueList");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.normalIcon !== undefined) {
            this.normalIcon = params.normalIcon;
        }
        if (params.selectedIcon !== undefined) {
            this.selectedIcon = params.selectedIcon;
        }
        if (params.arr !== undefined) {
            this.arr = params.arr;
        }
        if (params.current !== undefined) {
            this.current = params.current;
        }
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.typeList !== undefined) {
            this.typeList = params.typeList;
        }
        if (params.typeValueList !== undefined) {
            this.typeValueList = params.typeValueList;
        }
        if (params.showSideBar !== undefined) {
            this.showSideBar = params.showSideBar;
        }
        if (params.showControlButton !== undefined) {
            this.showControlButton = params.showControlButton;
        }
        if (params.sideBarWidth !== undefined) {
            this.sideBarWidth = params.sideBarWidth;
        }
        if (params.sideBarPosition !== undefined) {
            this.sideBarPosition = params.sideBarPosition;
        }
        if (params.sideBarPositionList !== undefined) {
            this.sideBarPositionList = params.sideBarPositionList;
        }
        if (params.sideBarPositionValueList !== undefined) {
            this.sideBarPositionValueList = params.sideBarPositionValueList;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__arr.purgeDependencyOnElmtId(rmElmtId);
        this.__current.purgeDependencyOnElmtId(rmElmtId);
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__typeList.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__showSideBar.purgeDependencyOnElmtId(rmElmtId);
        this.__showControlButton.purgeDependencyOnElmtId(rmElmtId);
        this.__sideBarWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__sideBarPosition.purgeDependencyOnElmtId(rmElmtId);
        this.__sideBarPositionList.purgeDependencyOnElmtId(rmElmtId);
        this.__sideBarPositionValueList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__arr.aboutToBeDeleted();
        this.__current.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__typeList.aboutToBeDeleted();
        this.__typeValueList.aboutToBeDeleted();
        this.__showSideBar.aboutToBeDeleted();
        this.__showControlButton.aboutToBeDeleted();
        this.__sideBarWidth.aboutToBeDeleted();
        this.__sideBarPosition.aboutToBeDeleted();
        this.__sideBarPositionList.aboutToBeDeleted();
        this.__sideBarPositionValueList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get arr() {
        return this.__arr.get();
    }
    set arr(newValue) {
        this.__arr.set(newValue);
    }
    get current() {
        return this.__current.get();
    }
    set current(newValue) {
        this.__current.set(newValue);
    }
    get type() {
        return this.__type.get();
    }
    set type(newValue) {
        this.__type.set(newValue);
    }
    get typeList() {
        return this.__typeList.get();
    }
    set typeList(newValue) {
        this.__typeList.set(newValue);
    }
    get typeValueList() {
        return this.__typeValueList.get();
    }
    set typeValueList(newValue) {
        this.__typeValueList.set(newValue);
    }
    get showSideBar() {
        return this.__showSideBar.get();
    }
    set showSideBar(newValue) {
        this.__showSideBar.set(newValue);
    }
    get showControlButton() {
        return this.__showControlButton.get();
    }
    set showControlButton(newValue) {
        this.__showControlButton.set(newValue);
    }
    get sideBarWidth() {
        return this.__sideBarWidth.get();
    }
    set sideBarWidth(newValue) {
        this.__sideBarWidth.set(newValue);
    }
    get sideBarPosition() {
        return this.__sideBarPosition.get();
    }
    set sideBarPosition(newValue) {
        this.__sideBarPosition.set(newValue);
    }
    get sideBarPositionList() {
        return this.__sideBarPositionList.get();
    }
    set sideBarPositionList(newValue) {
        this.__sideBarPositionList.set(newValue);
    }
    get sideBarPositionValueList() {
        return this.__sideBarPositionValueList.get();
    }
    set sideBarPositionValueList(newValue) {
        this.__sideBarPositionValueList.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(55:5)");
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
            Column.debugLine("pages/container/SideBarContainerPage.ets(57:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'SideBarContainer 侧边栏' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'SideBarContainer 侧边栏'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TitleTab(this, { selectTab: this.__selectTab, interface: true, property: true, common: false }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        interface: true, property: true, common: false
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
            Blank.debugLine("pages/container/SideBarContainerPage.ets(62:7)");
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
            Column.debugLine("pages/container/SideBarContainerPage.ets(63:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            SideBarContainer.create(this.type);
            SideBarContainer.debugLine("pages/container/SideBarContainerPage.ets(64:9)");
            SideBarContainer.sideBarWidth(this.sideBarWidth);
            SideBarContainer.minSideBarWidth(50);
            SideBarContainer.maxSideBarWidth(300);
            SideBarContainer.showSideBar(this.showSideBar);
            SideBarContainer.showControlButton(this.showControlButton);
            SideBarContainer.sideBarPosition(this.sideBarPosition);
            SideBarContainer.controlButton({
                top: 12,
                left: 14,
                icons: {
                    hidden: { "id": 16777230, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" },
                    shown: { "id": 16777230, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" },
                    switching: { "id": 16777230, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" }
                }
            });
            if (!isInitialRender) {
                SideBarContainer.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(65:11)");
            Column.width('100%');
            Column.justifyContent(FlexAlign.Start);
            Column.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(66:13)");
            Column.height(50);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ForEach.create();
            const forEachItemGenFunction = (_item, _) => {
                const item = _item;
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Column.create({ space: 5 });
                    Column.debugLine("pages/container/SideBarContainerPage.ets(69:15)");
                    Column.margin({ bottom: 12, top: 12 });
                    Column.onClick(() => {
                        this.current = item;
                    });
                    if (!isInitialRender) {
                        Column.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Image.create(this.current === item ? this.selectedIcon : this.normalIcon);
                    Image.debugLine("pages/container/SideBarContainerPage.ets(70:17)");
                    Image.width(32);
                    Image.height(32);
                    if (!isInitialRender) {
                        Image.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                this.observeComponentCreation((elmtId, isInitialRender) => {
                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                    Text.create('0' + item);
                    Text.debugLine("pages/container/SideBarContainerPage.ets(73:17)");
                    Text.fontSize(14);
                    Text.fontColor(this.current === item ? Color.Black : Color.Gray);
                    Text.fontWeight(this.current === item ? 600 : 400);
                    if (!isInitialRender) {
                        Text.pop();
                    }
                    ViewStackProcessor.StopGetAccessRecording();
                });
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.arr, forEachItemGenFunction, undefined, true, false);
            if (!isInitialRender) {
                ForEach.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        ForEach.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(88:11)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('01 内容');
            Text.debugLine("pages/container/SideBarContainerPage.ets(89:13)");
            Text.width('100%');
            Text.height(48);
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.fontSize(24);
            Text.visibility(this.current === 1 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('02 内容');
            Text.debugLine("pages/container/SideBarContainerPage.ets(97:13)");
            Text.width('100%');
            Text.height(48);
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.backgroundColor(Color.Orange);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(24);
            Text.visibility(this.current === 2 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('03 内容');
            Text.debugLine("pages/container/SideBarContainerPage.ets(105:13)");
            Text.width('100%');
            Text.height(48);
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Text.backgroundColor(Color.Green);
            Text.textAlign(TextAlign.Center);
            Text.fontSize(24);
            Text.visibility(this.current === 3 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件配置区---------------------------------------------------------------------
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(115:13)");
            // 组件配置区---------------------------------------------------------------------
            Column.padding({ left: 12, right: 12 });
            // 组件配置区---------------------------------------------------------------------
            Column.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            // 组件配置区---------------------------------------------------------------------
            Column.margin({ left: 10, right: 10, top: 10, bottom: 10 });
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
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(116:15)");
            Column.visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSelect(this, {
                        name: 'type',
                        selectItem: this.__type,
                        itemsList: this.__typeList,
                        valuesList: this.__typeValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'type'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/container/SideBarContainerPage.ets(125:15)");
            Column.visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSwitch(this, { name: 'showSideBar', isOn: this.__showSideBar }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'showSideBar'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/SideBarContainerPage.ets(127:17)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'showControlButton', isOn: this.__showControlButton }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'showControlButton'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/SideBarContainerPage.ets(129:17)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'sideBarWidth', value: this.__sideBarWidth, min: 50, max: 100 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'sideBarWidth', min: 50, max: 100
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/SideBarContainerPage.ets(131:17)");
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
                        name: 'sideBarPosition',
                        selectItem: this.__sideBarPosition,
                        itemsList: this.__sideBarPositionList,
                        valuesList: this.__sideBarPositionValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'sideBarPosition'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        Column.pop();
        // 组件配置区---------------------------------------------------------------------
        Column.pop();
        Column.pop();
        SideBarContainer.pop();
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new SideBarContainerPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=SideBarContainerPage.js.map