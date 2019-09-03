import React, { Component } from "react";
import { createSecureContext } from "tls";
// import { setPriority } from "os";
// import { List, Segment, Button } from 'semantic-ui-react'

class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    componentDidUpdate() {
        if (this.state.filteredList !== this.props.filteredResults) {
            this.setState({
                filteredList: this.props.filteredResults
            })
        }
    }
    render() {
        const whiteBackground = {
            backgroundColor: "white"
        }
        const populateCards = () => {
            if (this.state.filteredList !== undefined) {
                // const currentList = this.state.filteredList[0]
                // console.log(currentList)
                for (let i = 0; i < 3; i++) {
                    return (
                        <li style={whiteBackground}>
                            <label>Result {i}</label>
                            {/* <h1>{currentList[i].title}</h1> */}
                            <label>Summary:</label>
                            <hr />
                            {/* <p>{currentList[i].snippet}</p> */}
                            <button onClick={() => { console.log(this) }}>Select</button>
                            <p>just give me something</p>
                        </li>)
                }
                // return (<div>a new thing</div>)
            }
            console.log('populateCards fired')
        }

        return (
            <div className="ResultIndex-wrapper">
                <div className="ResultsIndex-row">
                    <ul className="ResultsIndex-card">{populateCards()}</ul>
                </div>
            </div>
        );
    }
}
export default ResultIndex;

