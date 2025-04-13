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
struct SpanPage {
  @State selectTab: number = 1

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

  // color 文本颜色
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

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Span 行内文本' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text() {
          Span('I am Span')
            .decoration({
              type: this.type,
              color: this.color
            })
            .letterSpacing(this.letterSpacing)
            .textCase(this.textCase)
            .fontSize(this.fontSize)
        }
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
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