/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
class TextInputPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1, this, "selectTab");
        this.__text = new ObservedPropertySimplePU('', this, "text");
        this.controller = new TextAreaController();
        this.__type = new ObservedPropertySimplePU(InputType.Normal, this, "type");
        this.__typeList = new ObservedPropertyObjectPU([
            InputType.Normal,
            InputType.Number,
            InputType.PhoneNumber,
            InputType.Email,
            InputType.Password
        ], this, "typeList");
        this.__typeValueList = new ObservedPropertyObjectPU([
            { value: 'Normal' },
            { value: 'Number' },
            { value: 'PhoneNumber' },
            { value: 'Email' },
            { value: 'Password' }
        ]
        // placeholderColor placeholder文本颜色
        , this, "typeValueList");
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
        //placeholderFont placeholder字体大小
        , this, "placeholderColorValueList");
        this.__placeholderFont = new ObservedPropertySimplePU(16
        //enterKeyType 输入法回车键类型
        , this, "placeholderFont");
        this.__enterKeyType = new ObservedPropertySimplePU(EnterKeyType.Go, this, "enterKeyType");
        this.__enterKeyTypeList = new ObservedPropertyObjectPU([
            EnterKeyType.Go,
            EnterKeyType.Search,
            EnterKeyType.Send,
            EnterKeyType.Next,
            EnterKeyType.Done
        ], this, "enterKeyTypeList");
        this.__enterKeyTypeValueList = new ObservedPropertyObjectPU([
            { value: 'Go' },
            { value: 'Search' },
            { value: 'Send' },
            { value: 'Next' },
            { value: 'Done' }
        ]
        // caretColor 光标颜色
        , this, "enterKeyTypeValueList");
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
        // maxLength 文本的最大输入字符数
        , this, "caretColorValueList");
        this.__maxLength = new ObservedPropertySimplePU(11
        //showPasswordIcon 密码输入模式时，输入框末尾的图标是否显示
        , this, "maxLength");
        this.__showPasswordIcon = new ObservedPropertySimplePU(true
        // style 输入框为默认风格或内联输入风格
        , this, "showPasswordIcon");
        this.__style = new ObservedPropertySimplePU(TextInputStyle.Default, this, "style");
        this.__styleList = new ObservedPropertyObjectPU([
            TextInputStyle.Default,
            TextInputStyle.Inline
        ], this, "styleList");
        this.__styleValueList = new ObservedPropertyObjectPU([
            { value: 'Default' },
            { value: 'Inline' }
        ]
        // textAlign 输入文本在输入框中的对齐方式
        , this, "styleValueList");
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
        // width 通用宽度属性
        , this, "textAlignValueList");
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
        if (params.type !== undefined) {
            this.type = params.type;
        }
        if (params.typeList !== undefined) {
            this.typeList = params.typeList;
        }
        if (params.typeValueList !== undefined) {
            this.typeValueList = params.typeValueList;
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
        if (params.enterKeyType !== undefined) {
            this.enterKeyType = params.enterKeyType;
        }
        if (params.enterKeyTypeList !== undefined) {
            this.enterKeyTypeList = params.enterKeyTypeList;
        }
        if (params.enterKeyTypeValueList !== undefined) {
            this.enterKeyTypeValueList = params.enterKeyTypeValueList;
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
        if (params.maxLength !== undefined) {
            this.maxLength = params.maxLength;
        }
        if (params.showPasswordIcon !== undefined) {
            this.showPasswordIcon = params.showPasswordIcon;
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
        if (params.textAlign !== undefined) {
            this.textAlign = params.textAlign;
        }
        if (params.textAlignList !== undefined) {
            this.textAlignList = params.textAlignList;
        }
        if (params.textAlignValueList !== undefined) {
            this.textAlignValueList = params.textAlignValueList;
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
        this.__type.purgeDependencyOnElmtId(rmElmtId);
        this.__typeList.purgeDependencyOnElmtId(rmElmtId);
        this.__typeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColor.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__placeholderFont.purgeDependencyOnElmtId(rmElmtId);
        this.__enterKeyType.purgeDependencyOnElmtId(rmElmtId);
        this.__enterKeyTypeList.purgeDependencyOnElmtId(rmElmtId);
        this.__enterKeyTypeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColor.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__caretColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__maxLength.purgeDependencyOnElmtId(rmElmtId);
        this.__showPasswordIcon.purgeDependencyOnElmtId(rmElmtId);
        this.__style.purgeDependencyOnElmtId(rmElmtId);
        this.__styleList.purgeDependencyOnElmtId(rmElmtId);
        this.__styleValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlign.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignList.purgeDependencyOnElmtId(rmElmtId);
        this.__textAlignValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
        this.__fontSize.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__text.aboutToBeDeleted();
        this.__type.aboutToBeDeleted();
        this.__typeList.aboutToBeDeleted();
        this.__typeValueList.aboutToBeDeleted();
        this.__placeholderColor.aboutToBeDeleted();
        this.__placeholderColorList.aboutToBeDeleted();
        this.__placeholderColorValueList.aboutToBeDeleted();
        this.__placeholderFont.aboutToBeDeleted();
        this.__enterKeyType.aboutToBeDeleted();
        this.__enterKeyTypeList.aboutToBeDeleted();
        this.__enterKeyTypeValueList.aboutToBeDeleted();
        this.__caretColor.aboutToBeDeleted();
        this.__caretColorList.aboutToBeDeleted();
        this.__caretColorValueList.aboutToBeDeleted();
        this.__maxLength.aboutToBeDeleted();
        this.__showPasswordIcon.aboutToBeDeleted();
        this.__style.aboutToBeDeleted();
        this.__styleList.aboutToBeDeleted();
        this.__styleValueList.aboutToBeDeleted();
        this.__textAlign.aboutToBeDeleted();
        this.__textAlignList.aboutToBeDeleted();
        this.__textAlignValueList.aboutToBeDeleted();
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
    get enterKeyType() {
        return this.__enterKeyType.get();
    }
    set enterKeyType(newValue) {
        this.__enterKeyType.set(newValue);
    }
    get enterKeyTypeList() {
        return this.__enterKeyTypeList.get();
    }
    set enterKeyTypeList(newValue) {
        this.__enterKeyTypeList.set(newValue);
    }
    get enterKeyTypeValueList() {
        return this.__enterKeyTypeValueList.get();
    }
    set enterKeyTypeValueList(newValue) {
        this.__enterKeyTypeValueList.set(newValue);
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
    get maxLength() {
        return this.__maxLength.get();
    }
    set maxLength(newValue) {
        this.__maxLength.set(newValue);
    }
    get showPasswordIcon() {
        return this.__showPasswordIcon.get();
    }
    set showPasswordIcon(newValue) {
        this.__showPasswordIcon.set(newValue);
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
            Column.create();
            Column.debugLine("pages/basic/TextInputPage.ets(136:5)");
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
            Column.debugLine("pages/basic/TextInputPage.ets(138:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'TextInput 单行文本' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'TextInput 单行文本'
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
            Blank.debugLine("pages/basic/TextInputPage.ets(143:7)");
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
            Column.debugLine("pages/basic/TextInputPage.ets(144:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            TextInput.create({ text: this.text, placeholder: 'input your word...', controller: this.controller });
            TextInput.debugLine("pages/basic/TextInputPage.ets(145:9)");
            TextInput.type(this.type);
            TextInput.placeholderColor(this.placeholderColor);
            TextInput.placeholderFont({ size: this.placeholderFont });
            TextInput.enterKeyType(this.enterKeyType);
            TextInput.caretColor(this.caretColor);
            TextInput.maxLength(this.maxLength);
            TextInput.showPasswordIcon(this.showPasswordIcon);
            TextInput.style(this.style);
            TextInput.textAlign(this.textAlign);
            TextInput.width(this.widthValue);
            TextInput.onChange((value) => {
                this.text = value;
            });
            if (!isInitialRender) {
                TextInput.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/TextInputPage.ets(161:7)");
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
            Column.debugLine("pages/basic/TextInputPage.ets(163:7)");
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
            Column.debugLine("pages/basic/TextInputPage.ets(165:9)");
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextInputPage.ets(172:11)");
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
            Divider.debugLine("pages/basic/TextInputPage.ets(179:11)");
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
            Divider.debugLine("pages/basic/TextInputPage.ets(181:11)");
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
                        name: 'enterKeyType',
                        selectItem: this.__enterKeyType,
                        itemsList: this.__enterKeyTypeList,
                        valuesList: this.__enterKeyTypeValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'enterKeyType'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextInputPage.ets(188:11)");
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextInputPage.ets(195:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'maxLength', value: this.__maxLength, min: 4, max: 20 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'maxLength', min: 4, max: 20
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextInputPage.ets(197:11)");
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
                    ViewPU.create(new CustomSwitch(this, { name: 'showPasswordIcon', isOn: this.__showPasswordIcon }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'showPasswordIcon'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/TextInputPage.ets(199:11)");
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
            Divider.debugLine("pages/basic/TextInputPage.ets(206:11)");
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
        // 组件属性 tab
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 通用属性 tab
            Column.create();
            Column.debugLine("pages/basic/TextInputPage.ets(218:9)");
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
loadDocument(new TextInputPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=TextInputPage.js.map