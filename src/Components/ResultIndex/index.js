import React, { Component } from "react";
import { createSecureContext } from "tls";
// import { setPriority } from "os";
// import { List, Segment, Button } from 'semantic-ui-react'

class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredList: ""
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
    componentDidUpdate() {
        if (this.state.filteredList !== this.props.filteredResults) {
            this.setState({
                filteredList: this.props.filteredResults
            })
        }
    }
    render() {
        const cardStyle = {
            padding: "0",
            height: "350px",
            width: "350px",
            backgroundColor: 'lightgray',
            border: "white 1px solid",
            boxSizing: "border-box",
            borderBottom: "4px solid white",
            position: "absolute",
            zIndex: "25",
            top: "10%",
            boxShadow: "0 0  20px rgba(0, 0, 0, .2)",
            textAlign: "center"
        }
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap'
        }
        const populateCards = () => {
            if (this.state.filteredList.length !== 0) {
                const currentList = this.state.filteredList
                for (let i = 0; i < 3; i++) {
                    return (
                        <li style={cardStyle}>
                            <label>Result {i}</label>
                            <h1>{currentList[0][i].title}</h1>
                            <label>Summary:</label>
                            <hr />
                            <p>{currentList[0][i].snippet}</p>
                            <button onClick={() => { console.log(this) }}>Select</button>
                        </li>)
                }
            }
        }

        return (
            <div className="ResultIndex-wrapper">
                <div className="ResultsIndex-row" style={rowStyle}>
                    {populateCards()}
                </div>
            </div>
        );
    }
}
export default ResultIndex;

