import {forecasts} from './forecasts'


export class weatherModel{
  status:number
  count:number
  infocode:number
  forecasts:Array<forecasts> = []
}