/*
 * @author 鼓捣JIA
 * @date 2023/12/03 23:35
 */

@Component
export default struct CustomButton {
  @Prop name: string

  build() {
    Column() {
      Row() {
        Text(this.name)
          .fontColor($r('app.color.font_main'))
        Blank()
        Button(this.name)
          .backgroundColor($r('app.color.brand'))
      }
      .width('100%')
      .height(50)
    }
    .width('100%')
  }
}