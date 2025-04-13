/*
 * @author 鼓捣JIA
 * @date 2024/2/25 12:00
 */

import TitleTab from '../../component/title/TitleTab'
import Title from '../../component/title/Title'
import CustomSelect from '../../component/controller/CustomSelect'
import CustomSlider from '../../component/controller/CustomSlider'
import ValueObject from '../../bean/common/ValueObject'

@Entry
@Component
struct CheckboxPage {
  @State selectTab: number = 1

  // color 多选框选中颜色
  @State selectColor: Color = Color.Black
  @State colorList: Color[] = [
  Color.Black,
  Color.Blue,
  Color.Brown,
  Color.Green,
  Color.Orange,
  Color.Grey
  ]
  @State colorValueList: Array<ValueObject> = [
    { value: 'Black' },
    { value: 'Blue' },
    { value: 'Brown' },
    { value: 'Green' },
    { value: 'Orange' },
    { value: 'Grey' }
  ]
  // width 通用宽度属性
  @State widthValue: number = 24

  build() {
    Column() {
      // 导航栏---------------------------------------------------------------------
      Column() {
        Title({ pageTitle: 'CheckBox 多选框' })
        TitleTab({ selectTab: $selectTab, interface: false, property: true, common: true })
      }

      // 组件预览区 ---------------------------------------------------------------------
      Blank()
      Column() {
        Row() {
          Checkbox({ name: '123' })
            .selectedColor(this.selectColor)
            .width(this.widthValue)
          Text('选项1')
            .fontColor($r('app.color.font_normal'))
        }

        Row() {
          Checkbox({ name: '123' })
            .selectedColor(this.selectColor)
            .width(this.widthValue)
          Text('选项2')
            .fontColor($r('app.color.font_normal'))
        }

        Row() {
          Checkbox({ name: '123' })
            .selectedColor(this.selectColor)
            .width(this.widthValue)
          Text('选项3')
            .fontColor($r('app.color.font_normal'))
        }
      }

      Blank()
      // 组件配置区---------------------------------------------------------------------
      Column() {
        // 组件属性 tab
        Column() {
          CustomSelect({
            valuesList: $colorValueList,
            itemsList: $colorList,
            selectItem: $selectColor,
            name: 'color'
          })
        }
        .visibility(this.selectTab === 1 ? Visibility.Visible : Visibility.None)

        // 通用属性 tab
        Column() {
          CustomSlider({ name: 'width', value: $widthValue, min: 12, max: 48 })
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

