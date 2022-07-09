import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import { getAllMovie } from "../../store/action/movie";
import {
  getAllSchedule,
  postSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../store/action/schedule";
import "./admin.css";
import "../aStyle.css";

export default function Manageschedule() {
  document.title = "Manage Schedule Page|| Tickitz";
  const timeDay = ["09:00", "11:00", "13:00", "15:00"];
  const timeNight = ["17:00", "19:00", "20:00", "21:00"];

  //filering
  const handleMovieId = (e) => {
    const choiseMovie = e.target.value.split(",");
    setMovieId(choiseMovie[0]);
    setForm({ ...form, movieId: choiseMovie[0] });
    setImage(choiseMovie[1]);
    setPage(1);
    console.log(e.target.value);
  };

  const handleLocation = (e) => {
    setForm({ ...form, location: e.target.value });
  };

  //rendering
  const [loading, setLoading] = useState(false);

  //pagination and data
  const [data, setData] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    movieId: "",
    premiere: "",
    price: "",
    location: "",
    dateStart: "",
    dateEnd: "",
    time: "",
  });

  const [scheduleId, setScheduleId] = useState("");
  const [movieId, setMovieId] = useState(2);
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    handleListSchedule();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId, page]);

  const handleListSchedule = async () => {
    try {
      setLoading(true);
      const resultSchedule = await dispatch(
        getAllSchedule(page, 3, movieId, "")
      );
      if (resultSchedule.value.data.data === null) {
        setDataSchedule([]);
      } else {
        setDataSchedule(resultSchedule.value.data.data);
        setTotalPage(resultSchedule.value.data.pagination.totalPage);
        console.log(resultSchedule.value.data.pagination.totalData);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(getAllMovie(1, 100, "", "", ""));
      if (result.value.data.data === null) {
        setData([]);
      } else {
        setData(result.value.data.data);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
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

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const result = await dispatch(postSchedule(form));
      console.log(result);
      handleListSchedule();
      setPage(1);
      setImage(null);
      await resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const setUpdate = (schedule) => {
    setImage(null);
    const { movieId, premiere, price, location, dateStart, dateEnd, time } =
      schedule;
    setForm({
      ...form,
      movieId,
      premiere,
      price,
      location,
      dateStart: dateStart.split("T")[0],
      dateEnd: dateEnd.split("T")[0],
      time,
    });
    setScheduleId(schedule.id);
    setIsUpdate(true);
    console.log(schedule);
  };

  console.log(form);

  const handleUpdate = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const resultupdate = await dispatch(updateSchedule(scheduleId, form));
      console.log(resultupdate);
      handleListSchedule();
      setIsUpdate(false);
      setPage(1);
      setImage(null);
      await resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteSchedule(id));
      handleListSchedule();
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setForm({
      movieId: "",
      premiere: "",
      price: "",
      location: "",
      dateStart: "",
      dateEnd: "",
      time: "",
    });
    setImage(null);
    setIsUpdate(false);
  };

  const [selectedTime, setSelectedTime] = useState([]);

  const handlePressTime = (time) => {
    if (selectedTime.includes(time)) {
      const deleteTime = selectedTime.filter((el) => {
        return el !== time;
      });
      setSelectedTime(deleteTime);
      setForm({
        ...form,
        time: deleteTime.join(","),
      });
    } else {
      setSelectedTime([...selectedTime, time]);
      setForm({
        ...form,
        time: [...selectedTime, time].join(","),
      });
    }
  };

  console.log(form);

  return (
    <div className="container bg-light">
      <h1>Manage Movie Page</h1>
      <hr />
      <Navbar />
      <form
        className="bg-white p-5 m-4"
        onSubmit={isUpdate ? handleUpdate : handleSubmit}
      >
        <div className="row">
          <object className="col-3">
            <div className="manage-image--size p-4 m-4">
              {isUpdate ? (
                image !== null ? (
                  <img
                    alt="imageManage"
                    src={`${process.env.REACT_APP_LINK_CLOUDINARY}${image}`}
                  />
                ) : (
                  <img
                    src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png"
                    alt="imageManage"
                  />
                )
              ) : !image || form.image === null ? (
                <img
                  src="https://pertaniansehat.com/v01/wp-content/uploads/2015/08/default-placeholder.png"
                  alt="imageManage"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_LINK_CLOUDINARY}${image}`}
                  alt="image_movie_preview"
                />
              )}
            </div>
          </object>
          <object className="col-9">
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Movie</div>
                <select
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  name="Select Movie"
                  onClick={(value) => handleMovieId(value)}
                >
                  <option value="">Select Movie</option>
                  {data.map((item) => (
                    <option key={item.id} value={[item.id, item.image]}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </object>
              <object className="col">
                <div className="text-dark fw-bold">Location</div>
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
              </object>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Price</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Price ..."
                  name="price"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.price}
                />
              </object>
              <div className="col row">
                <object className="col">
                  <div className="text-dark fw-bold">Date Start</div>
                  <input
                    className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                    type="text"
                    placeholder="yyyy-mm-dd"
                    name="dateStart"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.dateStart}
                  />
                </object>
                <object className="col">
                  <div className="text-dark fw-bold">Date End</div>
                  <input
                    className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                    type="text"
                    placeholder="yyyy-mm-dd"
                    name="dateEnd"
                    onChange={(event) => handleChangeForm(event)}
                    value={form.dateEnd}
                  />
                </object>
              </div>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Premiere</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="hiflix / Ebu.Id / cinemaOne"
                  name="premiere"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.premiere}
                />
              </object>
              <object className="col">
                <div className="text-dark fw-bold">Time</div>
                <div className="rowtime">
                  {timeDay.map((time) => (
                    <div
                      className="time"
                      key={time}
                      onClick={() => handlePressTime(time)}
                    >
                      <div
                        className={
                          form.time.split(",").includes(time)
                            ? "time_yes"
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
                      onClick={() => handlePressTime(time)}
                    >
                      <div
                        className={
                          form.time.split(",").includes(time)
                            ? "time_yes"
                            : "time_no"
                        }
                      >
                        {time}
                      </div>
                    </div>
                  ))}
                </div>
              </object>
            </div>
            <br />
          </object>
        </div>
        <br />
        <div className="d-flex flex-row-reverse m-4">
          <button className="btn btn-primary mx-4 mt-4 w-25" type="submit">
            {isUpdate ? "Update" : "Submit"}
          </button>
          <button
            className="btn btn-light border border-primary text-primary mx-4 mt-4 w-25"
            type="reset"
            onClick={() => resetForm()}
          >
            reset
          </button>
        </div>
      </form>
      <article className="home_article">
        <div className="article__caption1" style={{ fontSize: 25 }}>
          Data Schedule
        </div>
      </article>
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
                        ? require("../../assets/logo ebv.png")
                        : item.premiere === "hiflix"
                        ? require("../../assets/logo hiflix.png")
                        : item.premiere === "cinemaOne"
                        ? require("../../assets/logo cineone.png")
                        : require("../../assets/logo.png")
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
                  <div className="time" key={time}>
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
                  <div className="time" key={time}>
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
              <div className="row mt-3 mx-3">
                <button
                  className="btn btn-primary mb-3 px-5"
                  onClick={() => setUpdate(item)}
                >
                  {loading === true ? (
                    <Spinner animation="border" role="status" size={"sm"}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Update"
                  )}
                </button>
                <button
                  className="btn btn-danger px-5"
                  onClick={() => handleDelete(item.id)}
                >
                  {loading === true ? (
                    <Spinner animation="border" role="status" size={"sm"}>
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </object>
          ))
        )}
      </section>{" "}
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
