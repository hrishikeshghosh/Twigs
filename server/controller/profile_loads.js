import mongoose from "mongoose";
import AUTHMODEL from "../model/auth.js";
// import BLOGMODEL from "../model/blogs.js";
// import ARTMODEL from "../model/Posts.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import passwordCheck from "../config/passwordChecker.js";
import POSTMODEL from "../model/Posts.js";
import LIBRARYMODEL from "../model/library.js";

const LoadContents = async (id) => {
  try {
    // const allBlogs = await BLOGMODEL.find();
    // const allArts = await ARTMODEL.find();
    const Arts = new Array();
    const BLogs = new Array();
    const Posts = await POSTMODEL.find();

    Posts.forEach((element) => {
      if (element.type === "0") BLogs.push(element);
      else if (element.type === "1") Arts.push(element);
    });

    // let filteredBlogs = posts.filter(
    //   (singlePost) => singlePost.creatorID === id
    // );
    // let filteredArts = allArts.filter(
    //   (singleArt) => singleArt.creatorID === id
    // );
    return { Blogs: BLogs, Arts: Arts };
  } catch (error) {
    if (error) {
      console.log(error);
    }
  }
};

const LoadLibrary = async (library) => {
  let blogs = new Array();
  let arts = new Array();
  let data = new Array();


  for (let i = 0; i < library.length; i++) {

    const books = await LIBRARYMODEL.findById(library[i]);
    console.log(books)
    let posts = await POSTMODEL.findById(books.postID);
    if (posts.type === "0") blogs.push(posts);
    else if (posts.type === "1") arts.push(posts);
  }
  return { BLOGS: blogs, ARTS: arts };
};

export const fetchProfile = async (req, res) => {
  const { id } = req.params;
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const data = await AUTHMODEL.findById(id);
      const contents = await LoadContents(id);
      const lib = await LoadLibrary(data.library);
      res.status(200).json({ ...contents, profileData: data, library: lib });
    } else {
      console.log("invalid id");
    }
  } catch (error) {
    // res.status(404).json({ message: error });
    console.log(error)
  }
};

export const editProfileDetails = async (req, res) => {
  const { id } = req.params;
  const info = req.body;
  console.log(info.id);
  try {
    if (mongoose.Types.ObjectId.isValid(id)) {
      if (id === req.userId) {
        const updatedData = await AUTHMODEL.findByIdAndUpdate(id, info, {
          new: true,
        });

        const token = jwt.sign(
          {
            email: updatedData?.email,
            id: updatedData?._id,
          },
          "twigs",
          { expiresIn: "24h" }
        );

        const data = {
          name: updatedData?.name,
          role: updatedData?.role,
          followers: updatedData?.followers,
          following: updatedData?.following,
          content: updatedData?.content,
          imageUrl: updatedData?.imageUrl,
          verified: updatedData?.verified,
          designation: updatedData?.designation,
          profileDesc: updatedData?.profileDesc,
        };

        res.status(201).json({ result: data, token });
      } else {
        res.status(401).json({ message: "User is unauthorized" });
      }
    } else {
      res.status(400).json({ message: "user id not valid" });
    }
  } catch (error) {
    console.log(error)
  }
};

