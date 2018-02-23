import { h, render, Component } from 'preact';

import style from '../style';

export class HourPicture extends Component
{
  constructor(props){
		super(props);
	}

  render()
  {
    const tempStyles = this.props.temp ? `${style.temperature} ${style.filled}` : style.temperature;
    if (this.props.temp){
      return (
        <div>
          <div>{this.props.hour} : 00</div>
          <div class={ tempStyles }>{this.props.temp}</div>
        </div>
      )
    }
    else
      return <div></div>
  }
}
