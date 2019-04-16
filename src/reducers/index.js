import { combineReducers } from 'redux';
import dataReducer from './dataReducer.js';
import errorReducer from './errorReducer.js';

export default combineReducers({
  errors: errorReducer,
  data: dataReducer
});
