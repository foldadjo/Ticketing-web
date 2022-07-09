import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./component.css";
import { Dropdown } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getUser } from "../store/action/user";

function Navbar(props) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [tap, setTap] = useState(false);
  const [search, setSearch] = useState("");
  let dataUser = localStorage.getItem("dataUser");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  console.log(props.imageChange);

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, props.imageChange]);
  const handleUser = async () => {
    try {
      const result = await dispatch(getUser(dataUser.id));
      setImage(result.value.data.data[0].image);
    } catch (error) {}
  };
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  dataUser = JSON.parse(dataUser);

  const handleTap = () => {
    if (tap === true) {
      setTap(false);
    } else {
      setTap(true);
    }
  };

  useEffect(() => {
    setTap(false);
  }, [props]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handleViewall = () => {
    navigate("/viewall");
  };
  const handlemanageSchedule = () => {
    navigate("/manageschedule");
  };
  const handlemanageMovie = () => {
    navigate("/managemovie");
  };
  const handleProfile = () => {
    navigate("/profile");
  };
  const handleDashboard = () => {
    navigate("/dashboard");
  };

  const script1 = document.createElement("script");
  script1.src =
    "https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js";
  script1.async = true;
  document.body.appendChild(script1);

  const script2 = document.createElement("script");
  script2.src =
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js";
  script2.async = true;
  document.body.appendChild(script2);

  return (
    <div className="bg-white">
      <div className="navbar navbar-expand-lg navbar-light fixed-top bg-white text-center">
        <div className="container mt-0">
          <div>
            <a className="navbar-brand d-flex me-5 logoHome" href="/">
              <div className="text-primary fw-bold">Ticketing</div>
              <img
                src={require("../assets/logo.png")}
                alt="logoNavbar"
                className="logoNavbar"
              />
            </a>
          </div>
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              {!token ? (
                <span className="navbar-toggler-icon"></span>
              ) : (
                <img
                  className="profileImage"
                  src={
                    dataUser.image === ("" || undefined || "null")
                      ? `${process.env.REACT_APP_LINK_CLOUDINARY}tiketjauhar/user/images_qygn7n.jpg`
                      : `${process.env.REACT_APP_LINK_CLOUDINARY}${image}`
                  }
                  alt="imageProfile"
                />
              )}
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {!token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handleViewall}>
                    List Movie
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            ) : dataUser.role !== "admin" ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <a href="/" className="nav-link">
                    Home
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handleViewall}>
                    List Movie
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item nav2hiden">
                  <div className="nav-link" onClick={handleProfile}>
                    Profile
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item nav2hiden">
                  <div className="nav-link" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            ) : (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handleDashboard}>
                    Dashboard
                  </div>
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handlemanageMovie}>
                    Manage Movie
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={handlemanageSchedule}>
                    Manage Schedule
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item nav2hiden">
                  <div className="nav-link" onClick={handleProfile}>
                    Profile
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="nav-item nav2hiden">
                  <div className="nav-link" onClick={handleLogout}>
                    Logout
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
              </ul>
            )}
            <div>
              {!token ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleLogout()}
                  type="submit"
                >
                  Sign Up
                </button>
              ) : (
                <div>
                  <FaSearch
                    className="me-3 search nav1hiden"
                    onClick={() => handleTap()}
                  />
                  <input
                    type={"text"}
                    placeholder="searh movie.."
                    className={`inputMovie nav1hiden ${
                      tap === true ? "d-inline" : "d-none"
                    }`}
                    onChange={handleSearch}
                    value={search}
                  />
                  <Dropdown autoClose="outside">
                    <Dropdown.Toggle
                      className="nav1hiden"
                      variant="transparant"
                      id="dropdown-basic"
                    >
                      <img
                        className="profileImage"
                        src={
                          dataUser.image === ("" || undefined || "null")
                            ? `${process.env.REACT_APP_LINK_CLOUDINARY}tiketjauhar/user/images_qygn7n.jpg`
                            : `${process.env.REACT_APP_LINK_CLOUDINARY}${dataUser.image}`
                        }
                        alt="imageProfile"
                      />
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="notification">
                      <Dropdown.Item onClick={handleProfile}>
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    <br />
                    <li className="nav2hiden">
                      <div className="disabled">
                        © 2020 Tickitz. All Rights Reserved.
                      </div>
                    </li>
                  </Dropdown>
                </div>
              )}
            </div>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li>
                <hr className="dropdown-divider" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
