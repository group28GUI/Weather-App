// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';
import style from '../style';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
//import {PlacesAutocomplete} from '../components/PlacesAutocomplete';
import {Clock} from '../components/Clock';
import {locationSetUp,countrySetUp} from '../Page/MainPage';

export class SearchContainer extends Component
{
  // a constructor with initial set states
	constructor(props){
		super(props);
		this.setState({address : locationSetUp});
	}

	onChange = (address) =>{
		this.setState({address : address});
	}

	handleFormSubmit = (event) => {
    event.preventDefault()
		geocodeByAddress(this.state.address)
		.then(results => getLatLng(results[0]))
		.then(latLng => this.sendLocation(latLng))
		.catch(error => this.props.changeLocation(""))
	}

	sendLocation = (latLng) =>{
		latLng.lat = Number(latLng.lat.toFixed(4))
		latLng.lng = Number(latLng.lng.toFixed(4))
		this.props.changeLocation(latLng.lat+','+latLng.lng);
	}

  // the main render method for the SearchContainer component
	render() {
		const inputProps = {
		 value: this.state.address,
		 onChange: this.onChange,
	  }
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.props.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    return (
      <div>
				<form onSubmit={this.handleFormSubmit}>
					<PlacesAutocomplete inputProps={inputProps}/>
					<button type="submit">Submit</button>
				</form>
				<Clock />
				<img src = ""/>
        <div class={ style.city }>{ locationSetUp }</div>
        <div class={ style.conditions }>{ this.props.cond }</div>
        <span class={ tempStyles }>{ this.props.temp }</span>
      </div>
    );
  }
}

/*<form onSubmit={this.handleFormSubmit}>
	<PlacesAutocomplete inputProps={inputProps} />
	<button type="submit">Submit</button>
</form>
*/
