import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createBooking } from "../store/action/booking";
import Spinner from "react-bootstrap/Spinner";
import { AiFillWarning } from "react-icons/ai";
import "./aStyle.css";

function Payment() {
  document.title = "Ticketing | Payment";
  // const [lastName, setLastName] = useState("");
  // const [noTelp, setNoTelp] = useState("");
  // const [mail, setMail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [premiere, setPremiere] = useState("hiflix");
  const [dataBooking, setDataBooking] = useState({
    scheduleId: 1,
    dateBooking: "",
    timeBooking: "",
    seat: [],
    totalPayment: "",
  });

  console.log(dataBooking);

  useEffect(() => {
    const getDataDetail = localStorage.getItem("dataBooking");
    const getPremiere = localStorage.getItem("premiere");
    const getName = localStorage.getItem("dataMovie");
    setDataBooking(JSON.parse(getDataDetail));
    setName(getName);
    setPremiere(getPremiere);
  }, []);

  const goToPayment = async () => {
    try {
      setLoading(true);
      const result = await dispatch(createBooking(dataBooking));
      setLoading(false);
      window.open(result.value.data.data.redirectUrl);
      navigate("/history");
    } catch (error) {
      alert("reload your aplication an relogin");
      setLoading(false);
      console.log(error);
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>Payment Page</h1>
      <hr />
      <div className="row">
        <div className="body__header col-md-8">
          <h2>Payment Info</h2>
          <div className="body__content">
            <div>
              <div style={{ display: "flex" }} className="info__detail">
                <object style={{ flex: "1" }} className="info__detail--title">
                  Date & time
                </object>
                <object className="info__detail--value">
                  {dataBooking.dateBooking} & {dataBooking.timeBooking}
                </object>
              </div>
              <hr className="dropdown-divider" />
              <div style={{ display: "flex" }} className="info__detail">
                <object style={{ flex: "1" }} className="info__detail--title">
                  Movie title
                </object>
                <object className="info__detail--value">{name}</object>
              </div>
              <hr className="dropdown-divider" />
              <div style={{ display: "flex" }} className="info__detail">
                <object style={{ flex: "1" }} className="info__detail--title">
                  Cinema name
                </object>
                <object className="info__detail--value">{premiere}</object>
              </div>
              <hr className="dropdown-divider" />
              <div style={{ display: "flex" }} className="info__detail">
                <object style={{ flex: "1" }} className="info__detail--title">
                  Number of tickets
                </object>
                <object className="info__detail--value">
                  {dataBooking.seat.length} pieces
                </object>
              </div>
            </div>
            <hr className="dropdown-divider" />
            <div style={{ display: "flex" }} className="info__detail">
              <object style={{ flex: "1" }} className="info__detail--title">
                Total Payment
              </object>
              <object className="info__detail--value2">
                Rp. {dataBooking.totalPayment}
              </object>
            </div>
          </div>
          <h2>Choose a Payment Method</h2>
          <div className="body__content">
            <div className="payment" style={{ display: "flex" }}>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo gpay.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/Logo visa.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/Logo GoPay.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo paypal.png")} alt="" />
              </button>
            </div>
            <div className="payment" style={{ display: "flex" }}>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo dana.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo BCA.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo BRI.png")} alt="" />
              </button>
              <button className="payment__border" style={{ flex: "3" }}>
                <img src={require("../assets/logo ovo.png")} alt="" />
              </button>
            </div>
            <div style={{ display: "flex", color: "#a0a3bd" }}>
              <object style={{ flex: "2" }}>
                <hr className="dropdown-divider" />
              </object>
              <object style={{ flex: "1", text_align: "center" }}>or</object>
              <object style={{ flex: "2" }}>
                <hr className="dropdown-divider" />
              </object>
            </div>
            <div style={{ text_align: "center" }}>
              <object className="payment__other1">Pay via cast </object>
              <object className="payment__other2">See how it work</object>
            </div>
          </div>
        </div>
        <div className="body__header col-md-4">
          <h2>Personal Info</h2>
          <div className="body__content">
            <div className="profile">
              <div className="profile__title">Full name</div>
              <input type="text" placeholder="Jonas El Rodriguez" />
            </div>
            <div className="profile">
              <div className="profile__title">Email</div>
              <input type="email" placeholder="jonasrodri123@gmail.com" />
            </div>
            <div className="profile">
              <div className="profile__title">Number</div>
              <input type="tel" placeholder="81445687121" />
            </div>
            <div className="warning">
              <AiFillWarning color={"yellow"} />
              <object>Fill you data correctly</object>
            </div>
          </div>
        </div>

        <div className="col-md-8 button">
          <button className="button1" onClick={handleHome}>
            Change your movie
          </button>
          <button className="button2" onClick={goToPayment}>
            {loading === true ? (
              <Spinner animation="border" role="status" size={"sm"}>
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              "Checkout now"
            )}
          </button>
        </div>
        {/* </div> */}
        <Footer />
      </div>
    </div>
  );
}

export default Payment;
