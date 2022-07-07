const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const booking = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_SEAT_BOOKING_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_SEAT_BOOKING_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_SEAT_BOOKING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data,
      };

    case 'GET_BOOKING_BY_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_BOOKING_BY_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_BOOKING_BY_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data,
      };

    case 'GET_BOOKING_BY_USER_ID_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_BOOKING_BY_USER_ID_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_BOOKING_BY_USER_ID_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data,
      };

    case 'CREATE_BOOKING_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'CREATE_BOOKING_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {...action.payload.data.data},
        msg: action.payload.data.msg,
      };

    case 'CREATE_BOOKING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'UPDATE_STATUS_BOOKING_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'UPDATE_STATUS_BOOKING_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'UPDATE_STATUS_BOOKING_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    default:
      return state;
  }
};

export default booking;
