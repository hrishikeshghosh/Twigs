import { SUCCESS_MESSAGE } from "../constants/actionTypes";

const messageReducer = (state = { message: "", status: null }, action) => {
  switch (action.type) {
    case SUCCESS_MESSAGE:
      return { ...state, message: action?.message, status: action?.status };
    default:
      return state;
  }
};

export default messageReducer;
