import { createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import movieReducer from './reducers/movieReducer';
import favoriteReducer from './reducers/favoriteReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  favorites: favoriteReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
