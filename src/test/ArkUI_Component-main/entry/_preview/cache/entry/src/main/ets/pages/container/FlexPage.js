/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
class FlexPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(0
        // direction 主轴方向 子组件在Flex容器上排列的方向
        , this, "selectTab");
        this.__direct = new ObservedPropertySimplePU(FlexDirection.Row, this, "direct");
        this.__directList = new ObservedPropertyObjectPU([
            FlexDirection.Row,
            FlexDirection.RowReverse,
            FlexDirection.Column,
            FlexDirection.ColumnReverse,
        ], this, "directList");
        this.__directValueList = new ObservedPropertyObjectPU([
            { value: 'Row' },
            { value: 'RowReverse' },
            { value: 'Column' },
            { value: 'ColumnReverse' }
        ]
        // wrap Flex容器是单行/列还是多行/列排列
        , this, "directValueList");
        this.__wrap = new ObservedPropertySimplePU(FlexWrap.NoWrap, this, "wrap");
        this.__wrapList = new ObservedPropertyObjectPU([
            FlexWrap.NoWrap,
            FlexWrap.Wrap,
            FlexWrap.WrapReverse
        ], this, "wrapList");
        this.__wrapValueList = new ObservedPropertyObjectPU([
            { value: 'NoWrap' },
            { value: 'Wrap' },
            { value: 'WrapReverse' }
        ]
        // justifyContent 主轴对齐方式
        , this, "wrapValueList");
        this.__justifyContent = new ObservedPropertySimplePU(FlexAlign.Center, this, "justifyContent");
        this.__justifyContentList = new ObservedPropertyObjectPU([
            FlexAlign.Center,
            FlexAlign.Start,
            FlexAlign.End,
            FlexAlign.SpaceBetween,
            FlexAlign.SpaceAround,
            FlexAlign.SpaceEvenly
        ], this, "justifyContentList");
        this.__justifyContentValueList = new ObservedPropertyObjectPU([
            { value: 'Center' },
            { value: 'Start' },
            { value: 'End' },
            { value: 'SpaceBetween' },
            { value: 'SpaceAround' },
            { value: 'SpaceEvenly' },
        ]
        // alignItems 交叉轴对齐方式
        , this, "justifyContentValueList");
        this.__alignItems = new ObservedPropertySimplePU(ItemAlign.Center, this, "alignItems");
        this.__alignItemsList = new ObservedPropertyObjectPU([
            ItemAlign.Center,
            ItemAlign.Start,
            ItemAlign.End,
            ItemAlign.Auto,
            ItemAlign.Stretch,
            ItemAlign.Baseline
        ], this, "alignItemsList");
        this.__alignItemsValueList = new ObservedPropertyObjectPU([
            { value: 'Center' },
            { value: 'Start' },
            { value: 'End' },
            { value: 'Auto' },
            { value: 'Stretch' },
            { value: 'Baseline' }
        ]
        // alignContent 交叉轴中有额外的空间时，多行内容的对齐方式
        , this, "alignItemsValueList");
        this.__alignContent = new ObservedPropertySimplePU(FlexAlign.Center, this, "alignContent");
        this.__alignContentList = new ObservedPropertyObjectPU([
            FlexAlign.Center,
            FlexAlign.Start,
            FlexAlign.End,
            FlexAlign.SpaceBetween,
            FlexAlign.SpaceAround,
            FlexAlign.SpaceEvenly
        ], this, "alignContentList");
        this.__alignContentValueList = new ObservedPropertyObjectPU([
            { value: 'Center' },
            { value: 'Start' },
            { value: 'End' },
            { value: 'SpaceBetween' },
            { value: 'SpaceAround' },
            { value: 'SpaceEvenly' },
        ]
        // width 宽度通用组件
        , this, "alignContentValueList");
        this.__widthValue = new ObservedPropertySimplePU(200
        // height 高度通用组件
        , this, "widthValue");
        this.__heightValue = new ObservedPropertySimplePU(200, this, "heightValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
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
        if (params.wrap !== undefined) {
            this.wrap = params.wrap;
        }
        if (params.wrapList !== undefined) {
            this.wrapList = params.wrapList;
        }
        if (params.wrapValueList !== undefined) {
            this.wrapValueList = params.wrapValueList;
        }
        if (params.justifyContent !== undefined) {
            this.justifyContent = params.justifyContent;
        }
        if (params.justifyContentList !== undefined) {
            this.justifyContentList = params.justifyContentList;
        }
        if (params.justifyContentValueList !== undefined) {
            this.justifyContentValueList = params.justifyContentValueList;
        }
        if (params.alignItems !== undefined) {
            this.alignItems = params.alignItems;
        }
        if (params.alignItemsList !== undefined) {
            this.alignItemsList = params.alignItemsList;
        }
        if (params.alignItemsValueList !== undefined) {
            this.alignItemsValueList = params.alignItemsValueList;
        }
        if (params.alignContent !== undefined) {
            this.alignContent = params.alignContent;
        }
        if (params.alignContentList !== undefined) {
            this.alignContentList = params.alignContentList;
        }
        if (params.alignContentValueList !== undefined) {
            this.alignContentValueList = params.alignContentValueList;
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
        this.__direct.purgeDependencyOnElmtId(rmElmtId);
        this.__directList.purgeDependencyOnElmtId(rmElmtId);
        this.__directValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__wrap.purgeDependencyOnElmtId(rmElmtId);
        this.__wrapList.purgeDependencyOnElmtId(rmElmtId);
        this.__wrapValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__justifyContent.purgeDependencyOnElmtId(rmElmtId);
        this.__justifyContentList.purgeDependencyOnElmtId(rmElmtId);
        this.__justifyContentValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__alignItems.purgeDependencyOnElmtId(rmElmtId);
        this.__alignItemsList.purgeDependencyOnElmtId(rmElmtId);
        this.__alignItemsValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__alignContent.purgeDependencyOnElmtId(rmElmtId);
        this.__alignContentList.purgeDependencyOnElmtId(rmElmtId);
        this.__alignContentValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__direct.aboutToBeDeleted();
        this.__directList.aboutToBeDeleted();
        this.__directValueList.aboutToBeDeleted();
        this.__wrap.aboutToBeDeleted();
        this.__wrapList.aboutToBeDeleted();
        this.__wrapValueList.aboutToBeDeleted();
        this.__justifyContent.aboutToBeDeleted();
        this.__justifyContentList.aboutToBeDeleted();
        this.__justifyContentValueList.aboutToBeDeleted();
        this.__alignItems.aboutToBeDeleted();
        this.__alignItemsList.aboutToBeDeleted();
        this.__alignItemsValueList.aboutToBeDeleted();
        this.__alignContent.aboutToBeDeleted();
        this.__alignContentList.aboutToBeDeleted();
        this.__alignContentValueList.aboutToBeDeleted();
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
    get wrap() {
        return this.__wrap.get();
    }
    set wrap(newValue) {
        this.__wrap.set(newValue);
    }
    get wrapList() {
        return this.__wrapList.get();
    }
    set wrapList(newValue) {
        this.__wrapList.set(newValue);
    }
    get wrapValueList() {
        return this.__wrapValueList.get();
    }
    set wrapValueList(newValue) {
        this.__wrapValueList.set(newValue);
    }
    get justifyContent() {
        return this.__justifyContent.get();
    }
    set justifyContent(newValue) {
        this.__justifyContent.set(newValue);
    }
    get justifyContentList() {
        return this.__justifyContentList.get();
    }
    set justifyContentList(newValue) {
        this.__justifyContentList.set(newValue);
    }
    get justifyContentValueList() {
        return this.__justifyContentValueList.get();
    }
    set justifyContentValueList(newValue) {
        this.__justifyContentValueList.set(newValue);
    }
    get alignItems() {
        return this.__alignItems.get();
    }
    set alignItems(newValue) {
        this.__alignItems.set(newValue);
    }
    get alignItemsList() {
        return this.__alignItemsList.get();
    }
    set alignItemsList(newValue) {
        this.__alignItemsList.set(newValue);
    }
    get alignItemsValueList() {
        return this.__alignItemsValueList.get();
    }
    set alignItemsValueList(newValue) {
        this.__alignItemsValueList.set(newValue);
    }
    get alignContent() {
        return this.__alignContent.get();
    }
    set alignContent(newValue) {
        this.__alignContent.set(newValue);
    }
    get alignContentList() {
        return this.__alignContentList.get();
    }
    set alignContentList(newValue) {
        this.__alignContentList.set(newValue);
    }
    get alignContentValueList() {
        return this.__alignContentValueList.get();
    }
    set alignContentValueList(newValue) {
        this.__alignContentValueList.set(newValue);
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
            Column.debugLine("pages/container/FlexPage.ets(109:5)");
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
            Column.debugLine("pages/container/FlexPage.ets(111:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Flex 弹性布局' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Flex 弹性布局'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new TitleTab(this, { selectTab: this.__selectTab, interface: true, property: false, common: true }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        interface: true, property: false, common: true
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
            Blank.debugLine("pages/container/FlexPage.ets(116:7)");
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
            Column.debugLine("pages/container/FlexPage.ets(117:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Flex.create({
                direction: this.direct,
                wrap: this.wrap,
                justifyContent: this.justifyContent,
                alignItems: this.alignItems,
                alignContent: this.alignContent
            });
            Flex.debugLine("pages/container/FlexPage.ets(118:9)");
            Flex.backgroundColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            Flex.width(this.widthValue);
            Flex.height(this.heightValue);
            if (!isInitialRender) {
                Flex.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('元素1');
            Text.debugLine("pages/container/FlexPage.ets(125:11)");
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('元素2');
            Text.debugLine("pages/container/FlexPage.ets(127:11)");
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Text.create('元素3');
            Text.debugLine("pages/container/FlexPage.ets(129:11)");
            Text.fontColor({ "id": 16777243, "type": 10001, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" });
            if (!isInitialRender) {
                Text.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Text.pop();
        Flex.pop();
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/container/FlexPage.ets(137:7)");
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
            Column.debugLine("pages/container/FlexPage.ets(139:7)");
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
            Column.debugLine("pages/container/FlexPage.ets(141:9)");
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
            Divider.debugLine("pages/container/FlexPage.ets(148:11)");
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
                        name: 'wrap',
                        selectItem: this.__wrap,
                        itemsList: this.__wrapList,
                        valuesList: this.__wrapValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'wrap'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/FlexPage.ets(155:11)");
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
                        name: 'justifyContent',
                        selectItem: this.__justifyContent,
                        itemsList: this.__justifyContentList,
                        valuesList: this.__justifyContentValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'justifyContent'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/FlexPage.ets(162:11)");
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
                        name: 'alignItems',
                        selectItem: this.__alignItems,
                        itemsList: this.__alignItemsList,
                        valuesList: this.__alignItemsValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'alignItems'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/FlexPage.ets(169:11)");
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
                        name: 'alignContent',
                        selectItem: this.__alignContent,
                        itemsList: this.__alignContentList,
                        valuesList: this.__alignContentValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'alignContent'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        // 接口参数 tab
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            // 通用属性 tab
            Column.create();
            Column.debugLine("pages/container/FlexPage.ets(181:9)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__widthValue, name: 'width', min: 10, max: 300 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'width', min: 10, max: 300
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/container/FlexPage.ets(183:11)");
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
loadDocument(new FlexPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=FlexPage.js.map