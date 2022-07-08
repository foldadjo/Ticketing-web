import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllMovie } from "../store/action/movie";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Spinner from "react-bootstrap/Spinner";
import Select from "react-select";
import "./aStyle.css";

const options = [
  { value: "id", label: "Id" },
  { value: "name asc", label: "A to Z" },
  { value: "name desc", label: "Z to A" },
];

function ViewAll() {
  document.title = "Ticketing | View All";
  const navigate = useNavigate();
  //filering
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState({ value: "" });
  const [monthfil, setMonthfil] = useState("");

  //rendering
  const [loading, setLoading] = useState(false);

  //pagination and data
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);

  const dispatch = useDispatch();

  console.log(selectedOption);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedOption, monthfil, search]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllMovie(page, 8, monthfil, search, selectedOption.value)
      );
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
        setTotalPage(result.value.data.pagination.totalPage);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const month = [
    { number: "", title: "All" },
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

  const handleDetail = (movieId) => {
    navigate(`/detail/${movieId}`);
  };
  const handleMonth = (e) => {
    setMonthfil(`${e}`);
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="text-center container">
      <h1>Home Page</h1>
      <hr />
      <Navbar />
      <article className="home_article">
        <div className="article__caption1" style={{ fontSize: 25 }}>
          List Movie
        </div>
        <div className="article__caption2 d-flex justify-content-end">
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="sort"
            className="me-3 w-25 text-dark"
          />
          <input
            type={"text"}
            placeholder="search movie"
            onChange={handleSearch}
            value={search}
            className="px-3 bg-light border border-light rounded"
          />
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
      <section
        className="movie d-flex justify-content-center"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {data.map((item) => (
          <div
            className="movie__image2"
            style={{
              flex: "1",
              width: 240,
              maxWidth: 240,
              minWidth: 240,
              margin: 10,
              marginRight: 20,
            }}
            key={item.id}
          >
            <img
              src={
                item.image
                  ? `https://res.cloudinary.com/fazztrack/image/upload/v1650942515/${item.image}`
                  : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
              className="movie__image--size"
              alt="imageAll"
            />
            <object className="title">{item.name}</object>
            <object className="category">{item.category}</object>
            <button
              className="button__detail"
              onClick={() => handleDetail(item.id)}
            >
              {loading === true ? (
                <Spinner animation="border" role="status" size={"sm"}>
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Detail"
              )}
            </button>
          </div>
        ))}
      </section>
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
      <Footer />
    </div>
  );
}

export default ViewAll;
