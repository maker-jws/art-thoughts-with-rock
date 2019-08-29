import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MainContainer from './Components/MainContainer/index'
import Navbar from './Components/Navbar/index'
import FooterNav from './Components/FooterNav/index'
const fullResponse = require('./sample.json');
//const fullResponse = 


// console.log(fullResponse);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      lastSearch: "",
      chosenResults: [],
      recentResponseJson: {
        'entry': "0"
      }
    }
  }
  componentDidMount() {
    console.log('Main Container Loaded')
  }
  componentDidUpdate = () => {
    if (this.prevState !== this.state.search) {
      console.log('something is different')
      console.log(this.state.search)
    }
  }
  handleSearchSubmit = async (query) => {
    try {
      this.setState({ search: [...this.state.search, query] });
      //makeFetch to Google //
      //Take Response 
      //targetResponse 
    }
    catch (err) {
      console.log(err)
    }
  }
  targetResponse = async () => {
    try {
      console.log("targetResponse Ran")
    } catch (err) {
      console.log(err)
    }
  }
  eval
  render() {
    return (<div className="App">
      <Navbar />
      <main className="App-main"><MainContainer /></main>
      <FooterNav searchSubmit={this.handleSearchSubmit} />
    </div>);
  }
}

export default App;

