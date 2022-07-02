import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Spinner from "react-bootstrap/Spinner";
import Banner from "../../assets/homescreen.png";
import Logo from "../../assets/logo.png";

import "./auth.css";

function Reset() {
  document.title = "Tickitz | Sign In";
  const navigate = useNavigate();
  const params = useParams();
  const [form, setForm] = useState({
    newPassword: "",
    confirmPassword: "",
    keyChangePassword: params.otp,
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
      const resultLogin = await axios.patch("auth/resetPassword", form);
      setIsError(false);
      setMessage(resultLogin.data.msg);
      navigate("/login");
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
            <div className="header__signin">Sign In</div>
            <div className="header__signin--comment">
              Sign in with your data that you entered during your registration
            </div>
            <form>
              <div className="header__detail">New Password</div>
              <input
                type="newPassword"
                placeholder="Input New Password"
                name="newPassword"
                value={form.newPassword}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div className="header__detail">Confirm Password</div>
              <input
                type="confirmPassword"
                placeholder="Input Confirm Password"
                name="confirmPassword"
                value={form.confirmPassword}
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
                    "Login"
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

export default Reset;
