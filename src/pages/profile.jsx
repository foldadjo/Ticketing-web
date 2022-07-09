import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./aStyle.css";
import { useDispatch } from "react-redux";
import {
  getUser,
  updateProfile,
  updatePassword,
  updateImage,
  deleteImage,
} from "../store/action/user";

function Profile() {
  document.title = "Ticketing | Profile";
  const dataUserLocal = localStorage.getItem("dataUser");
  const dataUser = JSON.parse(dataUserLocal);
  const [image, setImage] = useState(null);
  const [noTelp, setNoTelp] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    noTelp: "",
    newPassword: "",
    confirmPassword: "",
    image: null,
  });

  useEffect(() => {
    handleUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image, noTelp, name]);
  const handleUser = async () => {
    try {
      const result = await dispatch(getUser(dataUser.id));
      setImage(result.value.data.data[0].image);
      setNoTelp(result.value.data.data[0].noTelp);
      setName(result.value.data.data[0].name);
    } catch (error) {}
  };

  const handleChangeForm = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
      setImage(URL.createObjectURL(files[0]));
      console.log(image);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const deletePicture = async () => {
    try {
      const result = await dispatch(deleteImage(dataUser.id));
      setImage(null);
      alert(result.value.data.msg);
    } catch (error) {
      alert("image is null");
      console.log(error);
    }
  };
  const changePicture = async (file) => {
    try {
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      const result = await dispatch(updateImage(dataUser.id, formData));
      alert(result.value.data.msg);
      const dataUserNew = await dispatch(getUser(dataUser.id));
      setImage(dataUserNew.value.data.data[0].image);
      setForm({
        firstName: "",
        lastName: "",
        noTelp: "",
        newPassword: "",
        confirmPassword: "",
        image: null,
      });
    } catch (error) {
      console.log("error");
    }
  };

  const handleChangeProfile = async () => {
    try {
      if (form.firstName === "" && form.noTelp === "") {
        alert("form change profile is require");
      } else {
        const result = await dispatch(updateProfile(dataUser.id, form));
        const dataUserNew = await dispatch(getUser(dataUser.id));
        setNoTelp(dataUserNew.value.data.data[0].noTelp);
        setName(dataUserNew.value.data.data[0].name);
        setForm({
          firstName: "",
          lastName: "",
          noTelp: "",
          newPassword: "",
          confirmPassword: "",
          image: null,
        });
        alert(result.value.data.msg);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChangePassword = async (e) => {
    try {
      if (form.confirmPassword === "" || form.confirmPassword === "") {
        alert("form change password is required");
      } else {
        const result = await dispatch(updatePassword(dataUser, form));
        alert(result.value.data.msg);
        setForm({
          firstName: "",
          lastName: "",
          noTelp: "",
          newPassword: "",
          confirmPassword: "",
          image: null,
        });
      }
    } catch (error) {
      alert(error.response.value.data.msg);
      console.log(error.response);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>Profile Page</h1>
      <hr />
      <div className="row">
        <div className="body__header col-md-4">
          <div className="profile_card">
            <div className="text-start ms-3">info</div>
            <div className="deleteImage" onClick={() => deletePicture()}>
              <dfn title="Delete Image">X</dfn>
            </div>
            <img
              className="profile_Image"
              src={
                image === ("" || undefined || null || "null")
                  ? `${process.env.REACT_APP_LINK_CLOUDINARY}tiketjauhar/user/images_qygn7n.jpg`
                  : `${process.env.REACT_APP_LINK_CLOUDINARY}${image}`
              }
              alt="imageProfile"
            />
            <div className="profile_name">{name}</div>
            <div>
              {noTelp === (null || "" || undefined) ? (
                <div style={{ opacity: 0.6 }}> number telphone not add </div>
              ) : (
                noTelp
              )}
            </div>
            <hr />
            <button className="btn btn-primary" onClick={handleLogout}>
              Logout
            </button>
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
                  name="firstName"
                  onChange={handleChangeForm}
                  value={form.firstName}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
              <div className="col-5">
                <div className="mb-2">last name</div>
                <input
                  type={"text"}
                  name="lastName"
                  onChange={handleChangeForm}
                  value={form.lastName}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-5">
                <div className="mb-2">Image</div>
                <input type={"file"} name="image" onChange={handleChangeForm} />
              </div>
              <div className="col-5">
                <div className="mb-2">Number phone</div>
                <input
                  type={"tel"}
                  name="noTelp"
                  value={form.noTelp}
                  onChange={handleChangeForm}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <br />
          </div>
          <div className="d-flex justify-content-start">
            <button
              onClick={
                form.image === null ? handleChangeProfile : changePicture
              }
              className="btn btn-primary px-5 py-2 mb-4"
            >
              {form.image === null ? "Update Change" : "Update Picture"}
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
                  name="newPassword"
                  onChange={handleChangeForm}
                  value={form.newPassword}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
              <div className="col-5">
                <div className="mb-2">Confirm Password</div>
                <input
                  type={"text"}
                  name="confirmPassword"
                  onChange={handleChangeForm}
                  value={form.confirmPassword}
                  className="px-3 py-1 my-1 bg-light border-light rounded"
                />
              </div>
            </div>
            <br />
          </div>
          <div className="d-flex justify-content-start">
            <button
              className="btn btn-primary px-5 py-2 mb-4"
              onClick={handleChangePassword}
            >
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
