let canvas
let context

let elapsedTime;
let lastFrameTimestamp;
let fps

const Renderer = () => {
    objects: []
    const draw = () => {

    }

    const update = () => {

    }
    return { draw, update}
}

const Ball = () => {
    let x;
    let y;
    let dx;
    let dy;

    const draw = () => {

    }

    const update = () => {

    }

    return {
        x, y, dx, dy
    }
}

const Paddle = () => {
    let x;
    let y;
    let speed;
    return {
        x, y, speed
    }
}

const WordBrick = () => {
    
    const draw = () => {

    }

    const update = () => {

    }
    return {
        draw, update
    }
}


function init() {
    canvas = document.getElementById("game-canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    context = canvas.getContext('2d')
    start()
}

function start() {             
    console.log("starting game")
    window.requestAnimationFrame(gameLoop)
}


function getSize() {
    return [canvas.width, canvas.height]
}

function gameLoop(timestamp) {
    elapsedTime = timestamp - lastFrameTimestamp
    lastFrameTimestamp = timestamp
    draw();
    window.requestAnimationFrame(gameLoop)
}

function draw() {
    drawBacking();
    drawFps();
}

function drawBacking() {
    let [height, width] = getSize()
    context.fillStyle = 'black'
    context.fillRect(0, 0, width, height)
}

function drawFps() {
    fps = Math.round(1000 / elapsedTime)
    context.font = '30px Arial';
    context.fillStyle = 'white';
    context.fillText("FPS: " + fps, 5, 35);
}


window.onload = init