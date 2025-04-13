/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct RadioPage {
  @State selectTab: number = 2

  // width 宽度通用属性
  @State widthValue: number = 24

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Radio 单选框' })
        TitleTab({ selectTab: $selectTab, interface: false, property: false, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Row() {
          Radio({ value: 'Radio1', group: 'radioGroup' }).checked(true)
            .width(this.widthValue)
          Text('选项1')
            .fontColor($r('app.color.font_normal'))
        }

        Row() {
          Radio({ value: 'Radio2', group: 'radioGroup' }).checked(true)
            .width(this.widthValue)
          Text('选项2')
            .fontColor($r('app.color.font_normal'))
        }

        Row() {
          Radio({ value: 'Radio3', group: 'radioGroup' }).checked(true)
            .width(this.widthValue)
          Text('选项3')
            .fontColor($r('app.color.font_normal'))
        }
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 12, max: 48 })
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