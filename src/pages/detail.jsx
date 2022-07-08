/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./aStyle.css";

export default function Detail() {
  document.title = "Ticketing | Detail";
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [date, setDate] = useState(
    `${new Date(Date()).getFullYear()}-${
      (new Date().getMonth() + 1).length === 2
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)
    }-${new Date().getDate()}`
  );
  const [form, setForm] = useState({
    scheduleId: "",
    dateBooking: "",
    timeBooking: "",
  });

  const handleChangeDate = (event) => {
    const { value } = event.target;
    setDate(value);
  };

  const timeDay = ["09:00", "11:00", "13:00", "15:00"];
  const timeNight = ["17:00", "19:00", "20:00", "21:00"];

  useEffect(() => {
    handleListMovie();
  }, []);

  useEffect(() => {
    handleListSchedule();
  }, []);

  const handleListMovie = async () => {
    try {
      const resultMovie = await axios.get(`movie/${params.id}`);
      setData(resultMovie.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleListSchedule = async () => {
    try {
      const resultSchedule = await axios.get(
        `schedule?searchMovieId=${params.id}`
      );
      setDataSchedule(resultSchedule.data.data);
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  const handleTime = (scheduleId, time, date) => {
    setForm({ scheduleId: scheduleId, dateBooking: date, timeBooking: time });
    if (time === "") {
      alert("time is not available");
    }
  };

  const handleBooking = (price, premiere) => {
    localStorage.setItem("dataSchedule", JSON.stringify(form));
    localStorage.setItem("price", price);
    localStorage.setItem("premiere", premiere);
    localStorage.setItem("dataMovie", data[0].name);
    navigate("/booking");
  };

  return (
    <div className="text-center container">
      <Navbar />
      <h1>Detail Page</h1>
      <hr />
      <section className="banner_x">
        <object className="banner__image">
          <img
            src={
              data.map((item) => item.image)[0]
                ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${
                    data.map((item) => item.image)[0]
                  }`
                : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
            }
            className="banner__image-image"
            alt="img"
          />
        </object>
        <object className="banner__detail">
          <h1>{data.map((item) => item.name)[0]}</h1>
          <div className="banner__detail--category">
            {data.map((item) => item.category)[0]}
          </div>
          <div className="banner__detail--spesific">
            <object className="detail__kiri">
              <div className="detail__spesific--title">release date</div>
              <div className="detail__spesific--content">
                {data.length === 0
                  ? ""
                  : data.map((item) => item.releaseDate)[0].split("T")[0]}
              </div>
              <div className="detail__spesific--title">Duration</div>
              <div className="detail__spesific--content">
                {data.map((item) => item.duration)[0]}
              </div>
            </object>
            <object className="detail__kanan">
              <div className="detail__spesific--title">Directed by</div>
              <div className="detail__spesific--content">
                {data.map((item) => item.director)[0]}
              </div>
              <div className="detail__spesific--title">Casts</div>
              <div className="detail__spesific--content">
                {data.map((item) => item.cast)[0]}
              </div>
            </object>
          </div>
          <hr />
          <div className="detail__spesific--title">Synopsis</div>
          <div className="detail__spesific--content">
            {data.map((item) => item.synopsis)[0]}
          </div>
        </object>
      </section>
      <hr />
      <section className="sometimes">
        <div className="sometimes__header">Showtimes and Ticket</div>
        <section className="sometimes__button" style={{ display: "flex" }}>
          <input
            type="date"
            placeholder="Set a Date"
            onClick={handleChangeDate}
            className="sometimes__button1"
            style={{ flex: "1" }}
          />
          <select
            name="location"
            className="sometimes__button2"
            style={{ flex: "1" }}
          >
            <option value="">Select Location</option>
            <option value="jakarta">Jakarta</option>
            <option value="bogor">Bogor</option>
            <option value="tangerang">Tangerang</option>
          </select>
        </section>
        <section className="premier">
          {dataSchedule.length === 0 ? (
            <div className="text-danger">
              <br /> Schedule is not Available
            </div>
          ) : (
            dataSchedule.map((item) => (
              <object className="premier__box" key={item.id}>
                <div className="box__header">
                  <object style={{ flex: "1" }}>
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
                      className="box__image"
                    />
                  </object>
                  <object style={{ flex: "1" }} className="box__detail">
                    <h1>{item.premiere}</h1>
                    <div>{item.location}</div>
                  </object>
                </div>
                <hr />
                <div className="rowtime">
                  {timeDay.map((time) => (
                    <div
                      className="time"
                      key={time}
                      onClick={() =>
                        handleTime(
                          item.id,
                          item.time.split(",").includes(time) ? time : "",
                          `${date}`
                        )
                      }
                    >
                      <div
                        className={
                          item.time.split(",").includes(time)
                            ? time === form.timeBooking &&
                              item.id === form.scheduleId
                              ? "time_choise"
                              : "time_yes"
                            : "time_no"
                        }
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rowtime">
                  {timeNight.map((time) => (
                    <div
                      className="time"
                      key={time}
                      onClick={() =>
                        handleTime(
                          item.id,
                          item.time.split(",").includes(time) ? time : "",
                          `${date}`
                        )
                      }
                    >
                      <div
                        className={
                          item.time.split(",").includes(time)
                            ? time === form.timeBooking &&
                              item.id === form.scheduleId
                              ? "time_choise"
                              : "time_yes"
                            : "time_no"
                        }
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
                <br />
                <div className="item-left">Rp. {item.price} / seat</div>
                <button
                  disabled={item.id === form.scheduleId ? false : true}
                  className="box__button"
                  onClick={() => handleBooking(item.price, item.premiere)}
                >
                  {form.scheduleId === item.id ? "booking" : "choise seat"}
                </button>
              </object>
            ))
          )}
        </section>
      </section>
      <hr />
      <Footer />
    </div>
  );
}
