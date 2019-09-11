import React, { Component } from 'react';

class RenderSky extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            height: this.props.height,
        }

    }
    paintParticle = () => {
        const { width, height, colors, x, y, radius } = this.props
        const c = this.refs.sun.getContext('2d')
        c.clearRect(0, 0, width, height);
        c.save();
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, true); //draws circle 
        c.fillStyle = colors[0];
        c.fill();
        c.closePath();
        c.restore();
    }
    componentDidMount() {
        this.paintParticle()
    }
    componentDidUpdate() {
        this.paintParticle();
    }
    render() {
        const { width, height } = this.props
        return (<canvas className="RenderSky-canvas" ref="sun" width={width} height={height}></canvas>);
    }
}

export default RenderSky;