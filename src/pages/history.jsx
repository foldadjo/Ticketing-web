import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import "./aStyle.css";

function History() {
  document.title = "Ticketing | Profile";
  const navigate = useNavigate();
  const dataUserLocal = localStorage.getItem("dataUser");
  const dataUser = JSON.parse(dataUserLocal);
  const premiere = "hiflix";

  const handleTicket = (bookingId) => {
    navigate(`/ticket/${bookingId}`);
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>History Page</h1>
      <hr />
      <div className="row">
        <div className="body__header col-md-4">
          <div className="profile_card">
            <div className="text-start ms-3">info</div>
            <div className="deleteImage">X</div>
            <img
              className="profile_Image"
              src={
                dataUser.image === ("" || undefined || "null")
                  ? `${process.env.REACT_APP_LINK_CLOUDINARY}tiketjauhar/user/images_qygn7n.jpg`
                  : `${process.env.REACT_APP_LINK_CLOUDINARY}${dataUser.image}`
              }
              alt="imageProfile"
            />
            <div className="profile_name">{dataUser.name}</div>
            <div>
              {dataUser.noTelp === (null || "" || undefined) ? (
                <div style={{ opacity: 0.6 }}> number telphone not add </div>
              ) : (
                dataUser.noTelp
              )}
            </div>
            <hr />
            <button className="btn btn-primary">Logout</button>
          </div>
        </div>
        <div className="body__header col-md-8">
          <div className="profile_card2" style={{ display: "flex" }}>
            <a
              href="/profile"
              className="mx-3 text-dark"
              style={{ cursor: " pointer", opacity: 0.6 }}
            >
              Account Setting
            </a>
            <div
              className="ms-3 pb-3 border-bottom border-primary"
              style={{
                fontWeight: "500",
                color: "black",
                borderBottomColor: "#5f2eea",
                borderBottomWidth: 10,
                cursor: "pointer",
              }}
            >
              Order History
            </div>
          </div>
          <div className="profile_card2 px-4">
            <div className="row">
              <div className="col pt-2">
                <div>Tuesday, 07 July 2020 - 04:30pm</div>
                <div className="m-3 mb-2 text-align-left fw-bold">
                  Spiderman Homecoming
                </div>
              </div>
              <div className="col d-flex justify-content-end">
                <img
                  src={
                    premiere === "Ebu.Id"
                      ? require("../assets/logo ebv.png")
                      : premiere === "hiflix"
                      ? require("../assets/logo hiflix.png")
                      : premiere === "cinemaOne"
                      ? require("../assets/logo cineone.png")
                      : require("../assets/logo.png")
                  }
                  alt="logo"
                  className="px-4 pt-2"
                  style={{ widht: 100, height: 50 }}
                />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-success px-5 py-2 mb-4"
                onClick={() => handleTicket()}
              >
                Ticket in active
              </button>
            </div>
          </div>
          <div className="profile_card2 px-4">
            <div className="row">
              <div className="col pt-2">
                <div>Tuesday, 07 July 2020 - 04:30pm</div>
                <div className="m-3 mb-2 text-align-left fw-bold">
                  One Piece film Red
                </div>
              </div>
              <div className="col d-flex justify-content-end">
                <img
                  src={
                    premiere === "Ebu.Id"
                      ? require("../assets/logo ebv.png")
                      : premiere === "hiflix"
                      ? require("../assets/logo hiflix.png")
                      : premiere === "cinemaOne"
                      ? require("../assets/logo cineone.png")
                      : require("../assets/logo.png")
                  }
                  alt="logo"
                  className="px-4 pt-2"
                  style={{ widht: 100, height: 50 }}
                />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-start">
              <button
                className="btn btn-dark px-5 py-2 mb-4"
                onClick={() => handleTicket()}
              >
                Ticket used
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default History;
