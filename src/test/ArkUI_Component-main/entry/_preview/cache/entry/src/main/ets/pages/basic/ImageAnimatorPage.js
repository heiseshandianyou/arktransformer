/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSelect from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSelect';
import CustomSwitch from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSwitch';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
class ImageAnimatorPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(1
        // images 设置图片帧信息集合
        , this, "selectTab");
        this.images = [
            { src: { "id": 16777235, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777248, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777220, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777218, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777233, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777225, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777234, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777232, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777224, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777227, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777228, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } },
            { src: { "id": 16777231, "type": 20000, params: [], "bundleName": "com.gudaoessay.arkuicomponentdemo", "moduleName": "entry" } }
        ];
        this.__selectState = new ObservedPropertySimplePU(AnimationStatus.Initial, this, "selectState");
        this.__stateList = new ObservedPropertyObjectPU([
            AnimationStatus.Initial,
            AnimationStatus.Running,
            AnimationStatus.Paused,
            AnimationStatus.Stopped
        ], this, "stateList");
        this.__stateValueList = new ObservedPropertyObjectPU([
            { value: 'Initial' },
            { value: 'Running' },
            { value: 'Paused' },
            { value: 'Stopped' }
        ]
        // duration 动画播放时长
        , this, "stateValueList");
        this.__duration = new ObservedPropertySimplePU(1000
        // reverse 播放顺序
        , this, "duration");
        this.__reverse = new ObservedPropertySimplePU(false
        // fillMode 开始前和结束后的状态
        , this, "reverse");
        this.__selectFillMode = new ObservedPropertySimplePU(FillMode.None, this, "selectFillMode");
        this.__fillModeList = new ObservedPropertyObjectPU([
            FillMode.None,
            FillMode.Forwards,
            FillMode.Backwards,
            FillMode.Both,
        ], this, "fillModeList");
        this.__fillModeValueList = new ObservedPropertyObjectPU([
            { value: 'None' },
            { value: 'Forwards' },
            { value: 'Backwards' },
            { value: 'Both' }
        ]
        // iterations 播放次数，-1时无限次播放
        , this, "fillModeValueList");
        this.__iterations = new ObservedPropertySimplePU(1
        // width 通用宽度属性
        , this, "iterations");
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
        if (params.images !== undefined) {
            this.images = params.images;
        }
        if (params.selectState !== undefined) {
            this.selectState = params.selectState;
        }
        if (params.stateList !== undefined) {
            this.stateList = params.stateList;
        }
        if (params.stateValueList !== undefined) {
            this.stateValueList = params.stateValueList;
        }
        if (params.duration !== undefined) {
            this.duration = params.duration;
        }
        if (params.reverse !== undefined) {
            this.reverse = params.reverse;
        }
        if (params.selectFillMode !== undefined) {
            this.selectFillMode = params.selectFillMode;
        }
        if (params.fillModeList !== undefined) {
            this.fillModeList = params.fillModeList;
        }
        if (params.fillModeValueList !== undefined) {
            this.fillModeValueList = params.fillModeValueList;
        }
        if (params.iterations !== undefined) {
            this.iterations = params.iterations;
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
        this.__selectState.purgeDependencyOnElmtId(rmElmtId);
        this.__stateList.purgeDependencyOnElmtId(rmElmtId);
        this.__stateValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__duration.purgeDependencyOnElmtId(rmElmtId);
        this.__reverse.purgeDependencyOnElmtId(rmElmtId);
        this.__selectFillMode.purgeDependencyOnElmtId(rmElmtId);
        this.__fillModeList.purgeDependencyOnElmtId(rmElmtId);
        this.__fillModeValueList.purgeDependencyOnElmtId(rmElmtId);
        this.__iterations.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
        this.__heightValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__selectState.aboutToBeDeleted();
        this.__stateList.aboutToBeDeleted();
        this.__stateValueList.aboutToBeDeleted();
        this.__duration.aboutToBeDeleted();
        this.__reverse.aboutToBeDeleted();
        this.__selectFillMode.aboutToBeDeleted();
        this.__fillModeList.aboutToBeDeleted();
        this.__fillModeValueList.aboutToBeDeleted();
        this.__iterations.aboutToBeDeleted();
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
    get selectState() {
        return this.__selectState.get();
    }
    set selectState(newValue) {
        this.__selectState.set(newValue);
    }
    get stateList() {
        return this.__stateList.get();
    }
    set stateList(newValue) {
        this.__stateList.set(newValue);
    }
    get stateValueList() {
        return this.__stateValueList.get();
    }
    set stateValueList(newValue) {
        this.__stateValueList.set(newValue);
    }
    get duration() {
        return this.__duration.get();
    }
    set duration(newValue) {
        this.__duration.set(newValue);
    }
    get reverse() {
        return this.__reverse.get();
    }
    set reverse(newValue) {
        this.__reverse.set(newValue);
    }
    get selectFillMode() {
        return this.__selectFillMode.get();
    }
    set selectFillMode(newValue) {
        this.__selectFillMode.set(newValue);
    }
    get fillModeList() {
        return this.__fillModeList.get();
    }
    set fillModeList(newValue) {
        this.__fillModeList.set(newValue);
    }
    get fillModeValueList() {
        return this.__fillModeValueList.get();
    }
    set fillModeValueList(newValue) {
        this.__fillModeValueList.set(newValue);
    }
    get iterations() {
        return this.__iterations.get();
    }
    set iterations(newValue) {
        this.__iterations.set(newValue);
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
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(80:5)");
            Column.width('100%');
            Column.height('100%');
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
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(82:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'ImageAnimator 帧动画' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'ImageAnimator 帧动画'
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
            // 组件预览区 ---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/basic/ImageAnimatorPage.ets(88:7)");
            if (!isInitialRender) {
                // 组件预览区 ---------------------------------------------------------------------
                Blank.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        // 组件预览区 ---------------------------------------------------------------------
        Blank.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Column.create();
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(89:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            ImageAnimator.create();
            ImageAnimator.debugLine("pages/basic/ImageAnimatorPage.ets(90:9)");
            ImageAnimator.images(this.images);
            ImageAnimator.width(this.widthValue);
            ImageAnimator.height(this.heightValue);
            ImageAnimator.state(this.selectState);
            ImageAnimator.duration(this.duration);
            ImageAnimator.reverse(this.reverse);
            ImageAnimator.fillMode(this.selectFillMode);
            ImageAnimator.iterations(this.iterations);
            if (!isInitialRender) {
                ImageAnimator.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/ImageAnimatorPage.ets(101:7)");
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
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(103:7)");
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
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(105:9)");
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
                        name: 'state',
                        selectItem: this.__selectState,
                        itemsList: this.__stateList,
                        valuesList: this.__stateValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'state'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImageAnimatorPage.ets(112:11)");
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
                    ViewPU.create(new CustomSlider(this, { name: 'duration', min: 100, max: 4000, value: this.__duration }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'duration', min: 100, max: 4000
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImageAnimatorPage.ets(114:11)");
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
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/ImageAnimatorPage.ets(116:11)");
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
                        name: 'fillMode',
                        selectItem: this.__selectFillMode,
                        itemsList: this.__fillModeList,
                        valuesList: this.__fillModeValueList
                    }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'fillMode'
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        {
            this.observeComponentCreation((elmtId, isInitialRender) => {
                ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                if (isInitialRender) {
                    ViewPU.create(new CustomSlider(this, { name: 'iterations', value: this.__iterations, min: -1, max: 3 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'iterations', min: -1, max: 3
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
            Column.debugLine("pages/basic/ImageAnimatorPage.ets(129:9)");
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
            Divider.debugLine("pages/basic/ImageAnimatorPage.ets(131:11)");
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
loadDocument(new ImageAnimatorPage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=ImageAnimatorPage.js.map