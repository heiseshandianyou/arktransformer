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
struct TextTimerPage {
  @State selectTab: number = 0
  textTimerController: TextTimerController = new TextTimerController()
  @State format: string = 'mm:ss.SS'

  // isCountDown 是否倒计时
  @State isCountDown: boolean = false

  // count 倒计时时间
  @State count: number = 6000

  // width 宽度通用属性
  @State fontSize: number = 50

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'TextTimer 计时器' })
        TitleTab({ selectTab: $selectTab, interface: true, property: false, common: true })
      }
      // 组件配置区---------------------------------------------------------------------
      Blank()
      Column() {
        TextTimer({ isCountDown: this.isCountDown, count: this.count, controller: this.textTimerController })
          .format(this.format)
          .fontColor($r('app.color.font_main'))
          .fontSize(this.fontSize)
          .onTimer((utc: number, elapsedTime: number) => {
            console.info('textTimer notCountDown utc is：' + utc + ', elapsedTime: ' + elapsedTime)
          })
        Row({ space: 10 }) {
          Button("start")
            .backgroundColor($r('app.color.brand'))
            .onClick(() => {
              this.textTimerController.start()
            })
          Button("pause")
            .backgroundColor($r('app.color.brand'))
            .onClick(() => {
              this.textTimerController.pause()
            })
          Button("reset")
            .backgroundColor($r('app.color.brand'))
            .onClick(() => {
              this.textTimerController.reset()
            })
        }
        .margin({ top: 15 })
      }

      Blank()
      // 组件预览区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSwitch({ name: 'isCountDown', isOn: $isCountDown })
          Divider()
            .color($r('app.color.line_grey'))
          CustomSlider({ name: 'count', value: $count, min: 3000, max: 9000 })

        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $fontSize, name: 'fontSize', min: 20, max: 80 })
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