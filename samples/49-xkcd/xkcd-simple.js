// BEFORE YOU START:
// you should open
// https://xkcd.now.sh/?comic=latest
// right in your browser to see what you get


// the URL of the XKCD API
const XKCD = "https://xkcd.now.sh/?comic="


document.addEventListener(
    'DOMContentLoaded',
    () => {
        const submit = document.getElementById('submit')
        // keep track of where we are in the history
        let num = "latest"
        submit.addEventListener(
            'click',
            () => {
                // decrement if that's a number
                if (num != "latest") {
                    num = num - 1
                }
                fetch(XKCD + num)
                    // the API exposes data as JSON
                    .then(response => response.json(),
                          error => console.log(`FETCH FAILED: ${error}`))
                    // once this is decoded we can use it
                    .then(data => {
                        // extract the url
                        img_url = data.img
                        // and get the <img> tag to use it
                        // too lazy to give this element an id, let's use CSS instead
                        document.querySelector("div#xkcd>img").src = img_url
                        // use a number as soon as we have one
                        if (num == "latest") {
                            num = data.num
                        }
                        // and change the button label
                        submit.textContent = `this is # ${num}`
                })
        })
    })