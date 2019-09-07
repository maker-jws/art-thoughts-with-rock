import React, { Component } from 'react';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
import FooterNav from "../FooterNav/index";
import Navbar from "../Navbar/index"
const languageParser = require('./languageparser.js');
class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchHistory: [],
            parsedSearch: {},
            requestQuery: {}, //the keys to be sent to db for 'Data'
            requestResultsUrl: {}, //the keys to be sent to db for 'Source'
            lastSearch: "",
            allResults: [],
            chosenResults: [],
            resultsLoaded: false,
            resultsLoading: false,
            resultsToRender: [],
            search_num: 0,
            user_id: 0,
            currentPosition: 0,
            currentLimit: 3,
        }
    }
    handleSearchSubmit = async (query) => {
        try {
            this.setState({
                searchHistory: [...this.state.searchHistory, query],
                lastSearch: query,
                chosenResults: []
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
    reqQuery = async (source) => {
        try {
            // console.log('source in reqQuery', source);
            const queryPackage = {
                query_string: source.queries.request[0].searchTerms,              //CharField(null=False)
                exclusions: "pinterest, deviantart, artnews",                //CharField(null=True)
                cached_ID: source.queries.request[0].cx,                 //CharField(null=True),
                initial_value: 0,             //IntegerField(default=0, null=True),
                search_num: this.state.search_num,
                was_selected: false,
                search_num: parseInt(source.queries.request[0].totalResults),
                user_id: this.state.user_id,
            }
            console.log(queryPackage, "after establishing content - line 58 -MainContainer")
            const createQueryResponse = await fetch("http://localhost:8000/data/v1/", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(queryPackage),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const queryResponse = await createQueryResponse.json();
            console.log(
                queryResponse,
                "parsed response",
                "<<<successful created event", "trigger setState"
            );
            this.setState({
                requestQuery: { ...queryResponse.data }
            })
            return queryResponse;
        } catch (err) {
            console.log(err)
        }
    }
    reqResultsUrl = async (source) => {
        try { console.log('source in reqResultsUrl', source) }
        catch (err) {
            console.log(err)
        }
    }
    filteredItems = async (source, start, quantity) => {
        console.log(source, 'all results at beginning of filteredItems', start, quantity)
        const temp = []
        try {
            for (let i = start; i < quantity; i++) {
                temp.push(source[i])
            }
            this.setState({
                chosenResults: [...temp],
                resultsLoaded: true,
            }, () => {
                console.log('this.state.chosenResults afterState is Set', this.state.chosenResults)
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
    getNextItems = async () => {
        try {
            if (this.state.currentPosition + 3 < this.state.allResults.length - 3) {
                this.setState({
                    currentPosition: this.state.currentPosition + 3,
                    currentLimit: this.state.currentLimit + 3
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            } else if (this.state.currentPosition + 1 < this.state.allResults.length - 2) {
                this.setState({
                    currentPosition: this.state.currentPosition + 1,
                    currentLimit: this.state.currentLimit + 1
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            } else {
                this.setState({
                    currentPosition: 0,
                    currentLimit: 3
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            }
        } catch (err) {
            console.log(err)
        }

    }
    getPrevItems = async () => {
        try {
            if (this.state.currentPosition - 3 >= 0) {
                this.setState({
                    currentPosition: this.state.currentPosition - 3,
                    currentLimit: this.state.currentLimit - 3
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            } else if (this.state.currentPosition - 1 >= 0) {
                this.setState({
                    currentPosition: this.state.currentPosition - 1,
                    currentLimit: this.state.currentLimit - 1
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            } else {
                this.setState({
                    currentPosition: 0,
                    currentLimit: 3
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            }
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
            // console.log(this.state.searchHistory)
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
                if (parseInt(searchQueryResponse.searchInformation.totalResults) !== 0) {
                    this.reqQuery(searchQueryResponse);
                    searchQueryResponse.items.map((item, idx) => {
                        // console.log(item);
                        return temp.push(item);
                    });
                    this.setState({ allResults: temp }, () => {
                        this.filteredItems(temp, this.state.currentPosition, this.state.currentLimit);
                        this.reqResultsUrl(temp);
                        //call function that sends all urls to 
                    })
                }
                // console.log(searchQueryResponse, "query response");

            }
        } catch (err) {
            console.log(err, "Fetch Error");
        }

    }
    render() {
        return (
            <div>
                <Navbar />
                <RenderRock />
                {this.state.resultsLoaded === true ? <ResultIndex className="Resultsindex-wrapper" getPrevItems={this.getPrevItems} getNextItems={this.getNextItems} filteredResults={this.state.chosenResults} /> : null}
                <FooterNav searchSubmit={this.handleSearchSubmit} />
            </div>
        );
    }
}

export default MainContainer;


