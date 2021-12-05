import { LinearProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { commentPost, fetchComments } from "../../../actions/posts";
import TYPE from "../../../Helper/TYPE";
import "./style.css";
import VWEachComment from "./VW_EachComment/VWEachComment";

const initialData = {
  text: "",
};

const VWComments = ({ id, detail, isDisplayed }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(initialData);
  const [allcomments, setAllComments] = useState([]);
  const { Loading, comments, fetchCommentLoading } = useSelector(
    (state) => state.posts
  );
  useEffect(() => {
    if (detail.comments.length && !comments.length) {
      dispatch(fetchComments(id, TYPE()));
    }
    setAllComments(comments);
  }, [comments, dispatch, id, detail.comments.length]);

  const submitComment = async (e) => {
    e.preventDefault();
    const newComment = await dispatch(commentPost(id, data, TYPE()));
    setAllComments(newComment);
    setData({ text: "" });
  };

  if (fetchCommentLoading) {
    return (
      <div className="view-post-comment-root">
        <LinearProgress style={{ margin: "5%" }} />
      </div>
    );
  } else {
    return (
      <div className="view-post-comment-root">
        <form onSubmit={submitComment}>
          <section className="comment-box-block-one">
            <h2>Comments</h2>

            <div className="count-text-box">
              <p className="like-box-count-texts">{allcomments?.length}</p>
              <p className="like-box-static-texts">
                {allcomments?.length >= 2 ? "Comments" : "Comment"}
              </p>
            </div>
          </section>

          <section className="comment-box-block-two">
            <textarea
              className="view-post-comment-text-area"
              placeholder="Share your thoughts"
              required={true}
              value={data.text}
              onChange={(e) => setData({ text: e.target.value })}
            />
            <div className="view-post-comment-button-box">
              {Loading ? (
                <LinearProgress style={{ width: "30%" }} />
              ) : (
                <button className="view-post-comment-button" type="submit">
                  Leave a comment
                </button>
              )}
            </div>
          </section>
        </form>
        <section className="comment-box-block-three">
          {allcomments.map((comment) => (
            <VWEachComment
              profileID={comment.details.userID}
              name={comment.commenter.name}
              profile_img={comment.commenter.profile_img}
              comment={comment.details.text}
              date={comment.details.createdAt}
              postID={id}
              commentID={comment?.details?._id}
              repliesCount={comment?.details?.replies.length}
              detail={detail}
              commentlikes={comment.details.comment_likes}
              commentdislikes={comment.details.comment_dislikes}
            />
          ))}
        </section>
      </div>
    );
  }
};

export default VWComments;
