/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSwitch from '../../component/controller/CustomSwitch'

@Entry
@Component
struct SwiperPage {
  @State selectTab: number = 1
  private swiperController: SwiperController = new SwiperController()
  private listValue: string[] = ['1', '2', '3', '4', '5']

  // autoPlay 自动播放
  @State autoPlay: boolean = false

  // interval 自动播放时播放的时间间隔
  @State interval: number = 3000

  // indicator 是否启用导航点指示器
  @State indicator: boolean = true

  // loop 是否开启循环
  @State loop: boolean = true

  // vertical 是否纵向滑动
  @State vertical: boolean = false

  // itemSpace 子元素间距
  @State itemSpace: number = 0

  // disableSwipe 组件滑动切换功能
  @State disableSwipe: boolean = false

  // width 宽度通用属性
  @State widthValue: number = 200

  // height 高度通用属性
  @State heightValue: number = 140

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Swiper 滑块视图' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }

      Blank()
      // 组件预览区---------------------------------------------------------------------
      Column() {
        Swiper(this.swiperController) {
          ForEach(this.listValue, (value: string) => {
            Row() {
              Text('item').fontColor($r('app.color.start_window_background'))
              Text(value).fontColor($r('app.color.start_window_background'))
            }
            .justifyContent(FlexAlign.Center)
            .backgroundColor($r('app.color.brand'))
            .padding(4)
          })
        }
        .autoPlay(this.autoPlay)
        .interval(this.interval)
        .indicator(this.indicator)
        .loop(this.loop)
        .vertical(this.vertical)
        .itemSpace(this.itemSpace)
        .disableSwipe(this.disableSwipe)
        .width(this.widthValue)
        .height(this.heightValue)

        Row({ space: 20 }) {
          Button('Previous').backgroundColor($r('app.color.brand'))
            .onClick(() => {
              this.swiperController.showPrevious()
            })
          Button('Next').backgroundColor($r('app.color.brand'))
            .onClick(() => {
              this.swiperController.showNext()
            })
        }
        .margin({ top: 20 })
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSwitch({ name: 'autoPlay', isOn: $autoPlay })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'interval', value: $interval, min: 1000, max: 4000 })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'indicator', isOn: $indicator })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'loop', isOn: $loop })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'vertical', isOn: $vertical })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'disableSwipe', isOn: $disableSwipe })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 50, max: 300 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $heightValue, name: 'height', min: 50, max: 200 })
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