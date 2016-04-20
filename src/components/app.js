import React from 'react';
import { Component } from 'react';

import BookList from '../containers/book-list';
import ActivedBook from '../containers/actived-book'

export default class App extends Component {
  render() {
    return (
      <div>
        <BookList />
        <ActivedBook />
      </div>
    );
  }
}