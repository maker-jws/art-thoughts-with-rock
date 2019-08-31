import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import MainContainer from './Components/MainContainer/index'
import Navbar from './Components/Navbar/index'
import FooterNav from './Components/FooterNav/index'
import { Z_FILTERED } from 'zlib';
const fullResponse = require('./sample.json');
// const parsedResponse = JSON.parse(fullResponse)
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: [],
      lastSearch: "",
      allResults: [],
      chosenResults: [],
      recentResponseJson: {
        'entry': "0"
      }
    }
  }
  componentDidMount() {
    console.log('Main Container Loaded')
    // this.previewData();
    this.retrieveItems();
  }
  componentDidUpdate = () => {
    if (this.prevState !== this.state.search) {
      console.log('something is different')
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
  retrieveItems = () => {
    const temp = []
    fullResponse.items.map((item, idx) => {
      // console.log('this is ', idx, ':', item)
      // console.log(typeof item)
      temp.push(item);
    });
    this.setState({ allResults: [temp] }, () => {
      console.log(this.state.allResults, '<<<<<<<<all results after retrieve mapping done')
    })
    // this.filteredItems();
  }
  previewData = () => {
    console.log(fullResponse, "whole JSON object")
    console.log(fullResponse.items, "the items coming out of json ")
    console.log(fullResponse.queries.request[0], 'the first returned object from array Queries ') // meta information about the search // target all?
    console.log(fullResponse.items[0].pagemap.cse_image[0].src) //url for the image
    console.log(fullResponse.items[0].htmlTitle) //title of the page
    console.log(fullResponse.items[0].link) //title of the page
    console.log(fullResponse.items[0].snippet) //selection of the data)
  }
  render() {

    return (<div className="App">
      <Navbar />
      <main className="App-main"><MainContainer resultsToRender={this.state.chosenResults} /></main>
      <FooterNav searchSubmit={this.handleSearchSubmit} />
    </div>);
  }
}

export default App;

