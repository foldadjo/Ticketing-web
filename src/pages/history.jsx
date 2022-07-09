import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { getBookingByUserId } from "../store/action/booking";
import Spinner from "react-bootstrap/Spinner";
import "./aStyle.css";

function History() {
  document.title = "Ticketing | Profile";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dataUserLocal = localStorage.getItem("dataUser");
  const dataUser = JSON.parse(dataUserLocal);

  const [page, setPage] = useState(1);
  const limit = 5;
  const [totalPage, setTotalPage] = useState(2);
  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const handleHistory = async () => {
    try {
      setLoading(true);
      if (page <= totalPage) {
        const result = await dispatch(
          getBookingByUserId(dataUser.id, page, limit)
        );
        if (result.value.data.data === null) {
          setDataHistory([]);
        } else {
          setDataHistory(result.value.data.data);
          setTotalPage(result.value.data.pagination.totalPage);
        }
      } else {
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

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
          {dataHistory.map((item) => (
            <div className="profile_card2 px-4" key={item.id}>
              <div className="row">
                <div className="col pt-2">
                  <div>
                    {item.dateBooking.split("T")[0]} -{" "}
                    {`${item.timeBooking.split(":")[0]}:00`}
                  </div>
                  <div className="m-3 mb-2 text-align-left fw-bold">
                    {item.name}
                  </div>
                </div>
                <div className="col d-flex justify-content-end">
                  <img
                    src={
                      item.premiere === "Ebu.Id"
                        ? require("../assets/logo ebv.png")
                        : item.premiere === "hiflix"
                        ? require("../assets/logo hiflix.png")
                        : item.premiere === "cinemaOne"
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
                  className={`btn ${
                    item.statusUsed === "notActive" ? "btn-success" : "btn-dark"
                  } px-5 py-2 mb-4`}
                  onClick={() => handleTicket(item.id)}
                >
                  Ticket in active
                </button>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center align-item-center mb-5">
            <div className="row">
              {page === 1 ? (
                <button className="col btn btn-primary" disabled>
                  back
                </button>
              ) : (
                <button
                  className="col btn btn-primary"
                  onClick={() => setPage(page - 1)}
                >
                  back
                </button>
              )}
              <div className="col btn btn-primary me-5 ms-5">
                {loading === true ? (
                  <Spinner animation="border" role="status" size={"sm"}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                ) : (
                  page
                )}
              </div>
              {page >= totalPage ? (
                <button className="col btn btn-primary" disabled>
                  next
                </button>
              ) : (
                <button
                  className="col btn btn-primary"
                  onClick={page >= totalPage ? null : () => setPage(page + 1)}
                >
                  next
                </button>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default History;
