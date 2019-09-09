import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/index"
import CanvasBG from './Components/CanvasBG/index';
// import Graphic from './Components/RenderGraphic/index'
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
    this.tick = this.tick.bind(this); //allows tick rotation declaration to be bound to app>state
  }
  componentDidMount() {
    requestAnimationFrame(this.tick); //starts rotation
    setInterval(() => { this.updateBGSize() }, 200)
  }
  tick() {
    const rotation = this.state.rotation + 0.02;
    this.setState({ rotation });
    requestAnimationFrame(this.tick); //communicates with dom, calling this.tick (itself)
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
        {/* <Navbar x={this.state.clickedX} y={this.state.clickedY} /> */}
        <main className="App-main">
          <MainContainer resultsToRender={this.state.chosenResults} onClicked={this.onClicked} />
        </main>
        <CanvasBG rotation={this.state.rotation} className="Canvas-BG-grad" width={400} height={400} winWidth={this.state.winWidth} winHeight={this.state.winHeight} />
      </div>);
  }
}
export default App;


// clickedX={this.state.clickedX} clickedY={this.state.clickedY}