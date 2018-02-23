// import preact
import { h, render, Component } from 'preact';

import {HourPicture} from '../components/HourPicture';
import $ from 'jquery';

export class HourlyForecastContainer extends Component{
  constructor(props){
		super(props);
	}

  returnEachRow = (data) => {
    return (
        <HourPicture temp = {data.temp} hour = {data.hour} icon = {data.icon}/>
    );
  }

  render()
  {
     const content = this.props.hourly.map((data) => this.returnEachRow(data));
     return(
      <div>
        {content}
      </div>);
  }
}
