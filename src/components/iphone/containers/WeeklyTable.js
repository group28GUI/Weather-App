import { h, render, Component } from 'preact';

import style from '../style';
import {preference} from '../Page/MainPage';

export class WeeklyTable extends Component{

  returnEachRow = (data) =>
  {
    return (
      <tr>
        <td><div>{data.weekday}</div> </td>
        <td><div>{data.temp}</div> </td>
        <td><div>{data.rain + "%"}</div></td>
        <td><div><img src = {data.cloud_c}/></div></td>
      </tr>
    )
  }

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
