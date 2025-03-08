function locomotiveAnimation(){
  gsap.registerPlugin(ScrollTrigger);
  const scrollContainer = document.querySelector(".main[data-scroll-container]");
  const locoScroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true
  });
  locoScroll.on("scroll", ScrollTrigger.update);
  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: scrollContainer.style.transform ? "transform" : "fixed"
  });
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
  ScrollTrigger.refresh();
}
locomotiveAnimation();

function navbarAnimation(){
  gsap.to("nav", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger:{
      trigger: "#motion",
      scroller: ".main",
      start: "top 0",
      end: "top -5%",
      scrub: true
    }
  });
}
navbarAnimation();
var imagecons = document.querySelectorAll(".img-container");
imagecons.forEach(function(imagecon) {
  var playbtn = imagecon.querySelector(".play");
  var currentX = 0, currentY = 0, targetX = 0, targetY = 0;
  var setX = gsap.quickSetter(playbtn, "x", "px");
  var setY = gsap.quickSetter(playbtn, "y", "px");
  imagecon.addEventListener("mouseenter", function() {
    gsap.to(playbtn, { scale: 1, opacity: 1, duration: 0.2, ease: "power1.inOut", overwrite: "auto" });
  });
  imagecon.addEventListener("mouseleave", function() {
    gsap.to(playbtn, { scale: 0, opacity: 0, duration: 0.2, ease: "power1.inOut", overwrite: "auto" });
    targetX = 0;
    targetY = 0;
  });
  imagecon.addEventListener("mousemove", function(e) {
    var rect = imagecon.getBoundingClientRect();
    targetX = e.clientX - (rect.left + rect.width / 2);
    targetY = e.clientY - (rect.top + rect.height / 2);
  });
  gsap.ticker.add(function() {
    currentX += (targetX - currentX) * 0.2;
    currentY += (targetY - currentY) * 0.2;
    setX(currentX);
    setY(currentY);
  });
});
