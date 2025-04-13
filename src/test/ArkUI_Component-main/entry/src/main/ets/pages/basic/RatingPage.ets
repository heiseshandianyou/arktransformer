/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSwitch from '../../component/controller/CustomSwitch'

@Entry
@Component
struct RatingPage {
  @State selectTab: number = 0

  // rating 评分值
  @State rating: number = 4.5

  // indicator 设置评分组件作为指示器使用，不可改变评分
  @State indicator: boolean = false

  // stepSize 操作评级的步长
  @State stepSize: number = 1

  // width 宽度通用属性
  @State widthValue: number = 200

  // height 高度通用属性
  @State heightValue: number = 100

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Rating 评分' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Rating({ rating: this.rating, indicator: this.indicator })
          .width(this.widthValue)
          .height(this.heightValue)
          .stepSize(this.stepSize)
          .onChange((value: number) => {
            this.rating = value
          })
        Text(`评分${this.rating}`)
          .margin({ top: 20 })
          .fontColor($r('app.color.font_normal'))
      }
      // 组件配置区---------------------------------------------------------------------
      Blank()
      Column() {
        // 接口参数
        Column() {
          CustomSwitch({ name: 'indicator', isOn: $indicator })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)
        // 组件属性 tab
        Column() {
          CustomSlider({ name: 'stepSize', value: $stepSize, min: 0.1, max: 2 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)
        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 300 })
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