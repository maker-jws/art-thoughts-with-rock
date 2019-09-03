import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/index"
import Navbar from "./Components/Navbar/index"
import FooterNav from "./Components/FooterNav/index"
import CanvasBG from './Components/CanvasBG/index';
const fullResponse = require("./sample.json");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchHistory: [],
      lastSearch: "",
      allResults: [],
      chosenResults: [],
      recentResponseJson: {
        "entry": "0"
      },
      resultsLoaded: false,
      resltsLoading: false,
      winWidth: Math.floor(window.innerWidth), //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
      winHeight: Math.floor(window.innerHeight),
      clickedX: null,
      clickedY: null,
    }
  }
  componentDidMount() {
    console.log("Main Container Loaded")
    // this.previewData(); 
  }
  componentDidUpdate = () => {
    if (this.prevState !== this.state.searchHistory) {
      console.log("something is different")
    }
  }
  handleSearchSubmit = async (query) => {
    try {
      this.setState({ searchHistory: [...this.state.searchHistory, query] });
      this.retrieveItems();
    }
    catch (err) {
      console.log(err)
    }
  }
  filteredItems = async (source) => {
    // console.log(source, 'at beginning of filteredItems')
    const temp = []
    try {
      for (let i = 0; i < 3; i++) {
        let index = Math.floor(Math.random() * source.length);
        // console.log(index)
        temp.push(source[index])
      }
      this.setState({
        chosenResults: [...temp]
      }, () => {
        // console.log('filtered results loaded')
        console.log('this.state.chosenResults', this.state.chosenResults)
      })
    } catch (err) {
      console.log(err);
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
    ///
    fullResponse.items.map((item, idx) => {
      console.log(item);
      temp.push(item);
    });
    console.log(temp);
    this.setState({ allResults: [temp] }, () => {
      // console.log("all results loaded in retrievedItems")
      this.filteredItems(temp)
    })
  }
  previewData = () => {
    console.log(fullResponse, "whole JSON object")
    console.log(fullResponse.items, "the items coming out of json ")
    console.log(fullResponse.queries.request[0], "the first returned object from array Queries ") // meta information about the search // target all?
    console.log(fullResponse.items[0].pagemap.cse_image[0].src) //url for the image
    console.log(fullResponse.items[0].htmlTitle) //title of the page
    console.log(fullResponse.items[0].link) //title of the page
    console.log(fullResponse.items[0].snippet) //selection of the data)
  }
  onClicked = (x, y) => {
    this.setState({
      ...this.state,
      clickedX: x,
      clickedY: y,
    })
    // console.log(this.state.clickedX, this.state.clickedY)
  }
  render() {

    return (
      <div className="App">
        <Navbar />
        <main className="App-main"><MainContainer resultsToRender={this.state.chosenResults} /></main>
        <FooterNav searchSubmit={this.handleSearchSubmit} />
        <CanvasBG className="Canvas-BG-grad" text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
      </div>);
  }
}

export default App;


