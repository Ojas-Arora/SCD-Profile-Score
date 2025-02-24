gsap.from(".logo", {
    opacity: 0,
    y: -30,
    delay: 0.5,
    duration: 1
})

const tl = gsap.timeline();
tl.from(".nav-links li", {
    delay: 1,
    opacity: 0,
    stagger: 0.25,
    duration: 1,
    y: -30
})

gsap.from(".feature-card", {
    scale: 0,
    duration: 1,
    rotate: 1440,
    ease: "steps.out"
})


const cursor = document.querySelector("#cursor");
const body = document.querySelector("body")
body.addEventListener("mousemove", function (e) {
    gsap.to(cursor, {
        x: e.x,
        y: e.y,
        duration: 0.5
    })
})

gsap.from(".options-container .option-card", {
    scale: 0,
    duration: 2,
    scrollTrigger: {
        trigger: ".options-container",
        scroller: "body",
        scrub: 2,
        start: "top 70%",
        end: "top 70%",
        pin: true
    }
})

const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");

headings.forEach((heading) => {
  heading.addEventListener("mouseenter", () => {
    gsap.to(cursor, {
      scale: 2,
      duration: 0.3
    });
  });

  heading.addEventListener("mouseleave", () => {
    gsap.to(cursor, {
      scale: 1,
      duration: 0.3
    });
  });
});