import { combineReducers } from 'redux';
import BooksReducer from './books';
import ActivedBookReducer from './actived-book'

const rootReducer = combineReducers({
  books: BooksReducer,
  activedBook:ActivedBookReducer
});

export default rootReducer;