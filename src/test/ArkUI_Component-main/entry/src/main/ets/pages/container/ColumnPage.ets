/*
 * @author 鼓捣JIA
 * @date 2024/2/25 15:57
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSlider from '../../component/controller/CustomSlider'
import CustomSelect from '../../component/controller/CustomSelect'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct ColumnPage {
  @State selectTab: number = 0

  // space 布局元素方向间距
  @State space: number = 10

  // alignItems 交叉轴对齐方式
  @State alignItems: HorizontalAlign = HorizontalAlign.Center
  @State alignItemsList: HorizontalAlign[] = [
  HorizontalAlign.Center,
  HorizontalAlign.Start,
  HorizontalAlign.End
  ]
  @State alignItemsValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' },
  ]

  // justifyContent 主轴对齐方式
  @State justifyContent: FlexAlign = FlexAlign.Center
  @State justifyContentList: FlexAlign[] = [
  FlexAlign.Center,
  FlexAlign.Start,
  FlexAlign.End,
  FlexAlign.SpaceBetween,
  FlexAlign.SpaceAround,
  FlexAlign.SpaceEvenly
  ]
  @State justifyContentValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' },
    { value: 'SpaceBetween' },
    { value: 'SpaceAround' },
    { value: 'SpaceEvenly' },
  ]

  // width 宽度通用属性
  @State widthValue: number = 200

  // height 高度通用属性
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Column 垂直布局' })
        TitleTab({ selectTab: $selectTab, interface: true, property: true, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Column({ space: this.space }) {
          Text('元素1')
            .fontColor($r('app.color.font_normal'))
          Text('元素2')
            .fontColor($r('app.color.font_normal'))
          Text('元素3')
            .fontColor($r('app.color.font_normal'))
        }
        .alignItems(this.alignItems)
        .justifyContent(this.justifyContent)
        .backgroundColor($r('app.color.start_window_background'))
        .width(this.widthValue)
        .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSlider({ name: 'space', value: $space, min: 0, max: 50 })
        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

        // 组件属性 tab
        Column() {
          CustomSelect({
            name: 'alignItems',
            selectItem: $alignItems,
            itemsList: $alignItemsList,
            valuesList: $alignItemsValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'justifyContent',
            selectItem: $justifyContent,
            itemsList: $justifyContentList,
            valuesList: $justifyContentValueList
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ value: $widthValue, name: 'width', min: 10, max: 300 })
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