import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';


class ActivedBook extends Component {
  renderContents(){
    let key = 0;
    return this.props.activedBook.contents.map((contentSet) => {
      key += 1;
      let keyString = "contentKey"+key;
      return (
        <span key={keyString}>
          <p>{contentSet.question}</p>
          <p>{contentSet.content}</p>
        </span>
      );
    });
  }

  render() {
    if( this.props.activedBook ){
      return (
        <div className="active-book-block col-sm-8">
          <h2>{ this.props.activedBook.name }</h2>
          <div>{ this.renderContents() }</div>
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