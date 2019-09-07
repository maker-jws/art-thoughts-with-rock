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
        //pass all of the cards in from props 
        const results = this.state.filteredResults.map((result, i) => {
            return (<ul key={i} className="Results-index-card">
                <li>
                    <div className="Results-card-header">
                        <label>{result.title}</label>
                    </div>
                    <div className="Results-card-body">
                        <p>{result.snippet}</p>
                    </div>

                    <button className="Results-card-button" onClick={() => { console.log(result) }}>Select</button>
                </li>
            </ul>)
        })
        return results;
    }

    render() {
        return (
            <div className="Results-wrapper">
                <label className="Results-header-label" >What I found...</label>
                <div className="ResultsIndex-row">{this.state.resultsHaveLoaded === true ? this.getAllCards() : null}</div>
            </div>
        );
    }
}
export default ResultIndex;


