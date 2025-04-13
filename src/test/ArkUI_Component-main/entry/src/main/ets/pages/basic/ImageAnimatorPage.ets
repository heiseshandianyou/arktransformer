/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSwitch from '../../component/controller/CustomSwitch'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct ImageAnimatorPage {
  @State selectTab: number = 1

  // images 设置图片帧信息集合
  private images: ImageFrameInfo[] = [
    { src: $r('app.media.stack01') },
    { src: $r('app.media.stack02') },
    { src: $r('app.media.stack03') },
    { src: $r('app.media.stack04') },
    { src: $r('app.media.stack05') },
    { src: $r('app.media.stack06') },
    { src: $r('app.media.stack07') },
    { src: $r('app.media.stack08') },
    { src: $r('app.media.stack09') },
    { src: $r('app.media.stack10') },
    { src: $r('app.media.stack11') },
    { src: $r('app.media.stack12') }
  ]

  // state 默认为初始状态，用于控制播放状态
  @State selectState: AnimationStatus = AnimationStatus.Initial
  @State stateList: AnimationStatus[] = [
  AnimationStatus.Initial,
  AnimationStatus.Running,
  AnimationStatus.Paused,
  AnimationStatus.Stopped
  ]
  @State stateValueList: Array<ValueObject> = [
    { value: 'Initial' },
    { value: 'Running' },
    { value: 'Paused' },
    { value: 'Stopped' }
  ]

  // duration 动画播放时长
  @State duration: number = 1000

  // reverse 播放顺序
  @State reverse: boolean = false

  // fillMode 开始前和结束后的状态
  @State selectFillMode: FillMode = FillMode.None
  @State fillModeList: FillMode[] = [
  FillMode.None,
  FillMode.Forwards,
  FillMode.Backwards,
  FillMode.Both,
  ]
  @State fillModeValueList: Array<ValueObject> = [
    { value: 'None' },
    { value: 'Forwards' },
    { value: 'Backwards' },
    { value: 'Both' }
  ]

  // iterations 播放次数，-1时无限次播放
  @State iterations: number = 1

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'ImageAnimator 帧动画' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        ImageAnimator()
          .images(this.images)
          .width(this.widthValue)
          .height(this.heightValue)
          .state(this.selectState)
          .duration(this.duration)
          .reverse(this.reverse)
          .fillMode(this.selectFillMode)
          .iterations(this.iterations)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'state',
            selectItem: $selectState,
            itemsList: $stateList,
            valuesList: $stateValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSlider({ name: 'duration', min: 100, max: 4000, value: $duration })
          Divider().color($r('app.color.line_grey'))
          CustomSwitch({ name: 'reverse', isOn: $reverse })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'fillMode',
            selectItem: $selectFillMode,
            itemsList: $fillModeList,
            valuesList: $fillModeValueList
          })
          CustomSlider({ name: 'iterations', value: $iterations, min: -1, max: 3 })
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
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.background_grey'))

  }
}

