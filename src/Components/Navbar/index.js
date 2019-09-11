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
    componentDidMount() {
        const update = setInterval(() => {
            if (this.queries !== this.props.currentDBCount["0"]) {
                const currentInfo = this.props.currentDBCount;
                this.setState({
                    queries: currentInfo["0"],
                    source: currentInfo["1"],
                    selection: currentInfo["2"]
                })
            };
        }, 200)
    }
    componentDidUpdate() {

        // this.setState()
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