import { h, render, Component } from 'preact';

import style from '../style';
import {preference} from '../Page/MainPage';

export class WeeklyTable extends Component{

  returnEachRow = (data) =>
  {
    //Thi will return the weekday name, the temp for that day, chances of rain and the icon for the conditon.
    return (
      <tr>
        <td><div>{data.weekday}</div> </td>
        <td><div>{data.temp}</div> </td>
        <td><div>{data.rain + "%"}</div></td>
        <td><div><img src = {data.cloud_c}/></div></td>
      </tr>
    )
  }
//Output Data to the weekly table  (day, temperture, chances of rain and Condition)
  render()
  {
      const content = this.props.daily.map((data) => this.returnEachRow(data));
      return (
        <table class={style.weeklyTable}>
          <thead>
            <tr><td>Day</td><td>Temperature {'('+preference+')'}</td><td>Rain</td><td>Conditions</td></tr>
          </thead>
          <tbody>
          {content}
          </tbody>
        </table>
      );
  }
}
