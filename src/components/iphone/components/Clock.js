
import {h, render, Component} from 'preact';
import style from '../style';
import {DarkMode} from '../index';
import {timezone} from "../Page/MainPage";

// Array of MONTHS!
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export class Clock extends Component {
  // Constructor with initial set states!
  constructor(props) {
    super(props);
    this.getDate();
  }

  // Time, Date & SET Format!
  getDate = () => {
    var str = new Date().toLocaleString("en-UK", {timeZone: timezone});
    var d = new Date(str);
    var day = d.getDate();
    var m = month[d.getMonth()];
    var year = d.getFullYear();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    this.setState({
      first: day +" " + m +" "+ year,
      second: hour + ":"+min
    });
  }

  // SET timer to UPDATE every second after component gets mounted to the DOM!
  componentDidMount() {this.timer = setInterval(() => {this.getDate()}, 1000);}

  // STOP timer when component is not available to the DOM!
  componentWillUnmount() {clearInterval(this.timer);}

  // OUTPUT Date & Time!
  render() {
    return (
      <div class = {style.datandtime}>
        <div>{this.state.first}</div>
        <div>{this.state.second}</div>
      </div>);
    }
} // END class Clock!
