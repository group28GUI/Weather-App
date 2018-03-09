import {h, render, Component} from 'preact';
import style from '../style';
import {preference} from '../Page/MainPage';

// Clothing suggestion TYPES:
const essential = "Essentials";
const suitable = "Suitable";

// Array of SUGGESTIONS statements!
const suggest = [
  essential + ": Take an umbrella, also wear a jacket, scarf, gloves and non-slippery shoes.",
  essential + ": Take an umbrella, also wear a jacket and non-slippery shoes.",
  essential + ": Jacket, scarf, gloves, a few layer of clothes and non-slippery shoes.",
  essential + ": Jacket, scarf, gloves and a few layer of clothes.",
  suitable + ": Hoodies, Sweatshirts, Leggings, Jeans, Tracksuits.",
  suitable + ": Tops, T-shirts, Shorts, Skirts, Polos, Sandals."
];

export class SuggestionContainer extends Component {
  // Constructor with initial set states!
  constructor(props) {
    super(props);
  }

  // Returns SUGGESTIONS based on the weather!
  suggestion = () => {
    // Set VALUES to Fahrenheit scale!
    let comparegrade1 = 10,comparegrade2 = 20;

    if (preference =='F') {
      comparegrade1 = 50;
      comparegrade2 = 68;
    }

    // Switch command for ALL conditions which includes suggestions also!
    if (this.props.rain !== undefined) {
    	switch(true) {
            case (this.props.temp<=comparegrade1 && this.props.cond.includes("Rain")):
            	return suggest[0];
            	break;
	    case (this.props.temp>comparegrade1 && this.props.cond.includes("Rain")):
	    	return suggest[1];
            	break;
            case (this.props.cond.includes("Snow")):
            	return suggest[2];
            	break;
            case (this.props.temp <= comparegrade1):
            	return suggest[3];
            	break;
	    case (comparegrade1 < this.props.temp && this.props.temp < comparegrade2):
            	return suggest[4];
            	break;
            case (this.props.temp >= comparegrade2):
            	return suggest[5];
            	break;
            }
            return 'None';
         }
      }

    // ADD constraint to NOT render entire component!
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.temp == nextProps.temp)
           return false;
        return true;
    }

    // OUTPUT suggestions based on CURRENT conditions!
    render() {
    	var info = this.suggestion();
	return <div class = {style.suggestionbox}> {info} </div>
    }
} // END class suggestionContainer!
