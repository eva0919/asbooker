import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import BooksReducer from './books';
import ActivedBookReducer from './actived-book'

const reducers = {
  books: BooksReducer,
  activedBook:ActivedBookReducer
};

const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
});

export default rootReducer;