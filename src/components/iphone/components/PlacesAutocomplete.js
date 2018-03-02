import { h, render, Component } from 'preact';
import {defaultStyles} from './defaultStyles';
import {locationSetUp} from '../Page/MainPage';

class PlacesAutocomplete extends Component {

  constructor(props) {
    super(props)

    this.state = {
      autocompleteOK : false,
      autocompleteItems: [],
      userInputValue: locationSetUp,
    }

    this.autocompleteCallback = this.autocompleteCallback.bind(this)
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.clearSuggestions = this.clearSuggestions.bind(this)
    this.autocompleteOK = this.autocompleteOK.bind(this)
    this.inputProps = this.inputProps.bind(this);
  }

  autocomplete = (value) =>{
    this.setState(
      {...this.state,
        autocompleteOK : true
      });
  }

  componentDidMount() {
     this.autocompleteService = this.getPlacePredictions();
  }

  getPlacePredictions = () => {
    var search = this.getInputProps;
    // API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
    var url = "http://autocomplete.wunderground.com/aq?query="+search;
    $.ajax({
      url: url,
      dataType: "jsonp",
      success : this.autocompleteCallback,
      error : this.autocompleteOK(false)
    })
    // once the data grabbed, hide the button
    this.setState({ display: false });
  }

  autocompleteCallback(parsed_json){//(predictions, status) {

    if (status !== this.state.autocompleteOK) {
      this.props.onError(status, this.clearSuggestions)
      return
    }

    // transform snake_case to camelCase
    const formattedSuggestion = structured_formatting => ({
      mainText: structured_formatting.main_text,
      secondaryText: structured_formatting.secondary_text,
    })

    const { highlightFirstSuggestion } = this.props

    this.setState({
      autocompleteItems: parsed_json["RESULTS"].map((p, idx) => ({
        suggestion: p.name,
        placeId: p.lat+","+p.log,
        active: highlightFirstSuggestion && idx === 0 ? true : false,
        index: idx
      })),
      autocompleteOK : true,
      formattedSuggestion: formattedSuggestion(p.structured_formatting),
    })
  }

  renderSuggestion = ({ formattedSuggestion }) => (
    <div className="Demo__suggestion-item">
      <i className="fa fa-map-marker Demo__suggestion-icon" />
      <strong>{formattedSuggestion.mainText}</strong>{' '}
      <small className="text-muted">{formattedSuggestion.secondaryText}</small>
    </div>
  )

  fetchPredictions() {
    const { value } = this.props.inputProps
    if (value.length) {
      this.autocompleteService.getPlacePredictions(
        {
          ...this.props.options,
          input: value,
        },
        this.autocompleteCallback
      )
    }
  }

  clearSuggestions() {
    this.setState({ autocompleteItems: [] })
  }

  clearActive() {
    this.setState({
      autocompleteItems: this.state.autocompleteItems.map(item => ({
        ...item,
        active: false,
      })),
    })
  }

  selectAddress(address, placeId, e) {
    if (e !== undefined) {
      e.preventDefault()
    }
    this.clearSuggestions()
    this.handleSelect(address, placeId)
  }

  handleSelect(address, placeId) {
    this.props.onSelect
      ? this.props.onSelect(address, placeId)
      : this.props.inputProps.onChange(address)
  }

  inputProps(){
    const element = document.getElementById("PlacesAutocomplete__input");
    const inputProps = element.attributes;

    if (!inputProps.hasOwnProperty('value')) {
      throw new Error("'inputProps' must have 'value'.")
    }

    if (!inputProps.hasOwnProperty('onChange')) {
      throw new Error("'inputProps' must have 'onChange'.")
    }
    return inputProps;
  }

  getActiveItem() {
    return this.state.autocompleteItems.find(item => item.active)
  }

  selectActiveItemAtIndex(index) {
    const activeName = this.state.autocompleteItems.find(
      item => item.index === index
    ).suggestion
    this.setActiveItemAtIndex(index)
    this.props.inputProps.onChange(activeName)
  }

  selectUserInputValue() {
    this.clearActive()
    this.props.inputProps.onChange(this.state.userInputValue)
  }

