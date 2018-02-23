import { h, render, Component } from 'preact';
import {geolocated} from 'react-geolocated';
// import stylesheets for ipad & button

import style from '../style';
// import jquery for API calls

import $ from 'jquery';
import style_iphone from '../../button/style_iphone';
// import the Button component

import {SearchContainer} from '../containers/SearchContainer';

import {DescriptionContainer} from '../containers/DescriptionContainer';

import {SuggestionContainer} from '../containers/SuggestionContainer';

import {HourlyForecastContainer} from '../containers/HourlyForecastContainer';

export class MainPage extends Component{

  	// a constructor with initial set states
  	constructor(props){
  		super(props);
  		// button display state
  		this.setState(
  			{ display: true,
  				general :"",
  				hourly :[{hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""},
  								 {hour:"",icon:"",temp:""}]} );
  		//define everything in order to not get further errors in the components

  		this.fetchWeatherData("UK/London");
  		this.changeLocation = this.changeLocation.bind(this) ;
  	}
  //need to be structured
  	changeLocation = (location) => {
  		if (location == "")
  			//user request to view the weather in his location
  			if (this.props.isGeolocationAvailable && this.props.isGeolocationEnabled && this.props.coords)
  			{
  				this.fetchWeatherData(this.props.coords.latitude+","+this.props.coords.longitude);
  			}
  		else
  			this.fetchWeatherData(location);
  	}

  	changeLocation = (location) => {

  	}

  	// a call to fetch weather data via wunderground
  	fetchWeatherData = (search) => {
  		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
  		var url = "http://api.wunderground.com/api/7e6a6831e455da38/conditions/hourly/q/"+search+".json";
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
  		var location = parsed_json['current_observation']['display_location']['city'];
  		var temp_c = parsed_json['current_observation']['temp_c'];
  		var conditions = parsed_json['current_observation']['weather'];
  		var wind_speed = parsed_json['current_observation']['wind_mph'];
  		var rainPercentage = parsed_json['current_observation']['precip_today_in'];
  		var cloud_coverage = "";//parsed_json['hourly']['sky'];
  		var icon_now = parsed_json['current_observation']['icon'];
  		var day = [],i;
  		for (i = 0;i<5;i++)
  			day[i] =
  			{
  				hour: parsed_json['hourly_forecast'][i]['FCTTIME']['hour'],
  				icon: parsed_json['hourly_forecast'][i]['icon'],
  				temp: parsed_json['hourly_forecast'][i]['temp']['metric']
  			};
  		// set states for fields so they could be rendered later on
  		this.setState({
  			locate: location,
  			temp: temp_c,
  			cond : conditions,
  			general : [rainPercentage,wind_speed,cloud_coverage],
  			hourly : day
  		});
  	}


  	// the main render method for the iphone component
  	render() {
  		// display all weather data
  		return (
  				<div class={ style.details }>
  					<SearchContainer cond = {this.state.cond} temp = {this.state.temp} locate = {this.state.locate} />
  					<DescriptionContainer value = {this.state.general}/>
  					<HourlyForecastContainer hourly = {this.state.hourly}/>
  					<SuggestionContainer />
  				</div>
  		);
  	}

}
