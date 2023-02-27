export const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return action.payload;
    case "ADD_TO_CART":
      return action.payload;
    case "REMOVE_FROM_CART":
      return action.payload;
    case "EMPTY_CART":
      return action.payload;
    default:
      return state;
  }
};
