import express from "express";
import {
  commentPost,
  deletePost,
  DislikeComment,
  dislikePost,
  fetchArtContent,
  fetchComments,
  LikeComment,
  likePost,
  postArt,
  replyPost,
  updateArtPost,
} from "../controller/art_loads.js";
import AuthWare from "../Middleware/authWare.js";

const router = express.Router();

router.post("/", AuthWare, postArt);
router.get("/:id", AuthWare, fetchArtContent);
router.patch("/:id", AuthWare, updateArtPost);
router.patch("/like/:id", AuthWare, likePost);
router.patch("/dislike/:id", AuthWare, dislikePost);
router.get("/fetchComments/:id", AuthWare, fetchComments);
router.patch("/comments/:id", AuthWare, commentPost);
router.patch("/replies/:postID/:commentID", AuthWare, replyPost);
router.patch("/commentLikes/:postID/:commentID", AuthWare, LikeComment);
router.patch("/commentDislikes/:postID/:commentID", AuthWare, DislikeComment);
router.delete("/:id", AuthWare, deletePost);

export default router;
