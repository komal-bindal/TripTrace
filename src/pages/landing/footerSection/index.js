import React from "react";
import footerBg from "../../../assets/footerBg.jpeg";

function FooterSection() {
  return (
    <div className="footer-section">
      <div
        style={{
          backgroundImage: `url(${footerBg})`,
        }}
        className="overlay"
      />
      <div className="footer">
        <div className="title-section">
          <div className="hello-heading">Say Hello.</div>
          <div className="hello-subheading">
            <span>Feel free to drop us an email anytime</span>
            <span>We'd love to hear from you</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterSection;
