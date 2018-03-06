import { h, render, Component } from 'preact';
import {geolocated} from 'react-geolocated';
// import stylesheets for ipad & button

import style from '../style';
// import jquery for API calls

import $ from 'jquery';
// import the Button component

import {SearchContainer} from '../containers/SearchContainer';

import {DescriptionContainer} from '../containers/DescriptionContainer';

import {SuggestionContainer} from '../containers/SuggestionContainer';

import {HourlyForecastContainer} from '../containers/HourlyForecastContainer';

export let locationSetUp = "London";
export let countrySetUp = "UK";
export let timezone = "Europe/London";
export let preference = "C";

export class MainPage extends Component{

  	// a constructor with initial set states
  	constructor(props){
  		super(props);
  		// button display state
  		this.setState(
  			{ display: true,
  				general :"",
          icon_now :"",
  				hourly :[{hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""}]} );
  		//define everything in order to not get further errors in the components

  		this.changeLocation = this.changeLocation.bind(this);
      this.changeGrade = this.changeGrade.bind(this);
  	}

    componentDidMount(){
      this.fetchWeatherData(countrySetUp +"/"+locationSetUp);
    }

    changeGrade = (pref) =>{
      preference = pref;
      this.fetchWeatherData(countrySetUp+"/"+locationSetUp);
    }
  //need to be structured
  	changeLocation = (location) => {
      console.log(location);
  		if (location == "")
  		{
        console.log(this.props);
        //user request to view the weather in his location
  			if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords)
  			{
  				this.fetchWeatherData(this.props.coords.latitude+","+this.props.coords.longitude);
  			}
      }
  		else
  			this.fetchWeatherData(location);
  	}

  	// a call to fetch weather data via wunderground
  	fetchWeatherData = (search) => {
  		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
  		var url = "http://api.wunderground.com/api/7e6a6831e455da38/conditions/hourly/q/"+search+".json";
      this.setState({search: search.substring(0,2), display:false});
      $.ajax({
  			url: url,
  			dataType: "jsonp",
  			success : this.parseResponse,
  			error : function(req, err){ console.log('API call failed ' + err); }
  		})
  		// once the data grabbed, hide the button
  		this.setState({ display: false });
  	}

    initialiseRequest(parsed_json)
    {
      let code = "";
      let i;
      for (i = 0; i < parsed_json['response']['results'].length;i++)
      {
        if (parsed_json['response']['results'][i]['country_iso3166'] == this.state.search)
        {
          code = parsed_json['response']['results'][i]['zmw'];
          break;
        }
      }
      this.fetchWeatherData('zmw:' + code);
    }

    parseResponse = (parsed_json) => {
  		//console.log(parsed_json);
      if (parsed_json['current_observation']== undefined){
        this.initialiseRequest(parsed_json);return;
      }
  		var location = parsed_json['current_observation']['display_location']['city'];
  		var temp_c = preference=='C' ? parsed_json['current_observation']['temp_c'] : parsed_json['current_observation']['temp_f'];;
  		var conditions = parsed_json['current_observation']['weather'];
  		var wind_speed = parsed_json['current_observation']['wind_mph'];
  		var rainPercentage = parsed_json['hourly_forecast'][0]['pop'];
  		var cloud_coverage = parsed_json['hourly_forecast'][0]['sky'];
  		var icon_now = parsed_json['current_observation']['icon_url'];
      var country = parsed_json['current_observation']['display_location']['country'];
  		var day = [],i;
  		for (i = 0;i<5;i++)  {
        var temperature = preference=='C' ? parsed_json['hourly_forecast'][i]['temp']['metric']
          : parsed_json['hourly_forecast'][i]['temp']['english'];
  			day[i] =
  			{
  				hour: parsed_json['hourly_forecast'][i]['FCTTIME']['hour'],
  				icon: parsed_json['hourly_forecast'][i]['icon_url'],
  				temp: temperature
  			};
      }
  		// set states for fields so they could be rendered later on
  		this.setState({
  			temp: temp_c,
  			cond : conditions,
  			general : [rainPercentage,wind_speed,cloud_coverage],
  			hourly : day,
        icon_now : icon_now
  		});
      locationSetUp = location;
      countrySetUp = country;
      timezone = parsed_json['current_observation']['local_tz_long'];
  	}


  	// the main render method for the iphone component
  	render() {
  		// display all weather data
  		return (
  				<div class={ style.details }>
  					<SearchContainer temp = {this.state.temp} icon = {this.state.icon_now} changeLocation = {this.changeLocation} changeGrade = {this.changeGrade}/>
  					<DescriptionContainer value = {this.state.general}/>
  					<HourlyForecastContainer hourly = {this.state.hourly}/>
  					<SuggestionContainer />
  				</div>
  		);
  	}

}
