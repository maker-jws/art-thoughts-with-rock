import React, { Component } from 'react';
class CanvasBG extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    // Create gradient
    //animated gradient tutorial: http://jsfiddle.net/fkU4Q/
    componentDidMount() {
        const canvas = this.refs.canvas //targets the specific canvas
        const ctx = canvas.getContext("2d");
        // createRadialGradient(x,y,r,x1,y1,r1)
        var grd = ctx.createRadialGradient(this.props.winWidth / 2, this.props.winHeight, 10, this.props.winWidth / 4, this.props.winHeight, this.props.winWidth);
        grd.addColorStop(0, "darkgray");
        grd.addColorStop(1, "black");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this.props.winWidth, this.props.winHeight);

    }
    render() {

        const canvasStyle = {
            'border': "1px solid black",
        };
        return (
            <div>
                {/* <p>Height: {this.props.winHeight}</p>
                <p>Width: {this.props.winWidth}</p>
                <p>Last Clicked: {this.props.clickedX}, {this.props.clickedY} </p> */}
                <canvas width={this.props.winWidth} height={this.props.winHeight} style={canvasStyle} ref='canvas' onClick={(e) => {
                    console.log(e.clientX)
                    this.props.onClicked(e.clientX, e.clientY)  //passing up coordinates to main container
                }}
                />
            </div>
        );
    }
}

export default CanvasBG;