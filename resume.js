const cursor = document.querySelector("#cursor");
const body = document.querySelector("body")
body.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration: 0.5
    })
})