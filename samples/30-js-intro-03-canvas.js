// copied from this page
// https://cs.lmu.edu/~ray/notes/introjavascriptgraphics/

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('shapes')
    const width = canvas.width
    const height = canvas.height
    // required with canvas, to set e.g. colors and stuff
    const ctx = canvas.getContext('2d')

    // random255 is an arrow-function (like a lambda)
    const random255 = () => Math.floor(Math.random() * 255)
    // it is as if we had written
    // function random255() { return Math.floor(Math.random() * 255) }

    // the following functions are arrow-functions too
    const randomColor = () =>
      // we call random255 3 times to create a random color
      // using fixed opacity of 50%
      // returns a string like e.g. "rgba(123 45 67 / 50%)"
      `rgba(${random255()} ${random255()} ${random255()} / 50%)`
    const randomX = () => (Math.random() * width)
    const randomY = () => (Math.random() * height)
    const randomSide = () => (Math.random() * 100)
    const randomRadius = () => (Math.random() * 50)

    const drawShapes = () => {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < 5; i += 1) {
        // compute a random color for the rectangle
        ctx.fillStyle = randomColor()
        ctx.fillRect(randomX(), randomY(), randomSide(), randomSide())
        // compute a random color for the circle
        ctx.fillStyle = randomColor()
        ctx.beginPath()
        ctx.arc(randomX(), randomY(), randomRadius(), 0, Math.PI * 2, true)
        ctx.closePath()
        ctx.fill()
      }
    }

    canvas.addEventListener('click', drawShapes)

    drawShapes()
  })
