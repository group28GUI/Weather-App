import { h, render, Component } from 'preact';

export class WeeklyTable extends Component{

  returnEachRow = (data) =>
  {
    return (
      <tr>
        <td>{data.weekday}</td>
        <td>{data.temp}</td>
        <td>{data.rain}</td>
        <td>{data.cloud_c}</td>
      </tr>
    )
  }

  render()
  {
    console.log(this.props.daily);
      const content = this.props.daily.map((data) => this.returnEachRow(data));
      return (
        <table>
          <tr><td>Day</td><td>Temperature</td><td>Rain</td><td>Cloud Coverage</td></tr>
          {content}
        </table>
      );
  }
}
