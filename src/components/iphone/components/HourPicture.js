import {h, render, Component} from 'preact';
import style from '../style';

export class HourPicture extends Component {
  // Constructor with initial set states!
  constructor(props) {
    super(props);
  }

  // OUTPUT (Time, Icon & Temperature) for hourly forcast condition!
  render() {
    const tempStyles = this.props.temp ? `${style.temperaturehourly} ${style.filledhourly}` : style.temperaturehourly;
    if (this.props.temp) {
      return (
        <div className = {style.hourlyforcastday}>
            <div>{this.props.hour} : 00</div>
            <img src = {this.props.icon} alt = "string"/>
            <div className = {tempStyles}>{this.props.temp}</div>
        </div>);
    }
    else {
      return <div></div>
    }}
} // END class HourPicture!
