import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

function HeroSection({ images, places, handleScrollUp }) {
  const outerImageRef = useRef(null);
  const middleImageRef = useRef(null);
  const innerImageRef = useRef(null);
  const discoverMoreRef = useRef(null);
  const iterationRef = useRef(0); // Ref to track the iteration
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const outerImage = outerImageRef.current;
    const middleImage = middleImageRef.current;
    const innerImage = innerImageRef.current;

    const rotateMiddle = () => {
      if (iterationRef.current < 5) {
        outerImage.style.animation = "rotateSquare3 2s ease-in-out";
        middleImage.style.animation = "rotateSquare2 2s ease-in-out";
        innerImage.style.animation = "rotateSquare1 2s ease-in-out";
        const cityTextElement = document.getElementsByClassName("city-text")[0];
        const cityDescElement = document.getElementsByClassName("city-desc")[0];

        setTimeout(() => {
          outerImage.style.opacity = 0.7;
          middleImage.style.opacity = 0.7;
          innerImage.style.opacity = 0.7;
          cityTextElement.classList.remove("fade-in");
          cityDescElement.classList.remove("fade-in");
          cityTextElement.classList.add("fade-out");
          cityDescElement.classList.add("fade-out");

          setTimeout(() => {
            const nextImageIndex = iterationRef.current % images.length;
            setCurrentImageIndex(nextImageIndex);

            outerImage.src = images[nextImageIndex];
            middleImage.src = images[nextImageIndex];
            innerImage.src = images[nextImageIndex];

            outerImage.style.opacity = 0.8;
            middleImage.style.opacity = 0.8;
            innerImage.style.opacity = 0.8;
            cityTextElement.classList.remove("fade-out");
            cityDescElement.classList.remove("fade-out");
            cityTextElement.classList.add("fade-in");
            cityDescElement.classList.add("fade-in");
          }, 500); // Wait for opacity transition to fade out
        }, 500); // Change image halfway through the animation
      }
      iterationRef.current = (iterationRef.current + 1) % images.length;

      setTimeout(() => {
        outerImage.style.animation = "none";
        middleImage.style.animation = "none";
        innerImage.style.animation = "none";

        setTimeout(rotateMiddle, 2000);
      }, 2000);
    };

    setTimeout(rotateMiddle, 2000);

    return () => {};
  }, [images.length]);

  const onPrevClick = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    changeImage(prevIndex);
  };

  const onNextClick = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    changeImage(nextIndex);
  };

  const changeImage = (index) => {
    const outerImage = outerImageRef.current;
    const middleImage = middleImageRef.current;
    const innerImage = innerImageRef.current;

    const cityTextElement = document.getElementsByClassName("city-text")[0];
    const cityDescElement = document.getElementsByClassName("city-desc")[0];
    cityTextElement.classList.remove("fade-in");
    cityDescElement.classList.remove("fade-in");
    cityTextElement.classList.add("fade-out");
    cityDescElement.classList.add("fade-out");

    outerImage.classList.add("new-image");
    middleImage.classList.add("new-image");
    innerImage.classList.add("new-image");

    setTimeout(() => {
      setCurrentImageIndex(index);
      iterationRef.current = index;

      outerImage.src = images[index];
      middleImage.src = images[index];
      innerImage.src = images[index];

      cityTextElement.classList.remove("fade-out");
      cityDescElement.classList.remove("fade-out");
      cityTextElement.classList.add("fade-in");
      cityDescElement.classList.add("fade-in");

      outerImage.classList.remove("new-image");
      middleImage.classList.remove("new-image");
      innerImage.classList.remove("new-image");
      console.log(outerImage.src);
    }, 500);
  };

  const animateDiscoverMore = () => {
    const discoverMore = discoverMoreRef.current;
    if (discoverMore) {
      discoverMore.style.animation = "bubble 0.4s ease-in-out";
      setTimeout(() => {
        discoverMore.style.animation = "none";
      }, 500);
    }
  };

  const handleDiscoverMore = () => {
    animateDiscoverMore();
    handleScrollUp();
  };

  return (
    <div className="hero-section">
      <div className="outer-area">
        <img
          ref={outerImageRef}
          className="outer-area-img"
          src={images[currentImageIndex]}
          alt="outer"
        />
      </div>
      <div className="middle-area">
        <div className="overlay-middle"></div>
        <img
          ref={middleImageRef}
          className="middle-area-img"
          src={images[currentImageIndex]}
          alt="middle"
        />
      </div>
      <div className="inner-area">
        <img
          ref={innerImageRef}
          className="inner-area-img"
          src={images[currentImageIndex]}
          alt="inner"
        />
      </div>
      <div className="city-info">
        <div className="city-text">{places[currentImageIndex].cityName}</div>
        <div className="city-line"></div>
        <div className="city-desc">{places[currentImageIndex].description}</div>
        <div className="controls">
          <div className="left-control" onClick={() => onPrevClick()}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </div>
          <div className="divider"></div>
          <div className="right-control" onClick={() => onNextClick()}>
            <FontAwesomeIcon icon={faArrowRight} />
          </div>
        </div>
      </div>
      <div className="discover-block">
        {/* <a href="#section2">Discover More</a> */}
        <span className="discover-text" onClick={handleDiscoverMore}>
          Discover More
        </span>
      </div>
      <span className="discover-bubble" ref={discoverMoreRef}></span>
      <div className="image-info">Top 5 Destinations for This Month</div>
    </div>
  );
}

export default HeroSection;
