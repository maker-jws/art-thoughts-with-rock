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
        this.props.searchSubmit(query);
        this.setState({ searchQuery: "" });
    }
    handleChange = (e) => {
        this.setState({ [e.currentTarget.name]: e.currentTarget.value });
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
            border: "none",
            lineHeight: "3rem",
            width: "250px",
            boxShadow: "0 0 2rem darkgray",
        }
        const buttonStyle = {
            backgroundColor: "black",
            color: "white",
            fontSize: "16px",
            border: "none",
            lineHeight: "2rem",
            padding: "0 3rem",
            boxShadow: "0 0 1rem darkgray",
        }
        return (
            <div>
                <footer className="App-footer">
                    <form style={searchFormStyle} onSubmit={this.handleSearchSubmit}>
                        <input style={searchStyle} type="text" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange} />
                        <button style={buttonStyle} type="submit" name="search-button">search topic</button>
                    </form>
                </footer>

            </div>
        );
    }
}
// 
// style={buttonStyle}
export default FooterNav;