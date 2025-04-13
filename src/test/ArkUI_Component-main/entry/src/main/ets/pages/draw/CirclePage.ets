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
struct CirclePage {
  @State selectTab: number = 0

  // fill 填充区域颜色
  @State fill: Color = Color.White
  @State fillList: Color[] = [
  Color.White,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State fillValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // fillOpacity 填充区域透明度
  @State fillOpacity: number = 1


  // stroke 设置边框颜色，不设置时，默认没有边框
  @State stroke: Color = Color.White
  @State strokeList: Color[] = [
  Color.White,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State strokeValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // strokeOpacity 边框透明度
  @State strokeOpacity: number = 1

  //strokeWidth 边框宽度
  @State strokeWidth: number = 2

  // 宽度通用属性
  @State widthValue: number = 200

  // 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Circle 圆形' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Circle({ width: this.widthValue, height: this.heightValue })
          .fill(this.fill)
          .stroke(this.stroke)
          .fillOpacity(this.fillOpacity)
          .strokeOpacity(this.strokeOpacity)
          .strokeWidth(this.strokeWidth)
      }
      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 100, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'height', value: $heightValue, min: 100, max: 200 })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性tab
        Column() {
          CustomSelect({
            name: 'fill',
            selectItem: $fill,
            itemsList: $fillList,
            valuesList: $fillValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({
            name: 'fillOpacity',
            value: $fillOpacity,
            min: 0,
            max: 1,
            step: 0.1
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'stroke',
            selectItem: $stroke,
            itemsList: $strokeList,
            valuesList: $strokeValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({
            name: 'strokeOpacity',
            value: $strokeOpacity,
            min: 0,
            max: 1,
            step: 0.1
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'strokeWidth', value: $strokeWidth, min: 1, max: 10 })

        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 100, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'height', value: $heightValue, min: 100, max: 200 })
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