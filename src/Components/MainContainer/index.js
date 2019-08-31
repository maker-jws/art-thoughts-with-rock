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
            `../../assets/img/rock01.png`,
            `../../assets/img/rock2.png`,
            `../../assets/img/rock3.png`,
            `../../assets/img/rock4.png`,
            `../../assets/img/rock5.png`,
            `../../assets/img/rock6.png`,
            `../../assets/img/rock7.png`,
            `../../assets/img/rock8.png`,
            `../../assets/img/rock9.png`,
            `../../assets/img/rock10.png`,
        ]
        const getSomeRocks = (items, count) => {
            let choices = [];
            for (let r = 0; r < count; r++) {
                let index = Math.floor(Math.random() * items.length)
                let choice = items[index];
                // console.log(index, 'choice', choice, 'chosen Item');
                // console.log(choices)
                choices.push(choice);
            }
            return choices;
        }
        const theRocks = getSomeRocks(allRocks, 3);
        const displayTheRocks = theRocks.map(rock => {
            //this is an array
            let count = Math.floor(Math.random() * 100)
            console.log(rock, 'inside displayTheRocks')
            // return <img key={count} src={require(rock)} />;
        })

        const imgStyle = {
            width: "400px",
            height: "400px",
            position: "absolute",
            bottom: '2%',
            left: '40%',
            zIndex: '150'
        }
        console.log(displayTheRocks);
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                {/* {displayTheRocks} */}
                <CanvasBG className="Canvas-BG-grad" text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
                <img src={rock0} style={imgStyle} />
                <img src={rock1} style={imgStyle} />
                <img src={rock2} style={imgStyle} />
            </div>
        );
    }
}

export default MainContainer;