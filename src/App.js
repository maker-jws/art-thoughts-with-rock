import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/index"
// import Navbar from "./Components/Navbar/index"
import CanvasBG from './Components/CanvasBG/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
        {/* <Navbar /> */}
        <main className="App-main">
          <MainContainer resultsToRender={this.state.chosenResults} />
          <CanvasBG className="Canvas-BG-grad" text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
        </main>

      </div>);
  }
}

export default App;


