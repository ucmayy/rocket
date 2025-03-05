function locomotiveAnimation(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navbarAnimation(){
    gsap.to("nav",{
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger:{
            trigger:"#motion",
            scroller: "#main",
            start: "top 0",
            end: "top -5%",
            scrub:true
        }
    })
}
navbarAnimation()

var imagecons = document.querySelectorAll(".img-container");
imagecons.forEach(function(imagecon) {
  var playbtn = imagecon.querySelector(".play");
  imagecon.addEventListener("mouseenter", function() {
    gsap.to(playbtn, {
      scale: 1,
      opacity: 1,
      duration: 0.3 
    });
  });
  imagecon.addEventListener("mouseleave", function() {
    gsap.to(playbtn, { 
      scale: 0, 
      opacity: 0, 
      duration: 0.3 });
  });
  imagecon.addEventListener("mousemove", function(event) {
    var rect = imagecon.getBoundingClientRect();
    gsap.to(playbtn, {
      left: event.clientX - rect.left,
      top: event.clientY - rect.top,
      duration: 0.3
    });
  });
});


gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length
      ? locoScroll.scrollTo(value, 0, 0)
      : locoScroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0, left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});