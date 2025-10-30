// Action types
export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';
export const SELECT_MOVIE = 'SELECT_MOVIE';
export const CLEAR_SELECTED_MOVIE = 'CLEAR_SELECTED_MOVIE';

// Action creators
export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST
});

export const fetchMoviesSuccess = (movies, director) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: { movies, director }
});

export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error
});

export const selectMovie = (movie) => ({
  type: SELECT_MOVIE,
  payload: movie
});

export const clearSelectedMovie = () => ({
  type: CLEAR_SELECTED_MOVIE
});

// Async action creator
export const fetchMovies = () => {
  return async (dispatch) => {
    dispatch(fetchMoviesRequest());
    try {
      const response = await fetch('/movies.json');
      if (!response.ok) {
        throw new Error('Ошибка загрузки данных');
      }
      const data = await response.json();
      dispatch(fetchMoviesSuccess(data.movies, data.director));
    } catch (error) {
      dispatch(fetchMoviesFailure(error.message));
    }
  };
};

