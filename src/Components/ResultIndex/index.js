import React, { Component } from "react";
// import { setPriority } from "os";
// import { List, Segment, Button } from 'semantic-ui-react'

class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredList: []
        };
    }
    //   setPriorityStyle = task => {
    //     const highPriorityStyle = {
    //       border: "red solid 2px"
    //     };
    //     const medPriorityStyle = {
    //       border: "goldenrod solid 2px"
    //     };
    //     const lowPriorityStyle = {
    //       border: "lightgreen solid 2px"
    //     };
    //     const zeroPriorityStyle = {
    //       border: "lightblue solid 1px"
    //     };
    //     if (task.priority === "high") {
    //       return highPriorityStyle;
    //     } else if (task.priority === "medium") {
    //       return medPriorityStyle;
    //     } else if (task.priority === "low") {
    //       return lowPriorityStyle;
    //     } else if (task.priority !== null) {
    //       return zeroPriorityStyle;
    //     }
    //   };

    render() {
        const cardStyle = {
            height: "100px",
            width: "100px",
            backgroundColor: 'lightgray',
            border: "white 1px solid",
            boxSizing: "border-box",
            borderBottom: "3px solid white",
            fontSize: "36px",
        }
        return (
            <div className="ResultIndex-wrapper">
                <ul style={cardStyle} className="ResultIndex-col">This is a basic card</ul>
            </div>
        );
    }
}
export default ResultIndex;

