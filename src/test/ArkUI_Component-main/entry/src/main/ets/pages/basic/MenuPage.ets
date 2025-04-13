/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct MenuPage {
  @State selectTab: number = 1
  private editIcon: Resource = $r('app.media.ic_gallery_photoedit_more')

  // fontSize 字体大小
  @State fontSize: number = 16

  // width 通用宽度属性
  @State widthValue: number = 150

  // height 通用高度属性
  @State heightValue: number = 150

  // 菜单构造器
  @Builder
  MyMenu() {
    Menu() {
      MenuItem({ startIcon: this.editIcon, content: '菜单名称1' })
      MenuItem({ startIcon: this.editIcon, content: '菜单名称2' })
      MenuItem({ startIcon: this.editIcon, content: '菜单名称3' })
    }
    .width(this.widthValue)
    .height(this.heightValue)
  }

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Menu 菜单' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Text('click to show menu')
          .fontSize(32)
          .fontWeight(FontWeight.Bold)
          .bindMenu(this.MyMenu())
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSlider({ value: $fontSize, name: 'fontSize', min: 10, max: 40 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)


        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 10, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 10, max: 200 })
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