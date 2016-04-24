import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import selectBook from '../actions/select-book'
import initialBookList from '../actions/initial-book-list'

class BookList extends Component {
  renderList() {
    return this.props.books.map((book) => {
      return (
        <li
          key={book._id}
          onClick={() => this.props.selectBook(book)}
          className="list-group-item">
          {book.name}
        </li>
      );
    });
  }
  componentDidMount() {
    $.get('/api/', function (result) {
      this.props.initialBookList( JSON.parse(result) ) ;
    }.bind(this));
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    books: state.books
  };
}

function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result shoudl be passed
  // to all of our reducers
  return bindActionCreators({ selectBook: selectBook, initialBookList:initialBookList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookList);