import {
  SET_LEAGUES,
  SET_MATCHES,
  GET_ERRORS,
  ELO_LOADING,
  MATCHES_LOADING,
  LEAGUES_LOADING,
  SET_ELO,
  ITEMS_LOADING,
  GET_FAV,
  ADD_OR_DELETE_FAV,
  SET_FAV
} from '../actions/types';

const initialState = {
  leagues: [],
  matches: [],
  favourites: ['PL', 'FL1', 'BL1', 'SA', 'PD', 'CL'],
  leagueLoading: false,
  matchesLoading: true,
  eloLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LEAGUES:
      return {
        ...state,
        leagues: action.payload,
        leagueLoading: false
      };
    case SET_MATCHES:
      return {
        ...state,
        matches: action.payload,
        matchesLoading: false
      };
    case SET_ELO:
      return {
        ...state,
        matches: action.payload,
        eloLoading: false
      };
    case ITEMS_LOADING:
      return {
        ...state,
        leagueLoading: true
      };
    case MATCHES_LOADING:
      return {
        ...state,
        matchesLoading: true
      };
    case ELO_LOADING:
      return {
        ...state,
        eloLoading: true
      };
    case SET_FAV:
      return {
        ...state,
        favourites: action.payload
      };
    case GET_FAV:
      return {
        ...state
      };
    case ADD_OR_DELETE_FAV:
      return {
        ...state,
        favourites: state.favourites.includes(action.payload)
          ? state.favourites.filter(item => item !== action.payload)
          : [...state.favourites, action.payload]
      };
    default:
      return state;
  }
}
