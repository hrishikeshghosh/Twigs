import mongoose from 'mongoose'
import CreateTags from '../config/CreateTags.js'
import * as fs from 'fs'
// import BLOGMODEL from "../model/blogs.js";
// import ARTMODEL from "../model/arts.js";
import POSTMODEL from '../model/Posts.js'
import AUTHMODEL from '../model/auth.js'
import FormData from 'form-data'
import axios from 'axios'
import LIBRARYMODEL from '../model/library.js'
const BucketApi = axios.create({ baseURL: 'http://localhost:8080' })

//fetching user details each time can cause a lag when having a huge data structure,
// recheck this part if the app causes a lag when fetching or writing comments into database

const userDetails = async userID => {
  var id = mongoose.Types.ObjectId(userID)
  const details = await AUTHMODEL.findById(id)
  return {
    profile_img: details?.imageUrl,
    name: details?.name,
    role: details?.role
  }
}

const fetchData = async (type, id) => {
  // if (type === "0") {
  //   const data = await BLOGMODEL.findById(id);
  //   return data;
  // } else if (type === "1") {
  //   const data = await ARTMODEL.findById(id);
  //   return data;
  // }
  const data = await POSTMODEL.findById(id)
  return data
}

const createModel = async (type, post, userID) => {
  const formatedData = {
    ...post,
    tags: post.tags === '' ? [] : CreateTags(post.tags.trim()),
    creatorID: String(userID),
    createdAt: new Date().toISOString()
  }

  // if (type === "0") {
  //   return new BLOGMODEL(formatedData);
  // } else if (type === "1") {
  //   return new ARTMODEL(formatedData);
  // }
  return new POSTMODEL(formatedData)
}

