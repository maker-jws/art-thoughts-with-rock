import React, { Component } from 'react';
import CanvasBG from '../CanvasBG/index';
import rock0 from '../../assets/img/rock01.png';
import rock1 from '../../assets/img/rock2.png';
import rock2 from '../../assets/img/rock3.png';
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

    // rockList = (num) => {
    //     console.log(allRocks[num])
    //     return allRocks[num]
    // }
    // componentDidUpdate() {
    //     // const currentHeight = Math.floor(window.innerHeight * .55);
    //     // const currentWidth = Math.floor(window.innerWidth * .55);
    //     if (this.state.winWidth !== currentWidth) { //this should be inside a setInterval()
    //         this.setState({
    //             winWidth: currentWidth, //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
    //             winHeight: currentHeight,
    //         })
    //     }
    // }

    onClicked = (x, y) => {
        this.setState({
            ...this.state,
            clickedX: x,
            clickedY: y,
        })
        console.log(this.state.clickedX, this.state.clickedY)
    }
    render() {
        const allRocks = [
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
            '../../assets/img/rock01.png',
        ]
        const imgStyle = {
            width: "400px",
            height: "400px",
            position: "absolute",
            bottom: '2%',
            left: '40%',
            zIndex: '150'
        }
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                <CanvasBG className="Canvas-BG-grad" text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
                <img src={rock0} style={imgStyle} />
                <img src={rock1} style={imgStyle} />
                <img src={rock2} style={imgStyle} />
            </div>
        );
    }
}

export default MainContainer;