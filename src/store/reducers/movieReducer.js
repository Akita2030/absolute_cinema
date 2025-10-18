import {
  FETCH_MOVIES_REQUEST,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  SELECT_MOVIE,
  CLEAR_SELECTED_MOVIE
} from '../actions/movieActions';

const initialState = {
  movies: [],
  director: null,
  selectedMovie: null,
  loading: false,
  error: null
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        movies: action.payload.movies,
        director: action.payload.director,
        error: null
      };
    
    case FETCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        movies: [],
        director: null
      };
    
    case SELECT_MOVIE:
      return {
        ...state,
        selectedMovie: action.payload
      };
    
    case CLEAR_SELECTED_MOVIE:
      return {
        ...state,
        selectedMovie: null
      };
    
    default:
      return state;
  }
};

export default movieReducer;
