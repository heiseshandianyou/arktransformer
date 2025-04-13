/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class ProgressPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(0
        // --> interface
        // value 指定当前进度值
        , this, "selectTab");
        this.__currentValue = new ObservedPropertySimplePU(50
        // total 指定进度总长
        , this, "currentValue");
        this.__total = new ObservedPropertySimplePU(100
        // type 指定进度条类型
        , this, "total");
        this.__selectType = new ObservedPropertySimplePU(ProgressType.Linear, this, "selectType");
        this.__typeList = new ObservedPropertyObjectPU([
            ProgressType.Linear,
            ProgressType.Ring,
            ProgressType.Eclipse,
            ProgressType.ScaleRing,
            ProgressType.Capsule
        ], this, "typeList");
        this.__typeValueList = new ObservedPropertyObjectPU([
            { value: 'Linear' },
            { value: 'Ring' },
            { value: 'Eclipse' },
            { value: 'Black' },
            { value: 'ScaleRing' }
        ]
        // --> prop
        // color 进度条前景色
        , this, "typeValueList");
        this.__selectColor = new ObservedPropertySimplePU(Color.Blue, this, "selectColor");
        this.__colorList = new ObservedPropertyObjectPU([
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange,
            Color.Grey
        ], this, "colorList");
        this.__colorValueList = new ObservedPropertyObjectPU([
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' },
            { value: 'Grey' }
        ]
        // backgroundColor 进度条底色
        , this, "colorValueList");
        this.__selectBackgroundColor = new ObservedPropertySimplePU(Color.Gray, this, "selectBackgroundColor");
        this.__backgroundColorList = new ObservedPropertyObjectPU([
            Color.Gray,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "backgroundColorList");
        this.__backgroundColorValueList = new ObservedPropertyObjectPU([
            { value: 'Gray' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // style 组件的样式
        , this, "backgroundColorValueList");
        this.__strokeWidth = new ObservedPropertySimplePU(4 // 进度条宽度
        , this, "strokeWidth");
        this.__scaleCount = new ObservedPropertySimplePU(120 // 设置环形进度条总刻度数
        , this, "scaleCount");
        this.__scaleWidth = new ObservedPropertySimplePU(2 // 设置环形进度条刻度粗细
        // width 通用宽度属性
        , this, "scaleWidth");
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
        if (params.currentValue !== undefined) {
            this.currentValue = params.currentValue;
        }
        if (params.total !== undefined) {
            this.total = params.total;
        }
        if (params.selectType !== undefined) {
            this.selectType = params.selectType;
        }
        if (params.typeList !== undefined) {
            this.typeList = params.typeList;
        }
        if (params.typeValueList !== undefined) {
            this.typeValueList = params.typeValueList;
        }
        if (params.selectColor !== undefined) {
            this.selectColor = params.selectColor;
        }
        if (params.colorList !== undefined) {
            this.colorList = params.colorList;
        }
        if (params.colorValueList !== undefined) {
            this.colorValueList = params.colorValueList;
        }
        if (params.selectBackgroundColor !== undefined) {
            this.selectBackgroundColor = params.selectBackgroundColor;
        }
        if (params.backgroundColorList !== undefined) {
            this.backgroundColorList = params.backgroundColorList;
        }
        if (params.backgroundColorValueList !== undefined) {
            this.backgroundColorValueList = params.backgroundColorValueList;
        }
        if (params.strokeWidth !== undefined) {
            this.strokeWidth = params.strokeWidth;
        }
        if (params.scaleCount !== undefined) {
            this.scaleCount = params.scaleCount;
        }
        if (params.scaleWidth !== undefined) {
            this.scaleWidth = params.scaleWidth;
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
        this.__currentValue.purgeDependencyOnElmtId(rmElmtId);
        this.__total.purgeDependencyOnElmtId(rmElmtId);
        this.__selectType.purgeDependencyOnElmtId(rmElmtId);
        this.__typeList.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectColor.purgeDependencyOnElmtId(rmElmtId);
        this.__colorList.purgeDependencyOnElmtId(rmElmtId);
        this.__colorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
        this.__backgroundColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__backgroundColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__strokeWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleCount.purgeDependencyOnElmtId(rmElmtId);
        this.__scaleWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__currentValue.aboutToBeDeleted();
        this.__total.aboutToBeDeleted();
        this.__selectType.aboutToBeDeleted();
        this.__typeList.aboutToBeDeleted();
        this.__typeValueList.aboutToBeDeleted();
        this.__selectColor.aboutToBeDeleted();
        this.__colorList.aboutToBeDeleted();
        this.__colorValueList.aboutToBeDeleted();
        this.__selectBackgroundColor.aboutToBeDeleted();
        this.__backgroundColorList.aboutToBeDeleted();
        this.__backgroundColorValueList.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
        this.__scaleCount.aboutToBeDeleted();
        this.__scaleWidth.aboutToBeDeleted();
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
    get currentValue() {
        return this.__currentValue.get();
    }
    set currentValue(newValue) {
        this.__currentValue.set(newValue);
    }
    get total() {
        return this.__total.get();
    }
    set total(newValue) {
        this.__total.set(newValue);
    }
    get selectType() {
        return this.__selectType.get();
    }
    set selectType(newValue) {
        this.__selectType.set(newValue);
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
    get selectColor() {
        return this.__selectColor.get();
    }
    set selectColor(newValue) {
        this.__selectColor.set(newValue);
    }
    get colorList() {
        return this.__colorList.get();
    }
    set colorList(newValue) {
        this.__colorList.set(newValue);
    }
    get colorValueList() {
        return this.__colorValueList.get();
    }
    set colorValueList(newValue) {
        this.__colorValueList.set(newValue);
    }
    get selectBackgroundColor() {
        return this.__selectBackgroundColor.get();
    }
    set selectBackgroundColor(newValue) {
        this.__selectBackgroundColor.set(newValue);
    }
    get backgroundColorList() {
        return this.__backgroundColorList.get();
    }
    set backgroundColorList(newValue) {
        this.__backgroundColorList.set(newValue);
    }
    get backgroundColorValueList() {
        return this.__backgroundColorValueList.get();
    }
    set backgroundColorValueList(newValue) {
        this.__backgroundColorValueList.set(newValue);
    }
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue) {
        this.__strokeWidth.set(newValue);
    }
    get scaleCount() {
        return this.__scaleCount.get();
    }
    set scaleCount(newValue) {
        this.__scaleCount.set(newValue);
    }
    get scaleWidth() {
        return this.__scaleWidth.get();
    }
    set scaleWidth(newValue) {
        this.__scaleWidth.set(newValue);
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
            Column.debugLine("pages/basic/ProgressPage.ets(93:5)");
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
            Column.debugLine("pages/basic/ProgressPage.ets(95:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Progress 进度条' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Progress 进度条'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TitleTab(this, { selectTab: this.__selectTab, interface: true, property: true, common: true }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        interface: true, property: true, common: true
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
            Blank.debugLine("pages/basic/ProgressPage.ets(100:7)");
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
            Column.debugLine("pages/basic/ProgressPage.ets(101:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Progress.create({ value: this.currentValue, total: this.total, type: this.selectType });
            Progress.debugLine("pages/basic/ProgressPage.ets(102:9)");
            Progress.width(this.widthValue);
            Progress.height(this.heightValue);
            Progress.color(this.selectColor);
            Progress.backgroundColor(this.selectBackgroundColor);
            Progress.style({
                strokeWidth: this.strokeWidth,
                scaleCount: this.scaleCount,
                scaleWidth: this.scaleWidth
            });
            if (!isInitialRender) {
                Progress.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/ProgressPage.ets(113:7)");
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
            Column.debugLine("pages/basic/ProgressPage.ets(115:7)");
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
            // 接口参数 tab
            Column.create();
            Column.debugLine("pages/basic/ProgressPage.ets(117:9)");
            // 接口参数 tab
            Column.visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None);
            if (!isInitialRender) {
                // 接口参数 tab
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'value', value: this.__currentValue, min: 100, max: 200 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'value', min: 100, max: 200
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(119:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'total', value: this.__total, min: 200, max: 400 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'total', min: 200, max: 400
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(121:11)");
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
                        name: 'type',
                        selectItem: this.__selectType,
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
        // 接口参数 tab
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件属性 tab
            Column.create();
            Column.debugLine("pages/basic/ProgressPage.ets(132:9)");
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
                        name: 'color',
                        valuesList: this.__colorValueList,
                        itemsList: this.__colorList,
                        selectItem: this.__selectColor
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'color'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(139:11)");
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
                        name: 'backgroundColor',
                        valuesList: this.__backgroundColorValueList,
                        itemsList: this.__backgroundColorList,
                        selectItem: this.__selectBackgroundColor
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'backgroundColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(146:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'strokeWidth', value: this.__strokeWidth, min: 1, max: 20 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'strokeWidth', min: 1, max: 20
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(148:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'scaleCount', value: this.__scaleCount, min: 60, max: 240 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'scaleCount', min: 60, max: 240
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(150:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'scaleWidth', value: this.__scaleWidth, min: 1, max: 5 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'scaleWidth', min: 1, max: 5
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
            Column.debugLine("pages/basic/ProgressPage.ets(157:9)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__widthValue, name: 'width', min: 100, max: 350 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 100, max: 350
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ProgressPage.ets(159:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__heightValue, name: 'height', min: 100, max: 350 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'height', min: 100, max: 350
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
loadDocument(new ProgressPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ProgressPage.js.map