import { h, render, Component } from 'preact';

var month = ["January","February","March","April", "May","June", "July","August","September", "October", "November", "December"];

import {timezone} from "../Page/MainPage";

export class Clock extends Component
{
  constructor(props)
  {
    super(props);
    this.getDate();
  }

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
      first:day +" " + m +" "+ year,
      second: hour + ":"+min
    });
  }

  componentDidMount() {
       // update time every second
       this.timer = setInterval(() => {
          this.getDate()
       }, 1000);
   }

  componentWillUnmount() {
        // stop when not renderable
        clearInterval(this.timer);
    }

  render()
  {
    return (
      <div>
        <div>{this.state.first}</div>
        <div>{this.state.second}</div>
      </div>);
  }
}
