/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Spinner from "react-bootstrap/Spinner";
import { getSeatBooking } from "../store/action/booking";
import {
  FaLongArrowAltUp,
  FaLongArrowAltRight,
  FaSquare,
} from "react-icons/fa";
import "./aStyle.css";

function Booking() {
  document.title = "Ticketing | Choise seat";
  const [selectedSeat, setSelectedSeat] = useState([]);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [dataSchedule, setDataSchedule] = useState({
    scheduleId: 1,
    dateBooking: "",
    timeBooking: "",
  });
  console.log(dataSchedule.dateBooking);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [premiere, setPremiere] = useState("hiflix");
  const [price, setPrice] = useState(40000);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    seat: selectedSeat,
    totalPayment: "",
  });

  useEffect(() => {
    const getDataDetail = localStorage.getItem("dataSchedule");
    const getPrice = localStorage.getItem("price");
    const getPremiere = localStorage.getItem("premiere");
    const getName = localStorage.getItem("dataMovie");
    setDataSchedule(JSON.parse(getDataDetail));
    setName(getName);
    setPremiere(getPremiere);
    setPrice(getPrice);
  }, []);

  useEffect(() => {
    getReservedSeat();
    setSelectedSeat([]);
  }, []);
  const getReservedSeat = async () => {
    try {
      setLoading(true);
      console.log(
        dataSchedule.scheduleId,
        dataSchedule.timeBooking,
        dataSchedule.dateBooking
      );
      const result = await dispatch(
        getSeatBooking(
          dataSchedule.scheduleId,
          dataSchedule.timeBooking,
          dataSchedule.dateBooking
        )
      );
      console.log(result);
      if (result.value.data.data === null) {
        setReservedSeat([]);
      } else {
        setReservedSeat(result.value.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const seatLeft = [
    { number: 1 },
    { number: 2 },
    { number: 3 },
    { number: 4 },
    { number: 5 },
    { number: 6 },
    { number: 7 },
  ];
  const seatRight = [
    { number: 8 },
    { number: 9 },
    { number: 10 },
    { number: 11 },
    { number: 12 },
    { number: 13 },
    { number: 14 },
  ];
  const seatRow = [
    { row: "A" },
    { row: "B" },
    { row: "C" },
    { row: "D" },
    { row: "E" },
    { row: "F" },
    { row: "G" },
  ];

  const handlePressSeat = (seat) => {
    if (
      selectedSeat.includes(seat) ||
      selectedSeat.length > 4 ||
      reservedSeat.includes(seat)
    ) {
      const deleteSeat = selectedSeat.filter((el) => {
        return el !== seat;
      });
      setSelectedSeat(deleteSeat);
      setForm({
        ...dataSchedule,
        seat: deleteSeat,
        totalPayment: `${deleteSeat.length * price}`,
      });
    } else {
      setSelectedSeat([...selectedSeat, seat]);
      setForm({
        ...dataSchedule,
        seat: [...selectedSeat, seat],
        totalPayment: `${[...selectedSeat, seat].length * price}`,
      });
    }
  };

  const handlePayment = () => {
    localStorage.setItem("dataBooking", JSON.stringify(form));
    if (form.seat.length >= 1) {
      navigate("/payment");
    } else {
      alert("choise seat first");
    }
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>Order Page</h1>
      <hr />
      <div className="row">
        <div className="col-md-8">
          <div className="body__header">
            <h2>Movie Selected</h2>
            <div className="body__content" style={{ display: "flex" }}>
              <div className="body__content--title" style={{ flex: "1" }}>
                {name}
              </div>
              <button className="body__content--button">Change movie</button>
            </div>
            <h2>Choose Your Seat</h2>
            <div className="body__content">
              <div className="card">
                <div className="card_head">
                  <div className="screenTop mb-3">Screen</div>
                  {loading === true ? (
                    <Spinner animation="border" role="status" size={"sm"}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    <div className="screen">
                      <div className="seat">
                        {seatLeft.map((row) => (
                          <div key={row.number}>
                            {seatRow.map((item) => (
                              <div
                                key={item.row}
                                className={
                                  selectedSeat.includes(item.row + row.number)
                                    ? "seat_b"
                                    : reservedSeat.includes(
                                        item.row + row.number
                                      )
                                    ? "seat_c"
                                    : "seat_a"
                                }
                                onClick={() =>
                                  handlePressSeat(item.row + row.number)
                                }
                              ></div>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div className="seat">
                        {seatRight.map((row) => (
                          <div key={row.number}>
                            {seatRow.map((item) => (
                              <div
                                key={item.row}
                                className={
                                  selectedSeat.includes(item.row + row.number)
                                    ? "seat_b"
                                    : reservedSeat.includes(
                                        item.row + row.number
                                      )
                                    ? "seat_c"
                                    : "seat_a"
                                }
                                onClick={() =>
                                  handlePressSeat(item.row + row.number)
                                }
                              ></div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div className="seatKey"> Seating Key </div>
                <div className="row mb-3">
                  <div className="col">
                    <FaLongArrowAltUp /> G to A
                  </div>
                  <div className="col">
                    <FaLongArrowAltRight /> 1 to 14
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <FaSquare color="#d6d8e7" /> Available
                  </div>
                  <div className="col">
                    <FaSquare color="#5f2eea" /> Selected
                  </div>
                  <div className="col">
                    <FaSquare color="#6e7191" /> Sold
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="body__header">
            <h2>Order Info</h2>
            <div className="body__content">
              <div className="info__header">
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
                />
                <h3>{premiere}</h3>
              </div>
              <hr />
              <div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Movie selected
                  </object>
                  <object className="info__detail--value">{name}</object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    {dataSchedule.timeBooking}
                  </object>
                  <object className="info__detail--value">
                    {dataSchedule.dateBooking}
                  </object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    One ticket price
                  </object>
                  <object className="info__detail--value">Rp. {price}</object>
                </div>
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Seat choosed
                  </object>
                  <object className="info__detail--value">
                    {selectedSeat.join(", ")}
                  </object>
                </div>
                <hr />
                <div style={{ display: "flex" }} className="info__detail">
                  <object style={{ flex: "1" }} className="info__detail--title">
                    Total Price
                  </object>
                  <object className="info__detail--value">
                    {selectedSeat.length * price}{" "}
                  </object>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-8 button">
          <a href="/viewall" className="button1">
            Change your movie
          </a>
          <button onClick={handlePayment} className="button2">
            Checkout now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Booking;
