import React, { Component } from 'react';
import rock0 from '../../assets/img/rock01.png';
import rock1 from '../../assets/img/rock2.png';
import rock2 from '../../assets/img/rock3.png';
class RenderRock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allRocks: [
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
        const theRocks = this.getSomeRocks(this.state.allRocks, 3);
        // This function will grab any rocks returned by theRocks and retun n image files 
        const displayTheRocks = theRocks.map(rock => {
            let count = Math.floor(Math.random() * 100)
            // console.log(rock, 'inside displayTheRocks')
            return <img key={count} src={(rock)} />;
        })

        return (
            <div>
                <img alt="a rock" src={rock0} style={this.imgStyle} />
                <img alt="a rock" src={rock1} style={this.imgStyle} />
                <img alt="a rock" src={rock2} style={this.imgStyle} />
            </div>

        );
    }
}

export default RenderRock;