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
struct SearchPage {
  @State selectTab: number = 1
  // placeholderColor placeholder文本颜色
  @State selectColor: Color = Color.Grey
  @State colorList: Color[] = [Color.Grey, Color.Black, Color.Blue, Color.Brown, Color.Green, Color.Orange]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]

  // copyOption 设置输入的文本是否可复制
  @State copyOption: CopyOptions = CopyOptions.None
  @State copyOptionList: CopyOptions[] = [
  CopyOptions.None,
  CopyOptions.InApp,
  CopyOptions.LocalDevice
  ]
  @State copyOptionValueList: Array<ValueObject> = [
    { value: 'None' },
    { value: 'InApp' },
    { value: 'LocalDevice' }
  ]
  @State changeValue: string = ''
  @State submitValue: string = ''
  controller: SearchController = new SearchController()

  // width 宽度通用属性
  @State widthValue: number = 300

  // height 高度通用属性
  @State heightValue: number = 40

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Search 搜索框' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('onSubmit:' + this.submitValue).fontSize(16).margin(6).fontColor($r('app.color.font_normal'))
        Text('onChange:' + this.changeValue).fontSize(16).margin(12).fontColor($r('app.color.font_normal'))
        Search({ value: this.changeValue, placeholder: 'Type to search...', controller: this.controller })
          .searchButton('SEARCH')
          .copyOption(this.copyOption)
          .width(this.widthValue)
          .height(this.heightValue)
          .backgroundColor('#F5F5F5')
          .placeholderColor(this.selectColor)
          .placeholderFont({ size: 14, weight: 400 })
          .textFont({ size: 14, weight: 400 })
          .onSubmit((value: string) => {
            this.submitValue = value
          })
          .onChange((value: string) => {
            this.changeValue = value
          })
          .margin(20)
        Button('Set caretPosition 1')
          .onClick(() => {
            // 设置光标位置到输入的第一个字符后
            this.controller.caretPosition(1)
          })
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
            name: 'placeholderColor'
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'copyOption',
            selectItem: $copyOption,
            itemsList: $copyOptionList,
            valuesList: $copyOptionValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 100, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 60 })
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