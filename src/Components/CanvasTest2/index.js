
// tutorial provided by https://itnext.io/using-react-hooks-with-canvas-f188d6e416c0
import React from 'react'

const HOOK_SVG = 'm129.03125 63.3125c0-34.914062-28.941406-63.3125-64.519531-63.3125-35.574219 0-64.511719 28.398438-64.511719 63.3125 0 29.488281 20.671875 54.246094 48.511719 61.261719v162.898437c0 53.222656 44.222656 96.527344 98.585937 96.527344h10.316406c54.363282 0 98.585938-43.304688 98.585938-96.527344v-95.640625c0-7.070312-4.640625-13.304687-11.414062-15.328125-6.769532-2.015625-14.082032.625-17.960938 6.535156l-42.328125 64.425782c-4.847656 7.390625-2.800781 17.3125 4.582031 22.167968 7.386719 4.832032 17.304688 2.792969 22.160156-4.585937l12.960938-19.71875v42.144531c0 35.582032-29.863281 64.527344-66.585938 64.527344h-10.316406c-36.714844 0-66.585937-28.945312-66.585937-64.527344v-162.898437c27.847656-7.015625 48.519531-31.773438 48.519531-61.261719zm-97.03125 0c0-17.265625 14.585938-31.3125 32.511719-31.3125 17.929687 0 32.511719 14.046875 32.511719 31.3125 0 17.261719-14.582032 31.3125-32.511719 31.3125-17.925781 0-32.511719-14.050781-32.511719-31.3125zm0 0'
//can replace with any image in svg form 

const HOOK_PATH = new Path2D(HOOK_SVG) //is Path2D at canvas feature //might need to look at canvas square?

const SCALE = .5
const OFFSET = 350
function draw(ctx, location) {
    ctx.fillStyle = 'deepskyblue'
    ctx.shadowColor = 'black'
    ctx.shadowBlur = 20 //pixel width of blur
    ctx.save() //not sure why they save before setting scale and translating /probably saves the canvas before addinga  new one
    ctx.scale(SCALE, SCALE) //establishes scale from constants
    ctx.translate(location.x / SCALE - (.2 * OFFSET), location.y / SCALE - OFFSET)
    ctx.fill(HOOK_PATH)  //creates a new hook - lookcloser at the fill function -- fill is probably the 
    ctx.restore()
}

function CanvasTest2() { //setup name of canvas
    const canvasRef = React.useRef(null) //from tutorial hooks can only be called inside a function  - not inside of component
    const canvasStyle = {
        'border': '1px solid black',
        'marginTop': '10vh'
    }
    return (
        <canvas
            ref={canvasRef}
            width={window.innerWidth}
            height={window.innerHeight}
            onClick={e => {
                const canvas = canvasRef.current
                const ctx = canvas.getContext('2d')
                draw(ctx, { x: e.clientX, y: e.clientY }) //passes in variables x, y which are the location of click
            }}
            style={canvasStyle}
        />
    )
}
export default CanvasTest2

//status unfinished - in tutorial basic hook is setup - can be ammended to remove/save to local drive. 