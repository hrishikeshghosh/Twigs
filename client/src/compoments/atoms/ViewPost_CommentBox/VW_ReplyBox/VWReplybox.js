import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { replyPost } from "../../../../actions/posts";
import { LinearProgress } from "@material-ui/core";
import TYPE from "../../../../Helper/TYPE";
import "./style.css";
import VWeachreply from "./VW_EachReplyBox/VWeachreply";

const initialValue = { reply_text: "" };

const VWReplybox = ({ postID, commentID, detail }) => {
  const [reply, setReply] = useState(initialValue);
  const [replyData, setReplyData] = useState([]);
  const { replyLoading, comments } = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    comments.map(
      (element) =>
        element?.details?._id === commentID &&
        setReplyData(element.details.replies)
    );
  }, [comments, commentID]);

  const submitReply = async (e) => {
    e.preventDefault();
    const incomingData = await dispatch(
      replyPost(postID, commentID, reply, TYPE())
    );
    console.log(incomingData);
    incomingData.map(
      (element) =>
        element?.details?._id === commentID &&
        setReplyData(element.details.replies)
    );
    setReply({ reply_text: "" });
  };

  return (
    <div className="viewpost-reply-box-root">
      <form onSubmit={submitReply}>
        <section className="reply-box-block-one">
          <textarea
            className="reply-box-text-area"
            placeholder="Reply to the comment"
            value={reply.reply_text}
            onChange={(e) => setReply({ reply_text: e.target.value })}
            required={true}
          />
          {replyLoading ? (
            <div className="reply-box-button-box">
              <LinearProgress style={{ width: "30%" }} /> :{" "}
            </div>
          ) : (
            <div className="reply-box-button-box">
              <button className="view-post-reply-button" type="submit">
                Leave a reply
              </button>
            </div>
          )}
        </section>
      </form>

      <section className="reply-box-block-three">
        {replyData.map((eachReply) => (
          <VWeachreply
            name={eachReply.replier.name}
            profileImg={eachReply.replier.profile_img}
            reply={eachReply.details.reply_text}
            date={eachReply.details.reply_createdAt}
          />
        ))}
      </section>
    </div>
  );
};

export default VWReplybox;
