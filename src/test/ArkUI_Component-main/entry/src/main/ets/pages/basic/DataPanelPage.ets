/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct DataPanelPage {
  @State selectTab: number = 0

  // values 数据值列表
  @State panelData: number[] = [10, 10, 10, 10, 10, 10, 10, 10, 10]

  // max max等于value数组各项的和，按比例显示。
  @State max: number = 100

  // type 数据面板的类型
  @State type: DataPanelType = DataPanelType.Circle
  @State typeList: DataPanelType[] = [DataPanelType.Circle, DataPanelType.Line]
  @State typeValueList: Array<ValueObject> = [{ value: 'Circle' }, { value: 'Line' }]

  // closeEffect 关闭数据占比图表旋转动效。
  @State closeEffect: boolean = false

  // width 宽度通用属性
  @State widthValue: number = 300

  // height 高度通用属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'DataPanel 数据面板' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        Stack() {
          DataPanel({ values: this.panelData, type: this.type, max: this.max })
            .width(this.widthValue)
            .height(this.heightValue)
            .closeEffect(this.closeEffect)
          Button('刷新数据')
            .type(ButtonType.Circle)
            .fontColor($r('app.color.font_light'))
            .width(100)
            .backgroundColor($r('app.color.start_window_background'))
            .onClick(() => this.refreshData())
        }
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口 tab
        Column() {
          CustomSlider({ value: $max, name: 'max', min: 50, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({ name: 'type', itemsList: $typeList, valuesList: $typeValueList, selectItem: $type })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'closeEffect', isOn: $closeEffect })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 200, max: 350 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 350 })
        }
        .visibility(this.selectTab === 2 ? Visibility.Visible : Visibility.None)

      }
      .padding({ left: 12, right: 12 })
      .backgroundColor($r('app.color.start_window_background'))
      .margin({ left: 20, right: 20, top: 16, bottom: 16 })
      .borderRadius(16)

    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_grey'))

  }

  refreshData() {
    for (let index = 0; index < this.panelData.length; index++) {
      this.panelData[index] = Math.floor(Math.random() * 18)
    }
  }
}

