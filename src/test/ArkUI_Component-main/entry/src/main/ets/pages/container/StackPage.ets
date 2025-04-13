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
struct StackPage {
  @State selectTab: number = 1
  // alignContent 子组件在容器内的对齐方式
  @State alignContent: Alignment = Alignment.Center
  @State alignContentList: Alignment[] = [
  Alignment.Center,
  Alignment.Start,
  Alignment.End,
  Alignment.TopStart,
  Alignment.Top,
  Alignment.TopEnd,
  Alignment.BottomStart,
  Alignment.Bottom,
  Alignment.BottomEnd
  ]
  @State alignContentValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' },
    { value: 'TopStart' },
    { value: 'Top' },
    { value: 'TopEnd' },
    { value: 'BottomStart' },
    { value: 'Bottom' },
    { value: 'BottomEnd' },
  ]
  // width 宽度通用属性
  @State widthValue: number = 200
  // height 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Stack 堆叠容器' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Stack({ alignContent: this.alignContent }) {
          Column() {
          }
          .width('90%')
          .height('100%')
          .backgroundColor($r('app.color.start_window_background'))

          Column() {
          }
          .width('50%')
          .height('50%')
          .backgroundColor($r('app.color.brand'))
        }
        .width(this.widthValue)
        .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'alignContent',
            selectItem: $alignContent,
            itemsList: $alignContentList,
            valuesList: $alignContentValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 10, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 300 })
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