import {h, render, Component} from 'preact';
import style from '../style';
import {HourPicture} from '../components/HourPicture';

export class HourlyForecastContainer extends Component {
  constructor(props) {
     super(props);
  }

  // DATA for each row (Day, Temperature, Chance of Rain & Cloud Coverage)!
  returnEachRow = (data) => {
     return (<HourPicture temp ={data.temp} hour ={data.hour} icon ={data.icon}/>);
  }

  // OUTPUT data for each row!
  render() {
     const content = this.props.hourly.map((data) => this.returnEachRow(data));
     return (
        <div class = {style.hourlyforcast}>{content}</div>
  );}
} // END class hourlyForecastContainer!
