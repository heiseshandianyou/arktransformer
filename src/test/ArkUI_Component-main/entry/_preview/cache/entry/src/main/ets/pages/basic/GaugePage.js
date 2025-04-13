/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */
import TitleTab from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/TitleTab';
import Title from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/title/Title';
import CustomSlider from '@bundle:com.gudaoessay.arkuicomponentdemo/entry/ets/component/controller/CustomSlider';
class GaugePage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1) {
        super(parent, __localStorage, elmtId);
        this.__selectTab = new ObservedPropertySimplePU(0
        // interface 接口
        , this, "selectTab");
        this.__value = new ObservedPropertySimplePU(50 // 量规图的当前数据值，即图中指针指向位置。用于组件创建时量规图初始值的预置。
        , this, "value");
        this.__min = new ObservedPropertySimplePU(0 // 当前数据段最小值。
        , this, "min");
        this.__max = new ObservedPropertySimplePU(100 // 当前数据段最大值。
        // prop 属性
        , this, "max");
        this.__propValue = new ObservedPropertySimplePU(75 // 设置量规图的数据值，可用于动态修改量规图的数据值。
        , this, "propValue");
        this.__startAngle = new ObservedPropertySimplePU(0 // 设置起始角度位置，时钟0点为0度，顺时针方向为正角度。
        , this, "startAngle");
        this.__endAngle = new ObservedPropertySimplePU(360 // 设置终止角度位置，时钟0点为0度，顺时针方向为正角度。
        //strokeWidth 设置环形量规图的环形厚度。
        , this, "endAngle");
        this.__strokeWidth = new ObservedPropertySimplePU(4
        //width 宽度通用属性
        , this, "strokeWidth");
        this.__widthValue = new ObservedPropertySimplePU(300, this, "widthValue");
        this.setInitiallyProvidedValue(params);
    }
    setInitiallyProvidedValue(params) {
        if (params.selectTab !== undefined) {
            this.selectTab = params.selectTab;
        }
        if (params.value !== undefined) {
            this.value = params.value;
        }
        if (params.min !== undefined) {
            this.min = params.min;
        }
        if (params.max !== undefined) {
            this.max = params.max;
        }
        if (params.propValue !== undefined) {
            this.propValue = params.propValue;
        }
        if (params.startAngle !== undefined) {
            this.startAngle = params.startAngle;
        }
        if (params.endAngle !== undefined) {
            this.endAngle = params.endAngle;
        }
        if (params.strokeWidth !== undefined) {
            this.strokeWidth = params.strokeWidth;
        }
        if (params.widthValue !== undefined) {
            this.widthValue = params.widthValue;
        }
    }
    updateStateVars(params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectTab.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__min.purgeDependencyOnElmtId(rmElmtId);
        this.__max.purgeDependencyOnElmtId(rmElmtId);
        this.__propValue.purgeDependencyOnElmtId(rmElmtId);
        this.__startAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__endAngle.purgeDependencyOnElmtId(rmElmtId);
        this.__strokeWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__widthValue.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectTab.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__min.aboutToBeDeleted();
        this.__max.aboutToBeDeleted();
        this.__propValue.aboutToBeDeleted();
        this.__startAngle.aboutToBeDeleted();
        this.__endAngle.aboutToBeDeleted();
        this.__strokeWidth.aboutToBeDeleted();
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
    get value() {
        return this.__value.get();
    }
    set value(newValue) {
        this.__value.set(newValue);
    }
    get min() {
        return this.__min.get();
    }
    set min(newValue) {
        this.__min.set(newValue);
    }
    get max() {
        return this.__max.get();
    }
    set max(newValue) {
        this.__max.set(newValue);
    }
    get propValue() {
        return this.__propValue.get();
    }
    set propValue(newValue) {
        this.__propValue.set(newValue);
    }
    get startAngle() {
        return this.__startAngle.get();
    }
    set startAngle(newValue) {
        this.__startAngle.set(newValue);
    }
    get endAngle() {
        return this.__endAngle.get();
    }
    set endAngle(newValue) {
        this.__endAngle.set(newValue);
    }
    get strokeWidth() {
        return this.__strokeWidth.get();
    }
    set strokeWidth(newValue) {
        this.__strokeWidth.set(newValue);
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
            Column.debugLine("pages/basic/GaugePage.ets(32:5)");
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
            Column.debugLine("pages/basic/GaugePage.ets(34:7)");
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
                    ViewPU.create(new Title(this, { pageTitle: 'Gauge 量规图表' }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        pageTitle: 'Gauge 量规图表'
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
            // 组件预览区 ---------------------------------------------------------------------
            Blank.create();
            Blank.debugLine("pages/basic/GaugePage.ets(40:7)");
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
            Column.debugLine("pages/basic/GaugePage.ets(41:7)");
            if (!isInitialRender) {
                Column.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Gauge.create({ value: this.value, min: this.min, max: this.max });
            Gauge.debugLine("pages/basic/GaugePage.ets(42:9)");
            Gauge.value(this.propValue);
            Gauge.startAngle(this.startAngle);
            Gauge.endAngle(this.endAngle);
            Gauge.colors([[Color.Black, 20], [Color.Blue, 20], [Color.Red, 20], [Color.Green, 20]]);
            Gauge.strokeWidth(this.strokeWidth);
            Gauge.width(this.widthValue);
            if (!isInitialRender) {
                Gauge.pop();
            }
            ViewStackProcessor.StopGetAccessRecording();
        });
        Column.pop();
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Blank.create();
            Blank.debugLine("pages/basic/GaugePage.ets(52:7)");
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
            Column.debugLine("pages/basic/GaugePage.ets(54:7)");
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
            Column.debugLine("pages/basic/GaugePage.ets(56:9)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__min, name: 'min', min: 0, max: 100 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'min', min: 0, max: 100
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/GaugePage.ets(58:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__max, name: 'max', min: 0, max: 100 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'max', min: 0, max: 100
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
            Column.debugLine("pages/basic/GaugePage.ets(65:9)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__propValue, name: 'value', min: 0, max: 100 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'value', min: 0, max: 100
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/GaugePage.ets(67:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__startAngle, name: 'startAngle', min: 0, max: 360 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'startAngle', min: 0, max: 360
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/GaugePage.ets(69:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__endAngle, name: 'endAngle', min: 0, max: 360 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'endAngle', min: 0, max: 360
                    });
                }
                ViewStackProcessor.StopGetAccessRecording();
            });
        }
        this.observeComponentCreation((elmtId, isInitialRender) => {
            ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
            Divider.create();
            Divider.debugLine("pages/basic/GaugePage.ets(71:11)");
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
                    ViewPU.create(new CustomSlider(this, { value: this.__strokeWidth, name: 'strokeWidth', min: 1, max: 30 }, undefined, elmtId));
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        name: 'strokeWidth', min: 1, max: 30
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
            Column.debugLine("pages/basic/GaugePage.ets(78:9)");
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
loadDocument(new GaugePage(undefined, {}));
ViewStackProcessor.StopGetAccessRecording();
//# sourceMappingURL=GaugePage.js.map