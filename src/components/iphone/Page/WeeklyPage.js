import { h, render, Component } from 'preact';

import $ from 'jquery';
import {WeeklyTable} from '../containers/WeeklyTable';
import style from '../style';
import {locationSetUp,countrySetUp,preference,initialiseRequest} from './MainPage';

export class WeeklyPage extends Component{

  // a constructor with initial set states
  constructor(props){
    super(props);
    // button display state
    var emptyArray = [];
    for (let i=0;i<7;i++)
      emptyArray[i] = {weekday:"",rain:"",temp:"",cloud_c :""};
    this.setState(
      { daily : emptyArray });
    //define everything in order to not get further errors in the components
    console.log(countrySetUp +"/"+locationSetUp);
  }

  componentDidMount(){
    this.fetchWeatherData(countrySetUp +"/"+locationSetUp);
  }

  fetchWeatherData = (search) => {
    // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
    this.setState({search: search.substring(0,2), display:false});
    var url = "http://api.wunderground.com/api/d67dadbd88cb73a6/forecast10day/q/"+search+".json";
    $.ajax({
      url: url,
      dataType: "jsonp",
      success : this.parseResponse,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    // once the data grabbed, hide the button
    this.setState({ display: false });
  }

  parseResponse = (parsed_json) => {
    if (parsed_json['forecast']== undefined){
      const code = initialiseRequest(parsed_json,countrySetUp);
      this.fetchWeatherData('zmw:' + code);
      return;
    }
    var day = [],i;
    for (i = 0;i<7;i++)
    {
      const rain_day_chances = Number(parsed_json['forecast']['txt_forecast']['forecastday'][i*2]['pop']);
      const rain_night_chances = Number(parsed_json['forecast']['txt_forecast']['forecastday'][i*2+1]['pop']);
      const average_chance = (rain_day_chances + rain_night_chances)/2;
      const temperature = preference=='C'? parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius']
          : parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['fahrenheit'];
      day[i] =
      {
        weekday: parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short'],
        temp: temperature,
        rain: average_chance,
        cloud_c: parsed_json['forecast']['txt_forecast']['forecastday'][i*2]['icon_url']
      };
    }
    // set states for fields so they could be rendered later on
    this.setState({
      daily : day
    });
  }
  render()
  {
    return (
      <div>
        <div class={style.weeklybox} >Weekly Weather Forecast</div>
        <WeeklyTable daily = {this.state.daily}/>
      </div>
    );
  }
}
