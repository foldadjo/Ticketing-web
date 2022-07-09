import axios from "../../utils/axios";

export const getAllSchedule = (page, limit, movieId, location) => {
  return {
    type: "GET_ALL_SCHEDULE",
    payload: axios.get(
      `/schedule?page=${page}&limit=${limit}&searchMovieId=${movieId}&searchLocation=${location}`
    ),
  };
};

export const getScheduleById = (id) => {
  return {
    type: "GET_SCHEDULE_BY_ID",
    payload: axios.get(`/movie/${id}`),
  };
};

export const postSchedule = (form) => {
  return {
    type: "POST_DATA_SCHEDULE",
    payload: axios.post(`schedule`, form),
  };
};

export const updateSchedule = (id, form) => {
  return {
    type: "UPDATE_DATA_SCHEDULE",
    payload: axios.patch(`schedule/${id}`, form),
  };
};

export const deleteSchedule = (id) => {
  return {
    type: "DELETE_DATA_SCHEDULE",
    payload: axios.delete(`schedule/${id}`),
  };
};
