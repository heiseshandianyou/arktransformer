/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSwitch from '../../component/controller/CustomSwitch'

@Entry
@Component
struct PanelPage {
  @State selectTab: number = 0

  // show 控制Panel显示或隐藏
  @State show: boolean = false

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Panel 滑动面板' })
        TitleTab({ selectTab: $selectTab, interface: true, property: false, common: false })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        CustomSwitch({ name: 'show', isOn: $show })
          .width(100)
        Panel(this.show) {
          Column() {
            Text('Panel 容器')
              .fontColor($r('app.color.font_light'))
          }
        }
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 空
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