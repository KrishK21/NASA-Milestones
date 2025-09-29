// https://github.com/KrishK21/CS-220-Homework

import React, { useEffect } from "react";
import "./FloatingPlanets.css";

import jupiter from "../assets/jupiter.png";
import mercury from "../assets/mercury.png";
import saturn from "../assets/saturn.png";
import venus from "../assets/venus.png";

const planetImages = [jupiter, mercury, saturn, venus];

export default function FloatingPlanets() {
  useEffect(() => {
    const container = document.querySelector(".planet-container");

    const createPlanet = () => {
      // Planet affect from spawning in randomly on the page
      const img = document.createElement("img");
      img.src = planetImages[Math.floor(Math.random() * planetImages.length)];
      img.className = "floating-planet";
      img.style.top = `${Math.random() * 90}vh`;
      img.style.left = `${Math.random() * 100}vw`;
      // Random duration formula I found
      img.style.animationDuration = `${10 + Math.random() * 4}s`;
      img.style.width = `${40 + Math.random() * 40}px`;
      img.style.width = "30px";
      img.style.height = "30px";
      container.appendChild(img);

      setTimeout(() => img.remove(), 20000);
    };

    const interval = setInterval(createPlanet, 3000);
    return () => clearInterval(interval);
  }, []);

  return <div className="planet-container" />;
}
