let canvas
let context
let game;
let elapsedTime;
let lastFrameTimestamp;
let fps

window.onload = init

const config = {
    words: [
        {
            text: 'Word'
        },
        {
            text: 'Breaker'
        }
    ]
}

function init() {
    canvas = document.getElementById("game-canvas")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    game = Game(canvas, config)
    game.render();
}

function start() {             
    console.log("starting game")
    window.requestAnimationFrame(gameLoop)
}


const Game = (canvas, config) => {
    let ctx = canvas.getContext('2d')
    let lastFrameTimestamp
    let paddle = Paddle(canvas/2)
    let ball = Ball(canvas.width/2, canvas.height - 100, 1, 20)
    let wordBricks = config.words.map((wordConfig) => {
        return WordBrick()
    })

    canvas.addEventListener("mousedown", function(event) {
        game.start()
    })

    const drawBacking = () => {
        ctx.beginPath()
        ctx.rect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.closePath();
    } 

    const draw = () => {
        drawBacking();
        paddle.draw(ctx)
        ball.draw(ctx)
        wordBricks.forEach((obj) => {
            obj.draw(ctx)
        })
    }
    
    const update = (elaspedTime) => {
        paddle.update(elapsedTime)
        ball.update(elapsedTime)
        wordBricks.forEach((obj) => {
            obj.update(elaspedTime)
        })
    }

    const start = () => {
        window.requestAnimationFrame(gameLoop)
        ball.launch()
    }

    const gameLoop = (timestamp) => {
        elapsedTime = timestamp - (lastFrameTimestamp ?? timestamp)
        lastFrameTimestamp = timestamp
        update(elapsedTime)
        draw();
        window.requestAnimationFrame(gameLoop)
    }
    return {draw, update, render: start}
}

const Ball = (initX, initY, speed, initRadius) => {
    let radius = initRadius ?? 40
    let x = initX
    let y = initY
    let dx = 0;
    let dy = 0;

    const draw = (ctx) => {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = "red";
        ctx.fill();
        ctx.closePath()
    }

    const update = (elapsedTime) => {
        x += dx * (elapsedTime)
        y += dy * (elapsedTime)
        detectCollision();
    }

    const detectCollision = () => {
        if (x - radius < 0) {
            bounce(false)
            x = 0 + radius
        }
        else if (x + radius > canvas.width) {
            bounce(false)
            x = canvas.width - radius
        }
        else if (y - radius < 0) {
            bounce(true)
            y = 0 + radius
        }
        else if (y + radius > canvas.height) {
            reset()
            launch()
        }
    }

    const bounce = (horizontal) => {
        dx = dx * (horizontal ? 1 : -1)
        dy = dy * (horizontal ? -1 : 1)
    }

    const launch = () => {
        angle = Math.random() * 0.75 * Math.PI
        dx = speed * Math.cos(angle)
        dy = speed * -Math.sin(angle)
    }

    const reset = () => {
        x = initX
        y = initY
        dx = 0
        dy = 0
    }

    return {
        draw, 
        update, 
        reset,
        launch,
        get x() { return x; },
        get y() { return y; },
        set x(value) { x = value; },
        set y(value) { y = value; },
        set dx(value) { dx = value; },
        set dy(value) { dy = value; }
    }
}

const Paddle = (initialX, initialY, initWidth, initHeight, speed) => {
    let width = initWidth;
    let height = initHeight
    let x = initialX
    let y = initialY

    canvas.addEventListener("mousemove", function(event) {
        x = event.offSetX;
    })

    const draw = (ctx) => {
        ctx.beginPath()
        ctx.rect(x -(width/2), y - (height), width, height)
        ctx.fillStyle = 'green'
        ctx.fill()
        ctx.closePath()
    }

    const update = () => {

    }

    return {
        x, y, speed, draw, update
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