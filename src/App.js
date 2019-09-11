import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/index"
import CanvasBG from './Components/CanvasBG/index';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winWidth: Math.floor(window.innerWidth),
      winHeight: Math.floor(window.innerHeight),
      clickedX: null,
      clickedY: null,
      rotation: 0,
    }
  }
  componentDidMount() {
    setInterval(() => { this.updateBGSize() }, 250) //calls update once every 250ms
  }


  updateBGSize() {
    const newHeight = window.innerHeight
    const newWidth = window.innerWidth
    if (this.state.winHeight !== newHeight || this.state.winWidth !== newWidth) {
      this.setState({
        winWidth: newWidth, //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
        winHeight: newHeight,
      })
    }
  }
  onClicked = (x, y) => {
    this.setState({
      ...this.state,
      clickedX: x,
      clickedY: y,
    })
    console.log(this.state.clickedX, this.state.clickedY)
  }
  render() {
    return (
      <div className="App">
        <main className="App-main">
          <MainContainer resultsToRender={this.state.chosenResults} onClicked={this.onClicked} />
        </main>

        <CanvasBG rotation={this.state.rotation} className="Canvas-BG-grad" width={400} height={400} winWidth={this.state.winWidth} winHeight={this.state.winHeight} />
      </div>);
  }
}
export default App;
