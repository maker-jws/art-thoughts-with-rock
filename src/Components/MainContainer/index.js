import React, { Component } from 'react';
import CanvasBG from '../CanvasBG/index';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: Math.floor(window.innerWidth), //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
            winHeight: Math.floor(window.innerHeight),
            clickedX: null,
            clickedY: null,
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
        console.log(sentResults, 'array inside getUpdatedResults')
        return sentResults
    }

    sendUpdatedResults = async () => {
        const results = await this.getUpdatedResult();
        this.setState({
            resultsToRender: results
        })
    }

    onClicked = (x, y) => {
        this.setState({
            ...this.state,
            clickedX: x,
            clickedY: y,
        })
        // console.log(this.state.clickedX, this.state.clickedY)
    }
    render() {
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                <CanvasBG className="Canvas-BG-grad" text={'this is a start'} winWidth={this.state.winWidth} winHeight={this.state.winHeight} clickedX={this.state.clickedX} clickedY={this.state.clickedY} onClicked={this.onClicked} />
                <RenderRock />
                <ResultIndex filteredResults={this.state.resultsToRender} />
            </div>
        );
    }
}

export default MainContainer;

