import {
  SET_LEAGUES,
  SET_MATCHES,
  ELO_LOADING,
  MATCHES_LOADING,
  ITEMS_LOADING,
  SET_ELO,
  GET_FAV,
  ADD_OR_DELETE_FAV,
  SET_FAV,
  FILTER_LEAGUES,
  SET_ODDS,
  SET_STANDINGS,
  STANDINGS_LOADING
} from '../actions/types';

const initialState = {
  leagues: [],
  matches: [],
  table: [],
  favourites: ['PL', 'FL1', 'BL1', 'SA', 'PD', 'CL'],
  leagueLoading: false,
  matchesLoading: true,
  eloLoading: false,
  standingLoading: false
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
    case SET_STANDINGS:
      return {
        ...state,
        table: [...state.table, action.payload],
        standingLoading: false
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
    case STANDINGS_LOADING:
      return {
        ...state,
        standingLoading: true
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
    case FILTER_LEAGUES:
      return {
        ...state,
        filteredLeagues: state.leagues.competitions.filter(
          league => league.id === action.payload
        )
      };
    case SET_ODDS:
      return {
        ...state,
        odds: action.payload
      };
    default:
      return state;
  }
}
