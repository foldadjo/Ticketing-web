import axios from '../../utils/axios';

export const getAllSchedule = (page, limit, movieId, location) => {
  return {
    type: 'GET_ALL_SCHEDULE',
    payload: axios.get(
      `/schedule?page=${page}&limit=${limit}&searchMovieId=${movieId}&searchLocation=${location}`,
    ),
  };
};

export const getScheduleById = id => {
  return {
    type: 'GET_SCHEDULE_BY_ID',
    payload: axios.get(`/movie/${id}`),
  };
};
