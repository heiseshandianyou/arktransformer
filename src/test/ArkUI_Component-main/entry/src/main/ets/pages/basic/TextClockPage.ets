/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct TextClockPage {
  @State selectTab: number = 2
  @State accumulateTime: number = 0
  controller: TextClockController = new TextClockController()

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  // fontSize 字体大小
  @State fontSize: number = 32

  build() {
    // 导航栏---------------------------------------------------------------------
    Column() {
      Column() {
        Title({ pageTitle: 'TextClock 系统时间' })
        TitleTab({ selectTab: $selectTab, interface: false, property: false, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text(`${this.accumulateTime}`)
          .fontColor($r('app.color.font_light'))
          .margin({ bottom: 15 })
        TextClock({ controller: this.controller })
          .format('hms')
          .fontSize(this.fontSize)
          .onDateChange((value: number) => {
            this.accumulateTime = value
          })
        Button('start')
          .onClick(() => {
            this.controller.start()
          })
          .backgroundColor($r('app.color.brand'))
          .height(32)
          .margin(30)

        Button('stop')
          .onClick(() => {
            this.controller.stop()
          })
          .backgroundColor($r('app.color.brand'))
          .height(32)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'fontSize', value: $fontSize, min: 14, max: 80 })
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