import {h, render, Component} from 'preact';
import style from '../style';

export class PictureText extends Component {
    // Constructor with initial set states!
    constructor(props) {
	super(props);
    }

  // OUTPUT (Chance of Rain, Wind Speed & Cloud Coverage) for hourly forcast condition!
  render() {
      return (
	<div>
           <img src = {this.props.data.image}/>
           <div>{this.props.data.text}</div>
	   <div>{this.props.data.value} {this.props.data.measure}</div>
        </div>);
   }
} // END class PictureText!
