// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from '../style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
//import {PlacesAutocomplete} from '../components/PlacesAutocomplete';
import {Clock} from '../components/Clock';
import {locationSetUp,countrySetUp,preference} from '../Page/MainPage';
import Button from '../../button';
import style_iphone from '../../button/style_iphone';
import Async from 'react-promise'

const loop_src = "../../assets/backgrounds/loop.png";
const gps_src = "../../assets/backgrounds/gps.png";

var getCityAddress = exports.getCityAddress = function (result) {
// retrive data from geocodeByAddress service worker function
	return new Promise((resolve, reject) => {
    try {
			// get information from google api
			let city = result[0].long_name;
			const size = result.length;
			// get the city name from google api
			let country = result[size-1].short_name;
			if (country == 'US' || country.length > 2)
				country = result[size-2].short_name;
			// get the country shortcut from google api
			const address =
				{country: country,
        city: city};
			// combine city and country in order to call the wunderground api
			resolve(address)
    } catch (e) {
      reject(e)
    }
  })
}

export class SearchContainer extends Component
{
  // a constructor with initial set states
	constructor(props){
		super(props);
		this.setState({address : ""});
		this.getTemperatureFormatted = this.getTemperatureFormatted.bind(this);
		this.emptyAddress = this.emptyAddress.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange = (address) =>{
		this.setState({address : address});
	}

	handleFormSubmit = (event) => {
	// if user selects a location
    event.preventDefault()
		let funct = geocodeByAddress(this.state.address)
		.then(results => getCityAddress(results[0].address_components))// getLatLng(results[0]))
		.then(address => this.sendLocation(address))
		.catch(error => this.props.changeLocation(""))
	}

	sendLocation = (address) =>{
		//communicates to the parent, main page, which contains the api functions
		this.props.changeLocation(address.country+"/"+ address.city);
	}

	handleGrade = (event) =>{
		//handle the changes of the grade
		event.preventDefault();
		this.props.changeGrade(event.toElement.innerHTML);
	}

	emptyAddress = () =>{
		// consider empty address to carry further requests in parent, main page, to the wunderground api
		this.onChange("");
	}

	// return temperature details into html format
	getTemperatureFormatted(){
		//get the temperature style for temperature box
		const tempStyles = this.props.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		let part = "";

		if (preference == 'F'){
		//according to the user choise
			part = (<div>
								<Button type="button" value="C" clickFunction={this.handleGrade}>C</Button>
								<span style={{paddingRight: '15px'}}>/</span>
								<span><span>F</span></span>
							</div>);
						}
		else {
			part = (
					<div>
						<span><span>C</span></span>
						<span style={{paddingLeft: '15px'}}>/</span>
						<Button type="button" value="F" clickFunction={this.handleGrade}>F</Button>
					</div>);
		}
		return(
			<div class={style.tempdisplay}>
				<div><span class={ tempStyles }>{ this.props.temp }</span></div>
				{part}
			</div>
		);
	}

  // the main render method for the SearchContainer component
	render() {
		const inputProps = {
		 value: this.state.address,
		 onChange: this.onChange,
		 placeholder: 'Search',
	  }
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempFormatted = this.getTemperatureFormatted();

    return (
      <div class ={style_iphone.container} >
				<form onSubmit={this.handleFormSubmit} class={style.searchbar}>
					<PlacesAutocomplete inputProps={inputProps}/>
					<Button type="button" value="GPS" src={gps_src} clickFunction={this.emptyAddress}>GPS</Button>
					<Button type="submit" value="Submit" src={loop_src}>Submit</Button>
				</form>
				<div class={style.display}>
						<Clock />
						{tempFormatted}
						<img src = {this.props.icon}/>
				</div>
				<div class={ style.city }>{ locationSetUp }</div>
      </div>
    );
  }
}
