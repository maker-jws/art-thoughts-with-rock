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
        const gradient = c.createLinearGradient(0, 0, width, height);
        gradient.addColorStop("0", "rgba(245, 238, 168, 1.0)")
        gradient.addColorStop("0.2", "rgba(245, 238, 168, 0.87)");
        gradient.addColorStop("0.5", "rgba(245, 238, 168, 0.57)");
        gradient.addColorStop("1.0", "rgba(245, 238, 168, 0.1)");
        c.strokeStyle = gradient
        c.lineWidth = ((.5 * x) + (3 * y)) / (.2 * radius)
        c.clearRect(0, 0, width, height);
        c.save();
        c.beginPath();
        c.arc(x, y, radius, 0, Math.PI * 2, true); //draws circle 

        const orbGrad = c.createLinearGradient(0, 0, width, height);
        orbGrad.addColorStop("0", colors[0])
        orbGrad.addColorStop("0.6", colors[1]);
        orbGrad.addColorStop("0.67", colors[2]);
        orbGrad.addColorStop(".74", colors[3]);
        orbGrad.addColorStop(".80", colors[4]);
        orbGrad.addColorStop(".84", colors[5]);
        c.fillStyle = orbGrad
        // c.fillStyle = colors[0];
        c.fill();
        c.stroke();
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