/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct ImagePage {
  @State selectTab: number = 1

  // objectFit 填充效果
  @State selectObjectFit: ImageFit = ImageFit.Contain
  @State objectFitList: ImageFit[] = [
  ImageFit.Auto,
  ImageFit.Contain,
  ImageFit.Cover,
  ImageFit.Fill,
  ImageFit.ScaleDown,
  ImageFit.None
  ]
  @State objectFitValueList: Array<ValueObject> = [
    { value: 'Auto' },
    { value: 'Contain' },
    { value: 'Cover' },
    { value: 'Fill' },
    { value: 'ScaleDown' },
    { value: 'None' }
  ]

  // objectRepeat 重复样式
  @State selectObjectRepeat: ImageRepeat = ImageRepeat.NoRepeat
  @State objectRepeatList: ImageRepeat[] = [
  ImageRepeat.NoRepeat,
  ImageRepeat.X,
  ImageRepeat.Y,
  ImageRepeat.XY
  ]
  @State objectRepeatValueList: Array<ValueObject> = [
    { value: 'NoRepeat' },
    { value: 'X' },
    { value: 'Y' },
    { value: 'XY' }
  ]

  // renderMode 渲染模式
  @State selectRenderMode: ImageRenderMode = ImageRenderMode.Original
  @State renderModeList: ImageRenderMode[] = [
  ImageRenderMode.Original,
  ImageRenderMode.Template
  ]
  @State renderModeValueList: Array<ValueObject> = [
    { value: 'Original' },
    { value: 'Template' }
  ]

  // width 通用宽度属性
  @State widthValue: number = 300

  // height 通用高度属性
  @State heightValue: number = 300

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Image 图片' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Image($r('app.media.cat'))
          .sourceSize({ width: 200, height: 266 })
          .width(this.widthValue)
          .height(this.heightValue)
          .objectFit(this.selectObjectFit)
          .objectRepeat(this.selectObjectRepeat)
          .renderMode(this.selectRenderMode)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'objectFit',
            itemsList: $objectFitList,
            valuesList: $objectFitValueList,
            selectItem: $selectObjectFit
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'objectRepeat',
            itemsList: $objectRepeatList,
            valuesList: $objectRepeatValueList,
            selectItem: $selectObjectRepeat
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'renderMode',
            itemsList: $renderModeList,
            valuesList: $renderModeValueList,
            selectItem: $selectRenderMode
          })
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