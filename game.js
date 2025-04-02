let canvas
let context

let elapsedTime;
let lastFrameTimestamp;
let fps


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