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

// About us Page 
gsap.from(".feature-card", {
    scale: 0,
    duration: 1,
    rotate: 1440,
    ease: "steps.out"
})