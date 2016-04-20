export default function(state = { title: 'Javascript: The Good Parts', pages: 101 }, action) {
  switch(action.type) {
  case 'BOOK_SELECTED':
    return action.payload;
  }

  return state;
}