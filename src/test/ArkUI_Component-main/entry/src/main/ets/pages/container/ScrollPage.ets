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
struct ScrollPage {
  @State selectTab: number = 1

  // element
  @State @Watch('onNumberChange') listNumber: number = 5
  @State listValue: string[] = ['1', '2', '3', '4', '5']

  onNumberChange() {
    this.listValue = []
    for (let index = 0; index < this.listNumber; index++) {
      this.listValue[index] = (index + 1).toString()
    }
  }

  // scrollBarColor 滚动条的颜色
  @State scrollBarColor: Color = Color.Blue
  @State scrollBarColorList: Color[] = [
  Color.Blue,
  Color.Black,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State scrollBarColorValueList: Array<ValueObject> = [
    { value: 'Blue' },
    { value: 'Black' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]

  // scrollBarWidth 滚动条的宽度
  @State scrollBarWidth: number = 4

  // edgeEffect 滑动效果
  @State edgeEffect: EdgeEffect = EdgeEffect.None
  @State edgeEffectList: EdgeEffect[] = [
  EdgeEffect.None,
  EdgeEffect.Spring,
  EdgeEffect.Fade
  ]
  @State edgeEffectValueList: Array<ValueObject> = [
    { value: 'None' },
    { value: 'Spring' },
    { value: 'Fade' },
  ]

  // width 宽度通用属性
  @State widthValue: number = 200

  // height 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Scroll 滚动容器' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Counter() {
          Text(this.listNumber.toString())
            .fontColor($r('app.color.font_normal'))
        }.onInc(() => {
          this.listNumber++
        })
        .onDec(() => {
          if (this.listNumber > 0) {
            this.listNumber--
          }
        })
        .margin({ bottom: 15 })

        Scroll() {
          List({ space: 5 }) {
            ForEach(this.listValue, (value: string) => {
              ListItem() {
                Row() {
                  Text('listItem').fontColor($r('app.color.start_window_background'))
                  Blank()
                  Text(value).fontColor($r('app.color.start_window_background'))
                }
                .backgroundColor($r('app.color.brand'))
                .padding(4)
                .height(40)
                .width('100%')
              }
            })
          }
        }
        .width(this.widthValue)
        .height(this.heightValue)
        .backgroundColor($r('app.color.start_window_background'))
        .scrollBarColor(this.scrollBarColor)
        .scrollBarWidth(this.scrollBarWidth)
        .edgeEffect(this.edgeEffect)

      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'scrollBarColor',
            selectItem: $scrollBarColor,
            itemsList: $scrollBarColorList,
            valuesList: $scrollBarColorValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'scrollBarWidth', value: $scrollBarWidth, min: 1, max: 20 })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'edgeEffect',
            selectItem: $edgeEffect,
            itemsList: $edgeEffectList,
            valuesList: $edgeEffectValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 200, max: 350 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 350 })
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