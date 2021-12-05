import mongoose from "mongoose";
import POSTMODEL from "../model/Posts.js";
import AUTHMODEL from "../model/auth.js";

export const fetchFeed = async (req, res) => {
  try {
    const Blogs = new Array();
    const Arts = new Array();
    const Posts = await POSTMODEL.find();
    const Profile = await AUTHMODEL.findById(req.userId);

    Posts.forEach((element) => {
      const following = Profile.following.findIndex(
        (id) => id === String(element.creatorID)
      );
      if (following === 0 || element.creatorID === String(req.userId)) {
        if (element.type === "0") {
          Blogs.push(element);
          // Blogs.reverse();
        } else if (element.type === "1") {
          Arts.push(element);
          Arts.reverse();
        }
      }
    });
    res.status(200).json({ BLogs: Blogs, Arts: Arts });
  } catch (error) {
    console.log(error);
  }
};

export const implementSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const title = new RegExp(query, "i");
    const tags = new RegExp(query, "i");
    const creatorName = new RegExp(query, "i");
    const data = await POSTMODEL.find({
      $or: [{ title }, { tags }, { creatorName }],
    });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
