/**
 * scroll-animation.js — GSAP + ScrollTrigger scroll-driven effects.
 * Adds ambient parallax shapes, idle floats on feature icons, and 3D tilts on product previews.
 * Fully optional and safe to delete.
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Guard against GSAP or ScrollTrigger missing
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("GSAP or ScrollTrigger is not loaded. Skipping scroll animations.");
    return;
  }

  // Register ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 2. BACKGROUND PARALLAX LAYER
  const bgContainer = document.querySelector('[data-animate="scroll-bg"]');
  if (bgContainer) {
    // Large, faint sketchy outlines matching app theme
    const shapes = [
      {
        // Rectangle
        d: "M 10 10 L 290 15 L 285 240 L 15 235 Z",
        w: 300,
        h: 250,
        top: "15%",
        left: "8%",
        yMove: 180,
        rot: 6
      },
      {
        // Ellipse
        d: "M 120 15 C 180 15, 230 65, 230 120 C 230 175, 180 225, 120 225 C 60 225, 15 175, 15 120 C 15 65, 60 15, 120 15",
        w: 250,
        h: 240,
        top: "40%",
        right: "6%",
        yMove: -120,
        rot: -8
      },
      {
        // Squiggle
        d: "M 10 90 Q 60 20 120 90 T 230 90 T 340 90",
        w: 350,
        h: 150,
        top: "65%",
        left: "5%",
        yMove: 250,
        rot: 5
      },
      {
        // Curved Arrow
        d: "M 20 130 Q 100 20 200 120 M 165 95 L 200 120 L 180 75",
        w: 220,
        h: 150,
        top: "85%",
        right: "10%",
        yMove: -160,
        rot: -7
      }
    ];

    shapes.forEach((shape, i) => {
      // Create SVG node
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "parallax-shape-svg");
      svg.setAttribute("viewBox", `0 0 ${shape.w} ${shape.h}`);
      svg.style.width = `${shape.w}px`;
      svg.style.height = `${shape.h}px`;
      svg.style.top = shape.top;
      
      if (shape.left) svg.style.left = shape.left;
      if (shape.right) svg.style.right = shape.right;

      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", shape.d);
      path.setAttribute("stroke", "#4edea3");
      path.setAttribute("stroke-width", "2");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-dasharray", i % 2 === 0 ? "none" : "6 6"); // alternate solid/dashed
      svg.appendChild(path);

      bgContainer.appendChild(svg);

      // Scroll parallax timeline (skip actual motion if reduced motion active)
      if (!prefersReduced) {
        gsap.to(svg, {
          y: shape.yMove,
          rotateX: shape.rot,
          rotateY: shape.rot / 2,
          scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: true
          }
        });
      }
    });
  }

  // 3. FEATURE ICONS FLOATING TRANSITIONS
  const featureIcons = document.querySelectorAll('#features-section [data-animate="drop-in"]');
  if (featureIcons.length > 0 && !prefersReduced) {
    featureIcons.forEach((icon) => {
      // Trigger slow, offset idle floating only once in viewport
      ScrollTrigger.create({
        trigger: "#features-section",
        start: "top 85%",
        onEnter: () => {
          gsap.to(icon, {
            y: "+=6",
            yoyo: true,
            repeat: -1,
            duration: 2.4 + Math.random() * 1.2, // randomized durations
            ease: "sine.inOut"
          });
        },
        once: true
      });
    });
  }

  // 4. DEMO CANVAS 3D TILT REVEAL
  const demoFrame = document.querySelector('[data-animate="demo-canvas"]');
  if (demoFrame && !prefersReduced) {
    // Initial 3d setup
    gsap.set(demoFrame, {
      rotateX: 10,
      scale: 0.92,
      opacity: 0.65
    });

    gsap.to(demoFrame, {
      rotateX: 0,
      scale: 1,
      opacity: 1,
      scrollTrigger: {
        trigger: demoFrame,
        start: "top 80%",
        end: "top 45%",
        scrub: 1 // smooth scrubbing
      }
    });
  }
});
