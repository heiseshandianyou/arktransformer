import router from '@ohos.router'
@Entry
@Component
struct AddCity {

  @State AllCityCodeList: Array<number> = [110000,120000,130000,140000,150000,210000,220000,230000,310000,320000,330000,340000,350000,360000,370000,500000,410000,420000,530000,810000]
  @State AllCityNameList: Array<string> = ["北京市","天津市","河北省","山西省","内蒙古自治区","辽宁省","吉林省","黑龙江省","上海市","江苏省","浙江省","安徽省","福建省","江西省","山东省","重庆市","河南省","湖北省","云南省","香港市"]


  //接受数据
  @State cityCodeList:number[] = [110000,120000]
  @State cityNameList:string[] = ["北京市","天津市"]

  onPageShow(){
    let params = router.getParams()
    this.cityCodeList = params["codes"]
    this.cityNameList = params["names"]
  }
  build() {
    Column(){
      Row(){
        Text("添加城市列表").fontSize(35).fontColor(Color.White)
        Blank()
        Button("完成").fontSize(26).backgroundColor("")
      }.height("10%").width("95%")
      .onClick(()=>{
        router.back({
          url:"pages/Index",
          params:{
            codes:this.cityCodeList,
            names:this.cityNameList
          }

        })
      })
      Column(){
        List(){
          ForEach(this.AllCityNameList, (name:string)=>{
            ListItem(){
              if (this.cityNameList.includes(name)){
                Column(){
                  Row(){
                    Text(name).fontSize(35).fontColor(Color.White).width("60%")
                      .margin({top:20,left:20})
                    Text("已添加").backgroundColor("").fontSize(18)
                      .margin({top:5}).opacity(0.8)
                  }.width("100%")
                  Blank()
                  Divider().strokeWidth(5)
                }.height(90).width("100%").margin({top:20})
                .backgroundColor("#4682b4")
              }else{
                Column(){
                  Row(){
                    Text(name).fontSize(35).fontColor(Color.White).width("60%")
                      .margin({top:20,left:20})
                    Blank()
                    Button("添加").backgroundColor("").fontSize(18)
                      .margin({right:5})
                      .onClick(()=>{
                        //根据name 来索引
                        let index = this.AllCityNameList.findIndex(obj=>obj===name)
                        //根据索引获得code
                        let cityCode: number = this.AllCityCodeList[index]
                        //加入队列
                        this.cityNameList.push(name)
                        this.cityCodeList.push(cityCode)
                      })
                  }.width("100%")
                  Blank()
                  Divider().strokeWidth(5)
                }.height(90).width("100%").margin({top:20})

              }
            }
          })
        }
      }.width("100%").height("90%")
    }.width("100%").height("100%").backgroundColor("#87ceeb")
  }
}