// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from '../style';
//import Geocoder from 'react-geocode';

export class SearchContainer extends Component
{
  // a constructor with initial set states
	constructor(props){
		super(props);
		//Geocode.setApiKey("AIzaSyCGm-ttD_eBlNK7wdNL703zsF1338W7APo");

	}
	//google stuff?
	predict = e => {
		var location = document.getElementById("search").value;
		Geocode.fromAddress("Eiffel Tower").then(
  response => {
    const { lat, lng } = location;
    console.log(lat, lng);
  },
  error => {
    console.error(error);
  }
);
	}

	parseResponse = (parsed_json) => {
		console.log(parsed_json);
		let suggestedLocation = parsed_json['predictions'][0]['description'];
		document.getElementById("search").placeholder = suggestedLocation;
	}

  // the main render method for the SearchContainer component
	render() {
    // check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.props.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    return (
      <div>
				<input type="text" id="search" onchange = {this.predict}/><img src = ""/>
        <div class={ style.city }>{ this.props.locate }</div>
        <div class={ style.conditions }>{ this.props.cond }</div>
        <span class={ tempStyles }>{ this.props.temp }</span>
      </div>
    );
  }
}
