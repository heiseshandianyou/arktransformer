/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSwitch from '../../component/controller/CustomSwitch'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct DatePickerPage {
  @State selectTab: number = 1
  @State date: string = '选择日期'

  // lunar 是否为农历
  @State lunar: boolean = false

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'DatePicker 日期选择' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        DatePicker()
          .lunar(this.lunar)
          .onChange(value => {
            this.changeHandle(value)
          })
          .width(this.widthValue)
          .height(this.heightValue)
        Text(this.date)
          .margin({ top: 24 })
          .fontColor($r('app.color.font_normal'))
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'lunar', isOn: $lunar })
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
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_grey'))

  }

  changeHandle(value: DatePickerResult) {
    this.date = `${value.year}年${value.month + 1}月${value.day}日`
  }
}

