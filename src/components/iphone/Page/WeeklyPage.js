import { h, render, Component } from 'preact';

import $ from 'jquery';
import {WeeklyTable} from '../containers/WeeklyTable';

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

    this.fetchWeatherData("UK/London");
  }

  fetchWeatherData = (search) => {
    // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
    var url = "http://api.wunderground.com/api/7e6a6831e455da38/forecast10day/q/"+search+".json";
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
    //console.log(parsed_json);
    var day = [],i;
    for (i = 0;i<7;i++)
      day[i] =
      {
        weekday: parsed_json['forecast']['simpleforecast']['forecastday'][i]['date']['weekday_short'],
        temp: parsed_json['forecast']['simpleforecast']['forecastday'][i]['high']['celsius'],
        rain: parsed_json['forecast']['txt_forecast']['forecastday'][i]['pop'],
        cloud_c :"" //parsed_json['simpleforecast']['forecastday'][i]
      };
    // set states for fields so they could be rendered later on
    this.setState({
      daily : day
    });
  }
  render()
  {
    return (
      <div>
        <div>Weekly Weather Forecast</div>
        <WeeklyTable daily = {this.state.daily}/>
      </div>
    );
  }
}
