/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class SpanPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // type 文本装饰线样式
        , this, "selectTab");
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
        // color 文本颜色
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
        // letterSpacing 文本字符间距
        , this, "colorValueList");
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
        this.__fontSize = new ObservedPropertySimplePU(20, this, "fontSize");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
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
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__typeList.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__color.purgeDependencyOnElmtId(rmElmtId);
        this.__colorList.purgeDependencyOnElmtId(rmElmtId);
        this.__colorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__letterSpacing.purgeDependencyOnElmtId(rmElmtId);
        this.__textCase.purgeDependencyOnElmtId(rmElmtId);
        this.__textCaseList.purgeDependencyOnElmtId(rmElmtId);
        this.__textCaseValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__typeList.aboutToBeDeleted();
        this.__typeValueList.aboutToBeDeleted();
        this.__color.aboutToBeDeleted();
        this.__colorList.aboutToBeDeleted();
        this.__colorValueList.aboutToBeDeleted();
        this.__letterSpacing.aboutToBeDeleted();
        this.__textCase.aboutToBeDeleted();
        this.__textCaseList.aboutToBeDeleted();
        this.__textCaseValueList.aboutToBeDeleted();
        this.__fontSize.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/SpanPage.ets(71:5)");
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
            Column.debugLine("pages/basic/SpanPage.ets(73:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Span 行内文本' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Span 行内文本'
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
            Blank.debugLine("pages/basic/SpanPage.ets(78:7)");
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
            Column.debugLine("pages/basic/SpanPage.ets(79:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create();
            Text.debugLine("pages/basic/SpanPage.ets(80:9)");
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Span.create('I am Span');
            Span.debugLine("pages/basic/SpanPage.ets(81:11)");
            Span.decoration({
                type: this.type,
                color: this.color
            });
            Span.letterSpacing(this.letterSpacing);
            Span.textCase(this.textCase);
            Span.fontSize(this.fontSize);
            if (!isInitialRender) {
                Span.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/SpanPage.ets(92:7)");
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
            Column.debugLine("pages/basic/SpanPage.ets(94:7)");
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
            Column.debugLine("pages/basic/SpanPage.ets(96:9)");
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
            Divider.debugLine("pages/basic/SpanPage.ets(103:11)");
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
            Divider.debugLine("pages/basic/SpanPage.ets(110:11)");
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
            Divider.debugLine("pages/basic/SpanPage.ets(112:11)");
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
            Column.debugLine("pages/basic/SpanPage.ets(124:9)");
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
loadDocument(new SpanPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=SpanPage.js.map