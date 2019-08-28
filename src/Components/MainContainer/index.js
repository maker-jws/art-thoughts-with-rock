import React, { Component } from 'react';
import CanvasBG from '../CanvasBG/index'
class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: Math.floor(window.innerWidth), //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
            winHeight: Math.floor(window.innerHeight),
            clickedX: null,
            clickedY: null,
        }
    }

    onClicked = (x, y) => {
        this.setState({
            ...this.state,
            clickedX: x,
            clickedY: y,

        })
    }
    render() {
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                <CanvasBG text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
            </div>
        );
    }
}

export default MainContainer;