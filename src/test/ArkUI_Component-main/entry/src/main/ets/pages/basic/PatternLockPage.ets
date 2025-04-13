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
struct PatternLockPage {
  @State selectTab: number = 1

  // backgroundColor
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
  @State backgroundValueColorList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Gray' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // sideLength 设置组件的宽度和高度（宽高相同）
  @State sideLength: number = 270

  // circleRadius 设置宫格中圆点的半径
  @State circleRadius: number = 14

  // regularColor 设置宫格圆点在“未选中”状态的填充颜色
  @State selectRegularColor: Color = Color.Black
  @State regularColorList: Color[] = [
  Color.Black,
  Color.Gray,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State regularColorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Gray' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // selectedColor 设置宫格圆点在“选中”状态的填充颜色
  @State selectSelectedColor: Color = Color.Black
  @State selectedColorList: Color[] = [
  Color.Black,
  Color.Gray,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State selectedColorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Gray' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // activeColor 设置宫格圆点在“激活”状态的填充颜色（“激活”状态为手指经过圆点但还未选中的状态）
  @State selectActiveColor: Color = Color.Black
  @State activeColorList: Color[] = [
  Color.Black,
  Color.Gray,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State activeColorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Gray' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // pathColor 设置连线的颜色
  @State selectPathColor: Color = Color.Gray
  @State pathColorList: Color[] = [
  Color.Gray,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State pathColorValueList: Array<ValueObject> = [
    { value: 'Gray' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // pathStrokeWidth 设置连线的宽度。设置为0或负数等非法值时连线不显示
  @State pathStrokeWidth: number = 34

  // autoReset 在完成密码输入后再次在组件区域按下时是否重置组件状态
  @State autoReset: boolean = true

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'PatternLock 密码锁' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        PatternLock()
          .backgroundColor(this.selectBackgroundColor)
          .sideLength(this.sideLength)
          .circleRadius(this.circleRadius)
          .regularColor(this.selectRegularColor)
          .selectedColor(this.selectSelectedColor)
          .activeColor(this.selectActiveColor)
          .pathColor(this.selectPathColor)
          .pathStrokeWidth(this.pathStrokeWidth)
          .autoReset(this.autoReset)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSlider({ name: 'sideLength', value: $sideLength, min: 100, max: 270 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'circleRadius', value: $circleRadius, min: 5, max: 15 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'regularColor',
            selectItem: $selectRegularColor,
            itemsList: $selectedColorList,
            valuesList: $selectedColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'selectedColor',
            selectItem: $selectSelectedColor,
            itemsList: $selectedColorList,
            valuesList: $selectedColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'activeColor',
            selectItem: $selectActiveColor,
            itemsList: $activeColorList,
            valuesList: $activeColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'pathColor',
            selectItem: $selectPathColor,
            itemsList: $pathColorList,
            valuesList: $pathColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'pathStroke', value: $pathStrokeWidth, min: 2, max: 15 })

        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSelect({
            name: 'backgroundColor',
            valuesList: $backgroundValueColorList,
            itemsList: $backgroundColorList,
            selectItem: $selectBackgroundColor
          })
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