import React from "react";
import HeroSection from "./heroSection";
import AboutSection from "./aboutSection";
import FormSection from "./FormSection";
import FooterSection from "./footerSection";

function Landing() {
  return (
    <div className="landing">
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
      <div className="container">
        <div className="main-section" id="section1">
          <HeroSection />
        </div>
        <div className="main-section" id="section2">
          <AboutSection />
        </div>
        <div className="main-section" id="section3">
          <FormSection />
        </div>
        <div className="main-section" id="section4">
          <FooterSection />
        </div>
      </div>
    </div>
  );
}
export default Landing;
