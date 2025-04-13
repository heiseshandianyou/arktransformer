/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct TextPickerPage {
  @State selectTab: number = 1
  private select: number = 1
  private fruits: string[] = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6']
  @State text: string = ''

  //defaultPickerItemHeight Picker各选择项的高度
  @State defaultPickerItemHeight: number = 40

  //width 通用宽度属性
  @State widthValue: number = 100

  //height 通用高度属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'TextPicker 滑动选择' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text(this.text)
          .fontColor($r('app.color.font_light'))
          .margin({ bottom: 20 })
        TextPicker({ range: this.fruits, selected: this.select })
          .onChange((value, index) => {
            this.text = `index : ${index} - value : ${value}`
          })
          .defaultPickerItemHeight(this.defaultPickerItemHeight)
          .width(this.widthValue)
          .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSlider({ name: 'itemHeight', value: $defaultPickerItemHeight, min: 20, max: 80 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 20, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'height', value: $heightValue, min: 20, max: 200 })
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