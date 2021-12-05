import React from "react";
import { CircularProgress } from "@material-ui/core";
import "./style.css";

const FeedLoader = ({ Loading }) => {
  return (
    <div
      className="post-loader-box"
      style={
        Loading
          ?
           {
              transform: "translateY(0%)",
              visibility: "visible",
              opacity: 1,
            }
          : {
              transform: "translateY(-100%)",
              visibility: "collapse",
              opacity: 0,
            }
      }
    >
      <CircularProgress
        className="post-loader"
        style={{
          color: "#e5007e",
          display: "block",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default FeedLoader;
