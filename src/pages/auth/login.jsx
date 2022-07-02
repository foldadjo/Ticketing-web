import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Spinner from "react-bootstrap/Spinner";
import Banner from "../../assets/homescreen.png";
import Logo from "../../assets/logo.png";

import "./auth.css";

function Login() {
  document.title = "Ticketing | Sign In";
  const navigate = useNavigate();
  const [form, setForm] = useState({
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
      const resultLogin = await axios.post("auth/login", form);
      const resultName = await axios.get(`user/${resultLogin.data.data.id}`);
      console.log(resultLogin);
      const resultUser = [
        {
          id: resultLogin.data.data.id,
          name: resultName.data.data[0].name,
          role: resultName.data.data[0].role,
          image: resultName.data.data[0].image,
        },
      ];
      setIsError(false);
      setMessage(resultLogin.data.msg);
      localStorage.setItem("token", resultLogin.data.data.token);
      localStorage.setItem("refreshToken", resultLogin.data.data.refreshToken);
      localStorage.setItem("dataUser", JSON.stringify(resultUser[0]));
      console.log(resultUser);
      navigate("/");
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
              <div className="header__detail">Email</div>
              <input
                type="email"
                placeholder="Input email"
                name="email"
                value={form.email}
                className="join__input"
                onChange={handleChangeForm}
              />
              <div className="header__detail">Password</div>
              <input
                type="password"
                placeholder="Input Password"
                name="password"
                value={form.password}
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
            <div className="signin--comment">
              Forget your pasword?{" "}
              <a href="/forgotPassword" className="signup">
                Reset Now
              </a>
            </div>
            <div className="signin--comment">
              Don't have an acount?{" "}
              <a href="/register" className="signup">
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
