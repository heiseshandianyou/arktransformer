import {casts} from "../viewmod/cats"
@Component
export struct cityView{
  //获取数据
  //城市数据
  casts:Array<casts> = []

  @Builder weatherImage(weather:string){
      if (weather === "晴"){
        Image($r("app.media.sun")).width(30)
      }
      if (weather === "阴"){
        Image($r("app.media.cloudy")).width(30)
      }
      if (weather === "多云"){
        Image($r("app.media.cloudy")).width(30)
      }
      if (weather === "小雨"){
        Image($r("app.media.rain")).width(30)
      }
      if (weather === "雪"){
        Image($r("app.media.snow")).width(30)
      }
  }
  //展示数据
  build(){
    Column(){
      //当天数据
      ForEach(this.casts, (cast:casts)=>{
        if (this.casts[0] === cast){
          //图片
          Row(){
            if (cast.dayweather === "晴"){
              Image($r("app.media.sun")).width(260)
            }
            if (cast.dayweather === "阴"){
              Image($r("app.media.cloudy")).width(260)
            }
            if (cast.dayweather === "多云"){
              Image($r("app.media.cloudy")).width(260)
            }
            if (cast.dayweather === "小雨"){
              Image($r("app.media.rain")).width(260)
            }
            if (cast.dayweather === "雪"){
              Image($r("app.media.snow")).width(260)
            }

          }.height("30%")
          Column(){
            //温度
            Row(){
              Text(cast.dayweather)
                .fontSize(30).fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
              Text("  "+cast.daytemp+" ~ "+cast.nighttemp+"度")
                .fontSize(30).fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
            }
            Row(){
              Text(cast.daywind + "风")
                .fontSize(30).fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
              Text(cast.daypower + "级")
                .fontSize(30).fontColor(Color.White)
                .fontWeight(FontWeight.Bold)
            }
          }.margin({top:10})
        }
      })

      //近期天气
      Column(){
        Text("近期天气查询").fontSize(26).margin({top:30})
        Row(){
          ForEach(this.casts,(cast:casts)=>{
            Column(){
              Text(cast.date.substring(5))
              this.weatherImage(cast.dayweather)
              Text(cast.daytemp.toString())
              Line()
                .width(20).height(80).startPoint([10,0])
                .endPoint([10,70]).stroke(Color.Black)
                .strokeWidth(3).strokeDashArray([10,3])
              Text(cast.nighttemp.toString())
              this.weatherImage(cast.nightweather)

            }
          })
        }.width("80%").height("90%")
        .backgroundColor("#ffbab8b8")
        .justifyContent(FlexAlign.SpaceAround)

      }.width("100%").height("30%")
    }.width("100%").height("100%")
  }
}