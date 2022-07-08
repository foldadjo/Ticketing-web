import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./aStyle.css";

function Profile() {
  document.title = "Ticketing | Profile";
  const dataUserLocal = localStorage.getItem("dataUser");
  const dataUser = JSON.parse(dataUserLocal);
  return (
    <div className="text-center container">
      <Navbar />
      <h1>Profile Page</h1>
      <hr />
      <div className="row">
        <div className="body__header col-md-4">
          <div className="profile_card">
            <div className="text-start ms-3">info</div>
            <div className="deleteImage">
              <dfn title="Delete Image">X</dfn>
            </div>
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
            <div
              className="mx-3 pb-3 border-bottom border-primary"
              style={{
                fontWeight: "500",
                color: "black",
                borderBottomColor: "#5f2eea",
                borderBottomWidth: 10,
                cursor: "pointer",
              }}
            >
              Account Setting
            </div>
            <a
              href="/history"
              className="ms-3 text-dark"
              style={{ cursor: " pointer", opacity: 0.6 }}
            >
              Order History
            </a>
          </div>
          <div className="profile_card2 ps-5">
            <div className="m-3 mb-2 text-align-left fw-bold">
              Details Information
            </div>
            <hr />
            <div className="row">
              <div className="col-5">
                <div className="mb-2">first name</div>
                <input
                  type={"text"}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
              <div className="col-5">
                <div className="mb-2">last name</div>
                <input
                  type={"text"}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-5">
                <div className="mb-2">Image</div>
                <input type={"file"} />
              </div>
              <div className="col-5">
                <div className="mb-2">Number phone</div>
                <input
                  type={"tel"}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <br />
          </div>
          <div className="d-flex justify-content-start">
            <button className="btn btn-primary px-5 py-2 mb-4">
              Update Change
            </button>
          </div>
          <div className="profile_card2 ps-5">
            <div className="m-3 mb-2 text-align-left fw-bold">
              Account and Privacy
            </div>
            <hr />
            <div className="row">
              <div className="col-5">
                <div className="mb-2">New Password</div>
                <input
                  type={"text"}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
              <div className="col-5">
                <div className="mb-2">Confirm Password</div>
                <input
                  type={"text"}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <br />
          </div>
          <div className="d-flex justify-content-start">
            <button className="btn btn-primary px-5 py-2 mb-4">
              Update Change
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
