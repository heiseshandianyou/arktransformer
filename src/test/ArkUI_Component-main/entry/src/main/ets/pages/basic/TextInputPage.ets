/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct TextInputPage {
  @State selectTab: number = 1
  @State text: string = ''
  controller: TextAreaController = new TextAreaController()

  // type 输入框类型
  @State type: InputType = InputType.Normal
  @State typeList: InputType[] = [
  InputType.Normal,
  InputType.Number,
  InputType.PhoneNumber,
  InputType.Email,
  InputType.Password
  ]
  @State typeValueList: Array<ValueObject> = [
    { value: 'Normal' },
    { value: 'Number' },
    { value: 'PhoneNumber' },
    { value: 'Email' },
    { value: 'Password' }
  ]

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

  //placeholderFont placeholder字体大小
  @State placeholderFont: number = 16

  //enterKeyType 输入法回车键类型
  @State enterKeyType: EnterKeyType = EnterKeyType.Go
  @State enterKeyTypeList: EnterKeyType[] = [
  EnterKeyType.Go,
  EnterKeyType.Search,
  EnterKeyType.Send,
  EnterKeyType.Next,
  EnterKeyType.Done
  ]
  @State enterKeyTypeValueList: Array<ValueObject> = [
    { value: 'Go' },
    { value: 'Search' },
    { value: 'Send' },
    { value: 'Next' },
    { value: 'Done' }
  ]

  // caretColor 光标颜色
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

  // maxLength 文本的最大输入字符数
  @State maxLength: number = 11

  //showPasswordIcon 密码输入模式时，输入框末尾的图标是否显示
  @State showPasswordIcon: boolean = true

  // style 输入框为默认风格或内联输入风格
  @State style: TextInputStyle = TextInputStyle.Default
  @State styleList: TextInputStyle[] = [
  TextInputStyle.Default,
  TextInputStyle.Inline
  ]
  @State styleValueList: Array<ValueObject> = [
    { value: 'Default' },
    { value: 'Inline' }
  ]

  // textAlign 输入文本在输入框中的对齐方式
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


  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  // fontSize 字体大小
  @State fontSize: number = 16

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'TextInput 单行文本' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        TextInput({ text: this.text, placeholder: 'input your word...', controller: this.controller })
          .type(this.type)
          .placeholderColor(this.placeholderColor)
          .placeholderFont({ size: this.placeholderFont })
          .enterKeyType(this.enterKeyType)
          .caretColor(this.caretColor)
          .maxLength(this.maxLength)
          .showPasswordIcon(this.showPasswordIcon)
          .style(this.style)
          .textAlign(this.textAlign)
          .width(this.widthValue)
          .onChange((value: string) => {
            this.text = value
          })
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'type',
            selectItem: $type,
            itemsList: $typeList,
            valuesList: $typeValueList
          })
          Divider().color($r('app.color.line_grey'))
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
            name: 'enterKeyType',
            selectItem: $enterKeyType,
            itemsList: $enterKeyTypeList,
            valuesList: $enterKeyTypeValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'caretColor',
            selectItem: $caretColor,
            itemsList: $caretColorList,
            valuesList: $caretColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'maxLength', value: $maxLength, min: 4, max: 20 })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'showPasswordIcon', isOn: $showPasswordIcon })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'style',
            selectItem: $style,
            itemsList: $styleList,
            valuesList: $styleValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'textAlign',
            selectItem: $textAlign,
            itemsList: $textAlignList,
            valuesList: $textAlignValueList
          })

        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 300 })
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