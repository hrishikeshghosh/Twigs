import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import error from "./error";
import profile from "./profile";
import emailbox from "./emailbox";
import message from "./message";
import search from "./search";
import menu from "./menu";
import alert from "./alert";

export default combineReducers({
  posts,
  auth,
  error,
  profile,
  emailbox,
  message,
  search,
  menu,
  alert,
});
