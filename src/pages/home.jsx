import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMovie } from "../store/action/movie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import "./aStyle.css";
import Banner2 from "../assets/banner2.png";
import Banner1 from "../assets/banner1.png";

function Home() {
  document.title = "Ticketing | Home";
  const navigate = useNavigate();
  const nowShowing = `${new Date().getMonth() + 1}`;
  const [monthfil, setMonthfil] = useState("");
  const [data, setData] = useState([]);
  const [dataSoon, setDataSoon] = useState([]);
  const limit = 10;
  const dispatch = useDispatch();

  // const dataUser = localStorage.getItem("dataUser");

  const month = [
    { number: 1, title: "Januari" },
    { number: 2, title: "Februari" },
    { number: 3, title: "Maret" },
    { number: 4, title: "April" },
    { number: 5, title: "Mei" },
    { number: 6, title: "Juni" },
    { number: 7, title: "Juli" },
    { number: 8, title: "Agustus" },
    { number: 9, title: "September" },
    { number: 10, title: "Oktober" },
    { number: 11, title: "November" },
    { number: 12, title: "Desember" },
  ];

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monthfil]);
  const getData = async () => {
    try {
      const result = await dispatch(
        getAllMovie(1, limit, nowShowing, "", "id ASC")
      );
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
      }
      const resultall = await dispatch(
        getAllMovie(1, limit, monthfil, "", "id ASC")
      );
      if (resultall.value.data.data === null) {
        setDataSoon([]);
      } else {
        const movieComingsoon = resultall.value.data.data.filter(
          (item) =>
            item.releaseDate.split("T")[0].split("-")[1] !==
            result.value.data.data[0].releaseDate.split("T")[0].split("-")[1]
        );

        setDataSoon(movieComingsoon);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleMonth = (e) => {
    setMonthfil(`${e}`);
  };

  const handleDetailMovie = (id) => {
    navigate(`/detail/${id}`);
    console.log(id);
  };

  const handleViewAll = () => {
    navigate("/viewall");
  };

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <Navbar />
      <section className="home__banner">
        <img
          src={Banner1}
          alt="banner1"
          className="home_banner1__size"
          style={{ width: "300px" }}
        />
        <img
          src={Banner2}
          alt="banner2"
          className="home_banner2__size"
          style={{ width: "300px" }}
        />
      </section>
      <article className="home_article">
        <div className="article__caption1">
          <u>Now Showing </u>
        </div>
        <div className="article__caption2" onClick={handleViewAll}>
          view all
        </div>
      </article>
      {/* .........Card Now Showing....... */}
      <section className="movie">
        {data.map((item) => (
          <object className="dropdown" key={item.id}>
            <div className="dropbtn">
              <img
                src={
                  item.image
                    ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                    : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
                }
                className="movie__image--size"
                alt="image_movie"
              />
            </div>
            <div className="dropdown-content">
              <div className="dropdown-content--title">{item.name}</div>
              <div
                className="dropdown-content--category"
                style={{ color: "#a0a3bd" }}
              >
                {item.category}
              </div>
              <div href="detail.html">
                <button
                  className="dropdown-content--button"
                  data={item}
                  onClick={() => handleDetailMovie(item.id)}
                >
                  Detail
                </button>
              </div>
            </div>
          </object>
        ))}
      </section>
      <article className="home_article">
        <div className="article__caption1">Up Cooming</div>
        <div className="article__caption2" onClick={handleViewAll}>
          view all
        </div>
      </article>
      <div className="month">
        {month.map((item) => (
          <button
            className={`month__text ${
              `${item.number}` === monthfil
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => handleMonth(item.number)}
            key={item.number}
          >
            {item.title}
          </button>
        ))}
      </div>
      <section className="movie" style={{ display: "flex" }}>
        {dataSoon.map((item) => (
          <object className="movie__image2" style={{ flex: "1" }} key={item.id}>
            <img
              alt="image_movie"
              src={
                item.image
                  ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                  : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
              className="movie__image--size"
            />
            <object className="title">{item.name}</object>
            <object className="category">{item.category}</object>
            <button
              className="button__detail"
              data={item}
              onClick={() => handleDetailMovie(item.id)}
            >
              Details
            </button>
          </object>
        ))}
      </section>
      <section className="join">
        <h2 className="join-h2">Be the vangeard of the</h2>
        <h1 className="join-h1">Moviegoers</h1>
        <div className="box__input">
          <input
            className="join__input"
            type="email"
            placeholder="Type your email"
          />
        </div>
        <div>
          <button className="join__input--button">join now</button>
        </div>
        <div className="join__desc">
          <div>By joining as a Tickits member,</div>
          <div>we will aways send you the latest update via email.</div>
        </div>
      </section>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Home;
