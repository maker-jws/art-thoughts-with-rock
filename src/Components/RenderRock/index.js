import React, { Component } from 'react';
import rock0 from './img/rock01.png';
import rock1 from './img/rock2.png';
import rock2 from './img/rock3.png';
class RenderRock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRocks: [
                `./img/rock01.png`,
                `./img/rock2.png`,
                `./img/rock3.png`,
                `./img/rock4.png`,
                `./img/rock5.png`,
                `./img/rock6.png`,
                `./img/rock7.png`,
                `./img/rock8.png`,
                `./img/rock9.png`,
                `./img/rock10.png`,
            ]
        }
    }
    // rockItem = (num) => {
    //     console.log(allRocks[num])
    //     return allRocks[num]
    // }

    imgStyle = {
        width: "400px",
        height: "400px",
        position: "absolute",
        bottom: '2%',
        left: '40%',
        zIndex: '150'
    }
    getSomeRocks = (items, count) => {
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
    render() {
        return (
            <div>

                < img alt="a rock" src={rock0} style={this.imgStyle} />
                <img alt="a rock" src={rock1} style={this.imgStyle} />
                <img alt="a rock" src={rock2} style={this.imgStyle} />
            </div >

        );
    }
}

export default RenderRock;

// // const theRocks = this.getSomeRocks(this.state.allRocks, 3);
        // console.log(theRocks, 'the rocks inside render')