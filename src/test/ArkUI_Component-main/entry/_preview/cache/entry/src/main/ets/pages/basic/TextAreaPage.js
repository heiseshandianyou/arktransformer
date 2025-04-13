/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class TextAreaPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1, this, "selectTab");
        this.__text = new ObservedPropertySimplePU('', this, "text");
        this.controller = new TextAreaController();
        this.__placeholderColor = new ObservedPropertySimplePU(Color.Grey, this, "placeholderColor");
        this.__placeholderColorList = new ObservedPropertyObjectPU([
            Color.Grey,
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange
        ], this, "placeholderColorList");
        this.__placeholderColorValueList = new ObservedPropertyObjectPU([
            { value: 'Grey' },
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // placeholderFont placeholder文本样式
        , this, "placeholderColorValueList");
        this.__placeholderFont = new ObservedPropertySimplePU(16
        // textAlign 文本在输入框中的水平对齐式
        , this, "placeholderFont");
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
        // caretColor 输入框光标颜色
        , this, "textAlignValueList");
        this.__caretColor = new ObservedPropertySimplePU(Color.Blue, this, "caretColor");
        this.__caretColorList = new ObservedPropertyObjectPU([
            Color.Blue,
            Color.Black,
            Color.Brown,
            Color.Green,
            Color.Orange,
            Color.Grey
        ], this, "caretColorList");
        this.__caretColorValueList = new ObservedPropertyObjectPU([
            { value: 'Blue' },
            { value: 'Black' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' },
            { value: 'Grey' }
        ]
        // width 通用宽度属性
        , this, "caretColorValueList");
        this.__widthValue = new ObservedPropertySimplePU(300
        // height 通用高度属性
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(300
        // fontSize 字体大小
        , this, "heightValue");
        this.__fontSize = new ObservedPropertySimplePU(16, this, "fontSize");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.text !== undefined) {
            this.text = params.text;
        }
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.placeholderColor !== undefined) {
            this.placeholderColor = params.placeholderColor;
        }
        if (params.placeholderColorList !== undefined) {
            this.placeholderColorList = params.placeholderColorList;
        }
        if (params.placeholderColorValueList !== undefined) {
            this.placeholderColorValueList = params.placeholderColorValueList;
        }
        if (params.placeholderFont !== undefined) {
            this.placeholderFont = params.placeholderFont;
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
        if (params.caretColor !== undefined) {
            this.caretColor = params.caretColor;
        }
        if (params.caretColorList !== undefined) {
            this.caretColorList = params.caretColorList;
        }
        if (params.caretColorValueList !== undefined) {
            this.caretColorValueList = params.caretColorValueList;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
        if (params.heightValue !== undefined) {
            this.heightValue = params.heightValue;
        }
        if (params.fontSize !== undefined) {
            this.fontSize = params.fontSize;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__text.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColor.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderFont.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlign.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignList.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColor.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__placeholderColor.aboutToBeDeleted();
        this.__placeholderColorList.aboutToBeDeleted();
        this.__placeholderColorValueList.aboutToBeDeleted();
        this.__placeholderFont.aboutToBeDeleted();
        this.__textAlign.aboutToBeDeleted();
        this.__textAlignList.aboutToBeDeleted();
        this.__textAlignValueList.aboutToBeDeleted();
        this.__caretColor.aboutToBeDeleted();
        this.__caretColorList.aboutToBeDeleted();
        this.__caretColorValueList.aboutToBeDeleted();
        this.__widthValue.aboutToBeDeleted();
        this.__heightValue.aboutToBeDeleted();
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
    get text() {
        return this.__text.get();
    }
    set text(newValue) {
        this.__text.set(newValue);
    }
    get placeholderColor() {
        return this.__placeholderColor.get();
    }
    set placeholderColor(newValue) {
        this.__placeholderColor.set(newValue);
    }
    get placeholderColorList() {
        return this.__placeholderColorList.get();
    }
    set placeholderColorList(newValue) {
        this.__placeholderColorList.set(newValue);
    }
    get placeholderColorValueList() {
        return this.__placeholderColorValueList.get();
    }
    set placeholderColorValueList(newValue) {
        this.__placeholderColorValueList.set(newValue);
    }
    get placeholderFont() {
        return this.__placeholderFont.get();
    }
    set placeholderFont(newValue) {
        this.__placeholderFont.set(newValue);
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
    get caretColor() {
        return this.__caretColor.get();
    }
    set caretColor(newValue) {
        this.__caretColor.set(newValue);
    }
    get caretColorList() {
        return this.__caretColorList.get();
    }
    set caretColorList(newValue) {
        this.__caretColorList.set(newValue);
    }
    get caretColorValueList() {
        return this.__caretColorValueList.get();
    }
    set caretColorValueList(newValue) {
        this.__caretColorValueList.set(newValue);
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
    get fontSize() {
        return this.__fontSize.get();
    }
    set fontSize(newValue) {
        this.__fontSize.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 导航栏---------------------------------------------------------------------
            Column.create();
            Column.debugLine("pages/basic/TextAreaPage.ets(84:5)");
            // 导航栏---------------------------------------------------------------------
            Column.height('100%');
            // 导航栏---------------------------------------------------------------------
            Column.width('100%');
            // 导航栏---------------------------------------------------------------------
            Column.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                // 导航栏---------------------------------------------------------------------
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/TextAreaPage.ets(85:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new Title(this, { pageTitle: 'TextArea 多行文本' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'TextArea 多行文本'
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
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 组件预览区---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/basic/TextAreaPage.ets(90:7)");
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
            Column.debugLine("pages/basic/TextAreaPage.ets(91:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextArea.create({
                placeholder: 'The text area can hold an unlimited amount of text. input your word...',
                controller: this.controller
            });
            TextArea.debugLine("pages/basic/TextAreaPage.ets(92:9)");
            TextArea.placeholderFont({ size: this.placeholderFont, weight: 400 });
            TextArea.placeholderColor(this.placeholderColor);
            TextArea.textAlign(this.textAlign);
            TextArea.caretColor(this.caretColor);
            TextArea.width(this.widthValue);
            TextArea.height(this.heightValue);
            TextArea.fontSize(this.fontSize);
            TextArea.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            TextArea.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            TextArea.onChange((value) => {
                this.text = value;
            });
            if (!isInitialRender) {
                TextArea.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create(this.text);
            Text.debugLine("pages/basic/TextAreaPage.ets(108:9)");
            Text.margin({ top: 15 });
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Button.createWithLabel('Set caretPosition 1');
            Button.debugLine("pages/basic/TextAreaPage.ets(111:9)");
            Button.backgroundColor({ "id": 16777239, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Button.margin(15);
            Button.onClick(() => {
                // 设置光标位置到第一个字符后
                this.controller.caretPosition(1);
            });
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
            Blank.debugLine("pages/basic/TextAreaPage.ets(120:7)");
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
            Column.debugLine("pages/basic/TextAreaPage.ets(122:7)");
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
            Column.debugLine("pages/basic/TextAreaPage.ets(124:9)");
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
                        name: 'placeholderColor',
                        selectItem: this.__placeholderColor,
                        itemsList: this.__placeholderColorList,
                        valuesList: this.__placeholderColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'placeholderColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextAreaPage.ets(131:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'Font', value: this.__placeholderFont, min: 10, max: 40 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'Font', min: 10, max: 40
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextAreaPage.ets(133:11)");
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
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSelect(this, {
                        name: 'caretColor',
                        selectItem: this.__caretColor,
                        itemsList: this.__caretColorList,
                        valuesList: this.__caretColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'caretColor'
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
            Column.debugLine("pages/basic/TextAreaPage.ets(150:9)");
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
            Divider.debugLine("pages/basic/TextAreaPage.ets(152:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__heightValue, name: 'height', min: 10, max: 300 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'height', min: 10, max: 300
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextAreaPage.ets(154:11)");
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
        // 导航栏---------------------------------------------------------------------
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
ViewStackProcessor.StartGetAccessRecordingFor(ViewStackProcessor.AllocateNewElmetIdForNextComponent());
loadDocument(new TextAreaPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TextAreaPage.js.map