import React, { useEffect, useRef, useState } from "react";

function HeroSection({ images, places }) {
  const outerImageRef = useRef(null);
  const middleImageRef = useRef(null);
  const innerImageRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);

  useEffect(() => {
    const outerImage = outerImageRef.current;
    const middleImage = middleImageRef.current;
    const innerImage = innerImageRef.current;

    let iteration = 0;

    const rotateMiddle = () => {
      if (iteration < 5) {
        outerImage.style.animation = "rotateSquare3 2s ease-in-out";
        middleImage.style.animation = "rotateSquare2 2s ease-in-out";
        innerImage.style.animation = "rotateSquare1 2s ease-in-out";
        setTimeout(() => {
          outerImage.style.opacity = 0.7;
          middleImage.style.opacity = 0.7;
          innerImage.style.opacity = 0.7;

          setTimeout(() => {
            const nextImageIndex = iteration % images.length;
            setCurrentImageIndex(nextImageIndex);

            outerImage.src = images[nextImageIndex];
            middleImage.src = images[nextImageIndex];
            innerImage.src = images[nextImageIndex];

            outerImage.style.opacity = 0.8;
            middleImage.style.opacity = 0.8;
            innerImage.style.opacity = 0.8;
          }, 500); // Wait for opacity transition to fade out
        }, 500); // Change image halfway through the animation
      }
      iteration++;

      setTimeout(() => {
        outerImage.style.animation = "none";
        middleImage.style.animation = "none";
        innerImage.style.animation = "none";
        setTimeout(rotateMiddle, 2000);
      }, 2000);
    };

    setTimeout(rotateMiddle, 2000);

    return () => {};
  }, []);

  return (
    <div className="hero-section">
      <div className="outer-area">
        <img
          ref={outerImageRef}
          className="outer-area-img"
          src={images[0]}
        ></img>
      </div>
      <div className="middle-area">
        <div className="overlay-middle"></div>
        <img
          ref={middleImageRef}
          className="middle-area-img"
          src={images[0]}
        ></img>
      </div>
      <div className="inner-area">
        <img
          ref={innerImageRef}
          className="inner-area-img"
          src={images[0]}
        ></img>
      </div>
      <div className="city-info">
        <div className="city-text">{places[currentImageIndex].cityName}</div>
        <div className="city-line"></div>
        <div className="city-desc">{places[currentImageIndex].description}</div>
      </div>
    </div>
  );
}
export default HeroSection;
