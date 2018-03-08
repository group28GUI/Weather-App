import { h, render, Component } from 'preact';

import style from '../style';

const essential = "Essentials";
const suitable = "Suitable";
const suggest = [
    essential + ": Make sure you take an umbrella, also wear a jacket, scarf, gloves and non-slippery shoes",
    essential + ": Make sure you take an umbrella, also wear a jacket and non-slippery shoes",
    essential + ": Make sure you wear a jacket, scarf, gloves, a few layer of clothes and non-slippery shoes",
    essential + ": Make sure you wear a jacket, scarf, gloves and a few layer of clothes",
    suitable + ": Hoodies, Sweatshirts, Leggings, Jeans, Tracksuits",
    suitable + ": Tops, T-shirts, Shorts, Skirts, Polos, Sandals"

];

export class SuggestionContainer extends Component{
  constructor(props) {
		super(props);
	}

	suggestion = () => {

		if (this.props.rain !== undefined) {
      switch(true)
      {
        case (this.props.temp<=10 && this.props.cond.includes("Rain")):
				     return suggest[0];break;
			  case (this.props.temp>10 && this.props.cond.includes("Rain")):
				     return suggest[1];break;
        case (this.props.cond.includes("Snow")):
             return suggest[2];break;
        case (this.props.temp <= 10):
             return suggest[3]; break;
        case (10 > this.props.temp < 20):
             return suggest[4]; break;
        case (this.props.temp >= 20):
             return suggest[5]; break;
			}
		}
	}

	render() {
		var info = this.suggestion();
		return <div class={style.suggestionbox}> {info} < /div>
	}
}
