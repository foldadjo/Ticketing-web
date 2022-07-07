import axios from '../../utils/axios';

export const redux_login = form => {
  return {
    type: 'LOGIN',
    payload: axios.post('/auth/login', form),
  };
};

export const redux_register = form => {
  return {
    type: 'REGISTER',
    payload: axios.post('/auth/register', form),
  };
};

export const redux_resetPassword = form => {
  return {
    type: 'FORGOT_PASSWORD',
    payload: axios.post('/auth/forgotPassword', form),
  };
};

export const redux_forgotPassword = form => {
  return {
    type: 'FORGOT_PASSWORD',
    payload: axios.patch('/auth/resetPassword', form),
  };
};

export const logout = refreshToken => {
  return {
    type: 'LOGOUT',
    payload: axios.post('/auth/logout', refreshToken),
  };
};
