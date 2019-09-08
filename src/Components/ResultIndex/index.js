import React, { Component } from "react";
class ResultIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsHaveLoaded: false,
            filteredResults: [],
        };
    }
    componentDidMount() {
        console.log(this.state, "state at start of componentDidMount - results index")
        if (this.state.filteredResults !== this.props.filteredResults) {
            this.setState({
                filteredResults: [...this.props.filteredResults],
                resultsHaveLoaded: true
            }, () => {
                this.getAllCards();
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
            })
        }
    }
    getAllCards = () => {
        //pass all of the cards in from props 
        // console.log(this.props.filteredResults, 'called from inside GetAllCards')
        const results = this.state.filteredResults.map((result, i) => {
            return (<ul key={i} className="Results-index-card">
                <li>
                    <div className="Results-card-header">
                        <label>{result.title}</label>
                    </div>
                    <div className="Results-card-body">
                        <p>{result.snippet}</p>
                    </div>
                    <button className="Results-card-button" onClick={() => { this.props.handleSelection(result) }}>Select</button>
                </li>
            </ul>)
        })
        return results;
    }
    handleNextItems = (e) => {
        e.preventDefault()
        this.props.getNextItems();
    }
    handlePreviousItems = (e) => {
        e.preventDefault()
        this.props.getPrevItems();
    }
    render() {
        return (
            <div className="Results-wrapper">
                <label className="Results-header-label" >What I found...</label>
                <div className="ResultsIndex-row">
                    <div><button onClick={this.handlePreviousItems}>Previous</button></div>
                    <div className="ResultsIndex-row">{this.state.resultsHaveLoaded === true ? this.getAllCards() : null}</div>
                    <div><button onClick={this.handleNextItems}>Next</button></div>
                </div>


            </div>
        );
    }
}
export default ResultIndex;


