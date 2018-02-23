import { h, render, Component } from 'preact';

import {PictureText} from '../components/PictureText'

var list =
	[
		{
			image:"",
			text:"Changes of Rain",
			variable:"rain",
			value:""
		},
		{
			image:"",
			text:"Cloud Coverage",
			variable:"speed",
			value:""
		},
		{
			image:"",
			text:"Wind Speed",
			variable:"cloud_c",
			value:""
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
		return <PictureText name = {data.variable} value = {data.value} text = {data.text} img = {data.image}/>;
	}
	//? something short ?
	render(){
		for (let i = 0;i<3;i++)
			list[i].value = this.props.value[i];
		const content = list.map((data) => this.returnEachRow(data));
		return (
			<div>
				{content}
			</div>
		);
	}
}
