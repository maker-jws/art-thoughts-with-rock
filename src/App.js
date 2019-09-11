import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import MainContainer from "./Components/MainContainer/index"
import CanvasBG from './Components/CanvasBG/index';
import RenderSky from './Components/RenderSky/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      winWidth: Math.floor(window.innerWidth),
      winHeight: Math.floor(window.innerHeight),
      clickedX: null,
      clickedY: null,
      rotation: 0,
      colors: [
        "#ffffcc",
        "#ffff99",
        "#ffcc99",
        "#ff9966",
        "#ffcccc",
        "#ff9999"],
      Mx: -1.1 * Math.floor(window.innerWidth) / 10,
      My: Math.floor(window.innerHeight) / 10,
      Mradius: 150,
      Mradians: 0,
      Mvelocity: .0009
    }
  }
  componentDidMount() {
    this.animateObjects();
    setInterval(() => { this.updateBGSize() }, 250) //calls update once every 250ms
  }
  animateObjects = () => {
    const rotation = this.state.rotation + 0.02;
    const Mx = this.state.Mx
    const My = this.state.My
    const Mradians = this.state.Mradians
    const Mvelocity = this.state.Mvelocity
    const newMRadians = Mradians + Mvelocity
    const newMX = Mx + (Math.cos(Mradians) * 1.5)
    const newMY = My + (Math.sin(Mradians) * .68)

    const Sx = this.state.Sx
    const Sy = this.state.Sy
    const Sradians = this.state.Sradians
    const Svelocity = this.state.Svelocity
    const newSRadians = Sradians + Svelocity
    const newSX = Sx + (Math.cos(Sradians) * 1.2)
    const newSY = Sy + (Math.sin(Sradians) * 1.6)
    this.setState({
      rotation: rotation,
      Mradians: newMRadians,
      Mx: newMX,
      My: newMY,
      Sradians: newSRadians,
      Sx: newSX,
      Sy: newSY,
    }, () => { requestAnimationFrame(this.animateObjects) });
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

  render() {
    return (
      <div className="App">
        <main className="App-main">
          <MainContainer resultsToRender={this.state.chosenResults} />
        </main>
        <CanvasBG rotation={this.state.rotation} className="Canvas-BG-grad" width={400} height={400} winWidth={this.state.winWidth} winHeight={this.state.winHeight} />
        {this.state.Mx > -200 && this.state.My > -250 ? <RenderSky className="RenderSky-canvas" x={this.state.Mx} y={this.state.My} width={this.state.winWidth} height={this.state.winHeight} radius={this.state.Mradius} colors={this.state.colors} /> : null}
      </div>);
  }
}
export default App;
