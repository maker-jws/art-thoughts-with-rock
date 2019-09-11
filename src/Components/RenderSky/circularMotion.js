console.log('this is live')
const canvas = document.getElementById('skySpace') //in react this will be this.refs.skySpace the canvas in render
const c = canvas.getContext('2d') //currently in global scope
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 100;
let particles;

const mouse = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};
const colors = [
    "#ffffcc",  //pale yellow
    "#ffff99",   //light yellow
    "#ffcc99",  // pale orange
    "#ff9966",  //light orange
    "#ffcccc",   // pale pink
    "#ff9999" //light pink
];

//ignoring mouse over animation 

function Particle(x, y, radius, color) {  //this is the new Class Particle 
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.radians = Math.random() * (Math.PI * 2);
    this.velocity = .03;

    this.update = () => {
        ///move these points over time this.radians 
        let randomInt = Math.floor(Math.random() * colors.length)
        this.radians += this.velocity
        this.x = x + Math.cos(this.radians) * canvas.width / 2 - (.25 * canvas.width); // the multiplier is the radius of the circle 
        this.y = y + Math.sin(this.radians) * canvas.height / 1.5;
        // console.log(Math.cos(this.radians))

        this.draw();
    }
    this.draw = () => {

        const gradient = c.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop("0.2", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        c.strokeStyle = gradient
        c.lineWidth = 20;
        c.beginPath();
        c.arc(this.x + 10, this.y, this.radius, 0, Math.PI * 2, false); //draws circle 
        c.fillStyle = this.color;
        c.fill();
        c.stroke();
        c.closePath();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < 1; i++) {
        // console.log(randomInt)
        particles.push(new Particle(canvas.width / 2, canvas.height - 10, 200, colors[0]))

    }
    // console.log(particles) //displays created particle
    animate();
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
    particles.forEach(particle => {
        particle.update();   //renders animation for each particle 
    });
    // console.log(particles[0].radians, particles[0].velocity, particles[0].x, particles[0].y)
};

window.onload = init();

