/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
class SliderPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(0
        // value 当前进度值
        , this, "selectTab");
        this.__value = new ObservedPropertySimplePU(50
        // step 滑动步长
        , this, "value");
        this.__step = new ObservedPropertySimplePU(1
        // style 滑块与滑轨显示样式
        , this, "step");
        this.__style = new ObservedPropertySimplePU(SliderStyle.OutSet, this, "style");
        this.__styleList = new ObservedPropertyObjectPU([
            SliderStyle.OutSet,
            SliderStyle.InSet
        ], this, "styleList");
        this.__styleValueList = new ObservedPropertyObjectPU([
            { value: 'OutSet' },
            { value: 'InSet' }
        ]
        // direction 滑动条方向
        , this, "styleValueList");
        this.__direct = new ObservedPropertySimplePU(Axis.Horizontal, this, "direct");
        this.__directList = new ObservedPropertyObjectPU([
            Axis.Horizontal,
            Axis.Vertical
        ], this, "directList");
        this.__directValueList = new ObservedPropertyObjectPU([
            { value: 'Horizontal' },
            { value: 'Vertical' }
        ]
        // reverse 反向
        , this, "directValueList");
        this.__reverse = new ObservedPropertySimplePU(false
        // blockColor 滑块的颜色
        , this, "reverse");
        this.__blockColor = new ObservedPropertySimplePU(Color.White, this, "blockColor");
        this.__blockColorList = new ObservedPropertyObjectPU([
            Color.White,
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange,
            Color.Grey
        ], this, "blockColorList");
        this.__blockColorValueList = new ObservedPropertyObjectPU([
            { value: 'White' },
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' },
            { value: 'Grey' }
        ]
        // trackColor 滑轨颜色
        , this, "blockColorValueList");
        this.__trackColor = new ObservedPropertySimplePU(Color.White, this, "trackColor");
        this.__trackColorList = new ObservedPropertyObjectPU([
            Color.White,
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange,
            Color.Grey
        ], this, "trackColorList");
        this.__trackColorValueList = new ObservedPropertyObjectPU([
            { value: 'White' },
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' },
            { value: 'Grey' }
        ]
        // selectedColor 已滑动部分滑轨颜色
        , this, "trackColorValueList");
        this.__selectedColor = new ObservedPropertySimplePU(Color.Blue, this, "selectedColor");
        this.__selectedColorList = new ObservedPropertyObjectPU([
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange,
            Color.Grey
        ], this, "selectedColorList");
        this.__selectedColorValueList = new ObservedPropertyObjectPU([
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' },
            { value: 'Grey' }
        ]
        // showSteps 展示步长刻度值
        , this, "selectedColorValueList");
        this.__showSteps = new ObservedPropertySimplePU(false
        // showTips 是否显示百分比气泡
        , this, "showSteps");
        this.__showTips = new ObservedPropertySimplePU(false
        // trackThickness 滑轨粗细
        , this, "showTips");
        this.__trackThickness = new ObservedPropertySimplePU(4
        // width 通用宽度属性
        , this, "trackThickness");
        this.__widthValue = new ObservedPropertySimplePU(200
        // height 通用高度属性
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(200, this, "heightValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.step !== undefined) {
            this.step = params.step;
        }
        if (params.style !== undefined) {
            this.style = params.style;
        }
        if (params.styleList !== undefined) {
            this.styleList = params.styleList;
        }
        if (params.styleValueList !== undefined) {
            this.styleValueList = params.styleValueList;
        }
        if (params.direct !== undefined) {
            this.direct = params.direct;
        }
        if (params.directList !== undefined) {
            this.directList = params.directList;
        }
        if (params.directValueList !== undefined) {
            this.directValueList = params.directValueList;
        }
        if (params.reverse !== undefined) {
            this.reverse = params.reverse;
        }
        if (params.blockColor !== undefined) {
            this.blockColor = params.blockColor;
        }
        if (params.blockColorList !== undefined) {
            this.blockColorList = params.blockColorList;
        }
        if (params.blockColorValueList !== undefined) {
            this.blockColorValueList = params.blockColorValueList;
        }
        if (params.trackColor !== undefined) {
            this.trackColor = params.trackColor;
        }
        if (params.trackColorList !== undefined) {
            this.trackColorList = params.trackColorList;
        }
        if (params.trackColorValueList !== undefined) {
            this.trackColorValueList = params.trackColorValueList;
        }
        if (params.selectedColor !== undefined) {
            this.selectedColor = params.selectedColor;
        }
        if (params.selectedColorList !== undefined) {
            this.selectedColorList = params.selectedColorList;
        }
        if (params.selectedColorValueList !== undefined) {
            this.selectedColorValueList = params.selectedColorValueList;
        }
        if (params.showSteps !== undefined) {
            this.showSteps = params.showSteps;
        }
        if (params.showTips !== undefined) {
            this.showTips = params.showTips;
        }
        if (params.trackThickness !== undefined) {
            this.trackThickness = params.trackThickness;
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
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__step.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__styleList.purgeDependencyOnElmtId(rmElmtId);
        this.__styleValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__direct.purgeDependencyOnElmtId(rmElmtId);
        this.__directList.purgeDependencyOnElmtId(rmElmtId);
        this.__directValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__reverse.purgeDependencyOnElmtId(rmElmtId);
        this.__blockColor.purgeDependencyOnElmtId(rmElmtId);
        this.__blockColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__blockColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__trackColor.purgeDependencyOnElmtId(rmElmtId);
        this.__trackColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__trackColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__showSteps.purgeDependencyOnElmtId(rmElmtId);
        this.__showTips.purgeDependencyOnElmtId(rmElmtId);
        this.__trackThickness.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__step.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        this.__styleList.aboutToBeDeleted();
        this.__styleValueList.aboutToBeDeleted();
        this.__direct.aboutToBeDeleted();
        this.__directList.aboutToBeDeleted();
        this.__directValueList.aboutToBeDeleted();
        this.__reverse.aboutToBeDeleted();
        this.__blockColor.aboutToBeDeleted();
        this.__blockColorList.aboutToBeDeleted();
        this.__blockColorValueList.aboutToBeDeleted();
        this.__trackColor.aboutToBeDeleted();
        this.__trackColorList.aboutToBeDeleted();
        this.__trackColorValueList.aboutToBeDeleted();
        this.__selectedColor.aboutToBeDeleted();
        this.__selectedColorList.aboutToBeDeleted();
        this.__selectedColorValueList.aboutToBeDeleted();
        this.__showSteps.aboutToBeDeleted();
        this.__showTips.aboutToBeDeleted();
        this.__trackThickness.aboutToBeDeleted();
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
    get value() {
        return this.__value.get();
    }
    set value(newValue) {
        this.__value.set(newValue);
    }
    get step() {
        return this.__step.get();
    }
    set step(newValue) {
        this.__step.set(newValue);
    }
    get style() {
        return this.__style.get();
    }
    set style(newValue) {
        this.__style.set(newValue);
    }
    get styleList() {
        return this.__styleList.get();
    }
    set styleList(newValue) {
        this.__styleList.set(newValue);
    }
    get styleValueList() {
        return this.__styleValueList.get();
    }
    set styleValueList(newValue) {
        this.__styleValueList.set(newValue);
    }
    get direct() {
        return this.__direct.get();
    }
    set direct(newValue) {
        this.__direct.set(newValue);
    }
    get directList() {
        return this.__directList.get();
    }
    set directList(newValue) {
        this.__directList.set(newValue);
    }
    get directValueList() {
        return this.__directValueList.get();
    }
    set directValueList(newValue) {
        this.__directValueList.set(newValue);
    }
    get reverse() {
        return this.__reverse.get();
    }
    set reverse(newValue) {
        this.__reverse.set(newValue);
    }
    get blockColor() {
        return this.__blockColor.get();
    }
    set blockColor(newValue) {
        this.__blockColor.set(newValue);
    }
    get blockColorList() {
        return this.__blockColorList.get();
    }
    set blockColorList(newValue) {
        this.__blockColorList.set(newValue);
    }
    get blockColorValueList() {
        return this.__blockColorValueList.get();
    }
    set blockColorValueList(newValue) {
        this.__blockColorValueList.set(newValue);
    }
    get trackColor() {
        return this.__trackColor.get();
    }
    set trackColor(newValue) {
        this.__trackColor.set(newValue);
    }
    get trackColorList() {
        return this.__trackColorList.get();
    }
    set trackColorList(newValue) {
        this.__trackColorList.set(newValue);
    }
    get trackColorValueList() {
        return this.__trackColorValueList.get();
    }
    set trackColorValueList(newValue) {
        this.__trackColorValueList.set(newValue);
    }
    get selectedColor() {
        return this.__selectedColor.get();
    }
    set selectedColor(newValue) {
        this.__selectedColor.set(newValue);
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
    get showSteps() {
        return this.__showSteps.get();
    }
    set showSteps(newValue) {
        this.__showSteps.set(newValue);
    }
    get showTips() {
        return this.__showTips.get();
    }
    set showTips(newValue) {
        this.__showTips.set(newValue);
    }
    get trackThickness() {
        return this.__trackThickness.get();
    }
    set trackThickness(newValue) {
        this.__trackThickness.set(newValue);
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
            Column.debugLine("pages/basic/SliderPage.ets(125:5)");
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
            Column.debugLine("pages/basic/SliderPage.ets(127:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Slider 滑动条' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Slider 滑动条'
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
            Blank.debugLine("pages/basic/SliderPage.ets(132:7)");
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
            Column.debugLine("pages/basic/SliderPage.ets(133:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Slider.create({
                value: this.value,
                step: this.step,
                style: this.style,
                direction: this.direct,
                reverse: this.reverse
            });
            Slider.debugLine("pages/basic/SliderPage.ets(134:9)");
            Slider.width(this.widthValue);
            Slider.height(this.heightValue);
            Slider.blockColor(this.blockColor);
            Slider.trackColor(this.trackColor);
            Slider.selectedColor(this.selectedColor);
            Slider.showSteps(this.showSteps);
            Slider.showTips(this.showTips);
            Slider.trackThickness(this.trackThickness);
            Slider.onChange((value, _) => {
                this.value = value;
            });
            if (!isInitialRender) {
                Slider.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(`value : ${Math.floor(this.value)}`);
            Text.debugLine("pages/basic/SliderPage.ets(152:9)");
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
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
            Blank.debugLine("pages/basic/SliderPage.ets(156:7)");
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
            Column.debugLine("pages/basic/SliderPage.ets(158:7)");
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
            Column.debugLine("pages/basic/SliderPage.ets(160:9)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'step', value: this.__step, min: 1, max: 10 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'step', min: 1, max: 10
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(162:11)");
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
                        name: 'style',
                        selectItem: this.__style,
                        itemsList: this.__styleList,
                        valuesList: this.__styleValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'style'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(169:11)");
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
                        name: 'direction',
                        selectItem: this.__direct,
                        itemsList: this.__directList,
                        valuesList: this.__directValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'direction'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(176:11)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'reverse', isOn: this.__reverse }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'reverse'
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
            Column.debugLine("pages/basic/SliderPage.ets(182:9)");
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
                        name: 'blockColor',
                        selectItem: this.__blockColor,
                        itemsList: this.__blockColorList,
                        valuesList: this.__blockColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'blockColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(189:11)");
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
                        name: 'trackColor',
                        selectItem: this.__trackColor,
                        itemsList: this.__trackColorList,
                        valuesList: this.__trackColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'trackColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(196:11)");
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
                        selectItem: this.__selectedColor,
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
            Divider.debugLine("pages/basic/SliderPage.ets(203:11)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'showSteps', isOn: this.__showSteps }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'showSteps'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(205:11)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'showTips', isOn: this.__showTips }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'showTips'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SliderPage.ets(207:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'trackThickness', value: this.__trackThickness, min: 1, max: 20 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'trackThickness', min: 1, max: 20
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
            Column.debugLine("pages/basic/SliderPage.ets(213:9)");
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
            Divider.debugLine("pages/basic/SliderPage.ets(215:11)");
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
loadDocument(new SliderPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=SliderPage.js.map