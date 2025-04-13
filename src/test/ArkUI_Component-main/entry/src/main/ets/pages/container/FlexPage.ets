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
struct FlexPage {
  @State selectTab: number = 0

  // direction 主轴方向 子组件在Flex容器上排列的方向
  @State direct: FlexDirection = FlexDirection.Row
  @State directList: FlexDirection[] = [
  FlexDirection.Row,
  FlexDirection.RowReverse,
  FlexDirection.Column,
  FlexDirection.ColumnReverse,
  ]
  @State directValueList: Array<ValueObject> = [
    { value: 'Row' },
    { value: 'RowReverse' },
    { value: 'Column' },
    { value: 'ColumnReverse' }
  ]

  // wrap Flex容器是单行/列还是多行/列排列
  @State wrap: FlexWrap = FlexWrap.NoWrap
  @State wrapList: FlexWrap[] = [
  FlexWrap.NoWrap,
  FlexWrap.Wrap,
  FlexWrap.WrapReverse
  ]
  @State wrapValueList: Array<ValueObject> = [
    { value: 'NoWrap' },
    { value: 'Wrap' },
    { value: 'WrapReverse' }
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

  // alignItems 交叉轴对齐方式
  @State alignItems: ItemAlign = ItemAlign.Center
  @State alignItemsList: ItemAlign[] = [
  ItemAlign.Center,
  ItemAlign.Start,
  ItemAlign.End,
  ItemAlign.Auto,
  ItemAlign.Stretch,
  ItemAlign.Baseline
  ]
  @State alignItemsValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' },
    { value: 'Auto' },
    { value: 'Stretch' },
    { value: 'Baseline' }
  ]

  // alignContent 交叉轴中有额外的空间时，多行内容的对齐方式
  @State alignContent: FlexAlign = FlexAlign.Center
  @State alignContentList: FlexAlign[] = [
  FlexAlign.Center,
  FlexAlign.Start,
  FlexAlign.End,
  FlexAlign.SpaceBetween,
  FlexAlign.SpaceAround,
  FlexAlign.SpaceEvenly
  ]
  @State alignContentValueList: Array<ValueObject> = [
    { value: 'Center' },
    { value: 'Start' },
    { value: 'End' },
    { value: 'SpaceBetween' },
    { value: 'SpaceAround' },
    { value: 'SpaceEvenly' },
  ]

  // width 宽度通用组件
  @State widthValue: number = 200

  // height 高度通用组件
  @State heightValue: number = 200

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'Flex 弹性布局' })
        TitleTab({ selectTab: $selectTab, interface: true, property: false, common: true })
      }
      // 组件预览区---------------------------------------------------------------------
      Blank()
      Column() {
        Flex({
          direction: this.direct,
          wrap: this.wrap,
          justifyContent: this.justifyContent,
          alignItems: this.alignItems,
          alignContent: this.alignContent
        }) {
          Text('元素1')
            .fontColor($r('app.color.font_normal'))
          Text('元素2')
            .fontColor($r('app.color.font_normal'))
          Text('元素3')
            .fontColor($r('app.color.font_normal'))
        }
        .backgroundColor($r('app.color.start_window_background'))
        .width(this.widthValue)
        .height(this.heightValue)
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 接口参数 tab
        Column() {
          CustomSelect({
            name: 'direction',
            selectItem: $direct,
            itemsList: $directList,
            valuesList: $directValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'wrap',
            selectItem: $wrap,
            itemsList: $wrapList,
            valuesList: $wrapValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'justifyContent',
            selectItem: $justifyContent,
            itemsList: $justifyContentList,
            valuesList: $justifyContentValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'alignItems',
            selectItem: $alignItems,
            itemsList: $alignItemsList,
            valuesList: $alignItemsValueList
          })
          Divider().color($r('app.color.line_grey'))
          CustomSelect({
            name: 'alignContent',
            selectItem: $alignContent,
            itemsList: $alignContentList,
            valuesList: $alignContentValueList
          })

        }
        .visibility(this.selectTab === 0 ? Visibility.Visible : Visibility.None)

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