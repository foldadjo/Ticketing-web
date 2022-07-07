import {combineReducers} from 'redux';

import auth from './auth';
import movie from './movie';
import schedule from './schedule';
import booking from './booking';
import user from './user';

export default combineReducers({
  auth,
  movie,
  schedule,
  booking,
  user,
});
