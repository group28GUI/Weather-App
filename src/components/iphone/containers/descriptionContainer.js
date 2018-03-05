import { h, render, Component } from 'preact';

import {PictureText} from '../components/PictureText'

import style from '../style';

var list =
	[
		{
			image:"https://icons.wxug.com/i/c/k/rain.gif",
			text:"Chances of Rain",
			variable:"rain",
			value:"",
			measure:"%"
		},
		{
			image:"../../assets/backgrounds/wind.png",
			text:"Wind Speed",
			variable:"speed",
			value:"",
			measure:'mph'
		},
		{
			image:"https://icons.wxug.com/i/c/k/cloudy.gif",
			text:"Cloud Coverage",
			variable:"cloud_c",
			value:"",
			measure:'%'
		}
	];

export class DescriptionContainer extends Component
{
  // a constructor with initial set states
	constructor(props){
		super(props);

	}

	returnEachRow = (data) =>
	{
		return <PictureText data = {data}/>;
	}
	//? something short ?
	render(){
		for (let i = 0;i<3;i++){
			list[i].value = this.props.value[i];
		}
		const content = list.map((data) => this.returnEachRow(data));
		return (
			<div class={style.maininfo}>
				{content}
			</div>
		);
	}
}
