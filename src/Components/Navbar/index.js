import React, { Component } from 'react';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            queries: 0,
            source: 0,
            selection: 0,
        }
    }
    render() {
        return (
            <nav className="App-header">
                <div>Welcome to Art Thoughts</div>
                <div className="Navbar-Data-Wrapper">
                    <div className="Navbar-Data-Label">Queries: </div>
                    <div>{this.state.queries}</div>
                    <div className="Navbar-Data-Label">Source Seeds: </div>
                    <div>{this.state.source}</div>
                    <div className="Navbar-Data-Label">Selections: </div>
                    <div>{this.state.selection}</div>
                </div>
            </nav>);
    }
}
export default Navbar;