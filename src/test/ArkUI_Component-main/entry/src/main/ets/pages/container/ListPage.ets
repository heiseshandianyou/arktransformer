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
struct ListPage {
  @State selectTab: number = 0
  //element
  @State @Watch('onNumberChange') listNumber: number = 3
  @State listValue: string[] = ['1', '2', '3']

  onNumberChange() {
    this.listValue = []
    for (let index = 0; index < this.listNumber; index++) {
      this.listValue[index] = (index + 1).toString()
    }
  }

  // space 子组件主轴方向的间隔
  @State space: number = 0
  // listDirection List组件排列方向
  @State listDirection: Axis = Axis.Vertical
  @State listDirectionList: Axis[] = [
  Axis.Vertical,
  Axis.Horizontal
  ]
  @State listDirectionValueList: Array<ValueObject> = [
    { value: 'Vertical' },
    { value: 'Horizontal' }
  ]

  // width 宽度通用属性
  @State widthValue: number = 200
  // height 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'List 列表' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
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

        List({ space: this.space }) {
          ForEach(this.listValue, (value: string) => {
            ListItem() {
              Row() {
                Text('listItem').fontColor($r('app.color.start_window_background'))
                Blank()
                Text(value).fontColor($r('app.color.start_window_background'))
              }
              .backgroundColor($r('app.color.brand'))
              .padding(4)
              .width('100%')
            }
          })
        }
        .listDirection(this.listDirection)
        .width(this.widthValue)
        .height(this.heightValue)
        .backgroundColor($r('app.color.start_window_background'))
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ name: 'space', value: $space, min: 0, max: 30 })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'listDirection',
            selectItem: $listDirection,
            itemsList: $listDirectionList,
            valuesList: $listDirectionValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 50, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 50, max: 300 })
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