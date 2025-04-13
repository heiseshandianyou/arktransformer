/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct GridPage {
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

  // columnsGap 列与列的间距。
  @State columnsGap: number = 0

  // rowsGap 行与行的间距
  @State rowsGap: number = 0


  // width 宽度通用属性
  @State widthValue: number = 200

  // height 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Grid 网格容器' })
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

        Grid() {
          ForEach(this.listValue, (value: string) => {
            GridItem() {
              Text(value).fontColor($r('app.color.start_window_background'))
            }.backgroundColor($r('app.color.brand'))
          })
        }
        .columnsTemplate('1fr 1fr 1fr')
        .rowsTemplate('1fr 1fr 1fr')
        .columnsGap(this.columnsGap)
        .rowsGap(this.rowsGap)
        .width(this.widthValue)
        .height(this.heightValue)
        .backgroundColor($r('app.color.start_window_background'))
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSlider({ name: 'columnsGap', value: $columnsGap, min: 0, max: 30 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'rowsGap', value: $rowsGap, min: 0, max: 30 })
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