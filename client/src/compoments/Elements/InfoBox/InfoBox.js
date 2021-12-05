import React, { useEffect, useState } from "react";
import CreatePost from "../../atoms/create-posts/CreatePost";
import ProfileInfo from "../../atoms/profile-card/ProfileCard";
import Menu from "../../atoms/Menu/Menu";
import USERDATA from "../../../Helper/USERDATA";
import "./style.css";

function InfoBox({ setisDisplayed, setSection }) {
  const [isFullScreen, setisFullScreen] = useState(true);
  const userData = USERDATA();

  useEffect(() => {
    const sreenWidth = window.innerWidth;

    if (sreenWidth <= 720) {
      setisFullScreen(false);
    } else {
      setisFullScreen(true);
    }
  }, []);

  return (
    <div className="left-root">
      <div className="info-box-container">
        <CreatePost setisDisplayed={setisDisplayed} className="create-post" />
        {(userData && isFullScreen) && (
          <div>
            <ProfileInfo className="profile-infobox" />
            <Menu setSection={setSection} />
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoBox;
