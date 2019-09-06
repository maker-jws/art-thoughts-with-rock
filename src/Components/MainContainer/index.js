import React, { Component } from 'react';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
import FooterNav from "../FooterNav/index";
import { thisExpression } from '@babel/types';
const languageParser = require('./languageparser.js');
class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHistory: [],
            parsedSearch: {},
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
            this.setState({
                searchHistory: [...this.state.searchHistory, query],
                lastSearch: query
            }, () => {
                const filteredResults = languageParser(query);
                console.log(filteredResults);
                this.setState({ parsedSearch: { ...filteredResults } }, () => {
                    this.retrieveItems();
                })
                //r.set("searchHistory")
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
                temp.push(source[i])
            }
            this.setState({
                chosenResults: [...temp],
                resultsLoaded: true,
            }, () => {
                console.log('this.state.chosenResults', this.state.chosenResults)
            })
        } catch (err) {
            console.log(err);
        }
    }
    nextItem() {
        console.log('this will choose the next ten results ')
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
            //randomQuery 
            let q;
            if (this.state.parsedSearch.targetStrings.length === 0) {
                if (this.state.lastSearch !== "") {
                    q = this.state.lastSearch;
                }
                else {
                    q = "random, conceptual, art, video";
                }
            } else {
                q = this.state.parsedSearch.targetStrings[0];
            }
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
                    return temp.push(item);
                });
                this.setState({ allResults: temp }, () => {
                    this.filteredItems(temp)
                })
            }
        } catch (err) {
            console.log(err, "Fetch Error");
        }

    }
    render() {
        return (
            <div>
                <RenderRock />
                {this.state.resultsLoaded === true ? <ResultIndex className="Resultsindex-wrapper" filteredResults={this.state.chosenResults} /> : null}
                <FooterNav searchSubmit={this.handleSearchSubmit} />
            </div>
        );
    }
}

export default MainContainer;


