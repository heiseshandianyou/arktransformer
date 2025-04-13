/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct ActionSheetPage {
  @State selectTab: number = 1

  // autoCancel 点击遮障层时，是否关闭弹窗
  @State autoCancel: boolean = true

  // alignment 弹窗在竖直方向上的对齐方式
  @State alignment: DialogAlignment = DialogAlignment.Default
  @State alignmentList: DialogAlignment[] = [
  DialogAlignment.Default,
  DialogAlignment.TopStart,
  DialogAlignment.Top,
  DialogAlignment.TopEnd,
  DialogAlignment.CenterStart,
  DialogAlignment.Center,
  DialogAlignment.CenterEnd,
  DialogAlignment.BottomStart,
  DialogAlignment.Bottom,
  DialogAlignment.BottomEnd,
  ]
  @State alignmentValueList: Array<ValueObject> = [
    { value: 'Default' },
    { value: 'TopStart' },
    { value: 'Top' },
    { value: 'TopEnd' },
    { value: 'CenterStart' },
    { value: 'Center' },
    { value: 'CenterEnd' },
    { value: 'BottomStart' },
    { value: 'Bottom' },
    { value: 'BottomEnd' },
  ]

  // offset 弹窗相对alignment所在位置的偏移量
  @State offset_dx: number = 0
  @State offset_dy: number = 0

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'ActionSheet 列表选择弹窗' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: false })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('Show ActionSheet')
          .fontSize(16)
          .height(40)
          .padding(8)
          .backgroundColor($r('app.color.start_window_background'))
          .borderRadius(8)
          .margin({ bottom: 30 })
          .onClick(() => {
            ActionSheet.show({
              title: 'title',
              message: 'ActionSheet',
              sheets: [
                { title: 'sheet 1',
                  action: () => {
                  }
                },
                { title: 'sheet 2',
                  action: () => {
                  }
                },
                { title: 'sheet 3',
                  action: () => {
                  }
                }
              ],
              autoCancel: this.autoCancel,
              alignment: this.alignment,
              offset: { dx: this.offset_dx, dy: this.offset_dy }
            })
          })


      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'autoCancel', isOn: $autoCancel })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'alignment',
            selectItem: $alignment,
            itemsList: $alignmentList,
            valuesList: $alignmentValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'offset_dx', value: $offset_dx, min: -100, max: 100 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'offset_dy', value: $offset_dy, min: -100, max: 100 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

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