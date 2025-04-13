/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct StepperPage {
  @State selectTab: number = 1

  // status 导航器nextLabel的显示状态
  @State status: ItemState = ItemState.Normal
  @State statusList: ItemState[] = [
  ItemState.Normal,
  ItemState.Disabled,
  ItemState.Waiting,
  ItemState.Skip,
  ]
  @State statusValueList: Array<ValueObject> = [
    { value: 'Normal' },
    { value: 'Disabled' },
    { value: 'Waiting' },
    { value: 'Skip' },
  ]

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Stepper 步骤导航' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Stepper() {
          StepperItem() {
            Column() {
              Text('Page One').fontSize(28).fontColor($r('app.color.font_light'))
            }
          }.status(this.status)

          StepperItem() {
            Column() {
              Text('Page Two').fontSize(28).fontColor($r('app.color.font_light'))
            }
          }.status(this.status)

          StepperItem() {
            Column() {
              Text('Page Three').fontSize(28).fontColor($r('app.color.font_light'))
            }
          }.status(this.status)
        }
        .backgroundColor($r('app.color.start_window_background'))
        .width(this.widthValue)
        .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'status',
            selectItem: $status,
            itemsList: $statusList,
            valuesList: $statusValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 350 })
          Divider()
            .color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 100, max: 350 })
        }
        .visibility(this.selectTab === 2 ? Visibility.Visible : Visibility.None)

      }
      .padding({ left: 12, right: 12 })
      .backgroundColor($r('app.color.start_window_background'))
      .margin({ left: 20, right: 20, top: 16, bottom: 16 })
      .borderRadius(16)

    }
    .height('100%')
    .width('100%')
    .backgroundColor($r('app.color.background_grey'))
  }
}