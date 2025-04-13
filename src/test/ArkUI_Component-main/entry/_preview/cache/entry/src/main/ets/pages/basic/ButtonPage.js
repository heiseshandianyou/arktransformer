/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
class ButtonPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        //type Button 样式
        , this, "selectTab");
        this.__type = new ObservedPropertySimplePU(ButtonType.Capsule, this, "type");
        this.__typeArr = new ObservedPropertyObjectPU([
            ButtonType.Capsule,
            ButtonType.Circle,
            ButtonType.Normal // 普通按钮（默认不带圆角的矩形）
        ], this, "typeArr");
        this.__typeValueArr = new ObservedPropertyObjectPU([
            { value: 'Capsule' },
            { value: 'Circle' },
            { value: 'Normal' }
        ]
        //stateEffect 按钮按下是否开启按压态效果
        , this, "typeValueArr");
        this.__stateEffect = new ObservedPropertySimplePU(true
        //width 通用宽度属性
        , this, "stateEffect");
        this.__widthValue = new ObservedPropertySimplePU(80
        //height 通用高度属性
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(50
        //fontSize 字体大小
        , this, "heightValue");
        this.__sizeValue = new ObservedPropertySimplePU(14, this, "sizeValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.typeArr !== undefined) {
            this.typeArr = params.typeArr;
        }
        if (params.typeValueArr !== undefined) {
            this.typeValueArr = params.typeValueArr;
        }
        if (params.stateEffect !== undefined) {
            this.stateEffect = params.stateEffect;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.heightValue !== undefined) {
            this.heightValue = params.heightValue;
        }
        if (params.sizeValue !== undefined) {
            this.sizeValue = params.sizeValue;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__typeArr.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueArr.purgeDependencyOnElmtId(rmElmtId);
        this.__stateEffect.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
        this.__sizeValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__typeArr.aboutToBeDeleted();
        this.__typeValueArr.aboutToBeDeleted();
        this.__stateEffect.aboutToBeDeleted();
        this.__widthValue.aboutToBeDeleted();
        this.__heightValue.aboutToBeDeleted();
        this.__sizeValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get type() {
        return this.__type.get();
    }
    set type(newValue) {
        this.__type.set(newValue);
    }
    get typeArr() {
        return this.__typeArr.get();
    }
    set typeArr(newValue) {
        this.__typeArr.set(newValue);
    }
    get typeValueArr() {
        return this.__typeValueArr.get();
    }
    set typeValueArr(newValue) {
        this.__typeValueArr.set(newValue);
    }
    get stateEffect() {
        return this.__stateEffect.get();
    }
    set stateEffect(newValue) {
        this.__stateEffect.set(newValue);
    }
    get widthValue() {
        return this.__widthValue.get();
    }
    set widthValue(newValue) {
        this.__widthValue.set(newValue);
    }
    get heightValue() {
        return this.__heightValue.get();
    }
    set heightValue(newValue) {
        this.__heightValue.set(newValue);
    }
    get sizeValue() {
        return this.__sizeValue.get();
    }
    set sizeValue(newValue) {
        this.__sizeValue.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/ButtonPage.ets(42:5)");
            Column.width('100%');
            Column.height('100%');
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
            Column.debugLine("pages/basic/ButtonPage.ets(44:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Button 按钮' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Button 按钮'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TitleTab(this, { selectTab: this.__selectTab, interface: false, property: true, common: true }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        interface: false, property: true, common: true
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 导航栏---------------------------------------------------------------------
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件预览区 ---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/basic/ButtonPage.ets(51:7)");
            if (!isInitialRender) {
                // 组件预览区 ---------------------------------------------------------------------
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 组件预览区 ---------------------------------------------------------------------
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/ButtonPage.ets(52:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('Button');
            Button.debugLine("pages/basic/ButtonPage.ets(53:9)");
            Button.type(this.type);
            Button.stateEffect(this.stateEffect);
            Button.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Button.width(this.widthValue);
            Button.height(this.heightValue);
            Button.fontSize(this.sizeValue);
            if (!isInitialRender) {
                Button.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Button.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/ButtonPage.ets(62:7)");
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
            Column.debugLine("pages/basic/ButtonPage.ets(65:7)");
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
            //组件属性 tab
            Column.create();
            Column.debugLine("pages/basic/ButtonPage.ets(67:9)");
            //组件属性 tab
            Column.visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                //组件属性 tab
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSelect(this, { name: 'type', valuesList: this.__typeValueArr, itemsList: this.__typeArr, selectItem: this.__type }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'type'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ButtonPage.ets(69:11)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'stateEffect', isOn: this.__stateEffect }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'stateEffect'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        //组件属性 tab
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            //通用通用 tab
            Column.create();
            Column.debugLine("pages/basic/ButtonPage.ets(75:9)");
            //通用通用 tab
            Column.visibility(this.selectTab === 2 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                //通用通用 tab
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'width', value: this.__widthValue, min: 50, max: 180 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 50, max: 180
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ButtonPage.ets(77:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'height', value: this.__heightValue, min: 20, max: 120 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'height', min: 20, max: 120
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ButtonPage.ets(79:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'fontSize', value: this.__sizeValue, min: 10, max: 40 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'fontSize', min: 10, max: 40
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        //通用通用 tab
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
loadDocument(new ButtonPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ButtonPage.js.map