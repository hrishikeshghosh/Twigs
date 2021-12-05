import express from "express";
import {
  fetchProfile,
  editProfileDetails,
  editPasswordDetails,
  deleteProfile,
  listFollowersAndFollowings,
  addToLibrary,
  searchLibrary,
  clearLibrary,
  RemovePostFromLibrary,
} from "../controller/profile_loads.js";
import AUTHWARE from "../Middleware/authWare.js";
const router = express.Router();

router.get("/:id", fetchProfile);
router.get("/:id/librarySearch", searchLibrary);
router.patch("/:id/profileDetails", AUTHWARE, editProfileDetails);
router.patch("/:id/profilePassword", AUTHWARE, editPasswordDetails);
router.patch("/:id/listFandF", AUTHWARE, listFollowersAndFollowings);
router.patch("/addToLib/:postID/", AUTHWARE, addToLibrary);
router.delete("/:id", AUTHWARE, deleteProfile);
router.delete("/clearLibrary/:userID", AUTHWARE, clearLibrary);
router.patch("/removePostFromLibrary/:postID/", AUTHWARE, RemovePostFromLibrary);

export default router;
