/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class ImagePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // objectFit 填充效果
        , this, "selectTab");
        this.__selectObjectFit = new ObservedPropertySimplePU(ImageFit.Contain, this, "selectObjectFit");
        this.__objectFitList = new ObservedPropertyObjectPU([
            ImageFit.Auto,
            ImageFit.Contain,
            ImageFit.Cover,
            ImageFit.Fill,
            ImageFit.ScaleDown,
            ImageFit.None
        ], this, "objectFitList");
        this.__objectFitValueList = new ObservedPropertyObjectPU([
            { value: 'Auto' },
            { value: 'Contain' },
            { value: 'Cover' },
            { value: 'Fill' },
            { value: 'ScaleDown' },
            { value: 'None' }
        ]
        // objectRepeat 重复样式
        , this, "objectFitValueList");
        this.__selectObjectRepeat = new ObservedPropertySimplePU(ImageRepeat.NoRepeat, this, "selectObjectRepeat");
        this.__objectRepeatList = new ObservedPropertyObjectPU([
            ImageRepeat.NoRepeat,
            ImageRepeat.X,
            ImageRepeat.Y,
            ImageRepeat.XY
        ], this, "objectRepeatList");
        this.__objectRepeatValueList = new ObservedPropertyObjectPU([
            { value: 'NoRepeat' },
            { value: 'X' },
            { value: 'Y' },
            { value: 'XY' }
        ]
        // renderMode 渲染模式
        , this, "objectRepeatValueList");
        this.__selectRenderMode = new ObservedPropertySimplePU(ImageRenderMode.Original, this, "selectRenderMode");
        this.__renderModeList = new ObservedPropertyObjectPU([
            ImageRenderMode.Original,
            ImageRenderMode.Template
        ], this, "renderModeList");
        this.__renderModeValueList = new ObservedPropertyObjectPU([
            { value: 'Original' },
            { value: 'Template' }
        ]
        // width 通用宽度属性
        , this, "renderModeValueList");
        this.__widthValue = new ObservedPropertySimplePU(300
        // height 通用高度属性
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(300, this, "heightValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.selectObjectFit !== undefined) {
            this.selectObjectFit = params.selectObjectFit;
        }
        if (params.objectFitList !== undefined) {
            this.objectFitList = params.objectFitList;
        }
        if (params.objectFitValueList !== undefined) {
            this.objectFitValueList = params.objectFitValueList;
        }
        if (params.selectObjectRepeat !== undefined) {
            this.selectObjectRepeat = params.selectObjectRepeat;
        }
        if (params.objectRepeatList !== undefined) {
            this.objectRepeatList = params.objectRepeatList;
        }
        if (params.objectRepeatValueList !== undefined) {
            this.objectRepeatValueList = params.objectRepeatValueList;
        }
        if (params.selectRenderMode !== undefined) {
            this.selectRenderMode = params.selectRenderMode;
        }
        if (params.renderModeList !== undefined) {
            this.renderModeList = params.renderModeList;
        }
        if (params.renderModeValueList !== undefined) {
            this.renderModeValueList = params.renderModeValueList;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.heightValue !== undefined) {
            this.heightValue = params.heightValue;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__selectObjectFit.purgeDependencyOnElmtId(rmElmtId);
        this.__objectFitList.purgeDependencyOnElmtId(rmElmtId);
        this.__objectFitValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectObjectRepeat.purgeDependencyOnElmtId(rmElmtId);
        this.__objectRepeatList.purgeDependencyOnElmtId(rmElmtId);
        this.__objectRepeatValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectRenderMode.purgeDependencyOnElmtId(rmElmtId);
        this.__renderModeList.purgeDependencyOnElmtId(rmElmtId);
        this.__renderModeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__selectObjectFit.aboutToBeDeleted();
        this.__objectFitList.aboutToBeDeleted();
        this.__objectFitValueList.aboutToBeDeleted();
        this.__selectObjectRepeat.aboutToBeDeleted();
        this.__objectRepeatList.aboutToBeDeleted();
        this.__objectRepeatValueList.aboutToBeDeleted();
        this.__selectRenderMode.aboutToBeDeleted();
        this.__renderModeList.aboutToBeDeleted();
        this.__renderModeValueList.aboutToBeDeleted();
        this.__widthValue.aboutToBeDeleted();
        this.__heightValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get selectObjectFit() {
        return this.__selectObjectFit.get();
    }
    set selectObjectFit(newValue) {
        this.__selectObjectFit.set(newValue);
    }
    get objectFitList() {
        return this.__objectFitList.get();
    }
    set objectFitList(newValue) {
        this.__objectFitList.set(newValue);
    }
    get objectFitValueList() {
        return this.__objectFitValueList.get();
    }
    set objectFitValueList(newValue) {
        this.__objectFitValueList.set(newValue);
    }
    get selectObjectRepeat() {
        return this.__selectObjectRepeat.get();
    }
    set selectObjectRepeat(newValue) {
        this.__selectObjectRepeat.set(newValue);
    }
    get objectRepeatList() {
        return this.__objectRepeatList.get();
    }
    set objectRepeatList(newValue) {
        this.__objectRepeatList.set(newValue);
    }
    get objectRepeatValueList() {
        return this.__objectRepeatValueList.get();
    }
    set objectRepeatValueList(newValue) {
        this.__objectRepeatValueList.set(newValue);
    }
    get selectRenderMode() {
        return this.__selectRenderMode.get();
    }
    set selectRenderMode(newValue) {
        this.__selectRenderMode.set(newValue);
    }
    get renderModeList() {
        return this.__renderModeList.get();
    }
    set renderModeList(newValue) {
        this.__renderModeList.set(newValue);
    }
    get renderModeValueList() {
        return this.__renderModeValueList.get();
    }
    set renderModeValueList(newValue) {
        this.__renderModeValueList.set(newValue);
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
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/ImagePage.ets(69:5)");
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
            Column.debugLine("pages/basic/ImagePage.ets(71:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Image 图片' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Image 图片'
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
            // 组件预览区---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/basic/ImagePage.ets(76:7)");
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
            Column.debugLine("pages/basic/ImagePage.ets(77:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Image.create({ "id": 16777236, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Image.debugLine("pages/basic/ImagePage.ets(78:9)");
            Image.sourceSize({ width: 200, height: 266 });
            Image.width(this.widthValue);
            Image.height(this.heightValue);
            Image.objectFit(this.selectObjectFit);
            Image.objectRepeat(this.selectObjectRepeat);
            Image.renderMode(this.selectRenderMode);
            if (!isInitialRender) {
                Image.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/ImagePage.ets(87:7)");
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
            Column.debugLine("pages/basic/ImagePage.ets(89:7)");
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
            Column.debugLine("pages/basic/ImagePage.ets(91:9)");
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
                    ViewPU.create(new CustomSelect(this, {
                        name: 'objectFit',
                        itemsList: this.__objectFitList,
                        valuesList: this.__objectFitValueList,
                        selectItem: this.__selectObjectFit
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'objectFit'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImagePage.ets(98:11)");
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
                        name: 'objectRepeat',
                        itemsList: this.__objectRepeatList,
                        valuesList: this.__objectRepeatValueList,
                        selectItem: this.__selectObjectRepeat
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'objectRepeat'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImagePage.ets(105:11)");
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
                        name: 'renderMode',
                        itemsList: this.__renderModeList,
                        valuesList: this.__renderModeValueList,
                        selectItem: this.__selectRenderMode
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'renderMode'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 组件属性 tab
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 通用属性 tab
            Column.create();
            Column.debugLine("pages/basic/ImagePage.ets(117:9)");
            // 通用属性 tab
            Column.visibility(this.selectTab === 2 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                // 通用属性 tab
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { value: this.__widthValue, name: 'width', min: 100, max: 300 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 100, max: 300
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImagePage.ets(119:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__heightValue, name: 'height', min: 100, max: 300 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'height', min: 100, max: 300
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 通用属性 tab
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
loadDocument(new ImagePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ImagePage.js.map