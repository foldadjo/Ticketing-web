import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Spinner from "react-bootstrap/Spinner";
import Banner from "../../assets/homescreen.png";
import Logo from "../../assets/logo.png";

import "./auth.css";

function Register() {
  document.title = "Ticketing | Sign Up";
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
    email: "",
    password: "",
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
      const resultRegister = await axios.post("auth/register", form);
      console.log(resultRegister);
      setIsError(false);
      setMessage(resultRegister.data.msg);
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
            <div className="header__signin">Sign Up</div>
            <div className="header__signin--comment">
              Register with your data that you entered during your login
            </div>
            <form>
              <input
                type="text"
                placeholder="Write your last name"
                name="lastName"
                value={form.lastName}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div className="header__detail">Phone Number</div>
              <input
                type="tel"
                placeholder="Write your number phone"
                name="noTelp"
                value={form.noTelp}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div className="header__detail">Email</div>
              <input
                type="email"
                placeholder="Write your email"
                name="email"
                value={form.email}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div className="header__detail">Password</div>
              <input
                type="password"
                placeholder="Write your password"
                name="password"
                value={form.password}
                className="join__input"
                onChange={handleChangeForm}
              />{" "}
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
                    "Register"
                  )}
                </button>
              </div>
            </form>
            <div className="signin--comment">
              Already have account?{" "}
              <a href="/login" className="signup">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
