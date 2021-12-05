import express from 'express'
import multer from 'multer'
import cors from 'cors'
import {
  postfeed,
  updatePost,
  fetchContent,
  likePost,
  deletePost,
  dislikePost,
  commentPost,
  replyPost,
  LikeComment,
  DislikeComment,
  fetchComments
} from '../controller/post_loads.js'
import AuthWare from '../Middleware/authWare.js'

const router = express.Router()
const app = express()

const upload = multer({ storage: multer.memoryStorage() })

router.get('/:id', AuthWare, fetchContent)
router.post('/', AuthWare, postfeed)
router.patch('/:id', AuthWare, updatePost)
router.patch('/like/:id', AuthWare, likePost)
router.patch('/dislike/:id', AuthWare, dislikePost)
router.get('/fetchComments/:id', AuthWare, fetchComments)
router.patch('/comments/:id', AuthWare, commentPost)
router.patch('/replies/:postID/:commentID', AuthWare, replyPost)
router.patch('/commentLikes/:postID/:commentID', AuthWare, LikeComment)
router.patch('/commentDislikes/:postID/:commentID', AuthWare, DislikeComment)
router.delete('/:id', AuthWare, deletePost)

export default router
