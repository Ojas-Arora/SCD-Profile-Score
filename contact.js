gsap.from(".logo", {
    opacity: 0,
    delay: 0.5,
    duration: 1,
    y: -30
})

const tl = gsap.timeline();
tl.from(".nav-links li", {
    delay: 1,
    opacity: 0,
    stagger: 0.25,
    duration: 1,
    y: -30
})

const cursor = document.querySelector("#cursor");
const body = document.querySelector("body");

body.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration: 0.5
    });
});

const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

headings.forEach((heading) => {
    heading.addEventListener("mouseenter", () => {
        gsap.to(cursor, { scale: 2, duration: 0.2 }); 
    });

    heading.addEventListener("mouseleave", () => {
        gsap.to(cursor, { scale: 1, duration: 0.2 }); 
    });
});
