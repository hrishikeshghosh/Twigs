import React, { useRef, useEffect, useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import QueueRoundedIcon from "@material-ui/icons/QueueRounded";
import WatchLaterRoundedIcon from "@material-ui/icons/WatchLaterRounded";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import { Divider } from "@material-ui/core";
import { useDispatch } from "react-redux";
import TYPE from "../../../Helper/TYPE";
import { deletePost } from "../../../actions/posts";
import "./style.css";
import { addTolib } from "../../../actions/profile";
const MenuOptions = ({
  ismenuOpen,
  setMenuOpen,
  setContentID,
  postID,
  userID,
  creatorID,
  setinVeiewPort,
  title,
  tags,
  author,
}) => {
  const node = useRef();
  const dispatch = useDispatch();
  const [isMenuOpen, setMenuState] = useState(ismenuOpen);

  const [isFullScreen, setFullScreen] = useState(true);

  useEffect(() => {
    if (isMenuOpen) {
      const el = document.querySelector(".menu-container");
      const containerHeight = document.documentElement.clientHeight;
      const containerWidth = document.documentElement.clientWidth;
      console.log({
        contH: containerHeight,
        contW: containerWidth,
        rect: el.getBoundingClientRect(),
      });
      const ver = el.getBoundingClientRect().bottom;
      const hor = el.getBoundingClientRect().right;
      if (ver >= containerHeight) {
        setinVeiewPort({ ...hor, ver: false });
      } else if (hor >= containerWidth) {
        setinVeiewPort({ ...ver, hor: false });
      } else if (ver >= containerHeight && hor >= containerWidth) {
        setinVeiewPort({ ver: false, hor: false });
      } else {
        setinVeiewPort({ ver: true, hor: true });
      }
    }
  }, [isMenuOpen, setinVeiewPort]);

  useEffect(() => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 600) {
      setFullScreen(false);
    } else {
      setFullScreen(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const handleOutsideClick = (e) => {
    if (node.current.contains(e.target)) {
      return;
    } else {
      closeMenu();
    }
  };
  const FireEditAction = (e) => {
    e.preventDefault();
    console.log(postID);
    setContentID(postID);
    closeMenu();
  };

  const FireDeleteAction = (e) => {
    dispatch(deletePost(postID, TYPE()));
    closeMenu();
  };

  const FireLibAction = (e) => {
    e.preventDefault();
    const creds = { tags: tags, title: title, author: author };
    dispatch(addTolib(postID, creds));
    closeMenu();
  };

  const closeMenu = (e) => {
    setMenuState((prevState) => !prevState);
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <div ref={node} className="menu-container">
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
      <p>123</p>
    </div>
  );
};

export default MenuOptions;

// {userID === creatorID && (
//   <div className="menu-user-options">
//     <div className="menu-options" onClick={FireEditAction}>
//       <EditIcon
//         style={{ fontSize: "1.2rem", color: "grey", fontWeight: 900 }}
//       />
//       <h5 className="post-menu-option-names">Edit Post</h5>
//     </div>
//     <div className="menu-options" onClick={FireDeleteAction}>
//       <DeleteForeverIcon
//         style={{ fontSize: "1.2rem", color: "grey", fontWeight: 900 }}
//       />
//       <h5 className="post-menu-option-names">Delete Post</h5>
//     </div>
//     <Divider style={{ margin: "2% 0 2% 0" }} />
//   </div>
// )}

// <div className="menu-options" onClick={FireLibAction}>
//   <QueueRoundedIcon
//     style={{ fontSize: "1.2rem", color: "grey", fontWeight: 900 }}
//   />
//   <h5 className="post-menu-option-names">Add to library</h5>
// </div>
// <div className="menu-options">
//   <WatchLaterRoundedIcon
//     style={{ fontSize: "1.2rem", color: "grey", fontWeight: 900 }}
//   />
//   <h5 className="post-menu-option-names">Mark to Read Later</h5>
// </div>
// <div className="menu-options">
//   <ReportProblemRoundedIcon
//     style={{ fontSize: "1.2rem", color: "grey", fontWeight: 900 }}
//   />
//   <h5 className="post-menu-option-names">Report a Problem</h5>
// </div>
