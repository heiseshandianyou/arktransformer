/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct LoadingProgressPage {
  @State selectTab: number = 1
  // color 设置加载进度条前景色
  @State selectColor: Color = Color.Black
  @State colorList: Color[] = [Color.Black, Color.Blue, Color.Brown, Color.Green, Color.Orange, Color.Grey]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // width 宽度通用属性
  @State widthValue: number = 48

  // height 高度通用属性
  private heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'LoadingProgress 加载动效' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        LoadingProgress()
          .width(this.widthValue)
          .height(this.heightValue)
          .color(this.selectColor)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            valuesList: $colorValueList,
            itemsList: $colorList,
            selectItem: $selectColor,
            name: 'color'
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)


        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 24, max: 200 })
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