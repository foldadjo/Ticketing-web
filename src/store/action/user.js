import axios from '../../utils/axios';

export const getUser = userId => {
  return {
    type: 'GET_USER',
    payload: axios.get(`/user/${userId}`),
  };
};

export const updateProfile = (userId, form) => {
  return {
    type: 'UPDATE_PROFILE',
    payload: axios.patch(`/user/profile/${userId}`, form),
  };
};

export const updatePassword = (userId, form) => {
  return {
    type: 'UPDATE_PASSWORD',
    payload: axios.patch(`/user/password/${userId}`, form),
  };
};

export const updateImage = (userId, form) => {
  return {
    type: 'UPDATE_IMAGE',
    payload: axios.patch(`/user/image/${userId}`, form),
  };
};

export const deleteImage = userId => {
  return {
    type: 'DELETE_IMAGE',
    payload: axios.delete(`/user/delimage/${userId}`),
  };
};
