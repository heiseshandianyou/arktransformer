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
struct ProgressPage {
  @State selectTab: number = 0

  // --> interface
  // value 指定当前进度值
  @State currentValue: number = 50

  // total 指定进度总长
  @State total: number = 100

  // type 指定进度条类型
  @State selectType: ProgressType = ProgressType.Linear
  @State typeList: ProgressType[] = [
  ProgressType.Linear,
  ProgressType.Ring,
  ProgressType.Eclipse,
  ProgressType.ScaleRing,
  ProgressType.Capsule
  ]
  @State typeValueList: Array<ValueObject> = [
    { value: 'Linear' },
    { value: 'Ring' },
    { value: 'Eclipse' },
    { value: 'Black' },
    { value: 'ScaleRing' }
  ]

  // --> prop
  // color 进度条前景色
  @State selectColor: Color = Color.Blue
  @State colorList: Color[] = [
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // backgroundColor 进度条底色
  @State selectBackgroundColor: Color = Color.Gray
  @State backgroundColorList: Color[] = [
  Color.Gray,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State backgroundColorValueList: Array<ValueObject> = [
    { value: 'Gray' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // style 组件的样式
  @State strokeWidth: number = 4 // 进度条宽度
  @State scaleCount: number = 120 // 设置环形进度条总刻度数
  @State scaleWidth: number = 2 // 设置环形进度条刻度粗细


  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Progress 进度条' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Progress({ value: this.currentValue, total: this.total, type: this.selectType })
          .width(this.widthValue)
          .height(this.heightValue)
          .color(this.selectColor)
          .backgroundColor(this.selectBackgroundColor)
          .style({
            strokeWidth: this.strokeWidth,
            scaleCount: this.scaleCount,
            scaleWidth: this.scaleWidth
          })
      }
      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ name: 'value', value: $currentValue, min: 100, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'total', value: $total, min: 200, max: 400 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'type',
            selectItem: $selectType,
            itemsList: $typeList,
            valuesList: $typeValueList
          })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

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
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'strokeWidth', value: $strokeWidth, min: 1, max: 20 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'scaleCount', value: $scaleCount, min: 60, max: 240 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'scaleWidth', value: $scaleWidth, min: 1, max: 5 })

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