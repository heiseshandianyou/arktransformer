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
struct TogglePage {
  @State selectTab: number = 0

  // isOn 开关是否打开
  @State isOn: boolean = true

  //type 开关样式
  @State type: ToggleType = ToggleType.Switch
  @State typeList: ToggleType[] = [
  ToggleType.Switch,
  ToggleType.Checkbox,
  ToggleType.Button
  ]
  @State typeValueList: Array<ValueObject> = [
    { value: 'Switch' },
    { value: 'Checkbox' },
    { value: 'Button' },
  ]

  // selectedColor 组件打开状态的背景颜色
  @State selectedColor: Color = Color.Grey
  @State selectedColorList: Color[] = [
  Color.Grey,
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State selectedColorValueList: Array<ValueObject> = [
    { value: 'Grey' },
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]
  // switchPointColor Switch类型的圆形滑块颜色
  @State switchPointColor: Color = Color.White
  @State switchPointColorList: Color[] = [
  Color.White,
  Color.Grey,
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange
  ]
  @State switchPointColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Grey' },
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' }
  ]
  // width 通用宽度属性
  @State widthValue: number = 72
  // height 通用高度属性
  @State heightValue: number = 30

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Toggle 开关' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Toggle({ type: this.type, isOn: this.isOn })
          .selectedColor(this.selectedColor)
          .switchPointColor(this.switchPointColor)
          .width(this.widthValue)
          .height(this.heightValue)
          .onChange((isOn: boolean) => {
            this.isOn = isOn
          })
      }
      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSelect({
            name: 'type',
            selectItem: $type,
            itemsList: $typeList,
            valuesList: $typeValueList
          })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'selectedColor',
            selectItem: $selectedColor,
            itemsList: $selectedColorList,
            valuesList: $selectedColorValueList
          })
          CustomSelect({
            name: 'switchPointColor',
            selectItem: $switchPointColor,
            itemsList: $switchPointColorList,
            valuesList: $switchPointColorValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 20, max: 100 })
          Divider()
            .color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 20, max: 100 })
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