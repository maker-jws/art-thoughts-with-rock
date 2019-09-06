import React, { Component } from "react";
class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsHaveLoaded: false,
            filteredResults: []
        };
    }
    componentDidMount() {
        if (this.state.filteredResults !== this.props.filteredResults) {
            this.setState({
                filteredResults: [...this.props.filteredResults],
                resultsHaveLoaded: true
            }, () => {
                this.getAllCards();
                console.log(this.state.filteredList, 'called from inside componentDidMount')
            })
        }
    }
    componentDidUpdate() {
        if (this.state.filteredResults !== this.props.filteredResults) {
            this.setState({
                filteredResults: this.props.filteredResults,
                resultsHaveLoaded: true
            }, () => {
                this.getAllCards();
                console.log(this.state.filteredList, 'called from inside componentDidMount')
            })
        }
    }
    getAllCards = () => {
        const cardStyle = {
            padding: "0",
            minHeight: "350px",
            maxHeight: "450px",
            width: "350px",
            border: "rgba(255,255,255,.8) 1px solid",
            boxSizing: "border-box",
            borderBottom: "4px solid white",
            zIndex: "25",
            top: "10%",
            boxShadow: "0 0 20px rgba(0 0 0 .2)",
            textAlign: "center",
            backgroundColor: 'lightgray',
            margin: "1rem",
            listStyle: "none",
            borderRadius: ".2rem"
        }
        //pass all of the cards in from props 
        const results = this.state.filteredResults.map((result, i) => {
            // console.log(result, i)
            return (<ul style={cardStyle}>
                <li>
                    <h1>{result.title}</h1>
                    <label>Summary:</label>
                    <hr />
                    <p>{result.snippet}</p>
                    <button onClick={() => { console.log(result) }}>Select</button>

                </li>
            </ul>)
        })
        return results;
    }

    render() {
        const resultsWrapperStyle = {
            display: 'flex',
            flexDirection: 'column',
            marginTop: "10vh",
        }
        const rowStyle = {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingLeft: "2rem"
        }
        const resultsLabel = {
            paddingLeft: "3rem",
            textAlign: "start",
            fontSize: "3rem",
            fontWeight: "200",
            fontStyle: "italic",
            color: "rgba(255,255,255,.8)"

        }
        return (
            <div style={resultsWrapperStyle}>
                <label style={resultsLabel}>What I found...</label>
                <div style={rowStyle}>{this.state.resultsHaveLoaded === true ? this.getAllCards() : null}</div>
            </div>
        );
    }
}
export default ResultIndex;