export const editPasswordDetails = async (req, res) => {
  const { id } = req.params;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  try {
    if (id === req.userId) {
      const user = await AUTHMODEL.findById(id);
      const isOldPassword = await bcrypt.compare(oldPassword, user?.password);

      if (isOldPassword) {
        if (passwordCheck(newPassword)) {
          if (confirmPassword === newPassword) {
            const NewHash = await bcrypt.hash(newPassword, 12);
            const updatedpassword = await AUTHMODEL.findByIdAndUpdate(
              id,
              {
                password: NewHash,
              },
              { new: true }
            );
            console.log(NewHash);
            res.status(200).json({ message: "password Updated Successfully!" });
          } else {
            res
              .status(400)
              .json({ message: "Password confirmation does not match!" });
          }
        } else {
          res
            .status(400)
            .json({ message: "Password Criteria Does not matches!" });
        }
      } else {
        res.status(400).json({ message: "Old password does not match" });
      }
    } else {
      res.status(401).json({ message: "User ID does not matches" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    if (id === req.userId) {
      await AUTHMODEL.findByIdAndDelete(id);
      await POSTMODEL.deleteMany({ creatorID: id });

      res.json(200).json({ message: "Account Deleted Successfully!" });
    } else {
      res
        .status(401)
        .json({ message: "You Are Unauthorized to delete this profile!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const listFollowersAndFollowings = async (req, res) => {
  const { id } = req.params;

  try {
    const profile = await AUTHMODEL.findById(id);
    const userProfile = await AUTHMODEL.findById(req.userId);

    const index = profile.followers.findIndex(
      (id) => id === String(req.userId)
    );

    if (index === -1) {
      profile.followers.push(req.userId);
      userProfile.following.push(id);
    }
    const updatedPROFILEData = await AUTHMODEL.findByIdAndUpdate(id, profile, {
      new: true,
    });
    const updatedUSERData = await AUTHMODEL.findByIdAndUpdate(
      req.userId,
      userProfile,
      {
        new: true,
      }
    );

    res.status(200).json(updatedPROFILEData);
  } catch (error) {
    console.log(error);
  }
};
const saveIDtoBase = async (userID, libID) => {
  const profile = await AUTHMODEL.findById(userID);
  const index = profile.library.findIndex((id) => id === String(libID));
  if (index === -1) {
    profile.library.push(libID);
    const updatedData = await AUTHMODEL.findByIdAndUpdate(userID, profile, {
      new: true,
    });
    return updatedData;
  } else {
    return "Already Added To Library";
  }
};
export const addToLibrary = async (req, res) => {
  try {
    const { postID } = req.params;
    const creds = req.body;

    const NewLibraryPost = await LIBRARYMODEL.find({
      $and: [{ postID: postID }, { savedBy: req.userId }],
    });

    if (NewLibraryPost.length) {
      res.status(200).json({ message: "Post ALready Saved in Library!" });
    } else {
      const newlibPost = new LIBRARYMODEL({
        ...creds,
        postID: postID,
        savedBy: req.userId,
        savedAt: new Date().toISOString(),
      });
      await newlibPost.save();
      const data = await saveIDtoBase(req.userId, newlibPost._id);
      res.status(200).json({ data: data, message: "Post added to library!" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchLibrary = async (req, res) => {
  try {
    const { search } = req.query;

    const title = new RegExp(search, "i");
    const tags = new RegExp(search, "i");
    const author = new RegExp(search, "i");
    const searchedblogs = new Array();
    const searchedarts = new Array();

    const library = await LIBRARYMODEL.find({
      $or: [{ title }, { tags }, { author }],
    });
    for (let i = 0; i < library.length; i++) {
      const searchedLibrary = await POSTMODEL.findById(library[i].postID);
      if (searchedLibrary.type === "0") searchedblogs.push(searchedLibrary);
      else if (searchedLibrary.type === "1") searchedarts.push(searchedLibrary);
    }
    res.status(200).json({ BLOGS: searchedblogs, ARTS: searchedarts }).end();
  } catch (error) {
    console.log(error);
  }
};

export const clearLibrary = async (req, res) => {
  try {
    const { userID } = req.params;
    const profile = await AUTHMODEL.findById(userID);
    for (let i = 0; i <= profile.library.length; i++) {
      let iter = profile.library[i];
      await LIBRARYMODEL.findByIdAndDelete(iter);
      await AUTHMODEL.findByIdAndUpdate(
        { _id: userID },
        { $pullAll: { library: [iter] } }
      );
    }
    const lib = { BLOGS: [], ARTS: [] };
    res.status(200).json({
      library: lib,
      message: "Cleared All Library!",
    });
  } catch (error) {
    console.log(error);
  }
};



export const RemovePostFromLibrary = async (req, res) => {
  try {
    const { postID } = req.params;

    const post = await LIBRARYMODEL.find({
      $and: [{ postID: postID }, { savedBy: req.userId }],
    });

    const updatedProfile = await AUTHMODEL.findByIdAndUpdate(
      { _id: req.userId },
      { $pullAll: { library: [post[0]?._id] } },
      { new: true }
    );

    const lib = await LoadLibrary(updatedProfile?.library);

    await LIBRARYMODEL.findOneAndDelete({
      $and: [{ postID: postID }, { savedBy: req.userId }],
    });

    res.status(200).json({
      message: "Post successfully removed from library! ",
      library: lib,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
};
