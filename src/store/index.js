import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import movieReducer from './reducers/movieReducer';
import favoriteReducer from './reducers/favoriteReducer';
import authReducer from './reducers/authReducer';
import authMiddleware from './middleware/authMiddleware';
import bookingReducer from './reducers/bookingReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  favorites: favoriteReducer,
  auth: authReducer,
  booking: bookingReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk, authMiddleware));

export default store;
