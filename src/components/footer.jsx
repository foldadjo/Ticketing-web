import React from "react";
import "./component.css";

function Footer() {
  return (
    <div className="bg-white">
      <section className="footerweb" style={{ display: "flex" }}>
        <object style={{ flex: "1" }}>
          <div className="navbar-brand d-flex me-5 logoHome">
            <div className="text-primary fw-bold">Ticketing</div>
            <img
              src={require("../assets/logo.png")}
              alt="logoNavbar"
              className="logoNavbar"
            />
          </div>
          <div className="footerweb__item--content">
            Stop waiting in line. Buy tickets
          </div>
          <div className="footerweb__item--content">
            conveniently, watch movies quietly.
          </div>
        </object>
        <object className="footerweb__item" style={{ flex: "1" }}>
          <h5>Explore</h5>
          <div className="footerweb__mobile">
            <div className="footerweb__item--content">
              <a href="/">home</a>
            </div>
            <div className="footerweb__item--content">
              <a href="/viewall">list movie</a>
            </div>
          </div>
        </object>
        <object className="footerweb__item" style={{ flex: "1" }}>
          <h5>Our Sponsor</h5>
          <div className="footerweb__mobile">
            <div className="footerweb__item--content">
              <img
                src={require("../assets/logo ebv.png")}
                alt="sponsor"
                className="footerweb__item--sponsor"
              />
            </div>
            <div className="footerweb__item--content">
              <img
                src={require("../assets/logo cineone.png")}
                alt="sponsor"
                className="footerweb__item--sponsor"
              />
            </div>
            <div className="footerweb__item--content">
              <img
                src={require("../assets/logo hiflix.png")}
                alt="sponsor"
                className="footerweb__item--sponsor"
              />
            </div>
          </div>
        </object>
        <object className="footerweb__item" style={{ flex: "1" }}>
          <h5>Follow Us</h5>
          <div className="footerweb__mobile">
            <div className="footerweb__item--content">
              {/* <img
                src={require("../../assets/logo facebook.png")}
                alt="logo"
                className="footerweb__item--acc"
              /> */}
              <a href={"/"} className="acc__link">
                Tikitz cinema id
              </a>
            </div>
            <div className="footerweb__item--content">
              {/* <img
                src={require("../../assets/logo ig.png")}
                alt="logo"
                className="footerweb__item--acc"
              /> */}
              <a href={"/"} className="acc__link">
                {" "}
                tikitz.id
              </a>
            </div>
            <div className="footerweb__item--content">
              {/* <img
                src={require("../../assets/logo twitter.png")}
                alt="logo"
                className="footerweb__item--acc"
              /> */}
              <a href={"/"} className="acc__link">
                {" "}
                tikitz.id
              </a>
            </div>
            <div className="footerweb__item--content">
              {/* <img
                src={require("../../assets/logo youtube.png")}
                alt="logo"
                className="footerweb__item--acc"
              /> */}
              <a href={"/"} className="acc__link">
                {" "}
                Tikitz cinema id
              </a>
            </div>
          </div>
        </object>
      </section>
      <div className="footerend">© 2020 Tickitz. All Rights Reserved.</div>
    </div>
  );
}

export default Footer;
