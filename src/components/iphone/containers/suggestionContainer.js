import { h, render, Component } from 'preact';

import style from '../style';

const suggestedText = ["Make sure you take an umbrella, also wear a jacket and non-slipery shoes."];

export class SuggestionContainer extends Component{
  render()
  {
    return (
      <div class={style.suggestionbox}>
      {suggestedText}
       </div>)
  }
}
