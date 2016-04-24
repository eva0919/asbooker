import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class ActivedBook extends Component {
  render() {
    if( this.props.activedBook ){
      return (
        <div className="active-book-block col-sm-8">
          <h2>{ this.props.activedBook.name }</h2>
          <h3>{ this.props.activedBook.contents[0].content }</h3>
        </div>
      )
    }else{
      return (
        <div className="active-book-block col-sm-8">
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  // inside of BookList
  return {
    activedBook: state.activedBook
  };
}

export default connect(mapStateToProps)(ActivedBook)