import React, { Component } from 'react';
class CanvasBG extends Component {
    constructor(props) {
        super(props);
        this.state = {
            winWidth: this.props.winWidth,
            winHeight: this.props.winHeight,
            width: this.props.width,
            height: this.props.height,
            rotation: this.props.rotation,
        }
        this.paintBG = this.paintBG.bind(this);
    }
    paintBG() {
        const canvas = this.refs.canvas //targets the specific canvas
        const ctx = canvas.getContext("2d");
        // createRadialGradient(x,y,r,x1,y1,r1)
        const grd = ctx.createRadialGradient(this.props.winWidth / 2, this.props.winHeight, 10, this.props.winWidth / 4, this.props.winHeight, this.props.winWidth);
        grd.addColorStop(0, "darkgray");
        grd.addColorStop(1, "black");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this.props.winWidth, this.props.winHeight);
    }

    paintGraphic() {
        const { width, height, rotation } = this.props;
        const graphic = this.refs.graphic //targets the specific canvas
        const ctx = graphic.getContext("2d");
        ctx.clearRect(width / 2, height / 2, width / 2, height / 2)
        ctx.save();
        const grd = ctx.createRadialGradient(width / 2, height, 10, width / 4, height, width);
        // ctx.translate(width / 2, height / 2);
        ctx.rotate(rotation, width, height);
        grd.addColorStop(0, "rgba(0,255,0,.2)");
        grd.addColorStop(1, "rgba(255,0,0,.2)");
        // Fill with gradient
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, this.props.winWidth * 2, this.props.winHeight * 2);
        ctx.restore();
    }

    //animated gradient tutorial: http://jsfiddle.net/fkU4Q/

    componentDidMount() {
        this.paintBG();
        this.paintGraphic();
    }

    componentDidUpdate() {
        // this.paintBG(); // works if the app to check if background changes size 
        if (this.state.winHeight !== this.props.winHeight || this.state.winWidth !== this.props.winWidth) {
            this.setState({
                winWidth: this.props.winWidth, //sets state of window so the canvas will always remain somewhat proportional and smaller than the whole window
                winHeight: this.props.winHeight,
            }, this.paintBG());
        }
        this.paintGraphic();
    }

    // componentDidMount() {
    //     requestAnimationFrame(this.tick); //starts rotation
    //     setInterval(() => { this.updateBGSize() }, 200)
    // }
    // tick() {
    //     const rotation = this.state.rotation + 0.02;
    //     this.setState({ rotation });
    //     requestAnimationFrame(this.tick); //communicates with dom, calling this.tick (itself)
    // }


    render() {
        const canvasStyle = {
            border: "1px solid black",
        };
        const { winWidth, winHeight, height, width } = this.props;
        return (
            <div>

                <canvas className="Canvas-BG-graphic" ref="graphic" width={width} height={height} />
                <canvas className="Canvas-BG-grad"
                    ref="canvas"
                    width={winWidth}
                    height={winHeight}
                />
            </div>
        );
    }
}

export default CanvasBG;
