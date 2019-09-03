import React, { Component } from 'react';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
import FooterNav from "../FooterNav/index";
const fullResponse = require("./sample.json");

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHistory: [],
            lastSearch: "",
            allResults: [],
            chosenResults: [],
            resultsLoaded: false,
            resultsLoading: false,
            resultsToRender: []
        }
    }

    handleSearchSubmit = async (query) => {
        try {
            this.setState({ searchHistory: [...this.state.searchHistory, query] }, () => {
                this.retrieveItems();
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    filteredItems = async (source) => {
        console.log(source, 'all results at beginning of filteredItems')
        const temp = []
        try {
            for (let i = 0; i < 3; i++) {
                let index = Math.floor(Math.random() * source.length);
                // console.log(index)
                temp.push(source[index])
            }
            this.setState({
                chosenResults: [...temp],
                resultsLoaded: true,
            }, () => {
                // console.log('filtered results loaded')
                console.log('this.state.chosenResults', this.state.chosenResults)
            })
        } catch (err) {
            console.log(err);
        }
    }
    targetResponse = async () => {
        try {
            console.log("targetResponse Ran")
        } catch (err) {
            console.log(err)
        }
    }
    retrieveItems = async () => {

        try {
            const q = this.state.searchHistory[this.state.searchHistory.length - 1]
            const api_key = "AIzaSyCyVfsN9ihaglSFcP9SM-NQwdzlnFFOsys"
            console.log(this.state.searchHistory)
            const responseQuery = await fetch("https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=013070184471859259983%3Aakjlb1b5hvu&q=" + q, {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (responseQuery.status !== 200) {
                throw Error("Error 404 from Server");
            } else {
                const temp = [];
                const searchQueryResponse = await responseQuery.json();
                console.log(searchQueryResponse, "query response");
                searchQueryResponse.items.map((item, idx) => {
                    // console.log(item);
                    temp.push(item);
                });
                this.setState({ allResults: temp }, () => {
                    this.filteredItems(temp)
                })
            }
        } catch (err) {
            console.log(err, "Fetch Error");
        }

    }
    previewData = () => {
        console.log(fullResponse, "whole JSON object")
        console.log(fullResponse.items, "the items coming out of json ")
        console.log(fullResponse.queries.request[0], "the first returned object from array Queries ") // meta information about the search // target all?
        console.log(fullResponse.items[0].pagemap.cse_image[0].src) //url for the image
        console.log(fullResponse.items[0].htmlTitle) //title of the page
        console.log(fullResponse.items[0].link) //title of the page
        console.log(fullResponse.items[0].snippet) //selection of the data)
    }
    render() {
        return (
            <div>
                <h1 className="hidden">This is the main container</h1>
                <RenderRock />
                {this.state.resultsLoaded === true ? <ResultIndex className="Resultsindex-wrapper" filteredResults={this.state.chosenResults} /> : null}
                <FooterNav searchSubmit={this.handleSearchSubmit} />
            </div>
        );
    }
}

export default MainContainer;

// searchSubmit={this.handleSearchSubmit}

