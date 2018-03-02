// import preact
import { h, render, Component } from 'preact';

import {MainPage} from './Page/MainPage';
import {WeeklyPage} from './Page/WeeklyPage';

import {Route,NavLink,BrowserRouter,browserHistory,IndexRoute} from "react-router-dom";
import Button from '../button';

import style from './style';

export default class Iphone extends Component {
//var Iphone = React.createClass({
	constructor(props){
		super(props);
	}

	render()
	{
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.title }> Smart Weather </div>
				</div>

				<BrowserRouter>
				<div>
					<div className="content">
					      <Route exact path="/" component ={MainPage}/>
								<Route path="/Weekly" component = {WeeklyPage}/>
								<Route path="/Main" component = {MainPage} />
					</div>
					<div class={ style.menu }>
							<NavLink to="/Weekly">Weekly</NavLink>
							<NavLink to="/Main">Home</NavLink>
							<NavLink to="/">L</NavLink>
						</div>
					</div>
				</BrowserRouter>
			</div>
			);
	}
}
