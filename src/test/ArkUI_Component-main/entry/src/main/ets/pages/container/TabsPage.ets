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
struct TabsPage {
  @State selectTab: number = 0

  // barPosition 页签位置
  @State barPosition: BarPosition = BarPosition.Start
  @State barPositionList: BarPosition[] = [
  BarPosition.Start,
  BarPosition.End
  ]
  @State barPositionValueList: Array<ValueObject> = [
    { value: 'Start' },
    { value: 'End' }
  ]

  // vertical Tab方向
  @State vertical: boolean = false

  // scrollable 设置为true时可以通过滑动页面进行页面切换，为false时不可滑动切换页面
  @State scrollable: boolean = true

  // barMode TabBar布局模式
  @State barMode: BarMode = BarMode.Scrollable
  @State barModeList: BarMode[] = [
  BarMode.Scrollable,
  BarMode.Fixed
  ]
  @State barModeValueList: Array<ValueObject> = [
    { value: 'Scrollable' },
    { value: 'Fixed' }
  ]

  // barWidth TabBar的宽度值
  @State barWidth: number = 120

  // barHeight TabBar的高度值
  @State barHeight: number = 60

  // animationDuration 切换TabContent的动画时长
  @State animationDuration: number = 300

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Tabs 页签' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Tabs({ barPosition: this.barPosition }) {
          TabContent() {
            Column() {
              Text('01').fontColor(Color.Gray).fontSize(24)
            }
            .justifyContent(FlexAlign.Center)
            .backgroundColor(Color.Yellow)
            .width('100%')
            .height('100%')
          }.tabBar('01')

          TabContent() {
            Column() {
              Text('02').fontColor(Color.Gray).fontSize(24)
            }
            .justifyContent(FlexAlign.Center)
            .backgroundColor(Color.Pink)
            .width('100%')
            .height('100%')
          }.tabBar('02')

          TabContent() {
            Column() {
              Text('03').fontColor(Color.Gray).fontSize(24)
            }
            .justifyContent(FlexAlign.Center)
            .backgroundColor(Color.Orange)
            .width('100%')
            .height('100%')
          }.tabBar('03')
        }
        .backgroundColor(Color.White)
        .width(this.widthValue)
        .height(this.heightValue)
        .vertical(this.vertical)
        .scrollable(this.scrollable)
        .barMode(this.barMode)
        .barWidth(this.barWidth)
        .barHeight(this.barHeight)
        .animationDuration(this.animationDuration)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSelect({
            name: 'barPosition',
            selectItem: $barPosition,
            itemsList: $barPositionList,
            valuesList: $barPositionValueList
          })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'vertical', isOn: $vertical })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'scrollable', isOn: $scrollable })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'barMode',
            selectItem: $barMode,
            itemsList: $barModeList,
            valuesList: $barModeValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $barWidth, name: 'barWidth', min: 40, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $barHeight, name: 'barHeight', min: 40, max: 200 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $animationDuration, name: 'animationDu', min: 100, max: 999 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 100, max: 300 })
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