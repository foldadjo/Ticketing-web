import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useDispatch } from "react-redux";
import { getAllMovie } from "../../store/action/movie";
import { getDashboard } from "../../store/action/booking";
// eslint-disable-next-line no-unused-vars
import chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import "./admin.css";

function Dashboard() {
  document.title = "Dashboard Page|| Ticketing";
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [location, setLocation] = useState("");
  const [graph, setGraph] = useState([
    { month: 1, total: 0 },
    { month: 2, total: 0 },
    { month: 3, total: 0 },
    { month: 4, total: 0 },
    { month: 5, total: 0 },
    { month: 6, total: 0 },
    { month: 7, total: 0 },
    { month: 8, total: 0 },
    { month: 9, total: 0 },
    { month: 10, total: 0 },
    { month: 11, total: 0 },
    { month: 12, total: 0 },
  ]);

  const handleMovieId = (e) => {
    const choiseMovie = e.target.value;
    setMovieId(choiseMovie);
  };

  const handleLocation = (e) => {
    setLocation(e.target.value);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getData = async () => {
    try {
      const result = await dispatch(getAllMovie(1, 100, "", "", ""));
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    getGraphDashboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, location]);
  const getGraphDashboard = async () => {
    try {
      const result = await dispatch(getDashboard(movieId, location));
      if (result.value.data.data === null) {
        setGraph([]);
      } else {
        const newTotal = [
          { month: 1, total: 0 },
          { month: 2, total: 0 },
          { month: 3, total: 0 },
          { month: 4, total: 0 },
          { month: 5, total: 0 },
          { month: 6, total: 0 },
          { month: 7, total: 0 },
          { month: 8, total: 0 },
          { month: 9, total: 0 },
          { month: 10, total: 0 },
          { month: 11, total: 0 },
          { month: 12, total: 0 },
        ];
        result.value.data.data.map(
          (item) => (newTotal[item.month - 1].total = item.total)
        );
        setGraph(newTotal);
        console.log(newTotal);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  console.log(graph);

  const Graphic = {
    labels: [
      "jan",
      "feb",
      "mar",
      "apr",
      "mei",
      "jun",
      "jul",
      "ags",
      "sep",
      "okt",
      "nov",
      "des",
    ],
    // label: [6, 7],
    datasets: [
      {
        label: "# on Income",
        fill: false,
        backgroundColor: "#1EC15F",
        borderColor: "#1EC15F",
        data: graph.map((item) => item.total),
      },
    ],
  };

  const resetFilter = () => {
    setMovieId("");
    setLocation("");
  };

  return (
    <div className="text-center container ">
      <Navbar />
      <h1>Profile Page</h1>
      <hr />
      <div className="row">
        <div className="col-8">
          <div className="fw-bold fs-5 mb-5">Dashbord</div>
          <div className="m-2">
            <Line data={Graphic} />{" "}
          </div>
        </div>
        <div className="col-3">
          <div className="fw-bold fs-5 mb-5">Filter</div>
          <div>
            <select
              className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
              name="Select Movie"
              onClick={(value) => handleMovieId(value)}
            >
              <option value="">Select Movie</option>
              {data.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            <select
              className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
              name="Select Movie"
              onClick={(value) => handleLocation(value)}
            >
              <option value={""}>Select Location</option>
              <option value="jakarta">Jakarta</option>
              <option value="tangerang">Tangerang</option>
              <option value="bogor">Bogor</option>
            </select>
            <button className="btn btn-primary px-5 my-3" onClick={resetFilter}>
              Reset
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
