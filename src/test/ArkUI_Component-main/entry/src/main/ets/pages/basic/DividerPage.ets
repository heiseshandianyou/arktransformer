/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct DividerPage {
  @State selectTab: number = 1

  // vertical 是否竖向展示
  @State vertical: boolean = false

  // color 分割线颜色
  @State selectColor: Color = Color.Black
  @State colorList: Color[] = [Color.Black, Color.Blue, Color.Brown, Color.Green, Color.Orange, Color.Grey]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // strokeWidth 分割线宽度
  @State strokeWidth: number = 1

  // lineCap 分割线的端点样式
  @State selectLineCap: LineCapStyle = LineCapStyle.Butt
  @State lineCapList: LineCapStyle[] = [LineCapStyle.Butt, LineCapStyle.Round, LineCapStyle.Square]
  @State lineCapValueList: Array<ValueObject> = [{ value: 'Butt' }, { value: 'Round' }, { value: 'Square' }]

  // width 通用宽度属性
  @State widthValue: number = 200

  // height 通用高度属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Divider 分隔器' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        Divider()
          .width(this.widthValue)
          .height(this.heightValue)
          .vertical(this.vertical)
          .color(this.selectColor)
          .strokeWidth(this.strokeWidth)
          .lineCap(this.selectLineCap)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'vertical', isOn: $vertical })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'color',
            valuesList: $colorValueList,
            itemsList: $colorList,
            selectItem: $selectColor
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'strokeWidth', value: $strokeWidth, min: 1, max: 10 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'lineCap',
            valuesList: $lineCapValueList,
            itemsList: $lineCapList,
            selectItem: $selectLineCap
          })

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
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_grey'))
  }
}

