/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class TextPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // textAlign 文本段落在水平方向的对齐方式
        , this, "selectTab");
        this.__textAlign = new ObservedPropertySimplePU(TextAlign.Center, this, "textAlign");
        this.__textAlignList = new ObservedPropertyObjectPU([
            TextAlign.Center,
            TextAlign.Start,
            TextAlign.End
        ], this, "textAlignList");
        this.__textAlignValueList = new ObservedPropertyObjectPU([
            { value: 'Center' },
            { value: 'Start' },
            { value: 'End' }
        ]
        // maxLines 文本的最大行数
        , this, "textAlignValueList");
        this.__maxLines = new ObservedPropertySimplePU(1
        // textOverflow 文本超长时的显示方式
        , this, "maxLines");
        this.__textOverflow = new ObservedPropertySimplePU(TextOverflow.None, this, "textOverflow");
        this.__textOverflowList = new ObservedPropertyObjectPU([
            TextOverflow.None,
            TextOverflow.Clip,
            TextOverflow.Ellipsis,
        ], this, "textOverflowList");
        this.__textOverflowValueList = new ObservedPropertyObjectPU([
            { value: 'None' },
            { value: 'Clip' },
            { value: 'Ellipsis' }
        ]
        // type 文本装饰线样式
        , this, "textOverflowValueList");
        this.__type = new ObservedPropertySimplePU(TextDecorationType.Underline, this, "type");
        this.__typeList = new ObservedPropertyObjectPU([
            TextDecorationType.Underline,
            TextDecorationType.Overline,
            TextDecorationType.LineThrough,
            TextDecorationType.None
        ], this, "typeList");
        this.__typeValueList = new ObservedPropertyObjectPU([
            { value: 'Underline' },
            { value: 'Overline' },
            { value: 'LineThrough' },
            { value: 'None' }
        ]
        // color 文本装饰线颜色
        , this, "typeValueList");
        this.__color = new ObservedPropertySimplePU(Color.Blue, this, "color");
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
        // baselineOffset 文本基线的偏移量
        , this, "colorValueList");
        this.__baselineOffset = new ObservedPropertySimplePU(0
        // letterSpacing 文本字符间距
        , this, "baselineOffset");
        this.__letterSpacing = new ObservedPropertySimplePU(5
        // textCase 文本大小写
        , this, "letterSpacing");
        this.__textCase = new ObservedPropertySimplePU(TextCase.Normal, this, "textCase");
        this.__textCaseList = new ObservedPropertyObjectPU([
            TextCase.Normal,
            TextCase.LowerCase,
            TextCase.UpperCase,
        ], this, "textCaseList");
        this.__textCaseValueList = new ObservedPropertyObjectPU([
            { value: 'Normal' },
            { value: 'LowerCase' },
            { value: 'UpperCase' }
        ]
        // fontSize 字体大小
        , this, "textCaseValueList");
        this.__fontSize = new ObservedPropertySimplePU(20
        // width 通用宽度属性
        , this, "fontSize");
        this.__widthValue = new ObservedPropertySimplePU(300, this, "widthValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.textAlign !== undefined) {
            this.textAlign = params.textAlign;
        }
        if (params.textAlignList !== undefined) {
            this.textAlignList = params.textAlignList;
        }
        if (params.textAlignValueList !== undefined) {
            this.textAlignValueList = params.textAlignValueList;
        }
        if (params.maxLines !== undefined) {
            this.maxLines = params.maxLines;
        }
        if (params.textOverflow !== undefined) {
            this.textOverflow = params.textOverflow;
        }
        if (params.textOverflowList !== undefined) {
            this.textOverflowList = params.textOverflowList;
        }
        if (params.textOverflowValueList !== undefined) {
            this.textOverflowValueList = params.textOverflowValueList;
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
        if (params.color !== undefined) {
            this.color = params.color;
        }
        if (params.colorList !== undefined) {
            this.colorList = params.colorList;
        }
        if (params.colorValueList !== undefined) {
            this.colorValueList = params.colorValueList;
        }
        if (params.baselineOffset !== undefined) {
            this.baselineOffset = params.baselineOffset;
        }
        if (params.letterSpacing !== undefined) {
            this.letterSpacing = params.letterSpacing;
        }
        if (params.textCase !== undefined) {
            this.textCase = params.textCase;
        }
        if (params.textCaseList !== undefined) {
            this.textCaseList = params.textCaseList;
        }
        if (params.textCaseValueList !== undefined) {
            this.textCaseValueList = params.textCaseValueList;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlign.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignList.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__maxLines.purgeDependencyOnElmtId(rmElmtId);
        this.__textOverflow.purgeDependencyOnElmtId(rmElmtId);
        this.__textOverflowList.purgeDependencyOnElmtId(rmElmtId);
        this.__textOverflowValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__typeList.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__color.purgeDependencyOnElmtId(rmElmtId);
        this.__colorList.purgeDependencyOnElmtId(rmElmtId);
        this.__colorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__baselineOffset.purgeDependencyOnElmtId(rmElmtId);
        this.__letterSpacing.purgeDependencyOnElmtId(rmElmtId);
        this.__textCase.purgeDependencyOnElmtId(rmElmtId);
        this.__textCaseList.purgeDependencyOnElmtId(rmElmtId);
        this.__textCaseValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__textAlign.aboutToBeDeleted();
        this.__textAlignList.aboutToBeDeleted();
        this.__textAlignValueList.aboutToBeDeleted();
        this.__maxLines.aboutToBeDeleted();
        this.__textOverflow.aboutToBeDeleted();
        this.__textOverflowList.aboutToBeDeleted();
        this.__textOverflowValueList.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__typeList.aboutToBeDeleted();
        this.__typeValueList.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__colorList.aboutToBeDeleted();
        this.__colorValueList.aboutToBeDeleted();
        this.__baselineOffset.aboutToBeDeleted();
        this.__letterSpacing.aboutToBeDeleted();
        this.__textCase.aboutToBeDeleted();
        this.__textCaseList.aboutToBeDeleted();
        this.__textCaseValueList.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
        this.__widthValue.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    get selectTab() {
        return this.__selectTab.get();
    }
    set selectTab(newValue) {
        this.__selectTab.set(newValue);
    }
    get textAlign() {
        return this.__textAlign.get();
    }
    set textAlign(newValue) {
        this.__textAlign.set(newValue);
    }
    get textAlignList() {
        return this.__textAlignList.get();
    }
    set textAlignList(newValue) {
        this.__textAlignList.set(newValue);
    }
    get textAlignValueList() {
        return this.__textAlignValueList.get();
    }
    set textAlignValueList(newValue) {
        this.__textAlignValueList.set(newValue);
    }
    get maxLines() {
        return this.__maxLines.get();
    }
    set maxLines(newValue) {
        this.__maxLines.set(newValue);
    }
    get textOverflow() {
        return this.__textOverflow.get();
    }
    set textOverflow(newValue) {
        this.__textOverflow.set(newValue);
    }
    get textOverflowList() {
        return this.__textOverflowList.get();
    }
    set textOverflowList(newValue) {
        this.__textOverflowList.set(newValue);
    }
    get textOverflowValueList() {
        return this.__textOverflowValueList.get();
    }
    set textOverflowValueList(newValue) {
        this.__textOverflowValueList.set(newValue);
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
    get color() {
        return this.__color.get();
    }
    set color(newValue) {
        this.__color.set(newValue);
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
    get baselineOffset() {
        return this.__baselineOffset.get();
    }
    set baselineOffset(newValue) {
        this.__baselineOffset.set(newValue);
    }
    get letterSpacing() {
        return this.__letterSpacing.get();
    }
    set letterSpacing(newValue) {
        this.__letterSpacing.set(newValue);
    }
    get textCase() {
        return this.__textCase.get();
    }
    set textCase(newValue) {
        this.__textCase.set(newValue);
    }
    get textCaseList() {
        return this.__textCaseList.get();
    }
    set textCaseList(newValue) {
        this.__textCaseList.set(newValue);
    }
    get textCaseValueList() {
        return this.__textCaseValueList.get();
    }
    set textCaseValueList(newValue) {
        this.__textCaseValueList.set(newValue);
    }
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue) {
        this.__fontSize.set(newValue);
    }
    get widthValue() {
        return this.__widthValue.get();
    }
    set widthValue(newValue) {
        this.__widthValue.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/TextPage.ets(106:5)");
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
            Column.debugLine("pages/basic/TextPage.ets(108:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Text 文本' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Text 文本'
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
            Blank.debugLine("pages/basic/TextPage.ets(113:7)");
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
            Column.debugLine("pages/basic/TextPage.ets(114:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('This is text demonstration');
            Text.debugLine("pages/basic/TextPage.ets(115:9)");
            Text.textAlign(this.textAlign);
            Text.textOverflow({ overflow: this.textOverflow });
            Text.decoration({ type: this.type, color: this.color });
            Text.baselineOffset(this.baselineOffset);
            Text.letterSpacing(this.letterSpacing);
            Text.textCase(this.textCase);
            Text.fontSize(this.fontSize);
            Text.width(this.widthValue);
            Text.maxLines(this.maxLines);
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
            Blank.debugLine("pages/basic/TextPage.ets(127:7)");
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
            Column.debugLine("pages/basic/TextPage.ets(129:7)");
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
            Column.debugLine("pages/basic/TextPage.ets(131:9)");
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
                        name: 'textAlign',
                        selectItem: this.__textAlign,
                        itemsList: this.__textAlignList,
                        valuesList: this.__textAlignValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'textAlign'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(138:11)");
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
                        name: 'textOverflow',
                        selectItem: this.__textOverflow,
                        itemsList: this.__textOverflowList,
                        valuesList: this.__textOverflowValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'textOverflow'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(145:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'maxLines', value: this.__maxLines, min: 1, max: 3 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'maxLines', min: 1, max: 3
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(147:11)");
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
                        name: 'decoration-type',
                        selectItem: this.__type,
                        itemsList: this.__typeList,
                        valuesList: this.__typeValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'decoration-type'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(154:11)");
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
                        name: 'decoration-color',
                        selectItem: this.__color,
                        itemsList: this.__colorList,
                        valuesList: this.__colorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'decoration-color'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(161:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'baselineOffset', value: this.__baselineOffset, min: -20, max: 20 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'baselineOffset', min: -20, max: 20
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(163:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'letterSpacing', value: this.__letterSpacing, min: -10, max: 20 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'letterSpacing', min: -10, max: 20
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(165:11)");
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
                        name: 'textCase',
                        selectItem: this.__textCase,
                        itemsList: this.__textCaseList,
                        valuesList: this.__textCaseValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'textCase'
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
            Column.debugLine("pages/basic/TextPage.ets(177:9)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'fontSize', value: this.__fontSize, min: 10, max: 40 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'fontSize', min: 10, max: 40
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextPage.ets(179:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__widthValue, name: 'width', min: 200, max: 350 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 200, max: 350
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
loadDocument(new TextPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TextPage.js.map