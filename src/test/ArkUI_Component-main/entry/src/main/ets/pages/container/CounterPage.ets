/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct CounterPage {
  @State selectTab: number = 2
  @State value: number = 0

  // width 宽度通用属性
  @State widthValue: number = 120

  // height 高度通用属性
  @State heightValue: number = 40

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Counter 计数器' })
        TitleTab({ selectTab: $selectTab, interface: false, property: false, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Counter() {
          Text(this.value.toString())
            .fontColor($r('app.color.font_normal'))
        }
        .onInc(() => {
          this.value++
        })
        .onDec(() => {
          this.value--
        })
        .width(this.widthValue)
        .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 50, max: 300 })
          Divider()
            .color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 300 })
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