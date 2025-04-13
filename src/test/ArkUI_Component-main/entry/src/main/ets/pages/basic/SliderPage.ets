/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct SliderPage {
  @State selectTab: number = 0

  // value 当前进度值
  @State value: number = 50

  // step 滑动步长
  @State step: number = 1

  // style 滑块与滑轨显示样式
  @State style: SliderStyle = SliderStyle.OutSet
  @State styleList: SliderStyle[] = [
  SliderStyle.OutSet,
  SliderStyle.InSet
  ]
  @State styleValueList: Array<ValueObject> = [
    { value: 'OutSet' },
    { value: 'InSet' }
  ]

  // direction 滑动条方向
  @State direct: Axis = Axis.Horizontal
  @State directList: Axis[] = [
  Axis.Horizontal,
  Axis.Vertical
  ]
  @State directValueList: Array<ValueObject> = [
    { value: 'Horizontal' },
    { value: 'Vertical' }
  ]

  // reverse 反向
  @State reverse: boolean = false

  // blockColor 滑块的颜色
  @State blockColor: Color = Color.White
  @State blockColorList: Color[] = [
  Color.White,
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State blockColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]
  // trackColor 滑轨颜色
  @State trackColor: Color = Color.White
  @State trackColorList: Color[] = [
  Color.White,
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State trackColorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // selectedColor 已滑动部分滑轨颜色
  @State selectedColor: Color = Color.Blue
  @State selectedColorList: Color[] = [
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State selectedColorValueList: Array<ValueObject> = [
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // showSteps 展示步长刻度值
  @State showSteps: boolean = false

  // showTips 是否显示百分比气泡
  @State showTips: boolean = false

  // trackThickness 滑轨粗细
  @State trackThickness: number = 4

  // width 通用宽度属性
  @State widthValue: number = 200

  // height 通用高度属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Slider 滑动条' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Slider({
          value: this.value,
          step: this.step,
          style: this.style,
          direction: this.direct,
          reverse: this.reverse
        })
          .width(this.widthValue)
          .height(this.heightValue)
          .blockColor(this.blockColor)
          .trackColor(this.trackColor)
          .selectedColor(this.selectedColor)
          .showSteps(this.showSteps)
          .showTips(this.showTips)
          .trackThickness(this.trackThickness)
          .onChange((value: number, _) => {
            this.value = value
          })
        Text(`value : ${Math.floor(this.value)}`)
          .fontColor($r('app.color.font_normal'))
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ name: 'step', value: $step, min: 1, max: 10 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'style',
            selectItem: $style,
            itemsList: $styleList,
            valuesList: $styleValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'direction',
            selectItem: $direct,
            itemsList: $directList,
            valuesList: $directValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'reverse', isOn: $reverse })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'blockColor',
            selectItem: $blockColor,
            itemsList: $blockColorList,
            valuesList: $blockColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'trackColor',
            selectItem: $trackColor,
            itemsList: $trackColorList,
            valuesList: $trackColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'selectedColor',
            selectItem: $selectedColor,
            itemsList: $selectedColorList,
            valuesList: $selectedColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'showSteps', isOn: $showSteps })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'showTips', isOn: $showTips })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'trackThickness', value: $trackThickness, min: 1, max: 20 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 100, max: 300 })
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