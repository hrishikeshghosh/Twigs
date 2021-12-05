import React from "react";
import { useDispatch } from "react-redux";
import "./style.css";

const AlertToast = ({
  message,
  pos,
  neg,
  setAlertAction,
  showALertBox,
  dispatch_action,
}) => {
  const dispatch = useDispatch();
  // const { message, accept_btn, reject_btn } =
  //   useSelector((state) => state.alert);

  return (
    <div className="form-toast-back-screen">
      <div className="form-toast-root">
        <p style={{ textAlign: "center", fontSize: "1.2rem" }}>{message} </p>
        <div className="form-toast-button-div">
          <button
            className="form-toast-okay-btn"
            onClick={(e) => {
              e.preventDefault();
              if (dispatch_action) {
                dispatch(setAlertAction);
              }
              showALertBox(false);
            }}
          >
            {pos}
          </button>
          <button
            className="form-toast-cancel-btn"
            onClick={(e) => {
              e.preventDefault();
              if (!dispatch_action) {
                setAlertAction();
              }
              showALertBox(false);
            }}
          >
            {neg}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertToast;
