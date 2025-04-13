import { cityView } from '../viewmod/cityView';
import getweatherUtil from "../viewmod/Getweather";
struct Index extends   {
    constructor() { }
    //按钮样式
    tabBuilder(index) {
            .fill(this.cityIndex === index ? Color.White : Color.Grey).opacity(0.4);
    }
    //获取数据
    aboutToAppear() {
        this.initDate();
    }
    //初始化方法
    async initDate() {
        //得到访问结果
        let result = await getweatherUtil.getWeathers(this.cityCodeList);
        //对结果遍历
        for (let i = 0; i < result.length; i++) {
            let ACityWeathger = result[i];
            this.cityWeatherList.push(ACityWeathger);
            let cityName = result[i].forecasts[0].city;
            this.cityNameList.push(cityName);
        }
    }
    build() {
        .width("100%").height("100%").backgroundColor("#87CEEB");
    }
}
//# sourceMappingURL=Index.js.map