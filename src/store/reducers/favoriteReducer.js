import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  LOAD_FAVORITES
} from '../actions/favoriteActions';

const initialState = {
  favorites: [],
  loading: false,
  error: null
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      // Check if movie is already in favorites
      const isAlreadyFavorite = state.favorites.some(
        movie => movie.id === action.payload.id
      );
      
      if (isAlreadyFavorite) {
        return state; // Don't add if already exists
      }
      
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload
        )
      };
    
    case CLEAR_FAVORITES:
      return {
        ...state,
        favorites: []
      };
    
    case LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload
      };
    
    default:
      return state;
  }
};

export default favoriteReducer;
