import {
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  CLEAR_FAVORITES,
  LOAD_FAVORITES
} from '../actions/favoriteActions';

// Load favorites from localStorage on initialization
const loadFavoritesFromStorage = () => {
  try {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
    return [];
  }
};

const initialState = {
  favorites: loadFavoritesFromStorage(),
  loading: false,
  error: null
};

const favoriteReducer = (state = initialState, action) => {
  console.log('favoriteReducer - action:', action.type, 'payload:', action.payload);
  console.log('favoriteReducer - current state:', state);
  
  switch (action.type) {
    case ADD_TO_FAVORITES:
      // Check if movie is already in favorites
      const isAlreadyFavorite = state.favorites.some(
        movie => movie.id === action.payload.id
      );
      
      console.log('ADD_TO_FAVORITES - isAlreadyFavorite:', isAlreadyFavorite);
      
      if (isAlreadyFavorite) {
        console.log('Movie already in favorites, returning current state');
        return state; // Don't add if already exists
      }
      
      const newState = {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
      console.log('ADD_TO_FAVORITES - new state:', newState);
      
      // Save to localStorage
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(newState.favorites));
        console.log('Saved to localStorage:', newState.favorites);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      return newState;
    
    case REMOVE_FROM_FAVORITES:
      const removedState = {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload
        )
      };
      console.log('REMOVE_FROM_FAVORITES - new state:', removedState);
      
      // Save to localStorage
      try {
        localStorage.setItem('movieFavorites', JSON.stringify(removedState.favorites));
        console.log('Saved to localStorage after removal:', removedState.favorites);
      } catch (error) {
        console.error('Error saving to localStorage:', error);
      }
      
      return removedState;
    
    case CLEAR_FAVORITES:
      const clearedState = {
        ...state,
        favorites: []
      };
      console.log('CLEAR_FAVORITES - new state:', clearedState);
      
      // Save to localStorage
      try {
        localStorage.setItem('movieFavorites', JSON.stringify([]));
        console.log('Cleared localStorage');
      } catch (error) {
        console.error('Error clearing localStorage:', error);
      }
      
      return clearedState;
    
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
