/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct QRCodePage {
  @State selectTab: number = 1

  // value 二维码内容字符串
  @State value: string = '二维码原始数据字符串'

  // color 二维码颜色
  @State selectColor: Color = Color.Black
  @State colorList: Color[] = [
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // backgroundColor 二维码背景颜色
  @State selectBackgroundColor: Color = Color.White
  @State backgroundColorList: Color[] = [
  Color.White,
  Color.Gray,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State backgroundColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Gray' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // width 通用宽度属性
  @State widthValue: number = 200

  // height 通用高度属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'QRCode 二维码' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        QRCode(this.value)
          .width(this.widthValue)
          .height(this.heightValue)
          .color(this.selectColor)
          .backgroundColor(this.selectBackgroundColor)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'color',
            valuesList: $colorValueList,
            itemsList: $colorList,
            selectItem: $selectColor
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'backgroundColor',
            valuesList: $backgroundColorValueList,
            itemsList: $backgroundColorList,
            selectItem: $selectBackgroundColor
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 350 })
          Divider().color($r('app.color.line_grey'))
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