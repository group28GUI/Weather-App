import { h, render, Component } from 'preact';

import {PictureText} from '../components/PictureText'

import {Clock} from '../components/Clock';

var list =
	[
		{
			image:"",
			text:"Changes of Rain",
			variable:"rain",
			value:"",
			measure:"%"
		},
		{
			image:"",
			text:"Wind Speed",
			variable:"speed",
			value:"",
			measure:'mph'
		},
		{
			image:"",
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
		for (let i = 0;i<3;i++)
			list[i].value = this.props.value[i];
		console.log(list);
		const content = list.map((data) => this.returnEachRow(data));
		return (
			<div>
				<Clock />
				{content}
			</div>
		);
	}
}
