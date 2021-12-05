import {
  AUTH,
  AUTH_ERROR,
  START_LOADING,
  END_LOADING,
} from "../constants/actionTypes";
import * as api from "../api";
import TOKEN_DECODER from "../Helper/TOKEN_DECODER";
import jwtDecode from "jwt-decode";

export const signin = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signin(formData);
    console.log(data);
    dispatch({ type: AUTH, data });
    dispatch({ type: AUTH_ERROR, error: "" });
    dispatch({ type: END_LOADING });
    history.push("/");
  } catch (error) {
    console.log(error)
    dispatch({ type: START_LOADING });
    dispatch({ type: AUTH, data: null });
    dispatch({ type: AUTH_ERROR, error: error.response.data.message });
    dispatch({ type: END_LOADING });
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    dispatch({ type: AUTH_ERROR, error: "" });
    dispatch({ type: END_LOADING });
    const userID = TOKEN_DECODER(data?.token).id;
    history.push(`/profile/edit/${userID}`);
  } catch (error) {
    dispatch({ type: START_LOADING });
    dispatch({ type: AUTH_ERROR, error: error.response.data.message });
    dispatch({ type: AUTH, data: null });
    dispatch({ type: END_LOADING });
  }
};
