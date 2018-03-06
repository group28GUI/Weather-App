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
	return new Promise((resolve, reject) => {
    try {
			let city = result[0].long_name;
			const size = result.length;
			let country = result[size-1].short_name;
			if (country == 'US')
				country = result[size-2].short_name;
			const address =
				{country: country,
        city: city};
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
		this.setState({address : locationSetUp});
		this.getTemperatureFormatted = this.getTemperatureFormatted.bind(this);
	}

	onChange = (address) =>{
		this.setState({address : address});
	}

	handleFormSubmit = (event) => {
    event.preventDefault()
		let funct = geocodeByAddress(this.state.address)
		.then(results => getCityAddress(results[0].address_components))// getLatLng(results[0]))
		.then(address => this.sendLocation(address))
		.catch(error => this.props.changeLocation(""))
	}

	sendLocation = (address) =>{
		this.props.changeLocation(address.country+"/"+ address.city);
	}

	handleGrade = (event) =>{
		event.preventDefault();
		this.props.changeGrade(event.toElement.innerHTML);
	}

	getTemperatureFormatted(){
		const tempStyles = this.props.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		let part = "";

		if (preference == 'F'){
			part = (<div>
								<Button value="C" clickFunction={this.handleGrade}>C</Button>
								<span style={{paddingRight: '15px'}}>/</span>
								<span><span>F</span></span>
							</div>);
						}
		else {
			part = (
					<div>
						<span><span>C</span></span>
						<span style={{paddingLeft: '15px'}}>/</span>
						<Button value="F" clickFunction={this.handleGrade}>F</Button>
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
	  }
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempFormatted = this.getTemperatureFormatted();

    return (
      <div class ={style_iphone.container} >
				<form onSubmit={this.handleFormSubmit} class={style.searchbar}>
					<PlacesAutocomplete inputProps={inputProps}/>
					<Button value="GPS" src={gps_src}>GPS</Button>
					<Button value="Submit" src={loop_src}>Submit</Button>
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

/*<form onSubmit={this.handleFormSubmit}>
	<PlacesAutocomplete />
	<button type="submit">Submit</button>
</form>
*/
