/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'

@CustomDialog
struct CustomDialogExample {
  controller: CustomDialogController
  cancel?: () => void
  confirm?: () => void

  build() {
    Column() {
      Text('自定义弹窗')
        .fontColor($r('app.color.font_light'))
      Text('关闭')
        .fontColor($r('app.color.brand'))
        .onClick(() => {
          this.controller.close()
        })
    }
    .width(200)
    .height(100)
    .justifyContent(FlexAlign.SpaceAround)
    .backgroundColor(Color.White)
  }
}

@Entry
@Component
struct CustomDialogPage {
  @State selectTab: number = 1
  dialogController: CustomDialogController = new CustomDialogController({
    builder: CustomDialogExample({}),
    alignment: DialogAlignment.Bottom,
    offset: { dx: 0, dy: -20 },
  })

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'CustomDialog 自定义弹窗' })
        TitleTab({ selectTab: $selectTab, interface: false, property: false, common: false })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('CustomDialog')
          .fontSize(16)
          .height(40)
          .padding(8)
          .backgroundColor($r('app.color.start_window_background'))
          .borderRadius(8)
          .margin({ bottom: 30 })
          .onClick(() => {
            if (this.dialogController != undefined) {
              this.dialogController.open()
            }
          })
      }

      Blank()

      Column() {
        // 组件配置区---------------------------------------------------------------------
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

