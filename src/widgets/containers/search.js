import React, { Component } from 'react';
import Search from '../components/search';
import { connect } from 'react-redux';

class SearchContainer extends Component {
  state = {
    value: '¿Que quieres buscar?'
  }
  handleSubmit =  (event) => {
    event.preventDefault();
    console.log(this.input.value, 'submit')
    this.props.dispatch ({
      type: 'SEARCH_VIDEO',
      payload: {
        query: this.input.value,
      }
    })
  }
  setInputRef = (element) => {
    this.input = element
  }
  handleInputCHange = (event) => {
    this.setState ({
      value:this.input.value.replace(' ', '-')
    })
  }
  render(){
  		return(
          <Search
            setRef            = {this.setInputRef}
            handleChange      = {this.handleInputCHange}
            handleSubmit      = {this.handleSubmit}
            value             = {this.state.value}/>
      )
  }
}

export default connect()(SearchContainer);
