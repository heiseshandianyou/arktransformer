/*
 * @author 鼓捣JIA
 * @date 2023/12/03 23:35
 */

import ValueObject from '../../bean/common/ValueObject'

@Component
export default struct CustomSelect {
  @Prop name: string
  @Link valuesList: Array<ValueObject>
  @Link itemsList: Array<Object>
  @Link selectItem: Object

  build() {
    Column() {
      Row() {
        Text(this.name)
          .fontColor($r('app.color.font_main'))
        Blank()
        Select(this.valuesList)
          .fontColor($r('app.color.font_normal'))
          .value(this.valuesList[0].value)
          .onSelect((index: number, _) => {
            this.selectItem = this.itemsList[index]
          })
      }
      .width('100%')
      .height(50)
    }
    .width('100%')
  }
}