  handleEnterKey() {
    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.handleEnterKeyWithoutActiveItem()
    } else {
      this.selectAddress(activeItem.suggestion, activeItem.placeId)
    }
  }

  handleEnterKeyWithoutActiveItem() {
    if (this.props.onEnterKeyDown) {
      this.props.onEnterKeyDown(this.props.inputProps.value)
      this.clearSuggestions()
    } else {
      return //noop
    }
  }

  handleDownKey() {
    if (this.state.autocompleteItems.length === 0) {
      return
    }

    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(0)
    } else if (activeItem.index === this.state.autocompleteItems.length - 1) {
      this.selectUserInputValue()
    } else {
      this.selectActiveItemAtIndex(activeItem.index + 1)
    }
  }

  handleUpKey() {
    if (this.state.autocompleteItems.length === 0) {
      return
    }

    const activeItem = this.getActiveItem()
    if (activeItem === undefined) {
      this.selectActiveItemAtIndex(this.state.autocompleteItems.length - 1)
    } else if (activeItem.index === 0) {
      this.selectUserInputValue()
    } else {
      this.selectActiveItemAtIndex(activeItem.index - 1)
    }
  }

  handleInputKeyDown(event) {
    switch (event.key) {
      case 'Enter':
        event.preventDefault()
        this.handleEnterKey()
        break
      case 'ArrowDown':
        event.preventDefault() // prevent the cursor from moving
        this.handleDownKey()
        break
      case 'ArrowUp':
        event.preventDefault() // prevent the cursor from moving
        this.handleUpKey()
        break
      case 'Escape':
        this.clearSuggestions()
        break
    }

    if (this.props.inputProps.onKeyDown) {
      this.props.inputProps.onKeyDown(event)
    }
  }

  setActiveItemAtIndex(index) {
    this.setState({
      autocompleteItems: this.state.autocompleteItems.map((item, idx) => {
        if (idx === index) {
          return { ...item, active: true }
        } else {
          return { ...item, active: false }
        }
      }),
    })
  }

  handleInputChange(event) {
    const { value } = event.target
    this.props.inputProps.onChange(value)
    this.setState({ userInputValue: value })
    if (!value) {
      this.clearSuggestions()
      return
    }
    if (this.props.shouldFetchSuggestions({ value })) {
      this.debouncedFetchPredictions()
    }
  }

  handleInputOnBlur(event) {
    if (!this.mousedownOnSuggestion) {
      this.clearSuggestions()
    }

    if (this.props.inputProps.onBlur) {
      this.props.inputProps.onBlur(event)
    }
  }

  inlineStyleFor(...props) {
    const { classNames, styles } = this.props
    // No inline style if className is passed via props for the element.
    if (props.some(prop => classNames.hasOwnProperty(prop))) {
      return {}
    }

    return props.reduce((acc, prop) => {
      return {
        ...acc,
        ...defaultStyles[prop],
        ...styles[prop],
      }
    }, {})
  }

  classNameFor(...props) {
    const { classNames } = this.props

    return props.reduce((acc, prop) => {
      const name = classNames[prop] || ''
      return name ? `${acc} ${name}` : acc
    }, '')
  }

  getInputProps() {
    const defaultInputProps = {
      type: 'text',
      autoComplete: 'off',
    }
    const inputProps = this.inputProps();
    return {
      inputProps,
      onChange: event => {
        this.handleInputChange(event)
      },
      onKeyDown: event => {
        this.handleInputKeyDown(event)
      },
      onBlur: event => {
        this.handleInputOnBlur(event)
      },
      style: this.inlineStyleFor('input'),
      className: this.classNameFor('input'),
    }
  }

  handleSuggestionMouseEnter(index) {
    this.setActiveItemAtIndex(index)
  }

  handleSuggestionMouseLeave() {
    this.mousedownOnSuggestion = false
    this.clearActive()
  }

  handleSuggestionMouseDown(event) {
    event.preventDefault()
    this.mousedownOnSuggestion = true
  }

  handleSuggestionTouchStart() {
    this.mousedownOnSuggestion = true
  }

  handleSuggestionMouseUp() {
    this.mousedownOnSuggestion = false
  }

  handleSuggestionClick(prediction, event) {
    const { suggestion, placeId } = prediction
    this.selectAddress(suggestion, placeId, event)
    setTimeout(() => {
      this.mousedownOnSuggestion = false
    })
  }

  render() {
    const { autocompleteItems } = this.state
    const inputProps = this.getInputProps()

    return (
      <div
        id="PlacesAutocomplete__root"
        style={this.inlineStyleFor('root')}
        className={this.classNameFor('root')}
      >
        <input id ="PlacesAutocomplete__input"/>
        {autocompleteItems.length > 0 && (
          <div
            id="PlacesAutocomplete__autocomplete-container"
            style={this.inlineStyleFor('autocompleteContainer')}
            class={this.classNameFor('autocompleteContainer')}
          >
            {autocompleteItems.map((p, idx) => (
              <div
                key={p.placeId}
                onMouseEnter={this.handleSuggestionMouseEnter.bind(this, idx)}
                onMouseLeave={this.handleSuggestionMouseLeave.bind(this)}
                onMouseDown={this.handleSuggestionMouseDown.bind(this)}
                onMouseUp={this.handleSuggestionMouseUp.bind(this)}
                onTouchStart={this.handleSuggestionTouchStart.bind(this)}
                onTouchEnd={this.handleSuggestionMouseUp.bind(this)}
                onClick={this.handleSuggestionClick.bind(this, p)}
                class = {
                  p.active ? (
                    defaultStyles.autocompleteItem,
                    defaultStyles.autocompleteItemActive
                  )
                  : defaultStyles.autocompleteItem
                }

              >
                {this.props.renderSuggestion({
                  suggestion: p.suggestion,
                  formattedSuggestion: p.formattedSuggestion,
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
}
