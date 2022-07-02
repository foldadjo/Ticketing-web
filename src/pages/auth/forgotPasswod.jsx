import React, { useState } from "react";
import axios from "../../utils/axios";
import Spinner from "react-bootstrap/Spinner";
import Banner from "../../assets/homescreen.png";
import Logo from "../../assets/logo.png";

import "./auth.css";

function Forgot() {
  document.title = "Ticketing | Forgot Password";
  const [form, setForm] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      setIsError(false);
      setMessage("");
      const resultForgot = await axios.post("auth/forgotPassword", form);
      console.log(resultForgot);
      setIsError(false);
      setMessage(resultForgot.data.msg);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsError(true);
      setIsLoading(false);
      setMessage(error.response.data.msg);
    }
  };

  return (
    <>
      <div className="layer">
        <section className="banner">
          <div>
            <div className="logo">
              <div className="logo1">Ticketing</div>
              <img className="logo2" src={Logo} alt="logo" />
            </div>
            <div className="logo__overlay__label">wait, watch, wow!</div>
            <div className="banner__margin">
              <img src={Banner} alt="Image_Marvel" className="banner__img" />
            </div>
          </div>
        </section>
        <div className="signin">
          <div>
            <div className="logoForm">
              <div className="logo1Form">Ticketing</div>
              <img className="logo2Form" src={Logo} alt="logo" />
            </div>
            <div className="header__logo">
              {/* <image src={require("../../assets/Tickitz 2.png")} alt="logo" /> */}
            </div>
            <div>
              {!message ? null : isError ? (
                <div className="alert alert-danger me-4 ms-4" role="alert">
                  {message}
                </div>
              ) : (
                <div
                  className="alert alert-primary m-4  me-4 ms-4"
                  role="alert"
                >
                  {message}
                </div>
              )}
            </div>
            <div className="header__signin">Forgot Password</div>
            <div className="header__signin--comment">
              Write your email for reset Password, and cek it. you will get OTP
            </div>
            <form>
              <div className="header__detail">Email</div>
              <input
                type="email"
                placeholder="Input email"
                name="email"
                value={form.email}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div>
                <button
                  className="signin__button"
                  type="submit"
                  onClick={handleSubmit}
                >
                  {isLoading === true ? (
                    <Spinner animation="border" role="status" size={"sm"}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Forgot;
