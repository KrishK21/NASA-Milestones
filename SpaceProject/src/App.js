// https://github.com/KrishK21/CS-220-Homework

import React, { useState, useEffect, useRef } from "react";
import Header from "./components/Header";
import DatePicker from "./components/DatePicker";
import ImageDisplay from "./components/ImageDisplay";
import FloatingPlanets from "./components/FloatingPlanets";
import "./App.css";
import spaceAudio from "./assets/music1.wav";

function App() {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [bgImage, setBgImage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  // Catch warning if the user does not sleect a date
  const handleDateChange = async (newDate) => {
    if (!newDate) {
      alert("Please select a year before searching.");
      return;
    }

    setDate(newDate);
    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?media_type=image&year_start=${newDate}&year_end=${newDate}`
      );
      const data = await res.json();
      setResults(data.collection.items);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again.");
    }
  };

  // For the landing page background to use image
  const fetchRandomImage = async () => {
    try {
      const res = await fetch(
        `https://images-api.nasa.gov/search?q=nebula&media_type=image`
      );
      const data = await res.json();
      const items = data.collection.items;
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setBgImage(randomItem?.links?.[0]?.href);
    } catch (error) {
      console.error("Error fetching background image:", error);
    }
  };

  useEffect(() => {
    fetchRandomImage();
  }, []);

  useEffect(() => {
    // Starting effect I added for stars moving left to right s
    const starLayer = document.querySelector(".star-layer");

    const createStar = () => {
      const star = document.createElement("div");
      star.className = "star";
      star.style.left = `${Math.random() * 20}vw`;
      star.style.bottom = `-${Math.random() * 10 + 5}vh`;
      star.style.animationDuration = `${6 + Math.random() * 4}s`;
      starLayer.appendChild(star);

      setTimeout(() => {
        star.remove();
      }, 10000);
    };

    const interval = setInterval(createStar, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const starLayer = document.querySelector(".star-layer");

    const createTwinkleStar = () => {
      // black and white stars glowing when you go to the reading page
      const star = document.createElement("div");
      star.className = "twinkle-star";
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${1.5 + Math.random()}s`;
      starLayer.appendChild(star);
    };

    for (let i = 0; i < 100; i++) {
      createTwinkleStar();
    }
  }, []);

  // Audio part fix later
  const toggleAudio = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div
      className="App"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="star-layer" />
      {results.length === 0 && <div className="hero-overlay" />}

      <FloatingPlanets />

      <audio ref={audioRef} src={spaceAudio} autoPlay loop />

      <div className="landing-content">
        <h1 className="tagline">Explore the Universe</h1>
        <p className="subtitle">Discover NASA images by date</p>
        <button
          className="cta-button"
          onClick={() => {
            window.scrollTo({ top: 600, behavior: "smooth" });
            audioRef.current?.play();
          }}
        >
          Start Exploring
        </button>
      </div>

      <div className="audio-toggle">
        <button onClick={toggleAudio}>
          {isMuted ? "Unmute 🔈" : "Mute 🔇"}
        </button>
      </div>

      <div className="content-wrapper">
        <Header />
        <DatePicker onDateChange={handleDateChange} />

        <div className="controls">
          <button onClick={() => handleDateChange(date)}>Search Images</button>
          <button onClick={fetchRandomImage}>New Background</button>
          <button onClick={() => setResults([])}>Clear Results</button>
        </div>

        <ImageDisplay items={results} />
      </div>
    </div>
  );
}

export default App;
