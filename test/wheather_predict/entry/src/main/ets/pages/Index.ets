import router from '@ohos.router'
import { casts } from '../viewmod/cats'
import { cityView } from '../viewmod/cityView'
import getweatherUtil from "../viewmod/Getweather"
import {weatherModel} from "../viewmod/WeatherModel"

@Entry
@Component
struct Index {
  //索引
  @State cityIndex :number = 0
  //城市代码集合
  @State cityCodeList:number[] = [110000,120000]
  //城市名字集合
  @State cityNameList:string[] = []
  //城市信息集合
  @State cityWeatherList :Array<weatherModel> = []

  tabController :TabsController = new TabsController()

  //按钮样式
  @Builder tabBuilder(index:number){
    Circle({width:10,height:10})
      .fill(this.cityIndex === index ?Color.White:Color.Grey).opacity(0.4)
  }


  onPageShow(){
    let params = router.getParams()
    if (params != null){
      //清空数据
      this.cityWeatherList = []
      this.cityNameList = []
      this.cityCodeList = params["codes"]
      this.initDate()

    }

  }
  //获取数据
  aboutToAppear(){
    this.initDate()
  }
  //初始化方法
  async initDate(){
    //得到访问结果
    let result: Array<weatherModel> = await getweatherUtil.getWeathers(this.cityCodeList)
    //对结果遍历
    for (let i = 0; i < result.length; i++){
      let ACityWeathger = result[i]
      this.cityWeatherList.push(ACityWeathger)
      let cityName = result[i].forecasts[0].city
      this.cityNameList.push(cityName)

    }
  }

  build() {
    Column() {
      Row(){
        Button("添加")
          .fontSize(25)
          .fontColor(Color.Gray)
          .opacity(0.7)
          .backgroundColor("#87CEEB")
          .margin({bottom: 15})
          .onClick(()=>{
            router.pushUrl({
              url:"pages/addCity",
              params:{
                codes:this.cityCodeList,
                names:this.cityNameList
              }
            })
          })

        Button("删除")
          .fontSize(25)
          .fontColor(Color.Gray)
          .opacity(0.7)
          .backgroundColor("#87CEEB")
          .margin({bottom: 15})
      }.width("100%").height("10%").justifyContent(FlexAlign.SpaceBetween)
      .onClick(()=>{
        AlertDialog.show({
          title:"删除",
          message:`确定删除${this.cityNameList[this.cityIndex]}吗`,
          confirm:{
            value:"确定",
            action:()=>{
              this.cityNameList =
              this.cityNameList.filter(item => item !==this.cityNameList[this.cityIndex])
              this.cityCodeList =
              this.cityCodeList.filter(item => item !==this.cityCodeList[this.cityIndex])
              this.cityWeatherList =
              this.cityWeatherList.filter(item => item !==this.cityWeatherList[this.cityIndex])
            }
          }
        })
      })

      Row(){
        Text(this.cityNameList[this.cityIndex])
          .fontSize(40)
          .fontColor(Color.Orange)
      }
      //城市信息布局
      Tabs({barPosition:BarPosition.Start,controller:this.tabController}){
        ForEach(this.cityWeatherList,(cityWeather:weatherModel)=>{
          TabContent(){
            cityView({casts: cityWeather.forecasts[0].casts})
          }.tabBar(this.tabBuilder(this.cityWeatherList.findIndex(obj=>obj===cityWeather)))
        })
      }.barWidth(30)
      .barHeight(40)
      .onChange((index:number)=>{
        this.cityIndex = index
      })
    }.width("100%").height("100%").backgroundColor("#87CEEB")

  }

}