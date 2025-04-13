/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class PatternLockPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // backgroundColor
        , this, "selectTab");
        this.__selectBackgroundColor = new ObservedPropertySimplePU(Color.White, this, "selectBackgroundColor");
        this.__backgroundColorList = new ObservedPropertyObjectPU([
            Color.White,
            Color.Gray,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "backgroundColorList");
        this.__backgroundValueColorList = new ObservedPropertyObjectPU([
            { value: 'White' },
            { value: 'Gray' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // sideLength 设置组件的宽度和高度（宽高相同）
        , this, "backgroundValueColorList");
        this.__sideLength = new ObservedPropertySimplePU(270
        // circleRadius 设置宫格中圆点的半径
        , this, "sideLength");
        this.__circleRadius = new ObservedPropertySimplePU(14
        // regularColor 设置宫格圆点在“未选中”状态的填充颜色
        , this, "circleRadius");
        this.__selectRegularColor = new ObservedPropertySimplePU(Color.Black, this, "selectRegularColor");
        this.__regularColorList = new ObservedPropertyObjectPU([
            Color.Black,
            Color.Gray,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "regularColorList");
        this.__regularColorValueList = new ObservedPropertyObjectPU([
            { value: 'Black' },
            { value: 'Gray' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // selectedColor 设置宫格圆点在“选中”状态的填充颜色
        , this, "regularColorValueList");
        this.__selectSelectedColor = new ObservedPropertySimplePU(Color.Black, this, "selectSelectedColor");
        this.__selectedColorList = new ObservedPropertyObjectPU([
            Color.Black,
            Color.Gray,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "selectedColorList");
        this.__selectedColorValueList = new ObservedPropertyObjectPU([
            { value: 'Black' },
            { value: 'Gray' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // activeColor 设置宫格圆点在“激活”状态的填充颜色（“激活”状态为手指经过圆点但还未选中的状态）
        , this, "selectedColorValueList");
        this.__selectActiveColor = new ObservedPropertySimplePU(Color.Black, this, "selectActiveColor");
        this.__activeColorList = new ObservedPropertyObjectPU([
            Color.Black,
            Color.Gray,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "activeColorList");
        this.__activeColorValueList = new ObservedPropertyObjectPU([
            { value: 'Black' },
            { value: 'Gray' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // pathColor 设置连线的颜色
        , this, "activeColorValueList");
        this.__selectPathColor = new ObservedPropertySimplePU(Color.Gray, this, "selectPathColor");
        this.__pathColorList = new ObservedPropertyObjectPU([
            Color.Gray,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "pathColorList");
        this.__pathColorValueList = new ObservedPropertyObjectPU([
            { value: 'Gray' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // pathStrokeWidth 设置连线的宽度。设置为0或负数等非法值时连线不显示
        , this, "pathColorValueList");
        this.__pathStrokeWidth = new ObservedPropertySimplePU(34
        // autoReset 在完成密码输入后再次在组件区域按下时是否重置组件状态
        , this, "pathStrokeWidth");
        this.__autoReset = new ObservedPropertySimplePU(true, this, "autoReset");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.selectBackgroundColor !== undefined) {
            this.selectBackgroundColor = params.selectBackgroundColor;
        }
        if (params.backgroundColorList !== undefined) {
            this.backgroundColorList = params.backgroundColorList;
        }
        if (params.backgroundValueColorList !== undefined) {
            this.backgroundValueColorList = params.backgroundValueColorList;
        }
        if (params.sideLength !== undefined) {
            this.sideLength = params.sideLength;
        }
        if (params.circleRadius !== undefined) {
            this.circleRadius = params.circleRadius;
        }
        if (params.selectRegularColor !== undefined) {
            this.selectRegularColor = params.selectRegularColor;
        }
        if (params.regularColorList !== undefined) {
            this.regularColorList = params.regularColorList;
        }
        if (params.regularColorValueList !== undefined) {
            this.regularColorValueList = params.regularColorValueList;
        }
        if (params.selectSelectedColor !== undefined) {
            this.selectSelectedColor = params.selectSelectedColor;
        }
        if (params.selectedColorList !== undefined) {
            this.selectedColorList = params.selectedColorList;
        }
        if (params.selectedColorValueList !== undefined) {
            this.selectedColorValueList = params.selectedColorValueList;
        }
        if (params.selectActiveColor !== undefined) {
            this.selectActiveColor = params.selectActiveColor;
        }
        if (params.activeColorList !== undefined) {
            this.activeColorList = params.activeColorList;
        }
        if (params.activeColorValueList !== undefined) {
            this.activeColorValueList = params.activeColorValueList;
        }
        if (params.selectPathColor !== undefined) {
            this.selectPathColor = params.selectPathColor;
        }
        if (params.pathColorList !== undefined) {
            this.pathColorList = params.pathColorList;
        }
        if (params.pathColorValueList !== undefined) {
            this.pathColorValueList = params.pathColorValueList;
        }
        if (params.pathStrokeWidth !== undefined) {
            this.pathStrokeWidth = params.pathStrokeWidth;
        }
        if (params.autoReset !== undefined) {
            this.autoReset = params.autoReset;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__selectBackgroundColor.purgeDependencyOnElmtId(rmElmtId);
        this.__backgroundColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__backgroundValueColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__sideLength.purgeDependencyOnElmtId(rmElmtId);
        this.__circleRadius.purgeDependencyOnElmtId(rmElmtId);
        this.__selectRegularColor.purgeDependencyOnElmtId(rmElmtId);
        this.__regularColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__regularColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectSelectedColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectActiveColor.purgeDependencyOnElmtId(rmElmtId);
        this.__activeColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__activeColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectPathColor.purgeDependencyOnElmtId(rmElmtId);
        this.__pathColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__pathColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__pathStrokeWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__autoReset.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__selectBackgroundColor.aboutToBeDeleted();
        this.__backgroundColorList.aboutToBeDeleted();
        this.__backgroundValueColorList.aboutToBeDeleted();
        this.__sideLength.aboutToBeDeleted();
        this.__circleRadius.aboutToBeDeleted();
        this.__selectRegularColor.aboutToBeDeleted();
        this.__regularColorList.aboutToBeDeleted();
        this.__regularColorValueList.aboutToBeDeleted();
        this.__selectSelectedColor.aboutToBeDeleted();
        this.__selectedColorList.aboutToBeDeleted();
        this.__selectedColorValueList.aboutToBeDeleted();
        this.__selectActiveColor.aboutToBeDeleted();
        this.__activeColorList.aboutToBeDeleted();
        this.__activeColorValueList.aboutToBeDeleted();
        this.__selectPathColor.aboutToBeDeleted();
        this.__pathColorList.aboutToBeDeleted();
        this.__pathColorValueList.aboutToBeDeleted();
        this.__pathStrokeWidth.aboutToBeDeleted();
        this.__autoReset.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
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
    get backgroundValueColorList() {
        return this.__backgroundValueColorList.get();
    }
    set backgroundValueColorList(newValue) {
        this.__backgroundValueColorList.set(newValue);
    }
    get sideLength() {
        return this.__sideLength.get();
    }
    set sideLength(newValue) {
        this.__sideLength.set(newValue);
    }
    get circleRadius() {
        return this.__circleRadius.get();
    }
    set circleRadius(newValue) {
        this.__circleRadius.set(newValue);
    }
    get selectRegularColor() {
        return this.__selectRegularColor.get();
    }
    set selectRegularColor(newValue) {
        this.__selectRegularColor.set(newValue);
    }
    get regularColorList() {
        return this.__regularColorList.get();
    }
    set regularColorList(newValue) {
        this.__regularColorList.set(newValue);
    }
    get regularColorValueList() {
        return this.__regularColorValueList.get();
    }
    set regularColorValueList(newValue) {
        this.__regularColorValueList.set(newValue);
    }
    get selectSelectedColor() {
        return this.__selectSelectedColor.get();
    }
    set selectSelectedColor(newValue) {
        this.__selectSelectedColor.set(newValue);
    }
    get selectedColorList() {
        return this.__selectedColorList.get();
    }
    set selectedColorList(newValue) {
        this.__selectedColorList.set(newValue);
    }
    get selectedColorValueList() {
        return this.__selectedColorValueList.get();
    }
    set selectedColorValueList(newValue) {
        this.__selectedColorValueList.set(newValue);
    }
    get selectActiveColor() {
        return this.__selectActiveColor.get();
    }
    set selectActiveColor(newValue) {
        this.__selectActiveColor.set(newValue);
    }
    get activeColorList() {
        return this.__activeColorList.get();
    }
    set activeColorList(newValue) {
        this.__activeColorList.set(newValue);
    }
    get activeColorValueList() {
        return this.__activeColorValueList.get();
    }
    set activeColorValueList(newValue) {
        this.__activeColorValueList.set(newValue);
    }
    get selectPathColor() {
        return this.__selectPathColor.get();
    }
    set selectPathColor(newValue) {
        this.__selectPathColor.set(newValue);
    }
    get pathColorList() {
        return this.__pathColorList.get();
    }
    set pathColorList(newValue) {
        this.__pathColorList.set(newValue);
    }
    get pathColorValueList() {
        return this.__pathColorValueList.get();
    }
    set pathColorValueList(newValue) {
        this.__pathColorValueList.set(newValue);
    }
    get pathStrokeWidth() {
        return this.__pathStrokeWidth.get();
    }
    set pathStrokeWidth(newValue) {
        this.__pathStrokeWidth.set(newValue);
    }
    get autoReset() {
        return this.__autoReset.get();
    }
    set autoReset(newValue) {
        this.__autoReset.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/PatternLockPage.ets(127:5)");
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
            Column.debugLine("pages/basic/PatternLockPage.ets(129:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'PatternLock 密码锁' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'PatternLock 密码锁'
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
            Blank.debugLine("pages/basic/PatternLockPage.ets(134:7)");
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
            Column.debugLine("pages/basic/PatternLockPage.ets(135:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            PatternLock.create();
            PatternLock.debugLine("pages/basic/PatternLockPage.ets(136:9)");
            PatternLock.backgroundColor(this.selectBackgroundColor);
            PatternLock.sideLength(this.sideLength);
            PatternLock.circleRadius(this.circleRadius);
            PatternLock.regularColor(this.selectRegularColor);
            PatternLock.selectedColor(this.selectSelectedColor);
            PatternLock.activeColor(this.selectActiveColor);
            PatternLock.pathColor(this.selectPathColor);
            PatternLock.pathStrokeWidth(this.pathStrokeWidth);
            PatternLock.autoReset(this.autoReset);
            if (!isInitialRender) {
                PatternLock.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/PatternLockPage.ets(148:7)");
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
            Column.debugLine("pages/basic/PatternLockPage.ets(150:7)");
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
            Column.debugLine("pages/basic/PatternLockPage.ets(152:9)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'sideLength', value: this.__sideLength, min: 100, max: 270 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'sideLength', min: 100, max: 270
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(154:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'circleRadius', value: this.__circleRadius, min: 5, max: 15 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'circleRadius', min: 5, max: 15
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(156:11)");
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
                        name: 'regularColor',
                        selectItem: this.__selectRegularColor,
                        itemsList: this.__selectedColorList,
                        valuesList: this.__selectedColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'regularColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(163:11)");
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
                        name: 'selectedColor',
                        selectItem: this.__selectSelectedColor,
                        itemsList: this.__selectedColorList,
                        valuesList: this.__selectedColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'selectedColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(170:11)");
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
                        name: 'activeColor',
                        selectItem: this.__selectActiveColor,
                        itemsList: this.__activeColorList,
                        valuesList: this.__activeColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'activeColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(177:11)");
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
                        name: 'pathColor',
                        selectItem: this.__selectPathColor,
                        itemsList: this.__pathColorList,
                        valuesList: this.__pathColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'pathColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/PatternLockPage.ets(184:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'pathStroke', value: this.__pathStrokeWidth, min: 2, max: 15 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'pathStroke', min: 2, max: 15
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
            Column.debugLine("pages/basic/PatternLockPage.ets(191:9)");
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
                    ViewPU.create(new CustomSelect(this, {
                        name: 'backgroundColor',
                        valuesList: this.__backgroundValueColorList,
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
loadDocument(new PatternLockPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=PatternLockPage.js.map