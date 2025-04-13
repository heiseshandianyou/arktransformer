/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct TextPage {
  @State selectTab: number = 1

  // textAlign 文本段落在水平方向的对齐方式
  @State textAlign: TextAlign = TextAlign.Center
  @State textAlignList: TextAlign[] = [
  TextAlign.Center,
  TextAlign.Start,
  TextAlign.End
  ]
  @State textAlignValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' }
  ]

  // maxLines 文本的最大行数
  @State maxLines: number = 1

  // textOverflow 文本超长时的显示方式
  @State textOverflow: TextOverflow = TextOverflow.None
  @State textOverflowList: TextOverflow[] = [
  TextOverflow.None,
  TextOverflow.Clip,
  TextOverflow.Ellipsis,
  ]
  @State textOverflowValueList: Array<ValueObject> = [
    { value: 'None' },
    { value: 'Clip' },
    { value: 'Ellipsis' }
  ]

  // type 文本装饰线样式
  @State type: TextDecorationType = TextDecorationType.Underline
  @State typeList: TextDecorationType[] = [
  TextDecorationType.Underline,
  TextDecorationType.Overline,
  TextDecorationType.LineThrough,
  TextDecorationType.None
  ]
  @State typeValueList: Array<ValueObject> = [
    { value: 'Underline' },
    { value: 'Overline' },
    { value: 'LineThrough' },
    { value: 'None' }
  ]

  // color 文本装饰线颜色
  @State color: Color = Color.Blue
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

  // baselineOffset 文本基线的偏移量
  @State baselineOffset: number = 0

  // letterSpacing 文本字符间距
  @State letterSpacing: number = 5

  // textCase 文本大小写
  @State textCase: TextCase = TextCase.Normal
  @State textCaseList: TextCase[] = [
  TextCase.Normal,
  TextCase.LowerCase,
  TextCase.UpperCase,
  ]
  @State textCaseValueList: Array<ValueObject> = [
    { value: 'Normal' },
    { value: 'LowerCase' },
    { value: 'UpperCase' }
  ]

  // fontSize 字体大小
  @State fontSize: number = 20

  // width 通用宽度属性
  @State widthValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Text 文本' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('This is text demonstration')
          .textAlign(this.textAlign)
          .textOverflow({ overflow: this.textOverflow })
          .decoration({ type: this.type, color: this.color })
          .baselineOffset(this.baselineOffset)
          .letterSpacing(this.letterSpacing)
          .textCase(this.textCase)
          .fontSize(this.fontSize)
          .width(this.widthValue)
          .maxLines(this.maxLines)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'textAlign',
            selectItem: $textAlign,
            itemsList: $textAlignList,
            valuesList: $textAlignValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'textOverflow',
            selectItem: $textOverflow,
            itemsList: $textOverflowList,
            valuesList: $textOverflowValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'maxLines', value: $maxLines, min: 1, max: 3 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'decoration-type',
            selectItem: $type,
            itemsList: $typeList,
            valuesList: $typeValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'decoration-color',
            selectItem: $color,
            itemsList: $colorList,
            valuesList: $colorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'baselineOffset', value: $baselineOffset, min: -20, max: 20 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'letterSpacing', value: $letterSpacing, min: -10, max: 20 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'textCase',
            selectItem: $textCase,
            itemsList: $textCaseList,
            valuesList: $textCaseValueList
          })

        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'fontSize', value: $fontSize, min: 10, max: 40 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $widthValue, name: 'width', min: 200, max: 350 })
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