/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSwitch from '../../component/controller/CustomSwitch'

@Entry
@Component
struct TimePickerPage {
  @State selectTab: number = 1

  // useMilitaryTime 展示时间是否为24小时制
  @State useMilitaryTime: boolean = false

  private selectedTime: Date = new Date('2023-12-01T08:00:00')
  @State info: string = '选择时间'


  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'TimePicker 时间选择' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        TimePicker({
          selected: this.selectedTime,
        })
          .useMilitaryTime(this.useMilitaryTime)
          .onChange((value: TimePickerResult) => {
            this.selectedTime.setHours(value.hour, value.minute)
            this.info = JSON.stringify(value)
          })
          .width(this.widthValue)
          .height(this.heightValue)

        Text(this.info)
          .fontColor($r('app.color.font_light'))
          .margin({ top: 20 })

      }
      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'useMilitaryTime', isOn: $useMilitaryTime })

        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 200, max: 350 })
          Divider()
            .color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 350 })
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