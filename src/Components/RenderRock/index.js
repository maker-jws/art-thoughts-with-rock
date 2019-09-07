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

    getSomeRocks = (items, count) => {
        let choices = [];
        for (let r = 0; r < count; r++) {
            let index = Math.floor(Math.random() * items.length)
            let choice = items[index];
            choices.push(choice);
        }
        return choices;
    }
    render() {
        return (
            <div>
                <img className="Rock-image" alt="a rock" src={rock0} />
                <img className="Rock-image" alt="a rock" src={rock1} />
                <img className="Rock-image" alt="a rock" src={rock2} />
            </div >

        );
    }
}

export default RenderRock;
