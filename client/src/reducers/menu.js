import { MENU_CLOSE, MENU_OPEN } from "../constants/actionTypes";

const menuReducer = (state = { menu_state: false }, action) => {
  switch (action.type) {
    case MENU_OPEN:
      return { ...state, menu_state: true };
    case MENU_CLOSE:
      return { ...state, menu_state: false };
    default:
      return state;
  }
};
export default menuReducer;
