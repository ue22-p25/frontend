document.addEventListener('DOMContentLoaded',

  () => {

    let index = 0
    const colors = ["#ADD8E6", "#7FC7D9"]

    /* what to do cyclically */
    function tick() {
      index = (index + 1) % 2
      let color = colors[index]
      // spot the body element
      document.body
        // and change its background color
        .style.backgroundColor = color
    }

    // call it the first time without waiting one second
    tick()
    // make sure it does run cyclically
    window.setInterval(tick, 1000)
})
