import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import aboutBg from "../../assets/aboutBg.jpeg";
import HeroSection from "./heroSection";
import AboutSection from "./aboutSection";
import FooterSection from "./footerSection";

function Landing() {
  const [places, setPlaces] = useState([]);
  const [imagesData, setImagesData] = useState([]);
  const [images, setImages] = useState([]);
  const url = "https://pixabay.com/api/";
  const apiKey = "Generate your own";

  const refScrollUp = useRef();
  const [load, setLoad] = useState(true);
  const month = ["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"];
  
  const handleScroll = (event) => {
    console.log("User scrolled!");
  };
  useEffect(() => {
    let monthName = month[new Date().getMonth()];
    axios
      .get(`/triptrace/rest/v1/home?month=${monthName}&country=India`)
      .then(async (response) => {
        const placeData = response.data;
        setPlaces(placeData);
        const imageRequests = placeData.map((place) =>
          axios.get(
            `${url}?key=${apiKey}&q=${place.cityName}&image_type=photo&orientation=horizontal&per_page=3&safeSearch=true&min_width=1020&min_height=1020`
          )
        );
        const imageResponses = await Promise.all(imageRequests);
        const imageUrls = imageResponses.map((res) => {
          if (res.data.totalHits === 0) {
            return aboutBg;
          } else {
            return res.data.hits[0]?.largeImageURL || aboutBg;
          }
        });
        setImages(imageUrls);
        setLoad(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleScrollUp = () => {
    console.log("call");
    refScrollUp.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing">
      {!load && (
        <div>
          <div className="header">
            <span>TRIP TRACE</span>
            <ul className="nav">
              <li>
                <a href="#section2">About</a>
              </li>
              <li>
                <a href="#section3">Explore</a>
              </li>
              <li>
                <a href="#section4">Contact</a>
              </li>
            </ul>
          </div>
          <div className="container" onScroll={handleScroll}>
            <div className="main-section" id="section1">
              <HeroSection
                images={images}
                places={places}
                handleScrollUp={handleScrollUp}
              />
            </div>
            <div className="main-section" id="section2" ref={refScrollUp}>
              <AboutSection />
            </div>
            <div className="main-section" id="section4">
              <FooterSection />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Landing;
