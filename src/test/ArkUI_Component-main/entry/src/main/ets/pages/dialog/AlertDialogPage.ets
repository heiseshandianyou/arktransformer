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
struct AlertDialogPage {
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

  //gridCount 弹窗容器宽度所占用栅格数
  @State gridCount: number = 6

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'AlertDialog 警告弹窗' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: false })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('AlertDialogParamWithConfirm')
          .fontSize(16)
          .height(40)
          .padding(8)
          .backgroundColor($r('app.color.start_window_background'))
          .borderRadius(8)
          .margin({ bottom: 30 })
          .onClick(() => {
            AlertDialog.show({
              title: 'Title',
              message: 'AlertDialogParamWithConfirm',
              autoCancel: this.autoCancel,
              alignment: this.alignment,
              offset: { dx: this.offset_dx, dy: this.offset_dy },
              gridCount: this.gridCount,
              confirm: {
                value: 'confirm',
                action: () => {
                }
              }
            })
          })

        Text('AlertDialogParamWithButtons')
          .fontSize(16)
          .height(40)
          .padding(8)
          .backgroundColor($r('app.color.start_window_background'))
          .borderRadius(8)
          .onClick(() => {
            AlertDialog.show({
              title: 'Title',
              message: 'AlertDialogParamWithButtons',
              autoCancel: this.autoCancel,
              alignment: this.alignment,
              offset: { dx: this.offset_dx, dy: this.offset_dy },
              gridCount: this.gridCount,
              primaryButton: {
                value: 'primaryButton',
                action: () => {
                }
              },
              secondaryButton: {
                value: 'secondaryButton',
                action: () => {
                }
              }
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
          CustomSlider({ name: 'offset_dx', value: $offset_dx, min: -200, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'offset_dy', value: $offset_dy, min: -200, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'gridCount', value: $gridCount, min: 2, max: 8 })
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