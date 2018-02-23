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
        <img src = {this.props.img} />
        <div>{this.props.text}</div>
        <div> {this.props.value} </div>
      </div>
    );
  }

}
