import React from "react";
import backgroundImage from "../../../assets/aboutBg.jpeg";
import bali from "../../../assets/bali.jpg";
import bali1 from "../../../assets/bali1.jpeg";

function AboutSection() {
  return (
    <div className="about-section">
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
        className="overlay"
      />
      <div className="about">
        <div className="tagline">UNVEILING</div>
        <div className="tagline">THE UNFORGETTABLE</div>
        <div className="about-main">
          <span className="about-text">
            "Welcome to Wanderlust Haven, where every step is a journey and
            every journey a destination. Let's explore the world together, one
            adventure at a time."
          </span>
          <div className="about-images">
            <img className="about-img1" src={bali}></img>
            <img className="about-img2" src={bali1}></img>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
