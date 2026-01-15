document.addEventListener("DOMContentLoaded", function() {
    let canvas = document.getElementById("myCanvas");
    let ctx = canvas.getContext("2d");

    // draw a rectangle
    ctx.fillStyle = "lightgreen";
    ctx.fillRect(50, 50, 200, 100);

    // draw a circle
    ctx.beginPath();
    ctx.arc(400, 100, 50, 0, 2 * Math.PI);
    ctx.fillStyle = "orange";
    ctx.fill();
    ctx.stroke();

    // draw some text
    ctx.font = "30px Arial";
    ctx.fillStyle = "blue";
    ctx.fillText("Hello Canvas!", 200, 250);
});
