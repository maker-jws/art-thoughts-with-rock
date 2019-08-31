import React, { Component } from "react";
// import { setPriority } from "os";
// import { List, Segment, Button } from 'semantic-ui-react'

class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        let taskCount = 0;
        const displayFilteredResults = this.props.filteredList.map(result => {
            return (console.log("this is loaded"));
        })
        return (
            <div className="ResultIndex-wrapper">
                <div className="ResultIndex-col">{displayFilteredResults}</div>
            </div>
        );
    }
}
export default ResultIndex;

