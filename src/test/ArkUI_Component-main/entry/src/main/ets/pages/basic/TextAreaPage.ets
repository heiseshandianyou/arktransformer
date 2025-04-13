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
struct TextAreaPage {
  @State selectTab: number = 1
  @State text: string = ''
  controller: TextAreaController = new TextAreaController()

  // placeholderColor placeholder文本颜色
  @State placeholderColor: Color = Color.Grey
  @State placeholderColorList: Color[] = [
  Color.Grey,
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State placeholderColorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // placeholderFont placeholder文本样式
  @State placeholderFont: number = 16

  // textAlign 文本在输入框中的水平对齐式
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

  // caretColor 输入框光标颜色
  @State caretColor: Color = Color.Blue
  @State caretColorList: Color[] = [
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State caretColorValueList: Array<ValueObject> = [
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  // fontSize 字体大小
  @State fontSize: number = 16

  build() {
    // 导航栏---------------------------------------------------------------------
    Column() {
      Column() {
        Title({ pageTitle: 'TextArea 多行文本' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        TextArea({
          placeholder: 'The text area can hold an unlimited amount of text. input your word...',
          controller: this.controller
        })
          .placeholderFont({ size: this.placeholderFont, weight: 400 })
          .placeholderColor(this.placeholderColor)
          .textAlign(this.textAlign)
          .caretColor(this.caretColor)
          .width(this.widthValue)
          .height(this.heightValue)
          .fontSize(this.fontSize)
          .fontColor($r('app.color.font_normal'))
          .backgroundColor($r('app.color.start_window_background'))
          .onChange((value: string) => {
            this.text = value
          })
        Text(this.text)
          .margin({ top: 15 })
          .fontColor($r('app.color.font_normal'))
        Button('Set caretPosition 1')
          .backgroundColor($r('app.color.brand'))
          .margin(15)
          .onClick(() => {
            // 设置光标位置到第一个字符后
            this.controller.caretPosition(1)
          })
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'placeholderColor',
            selectItem: $placeholderColor,
            itemsList: $placeholderColorList,
            valuesList: $placeholderColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'Font', value: $placeholderFont, min: 10, max: 40 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'textAlign',
            selectItem: $textAlign,
            itemsList: $textAlignList,
            valuesList: $textAlignValueList
          })
          CustomSelect({
            name: 'caretColor',
            selectItem: $caretColor,
            itemsList: $caretColorList,
            valuesList: $caretColorValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 300 })
          Divider().color($r('app.color.line_grey'))
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