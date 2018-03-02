import { h, render, Component } from 'preact';

import style from '../style';

export class PictureText extends Component
{
  // a constructor with initial set states
	constructor(props){
		super(props);
	}

  render() {
    return (
      <div>
        <img src = {this.props.data.image} />
        <div>{this.props.data.text}</div>
				<div> {this.props.data.value} {this.props.data.measure}</div>
      </div>
    );
  }

}
