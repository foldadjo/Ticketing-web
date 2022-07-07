const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'GET_USER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data.data,
        msg: action.payload.data.msg,
      };

    case 'GET_USER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: [],
        msg: action.payload.response.data,
      };

    case 'UPDATE_PROFILE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'UPDATE_PROFILE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'UPDATE_PROFILE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'UPDATE_PASSWORD_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'UPDATE_PASSWORD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'UPDATE_PASSWORD_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case 'UPDATE_IMAGE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'UPDATE_IMAGE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'UPDATE_IMAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case 'DELETE_IMAGE_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'DELETE_IMAGE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        msg: action.payload.data.msg,
      };

    case 'DELETE_IMAGE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data,
      };

    default:
      return state;
  }
};

export default user;
