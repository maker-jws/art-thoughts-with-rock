import React, { Component } from 'react';
class FooterNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: "",
        }
    }

    handleSearchSubmit = (e) => {
        e.preventDefault();
        const query = this.state.searchQuery;
        // console.log(query, 'inside Footer Nav');
        this.props.searchSubmit(query);
        this.setState({ searchQuery: "" });
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
        // console.log(this.state.searchQuery)
    }
    render() {
        const searchFormStyle = {
            display: "flex",
            flexDirection: 'row',
            margin: "2rem",
            padding: "1rem"
        }
        const searchStyle = {
            margin: "0 2rem",
            padding: "0 1rem",
            border: "0",
            fontHeight: "2rem"
        }
        return (
            <footer className="App-footer">
                <form style={searchFormStyle} onSubmit={this.handleSearchSubmit}>
                    <input style={searchStyle} type="text" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange} />
                    <button type="submit" name="search-button">search topic</button>
                </form>
            </footer>);
    }
}

export default FooterNav;