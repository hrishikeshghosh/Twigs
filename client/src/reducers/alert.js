import { useDispatch } from "react-redux";
import {
  ACTION_CANCEL,
  ACTION_COMPLETED,
  ACTION_OKAY,
  SHOW_ALERT,
} from "../constants/actionTypes";

const alertReducer = (
  state = {
    message: "",
    accept_btn: "",
    reject_btn: "",
    action_okay: false,
    status: false,
  },
  action
) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        ...state,
        message: action?.message,
        accept_btn: action?.accept_btn,
        reject_btn: action?.reject_btn,
        status: action?.status,
      };
    case ACTION_OKAY:
      return {
        ...state,
        action_okay: true,
        status: false,
      };
    case ACTION_COMPLETED:
      return {
        message: "",
        accept_btn: "",
        reject_btn: "",
        action_okay: false,
        status: false,
      };
    case ACTION_CANCEL:
      return {
        message: "",
        accept_btn: "",
        reject_btn: "",
        action_okay: false,
        status: false,
      };

    default:
      return state;
  }
};

export default alertReducer;
