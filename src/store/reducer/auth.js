const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  msg: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {...action.payload.data.data},
        msg: action.payload.data.msg,
      };

    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'REGISTER_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'REGISTER_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {...action.payload.data.data},
        msg: action.payload.data.msg,
      };

    case 'REGISTER_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'FORGOT_PASSWORD_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'FORGOT_PASSWORD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {...action.payload.data.data},
        msg: action.payload.data.msg,
      };

    case 'FORGOT_PASSWORD_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'RESET_PASSWORD_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'RESET_PASSWORD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: {...action.payload.data.data},
        msg: action.payload.data.msg,
      };

    case 'RESET_PASSWORD_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        msg: action.payload.response.data.msg,
      };

    case 'LOGOUT_PENDING':
      return {
        ...state,
        isError: false,
        isLoading: true,
      };

    case 'LOGOUT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: [],
        msg: '',
      };

    case 'LOGOUT_REJECTED':
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

export default auth;
