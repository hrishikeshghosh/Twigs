import * as api from "../api";
import {
  FETCHPROFILE,
  SETPROFILE,
  UPDATEPASSWORD,
  UPDATEPASSWORDERRS,
  DELETEACCOUNT,
  START_LOADING,
  END_LOADING,
  FOLLOWERSANDFOLLOWING,
  ADDTOLIBRARY,
  SEARCHLIBRARY,
  START_LIBRARY_LOADING,
  END_LIBRARY_LOADING,
  DELETEALLIBRARY,
  SUCCESS_MESSAGE,
  FAILURE_MESSAGE,
  REMOVEDPOSTFROMLIBRARY,
} from "../constants/actionTypes";

export const fetchProfile = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchProfile(id);
    dispatch({ type: FETCHPROFILE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const setProfile = (id, profileData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.setprofile(id, profileData);
    dispatch({ type: SETPROFILE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = (id, passwordSet) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePasswords(id, passwordSet);
    dispatch({ type: UPDATEPASSWORD, payload: data.message });
    dispatch({ type: UPDATEPASSWORDERRS, error: null });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: UPDATEPASSWORDERRS, error: error.response.data.message });
  }
};

export const deleteAccount = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.deleteprofile(id);
    dispatch({ type: DELETEACCOUNT, payload: data });

    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
    console.log(error.response.data.message);
  }
};

export const listFollowersAndFollowings = (id) => async (dispatch) => {
  try {
    const { data } = await api.listFollowersAndFollowings(id);
    dispatch({ type: FOLLOWERSANDFOLLOWING, payload: data });
    return data.followers;
  } catch (error) {
    console.log(error);
  }
};

export const addTolib = (postID, creds) => async (dispatch) => {
  try {
    const { data } = await api.addToLibrary(postID, creds);
    dispatch({ type: ADDTOLIBRARY, payload: data.data });
    dispatch({ type: SUCCESS_MESSAGE, message: data.message, status: 100 });
  } catch (error) {
    console.log(error);
  }
};

export const searchLIB = (search, id) => async (dispatch) => {
  try {
    dispatch({ type: START_LIBRARY_LOADING });
    const { data } = await api.searchLibrary(search, id);
    dispatch({ type: SEARCHLIBRARY, payload: data });
    dispatch({ type: END_LIBRARY_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllLibrary = (userID) => async (dispatch) => {
  try {
    const { data } = await api.clearLibrary(userID);
    dispatch({ type: DELETEALLIBRARY, payload: data.library });
    dispatch({ type: SUCCESS_MESSAGE, message: data.message, status: 200 });
  } catch (error) {
    console.log(error);
  }
};

export const RemovePostFromLibrary = (postID) => async (dispatch) => {
  try {
    const { data } = await api.RemovePostFromLib(postID);
    dispatch({ type: REMOVEDPOSTFROMLIBRARY, payload: data.library });
    dispatch({ type: SUCCESS_MESSAGE, message: data.message, status: 200 });
  } catch (error) {
    console.log(error);
    dispatch({
      type: FAILURE_MESSAGE,
      message: error.response.data.message,
      status: 400,
    });
  }
};
