import React, { Component } from 'react';
class CanvasTest1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: Math.floor(window.innerWidth * .75), //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
            winHeight: Math.floor(window.innerHeight * .75),
            clickedX: null,
            clickedY: null,
        }
    }
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        const img = this.refs.image

        img.onload = () => {
            ctx.drawImage(img, 0, 0)
            ctx.font = "40px Courier"
            ctx.fillText(this.props.text, 210, 75)
        }
    }
    render() {
        // const canvasRef = this.useRef(null)
        console.log(this.state.winWidth, this.state.winHeight)
        const canvasStyle = {
            'border': "1px solid black",
            'height': 'window.innerHeight',
            'width': 'window.innerWidth'
        };
        const cheese = 'https://picsum.photos/id/24/' + this.state.winWidth + '/' + this.state.winHeight;
        return (
            <div>
                <h3>The canvas Object </h3>
                <p>Height: {this.state.winHeight}</p>
                <p>Width: {this.state.winWidth}</p>
                <p>Last Clicked: {this.state.clickedX}, {this.state.clickedY} </p>
                <canvas width={this.state.winWidth} height={this.state.winHeight} style={canvasStyle} ref='canvas' onClickCapture={e => {

                    this.setState({
                        ...this.state = {
                            clickedX: e.clientX,
                            clickedY: e.clientY,
                        }
                    })
                }} />
                <img ref="image" src={cheese} className="hidden" />
            </div>
        );
    }
}

export default CanvasTest1;

// Sources https://blog.cloudboost.io/using-html5-canvas-with-react-ff7d93f5dc76