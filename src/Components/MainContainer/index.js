import React, { Component } from 'react';
import RenderRock from '../RenderRock/index'
import ResultIndex from '../ResultIndex';
import FooterNav from "../FooterNav/index";
import Navbar from "../Navbar/index"
import ResultsShow from "../ResultsShow/index"
const languageParser = require('./languageparser.js');

class MainContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastSearch: "",
            searchHistory: [],
            defaultExclusions: "pinterest+artnews+imgur+etsy+poster\-art",
            parsedSearch: {},
            nullResults: false,
            requestQuery: {}, //the keys to be sent to db for 'Data'
            requestResultsUrl: {}, //the keys to be sent to db for 'Source'
            resultsLoaded: false,
            resultsLoading: false,
            allResults: [],
            currentResults: [],
            search_num: 0,
            user_id: 0,
            currentPosition: 0,
            currentLimit: 3,
            selectedCards: [],
            showPreviewCard: false,
            previewedCards: []
        }
    }
    handleSearchSubmit = async (query) => {
        try {
            this.setState({
                searchHistory: [...this.state.searchHistory, query],
                lastSearch: query,
                currentResults: [],
                search_num: this.state.search_num + 1
            }, () => {
                const filteredResults = languageParser(query);
                console.log(filteredResults);
                this.setState({ parsedSearch: { ...filteredResults } }, () => {
                    this.retrieveItems(this.state.currentPosition + 1);
                })
                //r.set("searchHistory")
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    handleCardSelection = async (selection) => {
        console.log(selection, 'called from inside mainContainer')
        try {
            // console.log('source in reqQuery', source);
            const selectedPackage = {
                search_num: selection.search_num,
                search_query: selection.search_query,
                search_target: selection.search_target,
                search_remainder: selection.words_array_remainder,
                snippet: selection.snippet,
                cached_ID: selection.cacheId,
                link_url: selection.link,
                title: selection.htmlTitle,
                user_id: this.state.user_id,
                was_selected: true,
                image_info: {
                    image_url: selection.pagemap.metatags[0]["og:image"],
                    image_description: selection.pagemap.metatags[0]["og:description"],
                    image_height: selection.pagemap.metatags[0]["og:image:height"],
                    image_width: selection.pagemap.metatags[0]["og:image:width"],
                    image_full: selection.pagemap.cse_image[0].src
                }
            }
            console.log(selectedPackage, "after establishing content - handleCardSelection")
            const createSelectedResponse = await fetch("http://localhost:8000/select/v1/", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(selectedPackage),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const selectionResponse = await createSelectedResponse.json();
            console.log(
                selectionResponse,
                "parsed response",
                "<<<successful created event", "trigger setState"
            );
            this.setState({
                selectedCards: [...this.state.selectedCards, selectionResponse.data]
            })
            return selectionResponse;
        } catch (err) {
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
        try {
            let temp = []
            const sourcePackage = {
                base_url: { temp },
                search_num: this.state.search_num,
                initial_value: 0, //will be calculated on backend when search fetch is migrated
                query_string: this.state.parsedSearch.filteredString,
                search_num: this.state.search_num
            }
            // console.log('source in reqResultsUrl', source)
            const allUrls = this.state.allResults.map((result) => {
                if (result.link !== "") {
                    const result_url = {
                        cached_ID: result.cacheId,
                        0: result.link,
                        1: result.formattedUrl
                    }
                    temp.push(result_url);
                    // console.log(temp, sourcePackage);
                }
            })

            const createSourceResponse = await fetch("http://localhost:8000/source/v1/", {
                method: "POST",
                credentials: "include",
                body: JSON.stringify(sourcePackage),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const sourceResponse = await createSourceResponse.json();
            // console.log(
            //     sourceResponse,
            //     "parsed response",
            //     "<<<successful created event", "trigger setState"
            // );
            this.setState({
                requestResultsUrl: { ...sourceResponse.data }
            })
            return sourceResponse;
        }
        catch (err) {
            console.log(err)
        }
    }
    filteredItems = async (source, start, quantity) => {
        // console.log(source, 'all results at beginning of filteredItems', start, quantity)
        const temp = []
        try {
            for (let i = start; i < quantity; i++) {
                if (source[i].title !== "") {
                    temp.push(source[i])
                }
            }
            this.setState({
                currentResults: [...temp],
                resultsLoaded: true,
            }, () => {
                // console.log('this.state.currentResults afterState is Set', this.state.currentResults)
            })
        } catch (err) {
            console.log(err);
        }
    }
    getNextItems = async () => {
        try {
            console.log(this.state.currentPosition, this.state.currentLimit, this.state.allResults.length);
            if (this.state.currentLimit + 1 === this.state.allResults.length) {
                this.retrieveItems(this.state.currentPosition + 1)
                this.setState({
                    currentPosition: this.state.currentPosition + 1,
                    currentLimit: this.state.currentLimit + 1
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            } else if (this.state.currentPosition + 3 < this.state.allResults.length - 3) {
                this.setState({
                    currentPosition: this.state.currentPosition + 3,
                    currentLimit: this.state.currentLimit + 3
                }, () => {
                    let newPosition = this.state.currentPosition
                    const nextResults = this.filteredItems(this.state.allResults, newPosition, this.state.currentLimit)
                    return nextResults
                })
            }
            else if (this.state.currentPosition + 1 < this.state.allResults.length - 2) {
                this.setState({
                    currentPosition: this.state.currentPosition + 1,
                    currentLimit: this.state.currentLimit + 1
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
    retrieveItems = async (start) => {
        try {
            //randomQuery 
            let api_key = "AIzaSyA2x18slfQC5210EaI_tcMGCkP8vd5wqvE";
            let cx = "013070184471859259983%3Aakjlb1b5hvu";
            let q;

            let exactTerms
            if (this.state.parsedSearch.filteredString !== "") {
                exactTerms = this.state.parsedSearch.targetStrings.join("+")

            } else {
                exactTerms = "art"
            }
            const excludeTerms = this.state.defaultExclusions
            const customQ = "&start=" + start + "&exactTerms=" + exactTerms + "&excludeTerms=" + excludeTerms + "&alt=json"
            if (this.state.parsedSearch.targetStrings.length === 0) {
                if (this.state.lastSearch !== "") {
                    q = this.state.parsedSearch.filteredString;
                }
                else {
                    q = "random, conceptual, art, video";
                }
            } else {
                q = this.state.parsedSearch.targetStrings[0];  //this is where formatting has to occur
            }
            const searchQuery = "https://www.googleapis.com/customsearch/v1?key=" + api_key + "&cx=" + cx + "&q=" + "'" + q + "'" + customQ
            console.log(searchQuery)
            //actual api call 
            const responseQuery = await fetch(searchQuery, {
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
                        if (item !== undefined) {
                            item.search_num = this.state.search_num
                            item.search_query = this.state.parsedSearch.filteredString //the original string after cleanup
                            item.search_target = this.state.parsedSearch.targetStrings // any special words from parser
                            item.words_array_remainder = this.state.parsedSearch.wordsArray //remainder words after targeting
                            return temp.push(item);
                        }
                    });
                    this.setState({
                        allResults: [...this.state.allResults, ...temp],
                        nullResults: !this.state.nullResults
                    }, () => {

                        this.filteredItems(temp, this.state.currentPosition, this.state.currentLimit);
                        this.reqResultsUrl(temp);
                        //call function that sends all urls to 
                    })
                } else {
                    console.log('no results found')
                    this.setState({
                        nullResults: !this.state.nullResults
                    })
                }
                console.log(searchQueryResponse, "query response");

            }
        } catch (err) {
            console.log(err, "Fetch Error");
        }

    }
    render() {
        return (
            <div className="Main-Container-wrapper">
                <Navbar />
                <RenderRock />
                <div className="Main-Container-results-wrapper">
                    <div className="Main-Container-results-show">{this.state.showPreviewCard === true ? <ResultsShow /> : null}</div>
                    <div className="Main-Container-results-index">
                        {this.state.resultsLoaded === true ? <ResultIndex getPrevItems={this.getPrevItems} getNextItems={this.getNextItems} filteredResults={this.state.currentResults} handleSelection={this.handleCardSelection} /> : null}
                    </div>

                </div>

                <FooterNav searchSubmit={this.handleSearchSubmit} />
            </div>
        );
    }
}

export default MainContainer;


