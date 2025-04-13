import  {weatherModel} from "./WeatherModel"
import http from '@ohos.net.http';
class getWeatherUtil{
  //发送一个url，返回对应的数据
  getWeather(cityCode:number){
    return new Promise<weatherModel>((resolve,reject)=>{
      let request = http.createHttp()
      let url = `https://restapi.amap.com/v3/weather/weatherInfo?city=${cityCode}&key=7f1602ea8ce9176fad98245cb6d7d2a0&extensions=all`
      let result = request.request(url)
      result.then((res)=>{
        if (res.responseCode === 200){
          console.log(res.result.toString());
          resolve(JSON.parse(res.result.toString()))
        }
      }).catch((err)=>{
        console.log(err)
      })
    })
  }
  //发送多个url，一并返回
  async getWeathers(cityCodes:Array<number>){
    let promises :Array<Promise<weatherModel>> = []
    let weatherModels :Array<weatherModel> = []
    for (let i = 0; i < cityCodes.length; i++){
      promises.push(this.getWeather(cityCodes[i]))
    }
    await Promise.all(promises).then(result=>{
      for (const element of result){
        console.log(element.forecasts[0].city)
      }
      weatherModels = result
    })
    return weatherModels
  }
}

let getweatherUtil = new getWeatherUtil()
export default getweatherUtil as getWeatherUtil