const updateModel = async (type, id, editedValues) => {
  try {
    // if (type === "0") {
    //   const data = await BLOGMODEL.findByIdAndUpdate(id, editedValues, {
    //     new: true,
    //   });
    //   return data;
    // } else if (type === "1") {
    //   const data = await ARTMODEL.findByIdAndUpdate(id, editedValues, {
    //     new: true,
    //   });
    //   return data;
    // }
    const data = await POSTMODEL.findByIdAndUpdate(id, editedValues, {
      new: true
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const fetchContent = async (req, res) => {
  const { id } = req.params
  const { type } = req.query

  try {
    const data = await fetchData(type, id)
    res.status(200).json(data)
  } catch (error) {
    console.log(error)
    // res.sendStatus(401).json({
    //   message: error,
    // });
  }
}

export const postfeed = async (req, res) => {
  const post = req.body
  const { type } = req.query

  try {
    const newPost = await createModel(type, post, req.userId)
    await newPost.save()
    const profile = await AUTHMODEL.findById(req.userId)
    const index = profile.contents.findIndex(id => id === newPost?._id)
    if (index === -1) {
      profile.contents.push(newPost?._id)
    }
    await AUTHMODEL.findByIdAndUpdate(req.userId, profile, { new: true })

    res.status(200).json(newPost)
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = async (req, res) => {
  const { id } = req.params
  const editedPost = req.body
  const { type } = req.query
  console.log(id)
  try {
    // if (mongoose.Types.ObjectId.isValid(id)) {

    // } else {
    //   res.status(404).json({ message: 'No post found!' })
    // }
    const post = { ...editedPost, tags: CreateTags(editedPost.tags.trim()) }
    const updatedPost = await updateModel(type, id, post)
    // const NewData = {
    //   user_details: await userDetails(updatedPost.creator),
    //   post: updatedPost
    // }

    res.status(202).json(updatedPost)
  } catch (error) {
    console.log(error)
  }
}

const UpdaterUserHistory = async (postID, userID) => {
  try {
    const required_post = await LIBRARYMODEL.find({
      $and: [{ postID: postID }, { savedBy: userID }]
    })
    console.log(required_post)

    await AUTHMODEL.findByIdAndUpdate(
      { _id: userID },
      { $pullAll: { library: [required_post[0]?._id], contents: [postID] } },
      { new: true }
    )

    await LIBRARYMODEL.findOneAndDelete({
      $and: [{ postID: postID }, { savedBy: userID }]
    })
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      await POSTMODEL.findByIdAndDelete(id)
      await UpdaterUserHistory(id, req.userId)
      res.status(200).json({ message: 'Post deleted successfully!' })
    } else {
      res.status(404).json({ message: 'No post found!' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const likePost = async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  try {
    const postData = await fetchData(type, id)
    const index = postData.likes.findIndex(id => id === String(req.userId))

    if (index === -1) {
      postData.likes.push(req.userId)
      postData.dislikes = postData.dislikes.filter(
        id => id !== String(req.userId)
      )
      const updatedPost = await updateModel(type, id, postData)

      const NewData = {
        post: updatedPost,
        user_details: userDetails(postData?.creator)
      }

      res.status(201).json(NewData)
    } else {
      res.status(304).json({ message: 'Already Liked Post!' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const dislikePost = async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  try {
    const postData = await fetchData(type, id)
    const index = postData.dislikes.findIndex(id => id === String(req.userId))

    if (index === -1) {
      postData.dislikes.push(req.userId)
      postData.likes = postData.likes.filter(id => id !== String(req.userId))
      const updatedPost = await updateModel(type, id, postData)
      const NewData = {
        post: updatedPost,
        user_details: userDetails(postData?.creator)
      }

      res.status(201).json(NewData)
    } else {
      res.status(304).json({ message: 'Already Disliked Post!' })
    }
  } catch (error) {
    console.log(error)
  }
}

export const fetchComments = async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  try {
    const post = await fetchData(type, id)

    const Data = await Promise.all(
      post?._doc?.comments.map(
        async element =>
          (element = {
            details: {
              ...element?._doc,
              replies: await Promise.all(
                element.replies.map(
                  async each =>
                    (each = {
                      details: each,
                      replier: await userDetails(each?.reply_userID)
                    })
                )
              )
            },
            commenter: await userDetails(element?.userID)
          })
      )
    )

    res.status(200).json(Data)
  } catch (error) {
    console.log(error)
  }
}

export const commentPost = async (req, res) => {
  const { id } = req.params
  const { type } = req.query
  const input = req.body
  try {
    const post = await fetchData(type, id)

    post.comments.push({
      ...input,
      userID: req.userId,
      createdAt: new Date().toISOString()
    })

    const updatedPost = await updateModel(type, id, post)
    // const Data = await Promise.all(
    //   updatedPost?._doc?.comments.map(
    //     async (element) =>
    //       (element = {
    //         details: element,
    //         commenter: await userDetails(element?.userID),
    //       })
    //   )
    // );
    const Data = await Promise.all(
      updatedPost?._doc?.comments.map(
        async element =>
          (element = {
            details: {
              ...element?._doc,
              replies: await Promise.all(
                element.replies.map(
                  async each =>
                    (each = {
                      details: each,
                      replier: await userDetails(each?.reply_userID)
                    })
                )
              )
            },
            commenter: await userDetails(element?.userID)
          })
      )
    )
    res.status(200).json(Data)
  } catch (error) {
    console.log(error)
  }

  // const newComment = COMMENTMODEL({
  //   ...input,
  //   userID: req.userId,
  //   postID: id,
  //   createdAt: new Date().toISOString(),
  // });
  // try {
  //   const post = await BLOGMODEL.findById(id);
  //   await newComment.save().then((result) => {
  //     post.comments.push(result._id);
  //   });

  //   await BLOGMODEL.updateOne({ _id: id }, post, { new: true });
  // } catch (error) {
  //   console.log(error);
  // }
}

export const replyPost = async (req, res) => {
  const { postID, commentID } = req.params
  const reply = req.body
  const { type } = req.query
  try {
    const postData = await fetchData(type, postID)

    postData.comments.forEach(element => {
      if (element._id == commentID) {
        element.replies.push({
          ...reply,
          reply_userID: req.userId,
          reply_createdAt: new Date().toISOString()
        })
      }
    })
    const updatedpost = await updateModel(type, postID, postData)

    const Data = await Promise.all(
      updatedpost?._doc?.comments.map(
        async element =>
          (element = {
            details: {
              ...element?._doc,
              replies: await Promise.all(
                element.replies.map(
                  async each =>
                    (each = {
                      details: each,
                      replier: await userDetails(each?.reply_userID)
                    })
                )
              )
            },
            commenter: await userDetails(element?.userID)
          })
      )
    )

    res.status(200).json(Data)
  } catch (error) {}
}

export const LikeComment = async (req, res) => {
  const { postID, commentID } = req.params
  const { type } = req.query
  try {
    const post = await fetchData(type, postID)
    post.comments.forEach(element => {
      if (element._id == commentID) {
        const index = element.comment_likes.findIndex(
          id => id === String(req.userId)
        )

        if (index === -1) {
          element.comment_likes.push(req.userId)
          element.comment_dislikes = element.comment_dislikes.filter(
            id => id !== req.userId
          )
        }
      }
    })

    const updatedPost = await updateModel(type, postID, post)
    const NewData = {
      post: updatedPost,
      user_details: userDetails(post?.creator)
    }

    res.status(200).json(NewData)
  } catch (error) {
    console.log(error)
  }
}

export const DislikeComment = async (req, res) => {
  const { postID, commentID } = req.params
  const { type } = req.query
  try {
    const post = await fetchData(type, postID)
    post.comments.forEach(element => {
      if (element._id == commentID) {
        const index = element.comment_dislikes.findIndex(
          id => id === String(req.userId)
        )

        if (index === -1) {
          element.comment_dislikes.push(req.userId)
          element.comment_likes = element.comment_likes.filter(
            id => id !== req.userId
          )
        }
      }
    })

    const updatedPost = await updateModel(type, postID, post)

    const NewData = {
      post: updatedPost,
      user_details: userDetails(post?.creator)
    }
    res.status(200).json(NewData)
  } catch (error) {
    console.log(error)
  }
}
