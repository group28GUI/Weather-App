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
					<div >
					      <Route exact path="/" component ={MainPage}/>
								<Route path="/Weekly" component = {WeeklyPage}/>
								<Route path="/Main" component = {MainPage} />
					</div>

					<div class ={style.navbar}>
							 <div><NavLink to="/Weekly"><img src ="../../assets/backgrounds/calendar.png" alt="calendar"/></NavLink></div>
							 <div><NavLink to="/Main"><img src = "../../assets/backgrounds/home.png" alt="home"/></NavLink></div>
							 <div><NavLink to="/">DarkMode</NavLink></div>
					</div>
				</div>
				</BrowserRouter>
			</div>
			);
	}
}
