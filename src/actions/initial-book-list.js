export default function(booklist) {
  // selectBook is an ActionCreator, it needs to return an action,
  // an object with a type property.
  return {
    type: 'BOOKLIST_SET_INITIAL',
    payload: booklist
  };
}