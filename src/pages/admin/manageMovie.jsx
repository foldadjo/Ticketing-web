import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Spinner from "react-bootstrap/Spinner";
import { useDispatch } from "react-redux";
import {
  getAllMovie,
  postMovie,
  updateMovie,
  deleteMovie,
} from "../../store/action/movie";
import "./admin.css";
import "../aStyle.css";

export default function Managemovie() {
  document.title = "Manage Movie Page|| Tickitz";

  //filering
  const [search, setSearch] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSort = (e) => {
    setSelectedOption(e.target.value);
  };

  //rendering
  const [loading, setLoading] = useState(false);

  //pagination and data
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);

  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
    category: "",
    director: "",
    cast: "",
    releaseDate: "",
    duration: "",
    synopsis: "",
    image: "",
  });
  const limit = 8;

  const [idMovie, setIdMovie] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [image, setImage] = useState(null);

  //   const [searchParams] = useSearchParams();
  //   const params = Object.fromEntries([...searchParams]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, selectedOption, search]);
  const getData = async () => {
    try {
      setLoading(true);
      const result = await dispatch(
        getAllMovie(page, limit, "", search, selectedOption)
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

  console.log(form.image);

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
      e.preventDefault();
      console.log(form);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      const result = await dispatch(postMovie(formData));
      console.log(result);
      getData();
      setPage(1);
      setImage(null);
      await resetForm();
    } catch (error) {
      console.log(error.response);
    }
  };

  const setUpdate = (data) => {
    setImage(null);
    const {
      id,
      name,
      category,
      director,
      cast,
      releaseDate,
      duration,
      synopsis,
      image,
    } = data;
    setForm({
      ...form,
      name,
      category,
      director,
      cast,
      releaseDate: releaseDate.split("T")[0],
      duration,
      synopsis,
      image,
    });
    setIdMovie(id);
    setIsUpdate(true);
    console.log(data);
  };

  console.log(form);

  const handleUpdate = async (e) => {
    try {
      // PanggilAction
      e.preventDefault();
      setLoading(true);
      const formData = new FormData();
      for (const data in form) {
        formData.append(data, form[data]);
      }
      const resultupdate = await dispatch(updateMovie(idMovie, formData));
      console.log(resultupdate);
      getData();
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
      await dispatch(deleteMovie(id));
      getData();
      setPage(1);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    setPage(1);
  };

  const resetForm = () => {
    setForm({
      name: "",
      category: "",
      director: "",
      cast: "",
      releaseDate: "",
      duration: "",
      synopsis: "",
      image: null,
    });
    setImage(null);
    setIsUpdate(false);
  };

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
                form.image !== null ? (
                  image !== null ? (
                    <img src={image} alt="image_movie_preview" />
                  ) : (
                    <img
                      alt="imageManage"
                      src={`${process.env.REACT_APP_LINK_CLOUDINARY}${form.image}`}
                    />
                  )
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
                <img src={image} alt="image_movie_preview" />
              )}
            </div>
          </object>
          <object className="col-9">
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Movie Name</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Name ..."
                  name="name"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.name}
                />
              </object>
              <object className="col">
                <div className="text-dark fw-bold">Category</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Category ..."
                  name="category"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.category}
                />
              </object>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Director</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Director ..."
                  name="director"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.director}
                />
              </object>
              <object className="col">
                <div className="text-dark fw-bold">Casts</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Casts ..."
                  name="cast"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.cast}
                />
              </object>
            </div>
            <div className="row">
              <object className="col">
                <div className="text-dark fw-bold">Release Date</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="yyyy-mm-dd"
                  name="releaseDate"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.releaseDate}
                />
              </object>
              <object className="col">
                <div className="text-dark fw-bold">Duration</div>
                <input
                  className="text-dark bg-light m-2 p-3 rounded border border-secondary w-100"
                  type="text"
                  placeholder="Input Duration ..."
                  name="duration"
                  onChange={(event) => handleChangeForm(event)}
                  value={form.duration}
                />
              </object>
            </div>
            <br />
            <input
              type="file"
              name="image"
              onChange={(event) => handleChangeForm(event)}
            />
            <br />
          </object>
        </div>
        <object className="col">
          <div className="text-dark mx-4 fw-bold">Synopsis</div>
          <input
            className="text-dark bg-light p-3 rounded border border-secondary w-100 text-synopsis"
            type="text"
            placeholder="Input Synopsis ..."
            name="synopsis"
            onChange={(event) => handleChangeForm(event)}
            value={form.synopsis}
          />
        </object>
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
          Data Movie
        </div>
        <div className="article__caption2 d-flex justify-content-end">
          <select
            className="sort mx-2 h-100 w-25 rounded border border-secondary text-dark p-1"
            name="Sort"
            onClick={(value) => handleSort(value)}
          >
            <option value="">Sort</option>
            <option value="name ASC">A to Z</option>
            <option value="name DESC">Z to A</option>
          </select>
          <input
            type={"text"}
            placeholder="search movie"
            onChange={handleSearch}
            value={search}
            className="px-3 bg-light border border-secondary rounded"
          />
        </div>
      </article>
      <section
        className="movie d-flex justify-content-center"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {data.map((item) => (
          <div
            className="movie__image2 bg-white"
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
                  ? `${process.env.REACT_APP_LINK_CLOUDINARY}${item.image}`
                  : "https://www.a1hosting.net/wp-content/themes/arkahost/assets/images/default.jpg"
              }
              className="movie__image--size"
              alt="imageAll"
            />
            <object className="title">{item.name}</object>
            <object className="category">{item.category}</object>
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
