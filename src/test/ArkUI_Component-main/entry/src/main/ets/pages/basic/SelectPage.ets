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
struct SelectPage {
  @State selectTab: number = 1

  // 选项列表
  private value: Array<ValueObject> = [
    { value: '选项1' },
    { value: '选项2' },
    { value: '选项3' },
    { value: '选项4' },
  ]
  @State selected: number = -1
  @State selectedValue: string = '下拉菜单'

  // fontColor 设置下拉按钮本身的文本颜色
  @State fontColor: Color = Color.Grey
  @State fontColorList: Color[] = [
  Color.Grey,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  ]
  @State fontColorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // selectedOptionBgColor 设置下拉菜单选中项的背景色
  @State selectedOptionBgColor: Color = Color.White
  @State selectedOptionBgColorList: Color[] = [
  Color.White,
  Color.Grey,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  ]
  @State selectedOptionBgColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // optionFontColor 下拉菜单选项的文本颜色
  @State optionFontColor: Color = Color.Grey
  @State optionFontColorList: Color[] = [
  Color.Grey,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  ]
  @State optionFontColorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // selectedOptionFontColor 下拉菜单选中项的文本颜色
  @State selectedOptionFontColor: Color = Color.Grey
  @State selectedOptionFontColorList: Color[] = [
  Color.Grey,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  ]
  @State selectedOptionFontColorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // optionBgColor 下拉菜单单项的背景颜色
  @State optionBgColor: Color = Color.White
  @State optionBgColorList: Color[] = [
  Color.White,
  Color.Grey,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  ]
  @State optionBgColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]


  // width 通用宽度属性
  @State widthValue: number = 120

  //height 通用高度属性
  @State heightValue: number = 40

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Select 下拉选择' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Select(this.value)
          .onSelect((index: number, value: string) => {
            this.selected = index
            this.selectedValue = value
          })
          .value(this.selectedValue)
          .selected(this.selected)
          .width(this.widthValue)
          .height(this.heightValue)
          .fontColor(this.fontColor)
          .selectedOptionBgColor(this.selectedOptionBgColor)
          .optionFontColor(this.optionFontColor)
          .selectedOptionFontColor(this.selectedOptionFontColor)
          .optionBgColor(this.optionBgColor)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'fontColor',
            selectItem: $fontColor,
            itemsList: $fontColorList,
            valuesList: $fontColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'selectedOptionBgColor',
            selectItem: $selectedOptionBgColor,
            itemsList: $selectedOptionBgColorList,
            valuesList: $selectedOptionBgColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'optionFontColor',
            selectItem: $optionFontColor,
            itemsList: $optionFontColorList,
            valuesList: $optionFontColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'selectedOptionFontColor',
            selectItem: $selectedOptionFontColor,
            itemsList: $selectedOptionFontColorList,
            valuesList: $selectedOptionFontColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'optionBgColor',
            selectItem: $optionBgColor,
            itemsList: $optionBgColorList,
            valuesList: $optionBgColorValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 50, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'height', value: $heightValue, min: 20, max: 120 })
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