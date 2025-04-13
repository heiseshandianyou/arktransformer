/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class SelectPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // 选项列表
        , this, "selectTab");
        this.value = [
            { value: '选项1' },
            { value: '选项2' },
            { value: '选项3' },
            { value: '选项4' },
        ];
        this.__selected = new ObservedPropertySimplePU(-1, this, "selected");
        this.__selectedValue = new ObservedPropertySimplePU('下拉菜单'
        // fontColor 设置下拉按钮本身的文本颜色
        , this, "selectedValue");
        this.__fontColor = new ObservedPropertySimplePU(Color.Grey, this, "fontColor");
        this.__fontColorList = new ObservedPropertyObjectPU([
            Color.Grey,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange,
        ], this, "fontColorList");
        this.__fontColorValueList = new ObservedPropertyObjectPU([
            { value: 'Grey' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // selectedOptionBgColor 设置下拉菜单选中项的背景色
        , this, "fontColorValueList");
        this.__selectedOptionBgColor = new ObservedPropertySimplePU(Color.White, this, "selectedOptionBgColor");
        this.__selectedOptionBgColorList = new ObservedPropertyObjectPU([
            Color.White,
            Color.Grey,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange,
        ], this, "selectedOptionBgColorList");
        this.__selectedOptionBgColorValueList = new ObservedPropertyObjectPU([
            { value: 'White' },
            { value: 'Grey' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // optionFontColor 下拉菜单选项的文本颜色
        , this, "selectedOptionBgColorValueList");
        this.__optionFontColor = new ObservedPropertySimplePU(Color.Grey, this, "optionFontColor");
        this.__optionFontColorList = new ObservedPropertyObjectPU([
            Color.Grey,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange,
        ], this, "optionFontColorList");
        this.__optionFontColorValueList = new ObservedPropertyObjectPU([
            { value: 'Grey' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // selectedOptionFontColor 下拉菜单选中项的文本颜色
        , this, "optionFontColorValueList");
        this.__selectedOptionFontColor = new ObservedPropertySimplePU(Color.Grey, this, "selectedOptionFontColor");
        this.__selectedOptionFontColorList = new ObservedPropertyObjectPU([
            Color.Grey,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange,
        ], this, "selectedOptionFontColorList");
        this.__selectedOptionFontColorValueList = new ObservedPropertyObjectPU([
            { value: 'Grey' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // optionBgColor 下拉菜单单项的背景颜色
        , this, "selectedOptionFontColorValueList");
        this.__optionBgColor = new ObservedPropertySimplePU(Color.White, this, "optionBgColor");
        this.__optionBgColorList = new ObservedPropertyObjectPU([
            Color.White,
            Color.Grey,
            Color.Black,
            Color.Blue,
            Color.Brown,
            Color.Green,
            Color.Orange,
        ], this, "optionBgColorList");
        this.__optionBgColorValueList = new ObservedPropertyObjectPU([
            { value: 'White' },
            { value: 'Grey' },
            { value: 'Black' },
            { value: 'Blue' },
            { value: 'Brown' },
            { value: 'Green' },
            { value: 'Orange' }
        ]
        // width 通用宽度属性
        , this, "optionBgColorValueList");
        this.__widthValue = new ObservedPropertySimplePU(120
        //height 通用高度属性
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(40, this, "heightValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.selected !== undefined) {
            this.selected = params.selected;
        }
        if (params.selectedValue !== undefined) {
            this.selectedValue = params.selectedValue;
        }
        if (params.fontColor !== undefined) {
            this.fontColor = params.fontColor;
        }
        if (params.fontColorList !== undefined) {
            this.fontColorList = params.fontColorList;
        }
        if (params.fontColorValueList !== undefined) {
            this.fontColorValueList = params.fontColorValueList;
        }
        if (params.selectedOptionBgColor !== undefined) {
            this.selectedOptionBgColor = params.selectedOptionBgColor;
        }
        if (params.selectedOptionBgColorList !== undefined) {
            this.selectedOptionBgColorList = params.selectedOptionBgColorList;
        }
        if (params.selectedOptionBgColorValueList !== undefined) {
            this.selectedOptionBgColorValueList = params.selectedOptionBgColorValueList;
        }
        if (params.optionFontColor !== undefined) {
            this.optionFontColor = params.optionFontColor;
        }
        if (params.optionFontColorList !== undefined) {
            this.optionFontColorList = params.optionFontColorList;
        }
        if (params.optionFontColorValueList !== undefined) {
            this.optionFontColorValueList = params.optionFontColorValueList;
        }
        if (params.selectedOptionFontColor !== undefined) {
            this.selectedOptionFontColor = params.selectedOptionFontColor;
        }
        if (params.selectedOptionFontColorList !== undefined) {
            this.selectedOptionFontColorList = params.selectedOptionFontColorList;
        }
        if (params.selectedOptionFontColorValueList !== undefined) {
            this.selectedOptionFontColorValueList = params.selectedOptionFontColorValueList;
        }
        if (params.optionBgColor !== undefined) {
            this.optionBgColor = params.optionBgColor;
        }
        if (params.optionBgColorList !== undefined) {
            this.optionBgColorList = params.optionBgColorList;
        }
        if (params.optionBgColorValueList !== undefined) {
            this.optionBgColorValueList = params.optionBgColorValueList;
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
        this.__selected.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedValue.purgeDependencyOnElmtId(rmElmtId);
        this.__fontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__fontColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__fontColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionBgColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionBgColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionBgColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__optionFontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__optionFontColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__optionFontColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionFontColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionFontColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedOptionFontColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__optionBgColor.purgeDependencyOnElmtId(rmElmtId);
        this.__optionBgColorList.purgeDependencyOnElmtId(rmElmtId);
        this.__optionBgColorValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__selected.aboutToBeDeleted();
        this.__selectedValue.aboutToBeDeleted();
        this.__fontColor.aboutToBeDeleted();
        this.__fontColorList.aboutToBeDeleted();
        this.__fontColorValueList.aboutToBeDeleted();
        this.__selectedOptionBgColor.aboutToBeDeleted();
        this.__selectedOptionBgColorList.aboutToBeDeleted();
        this.__selectedOptionBgColorValueList.aboutToBeDeleted();
        this.__optionFontColor.aboutToBeDeleted();
        this.__optionFontColorList.aboutToBeDeleted();
        this.__optionFontColorValueList.aboutToBeDeleted();
        this.__selectedOptionFontColor.aboutToBeDeleted();
        this.__selectedOptionFontColorList.aboutToBeDeleted();
        this.__selectedOptionFontColorValueList.aboutToBeDeleted();
        this.__optionBgColor.aboutToBeDeleted();
        this.__optionBgColorList.aboutToBeDeleted();
        this.__optionBgColorValueList.aboutToBeDeleted();
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
    get selected() {
        return this.__selected.get();
    }
    set selected(newValue) {
        this.__selected.set(newValue);
    }
    get selectedValue() {
        return this.__selectedValue.get();
    }
    set selectedValue(newValue) {
        this.__selectedValue.set(newValue);
    }
    get fontColor() {
        return this.__fontColor.get();
    }
    set fontColor(newValue) {
        this.__fontColor.set(newValue);
    }
    get fontColorList() {
        return this.__fontColorList.get();
    }
    set fontColorList(newValue) {
        this.__fontColorList.set(newValue);
    }
    get fontColorValueList() {
        return this.__fontColorValueList.get();
    }
    set fontColorValueList(newValue) {
        this.__fontColorValueList.set(newValue);
    }
    get selectedOptionBgColor() {
        return this.__selectedOptionBgColor.get();
    }
    set selectedOptionBgColor(newValue) {
        this.__selectedOptionBgColor.set(newValue);
    }
    get selectedOptionBgColorList() {
        return this.__selectedOptionBgColorList.get();
    }
    set selectedOptionBgColorList(newValue) {
        this.__selectedOptionBgColorList.set(newValue);
    }
    get selectedOptionBgColorValueList() {
        return this.__selectedOptionBgColorValueList.get();
    }
    set selectedOptionBgColorValueList(newValue) {
        this.__selectedOptionBgColorValueList.set(newValue);
    }
    get optionFontColor() {
        return this.__optionFontColor.get();
    }
    set optionFontColor(newValue) {
        this.__optionFontColor.set(newValue);
    }
    get optionFontColorList() {
        return this.__optionFontColorList.get();
    }
    set optionFontColorList(newValue) {
        this.__optionFontColorList.set(newValue);
    }
    get optionFontColorValueList() {
        return this.__optionFontColorValueList.get();
    }
    set optionFontColorValueList(newValue) {
        this.__optionFontColorValueList.set(newValue);
    }
    get selectedOptionFontColor() {
        return this.__selectedOptionFontColor.get();
    }
    set selectedOptionFontColor(newValue) {
        this.__selectedOptionFontColor.set(newValue);
    }
    get selectedOptionFontColorList() {
        return this.__selectedOptionFontColorList.get();
    }
    set selectedOptionFontColorList(newValue) {
        this.__selectedOptionFontColorList.set(newValue);
    }
    get selectedOptionFontColorValueList() {
        return this.__selectedOptionFontColorValueList.get();
    }
    set selectedOptionFontColorValueList(newValue) {
        this.__selectedOptionFontColorValueList.set(newValue);
    }
    get optionBgColor() {
        return this.__optionBgColor.get();
    }
    set optionBgColor(newValue) {
        this.__optionBgColor.set(newValue);
    }
    get optionBgColorList() {
        return this.__optionBgColorList.get();
    }
    set optionBgColorList(newValue) {
        this.__optionBgColorList.set(newValue);
    }
    get optionBgColorValueList() {
        return this.__optionBgColorValueList.get();
    }
    set optionBgColorValueList(newValue) {
        this.__optionBgColorValueList.set(newValue);
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
            Column.debugLine("pages/basic/SelectPage.ets(134:5)");
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
            Column.debugLine("pages/basic/SelectPage.ets(136:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Select 下拉选择' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Select 下拉选择'
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
            Blank.debugLine("pages/basic/SelectPage.ets(141:7)");
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
            Column.debugLine("pages/basic/SelectPage.ets(142:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Select.create(this.value);
            Select.debugLine("pages/basic/SelectPage.ets(143:9)");
            Select.onSelect((index, value) => {
                this.selected = index;
                this.selectedValue = value;
            });
            Select.value(this.selectedValue);
            Select.selected(this.selected);
            Select.width(this.widthValue);
            Select.height(this.heightValue);
            Select.fontColor(this.fontColor);
            Select.selectedOptionBgColor(this.selectedOptionBgColor);
            Select.optionFontColor(this.optionFontColor);
            Select.selectedOptionFontColor(this.selectedOptionFontColor);
            Select.optionBgColor(this.optionBgColor);
            if (!isInitialRender) {
                Select.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Select.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/SelectPage.ets(159:7)");
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
            Column.debugLine("pages/basic/SelectPage.ets(161:7)");
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
            Column.debugLine("pages/basic/SelectPage.ets(164:9)");
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
                        name: 'fontColor',
                        selectItem: this.__fontColor,
                        itemsList: this.__fontColorList,
                        valuesList: this.__fontColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'fontColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SelectPage.ets(171:11)");
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
                        name: 'selectedOptionBgColor',
                        selectItem: this.__selectedOptionBgColor,
                        itemsList: this.__selectedOptionBgColorList,
                        valuesList: this.__selectedOptionBgColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'selectedOptionBgColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SelectPage.ets(178:11)");
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
                        name: 'optionFontColor',
                        selectItem: this.__optionFontColor,
                        itemsList: this.__optionFontColorList,
                        valuesList: this.__optionFontColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'optionFontColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SelectPage.ets(185:11)");
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
                        name: 'selectedOptionFontColor',
                        selectItem: this.__selectedOptionFontColor,
                        itemsList: this.__selectedOptionFontColorList,
                        valuesList: this.__selectedOptionFontColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'selectedOptionFontColor'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SelectPage.ets(192:11)");
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
                        name: 'optionBgColor',
                        selectItem: this.__optionBgColor,
                        itemsList: this.__optionBgColorList,
                        valuesList: this.__optionBgColorValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'optionBgColor'
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
            Column.debugLine("pages/basic/SelectPage.ets(203:9)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'width', value: this.__widthValue, min: 50, max: 300 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 50, max: 300
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/SelectPage.ets(205:11)");
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
loadDocument(new SelectPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=SelectPage.js.map