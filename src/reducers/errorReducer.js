import {
  GET_ERRORS,
  ELO_LOADING,
  MATCHES_LOADING,
  LEAGUES_LOADING,
  SET_ELO
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
