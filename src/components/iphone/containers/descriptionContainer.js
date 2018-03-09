import {h, render, Component} from 'preact';
import {PictureText} from '../components/PictureText'
import style from '../style';

// Array of PREDIFINED weather DATA!
var list = [
	{
	// Chance of Rain!
	image: "https://icons.wxug.com/i/c/k/rain.gif",
	text: "Chances of Rain",
	variable: "rain",
	value: "",
	measure: "%"
	},
	{
	// Wind Speed!
	image: "../../assets/backgrounds/wind.png",
	text: "Wind Speed",
	variable: "speed",
	value: "",
	measure: 'mph'
	},
	{
	// Cloud Coverage!
	image: "https://icons.wxug.com/i/c/k/cloudy.gif",
	text: "Cloud Coverage",
	variable: "cloud_c",
	value: "",
	measure: '%'
	}
];

export class DescriptionContainer extends Component {
	 // Constructor with initial set states!
	 constructor(props) {
             super(props);
	 }

	 // SPLIT data according to information!
	 returnEachRow = (data) => {return <PictureText data = {data}/>;}

	 render() {
	      // LOAD information close to predefined data!
	      for (let i = 0; i<3; i++) {
		   list[i].value = this.props.value[i];
	      }

	      // SPLIT information according to the properties about current weather!
	      const content = list.map((data) => this.returnEachRow(data));

	      // OUTPUT main weather information!
	      return (
		   <div class = {style.maininfo}>{content}</div>
	      );}
} // END class descriptionContainer!
