import { AUTH_ERROR } from "../constants/actionTypes";

const errorReducer = (state = "", action) => {
  switch (action.type) {
    case AUTH_ERROR:
      return action?.error;

    default:
      return state;
  }
};

export default errorReducer;
