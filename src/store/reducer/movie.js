const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const movie = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_MOVIE_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_MOVIE_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_MOVIE_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    case 'GET_ALL_MOVIE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_ALL_MOVIE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_ALL_MOVIE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        pageInfo: {},
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default movie;
