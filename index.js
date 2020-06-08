var ctx = document.getElementById("grid").getContext("2d")

const resize = () => {
    ctx.canvas.width = ctx.canvas.parentElement.clientWidth
    ctx.canvas.height = ctx.canvas.parentElement.clientHeight
}

const draw = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    ctx.beginPath()
    ctx.strokeStyle = "red"
    ctx.rect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.moveTo(0, 0)
    ctx.lineTo(ctx.canvas.width, ctx.canvas.height)
    ctx.moveTo(0, ctx.canvas.height)
    ctx.lineTo(ctx.canvas.width, 0)
    ctx.stroke()

    ctx.beginPath()
    ctx.strokeStyle = "yellow"
    ctx.rect(ball.x, ball.y, 20, 20)
    ctx.stroke()
}

window.addEventListener("load", () => {
    resize()
    draw()
})

window.addEventListener("resize", () => {
    resize()
    draw() // TODO throttle
})

var last = performance.now()
var delta = 0
var ball = { x: 100, y: 100 }
var bv = { x: 10, y: -5 }

const update = (dt) => {
    ball.x += bv.x
    ball.y += bv.y
    if (ball.x <= 0 || ball.x >= ctx.canvas.width) bv.x = -bv.x
    if (ball.y <= 0 || ball.y >= ctx.canvas.height) bv.y = -bv.y
}

const loop = (t) => {
    window.requestAnimationFrame(loop)
    delta = t - last
    last = t
    update(delta / 1000.0)
    draw()
}

loop(performance.now())