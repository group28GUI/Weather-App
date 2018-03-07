// import preact
import { h, render, Component } from 'preact';

export default class Button extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			this.props.src? <div>
				<button onClick={clickFunction}>
					<img src = {this.props.src} alt = {this.props.value}/>
				</button>
				</div>:
				<span>
					<button type={this.props.type} onClick={clickFunction}>
						{this.props.value}
					</button>
					</span>
		);
	}
}
