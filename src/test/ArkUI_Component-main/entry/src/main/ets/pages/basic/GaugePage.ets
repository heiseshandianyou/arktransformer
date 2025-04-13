/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'

@Entry
@Component
struct GaugePage {
  @State selectTab: number = 0

  // interface 接口
  @State value: number = 50 // 量规图的当前数据值，即图中指针指向位置。用于组件创建时量规图初始值的预置。
  @State min: number = 0 // 当前数据段最小值。
  @State max: number = 100 // 当前数据段最大值。

  // prop 属性
  @State propValue: number = 75 // 设置量规图的数据值，可用于动态修改量规图的数据值。
  @State startAngle: number = 0 // 设置起始角度位置，时钟0点为0度，顺时针方向为正角度。
  @State endAngle: number = 360 // 设置终止角度位置，时钟0点为0度，顺时针方向为正角度。

  //strokeWidth 设置环形量规图的环形厚度。
  @State strokeWidth: number = 4

  //width 宽度通用属性
  @State widthValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Gauge 量规图表' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        Gauge({ value: this.value, min: this.min, max: this.max })
          .value(this.propValue)
          .startAngle(this.startAngle)
          .endAngle(this.endAngle)
          .colors([[Color.Black, 20], [Color.Blue, 20], [Color.Red, 20], [Color.Green, 20]])
          .strokeWidth(this.strokeWidth)
          .width(this.widthValue)

      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ value: $min, name: 'min', min: 0, max: 100 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $max, name: 'max', min: 0, max: 100 })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)


        // 组件属性 tab
        Column() {
          CustomSlider({ value: $propValue, name: 'value', min: 0, max: 100 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $startAngle, name: 'startAngle', min: 0, max: 360 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $endAngle, name: 'endAngle', min: 0, max: 360 })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ value: $strokeWidth, name: 'strokeWidth', min: 1, max: 30 })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)


        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 100, max: 350 })
        }
        .visibility(this.selectTab === 2 ? Visibility.Visible : Visibility.None)

      }
      .padding({ left: 12, right: 12 })
      .backgroundColor($r('app.color.start_window_background'))
      .margin({ left: 20, right: 20, top: 16, bottom: 16 })
      .borderRadius(16)

    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_grey'))

  }
}

