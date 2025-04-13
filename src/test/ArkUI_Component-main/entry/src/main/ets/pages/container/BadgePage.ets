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
struct BadgePage {
  @State selectTab: number = 0

  // 提醒消息数
  private count: number = 1
  private value: string = '标记文本'
  @State badgePosition: BadgePosition = BadgePosition.RightTop
  @State badgePositionList: BadgePosition[] = [
  BadgePosition.RightTop,
  BadgePosition.Right,
  BadgePosition.Left
  ]
  @State badgePositionValueList: Array<ValueObject> = [
    { value: 'RightTop' },
    { value: 'Right' },
    { value: 'Left' }
  ]

  // Badge 组件文字颜色
  @State color: Color = Color.White
  @State colorList: Color[] = [
  Color.White,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State colorValueList: Array<ValueObject> = [
    { value: 'White' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // Badge 组件文字大小
  @State fontSize: number = 10

  // Badge 组件文字大小
  @State badgeSize: number = 16

  // Badge 组件背景颜色
  @State badgeColor: Color = Color.Red
  @State badgeColorList: Color[] = [
  Color.Red,
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State badgeColorValueList: Array<ValueObject> = [
    { value: 'Red' },
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // width 宽度通用属性
  @State widthValue: number = 115

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Badge 信息标记' })
        TitleTab({ selectTab: $selectTab, interface: true, property: false, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Badge({ count: this.count, position: this.badgePosition, style: {
          color: this.color,
          fontSize: this.fontSize,
          badgeSize: this.badgeSize,
          badgeColor: this.badgeColor
        } }) {
          Column() {
            Text('容器内文本')
              .fontColor($r('app.color.font_normal'))
          }
          .backgroundColor($r('app.color.start_window_background'))
          .padding({ top: 8, bottom: 8, right: 16, left: 16 })
          .borderRadius(4)
        }
        .width(this.widthValue)
        .margin({ bottom: 20 })

        Badge({ value: this.value, position: this.badgePosition, style: {
          color: this.color,
          fontSize: this.fontSize,
          badgeSize: this.badgeSize,
          badgeColor: this.badgeColor
        } }) {
          Column() {
            Text('容器内文本')
          }
          .backgroundColor($r('app.color.start_window_background'))
          .padding({ top: 8, bottom: 8, right: 16, left: 16 })
          .borderRadius(4)
        }
        .width(this.widthValue)

      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSelect({
            name: 'position',
            selectItem: $badgePosition,
            itemsList: $badgePositionList,
            valuesList: $badgePositionValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'color',
            selectItem: $color,
            itemsList: $colorList,
            valuesList: $colorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'fontSize', value: $fontSize, min: 6, max: 32 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'badgeSize', value: $badgeSize, min: 8, max: 32 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'badgeColor',
            selectItem: $badgeColor,
            itemsList: $badgeColorList,
            valuesList: $badgeColorValueList
          })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 20, max: 300 })
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