// Action types for favorites
export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';
export const CLEAR_FAVORITES = 'CLEAR_FAVORITES';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';

// Action creators
export const addToFavorites = (movie) => ({
  type: ADD_TO_FAVORITES,
  payload: movie
});

export const removeFromFavorites = (movieId) => ({
  type: REMOVE_FROM_FAVORITES,
  payload: movieId
});

export const clearFavorites = () => ({
  type: CLEAR_FAVORITES
});

export const loadFavorites = (favorites) => ({
  type: LOAD_FAVORITES,
  payload: favorites
});

// Helper function to check if movie is in favorites
export const isMovieInFavorites = (favorites, movieId) => {
  return favorites.some(movie => movie.id === movieId);
};

// Toggle favorite status
export const toggleFavorite = (movie, favorites) => {
  return (dispatch) => {
    const isInFavorites = isMovieInFavorites(favorites, movie.id);
    
    if (isInFavorites) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };
};
