import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TEXTDECODER from "../../../Helper/TEXT_DECODER";
import TOKEN_DECODER from "../../../Helper/TOKEN_DECODER";
import USERDATA from "../../../Helper/USERDATA";
import EachLibPost from "./EachLibraryPost/EachLibPost";
import LibraryRightElement from "./LibraryRightElement/LibraryRightElement";
import "./style.css";
import FeedLoader from "../../atoms/Feed_Loader/FeedLoader";

const LibraryLayout = ({ setLibrarySearch, setSection }) => {
  const userID = TOKEN_DECODER(USERDATA()?.token).id;
  const [libraryData, setLibraryData] = useState(null);
  const [type, setType] = useState(0);
  const { library, Loading } = useSelector((state) => state.profile);
  const [isFullScreen, setisFullScreen] = useState(false);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 900) {
      setisFullScreen(false);
    } else {
      setisFullScreen(true);
    }
  }, []);

  console.log(library);

  window.onpopstate = (e) => {
    window.location.reload();
  };

  useEffect(() => {
    setLibraryData(library);
  }, [library]);

  const renderLayout = (type, eachData) => {
    return (
      <EachLibPost
        postIMG={eachData.media}
        title={eachData.title}
        author={eachData.creatorName}
        likes={eachData.likes.length}
        dislikes={eachData.dislikes.length}
        postID={eachData._id}
        description={
          type === 0 ? TEXTDECODER(eachData.content.substring(0, 50)) : null
        }
      />
    );
  };

  const renderBlankEL = () => {
    return (
      <div style={{ padding: "2% 0", display: "flex" }}>
        <i className="far fa-folder-open"></i>
        <h4
          style={{ fontFamily: "Open Sans", fontWeight: 900, margin: "0 2%" }}
        >
          No Saved Posts!
        </h4>
      </div>
    );
  };

  const deployLayout = () => {
    if (libraryData) {
      if (
        libraryData.BLOGS.length ||
        libraryData.ARTS.length ||
        (libraryData.BLOGS.length && libraryData.ARTS.length)
      ) {
        switch (type) {
          case 0:
            if (library.BLOGS.length) {
              return library.BLOGS.map((eachData) => renderLayout(0, eachData));
            } else {
              return renderBlankEL();
            }

          case 1:
            if (library.ARTS.length) {
              return library.ARTS.map((eachData) => renderLayout(1, eachData));
            } else {
              return renderBlankEL();
            }
          default:
            if (library.BLOGS.length) {
              return library.BLOGS.map((eachData) => renderLayout(0, eachData));
            } else {
              return renderBlankEL();
            }
        }
      } else {
        return renderBlankEL();
      }
    }
  };

  return (
    <div className="library-page-root">
      <FeedLoader Loading={Loading} />
      {isFullScreen ? (
        <Grid container alignContent="center" alignItems="stretch">
          <Grid item xs={12} sm={8}>
            <h2 className="lib-heading">{type === 0 ? "BLOGS" : "ARTS"}</h2>
            {deployLayout()}
          </Grid>
          <Grid item xs={12} sm={4}>
            <LibraryRightElement
              type={type}
              setType={setType}
              userID={userID}
              setLibrarySearch={setLibrarySearch}
            />
          </Grid>
        </Grid>
      ) : (
        <Grid container alignContent="center" alignItems="stretch">
          <Grid item xs={12} sm={4}>
            <LibraryRightElement
              type={type}
              setType={setType}
              userID={userID}
              setLibrarySearch={setLibrarySearch}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <h2 className="lib-heading">{type === 0 ? "BLOGS" : "ARTS"}</h2>
            {deployLayout()}
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default LibraryLayout;
