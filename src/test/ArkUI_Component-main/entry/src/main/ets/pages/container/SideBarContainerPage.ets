/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct SideBarContainerPage {
  @State selectTab: number = 0
  normalIcon: Resource = $r("app.media.ic_public_folder")
  selectedIcon: Resource = $r("app.media.ic_public_folder_filled")
  @State arr: number[] = [1, 2, 3]
  @State current: number = 1

  //--> interface
  // type 侧边栏的显示类型
  @State type: SideBarContainerType = SideBarContainerType.Embed
  @State typeList: SideBarContainerType[] = [
  SideBarContainerType.Embed,
  SideBarContainerType.Overlay
  ]
  @State typeValueList: Array<ValueObject> = [
    { value: 'Embed' },
    { value: 'Overlay' }
  ]
  //--> property
  // showSideBar 是否显示侧边栏
  @State showSideBar: boolean = true

  // showControlButton 是否显示控制按钮
  @State showControlButton: boolean = true

  // sideBarWidth 侧边栏的宽度
  @State sideBarWidth: number = 60

  // sideBarPosition 侧边栏显示位置
  @State sideBarPosition: SideBarPosition = SideBarPosition.Start
  @State sideBarPositionList: SideBarPosition[] = [
  SideBarPosition.Start,
  SideBarPosition.End
  ]
  @State sideBarPositionValueList: Array<ValueObject> = [
    { value: 'Start' },
    { value: 'End' }
  ]

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'SideBarContainer 侧边栏' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: false })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        SideBarContainer(this.type) {
          Column() {
            Column()
              .height(50)
            ForEach(this.arr, (item: number, _) => {
              Column({ space: 5 }) {
                Image(this.current === item ? this.selectedIcon : this.normalIcon)
                  .width(32)
                  .height(32)
                Text('0' + item)
                  .fontSize(14)
                  .fontColor(this.current === item ? Color.Black : Color.Gray)
                  .fontWeight(this.current === item ? 600 : 400)
              }
              .margin({ bottom: 12, top: 12 })
              .onClick(() => {
                this.current = item
              })
            })
          }
          .width('100%')
          .justifyContent(FlexAlign.Start)
          .backgroundColor($r('app.color.start_window_background'))

          Column() {
            Text('01 内容')
              .width('100%')
              .height(48)
              .fontColor($r('app.color.start_window_background'))
              .backgroundColor($r('app.color.brand'))
              .textAlign(TextAlign.Center)
              .fontSize(24)
              .visibility(this.current === 1 ? Visibility.Visible : Visibility.None)
            Text('02 内容')
              .width('100%')
              .height(48)
              .fontColor($r('app.color.start_window_background'))
              .backgroundColor(Color.Orange)
              .textAlign(TextAlign.Center)
              .fontSize(24)
              .visibility(this.current === 2 ? Visibility.Visible : Visibility.None)
            Text('03 内容')
              .width('100%')
              .height(48)
              .fontColor($r('app.color.start_window_background'))
              .backgroundColor(Color.Green)
              .textAlign(TextAlign.Center)
              .fontSize(24)
              .visibility(this.current === 3 ? Visibility.Visible : Visibility.None)

            // 组件配置区---------------------------------------------------------------------
            Column() {
              Column() {
                CustomSelect({
                  name: 'type',
                  selectItem: $type,
                  itemsList: $typeList,
                  valuesList: $typeValueList
                })
              }.visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

              Column() {
                CustomSwitch({ name: 'showSideBar', isOn: $showSideBar })
                Divider().color($r('app.color.line_grey'))
                CustomSwitch({ name: 'showControlButton', isOn: $showControlButton })
                Divider().color($r('app.color.line_grey'))
                CustomSlider({ name: 'sideBarWidth', value: $sideBarWidth, min: 50, max: 100 })
                Divider().color($r('app.color.line_grey'))
                CustomSelect({
                  name: 'sideBarPosition',
                  selectItem: $sideBarPosition,
                  itemsList: $sideBarPositionList,
                  valuesList: $sideBarPositionValueList
                })
              }.visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

            }
            .padding({ left: 12, right: 12 })
            .backgroundColor($r('app.color.start_window_background'))
            .margin({ left: 10, right: 10, top: 10, bottom: 10 })
            .borderRadius(16)
          }
        }
        .sideBarWidth(this.sideBarWidth)
        .minSideBarWidth(50)
        .maxSideBarWidth(300)
        .showSideBar(this.showSideBar)
        .showControlButton(this.showControlButton)
        .sideBarPosition(this.sideBarPosition)
        .controlButton({
          top: 12,
          left: 14,
          icons: {
            hidden: $r('app.media.ic_gallery_photoedit_more'),
            shown: $r('app.media.ic_gallery_photoedit_more'),
            switching: $r('app.media.ic_gallery_photoedit_more')
          }
        })
      }
    }
    .height('100%')
    .width('100%')
    .backgroundColor($r('app.color.background_grey'))
  }
}