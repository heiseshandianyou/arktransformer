/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSwitch from '../../component/controller/CustomSwitch'

@Entry
@Component
struct MarqueePage {
  @State selectTab: number = 0

  // start 控制跑马灯是否进入播放状态
  @State start: boolean = true

  // step 滚动动画文本滚动步长
  @State step: number = 6

  // loop 设置重复滚动的次数，小于等于零时无限循环。
  @State loop: number = -1

  // fromStart 设置文本从头开始滚动或反向滚动
  @State fromStart: boolean = true

  // src 需要滚动的文本
  private src: string = '跑马灯组件，用于滚动展示一段单行文本，仅当文本内容宽度超过跑马灯组件宽度时滚动。'

  // allowScale 是否允许文本缩放
  @State allowScale: boolean = false

  // width 通用宽度属性
  @State widthValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Marquee 跑马灯' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Marquee({
          start: this.start,
          step: this.step,
          loop: this.loop,
          fromStart: this.fromStart,
          src: this.src
        })
          .width(this.widthValue)
          .allowScale(this.allowScale)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSwitch({ name: 'start', isOn: $start })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'step', value: $step, min: 0, max: 40 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'loop', value: $loop, min: -1, max: 3 })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'fromStart', isOn: $fromStart })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'allowScale', isOn: $allowScale })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 350 })
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