import React, { Component } from 'react';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultsToRender: []//passing in a 
        }
    }
    componentDidUpdate() {
        if (this.state.resultsToRender !== this.props.resultsToRender) {
            this.sendUpdatedResults();
        }
    }
    getUpdatedResult = () => {
        let sentResults = this.props.resultsToRender
        // console.log(sentResults, 'array inside getUpdatedResults')
        return sentResults
    }

    sendUpdatedResults = async () => {
        const results = await this.getUpdatedResult();
        this.setState({
            resultsToRender: results
        }, () => {
            console.log(this.state.resultsToRender)
        })
    }
    render() {
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                <RenderRock />
                <ResultIndex className="Resultsindex-wrapper" filteredResults={this.state.resultsToRender} />
            </div>
        );
    }
}

export default MainContainer;

