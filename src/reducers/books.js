export default function(state=[], action) {
  switch(action.type) {
    case 'BOOKLIST_SET_INITIAL':
      return action.payload;
  }

  return state;
}