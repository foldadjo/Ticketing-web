import axios from '../../utils/axios';

export const getAllMovie = (page, limit, searchRelease, searchName, sort) => {
  return {
    type: 'GET_ALL_MOVIE',
    payload: axios.get(
      `/movie?page=${page}&limit=${limit}&searchRelease=${searchRelease}&searchName=${searchName}&sort=${sort}`,
    ),
  };
};

export const getMovieById = id => {
  return {
    type: 'GET_MOVIE_BY_ID',
    payload: axios.get(`/movie/${id}`),
  };
};
