import express from "express";
import { fetchFeed, implementSearch } from "../controller/feed_loads.js";
import AuthWare from "../Middleware/authWare.js";

const router = express.Router();

router.get("/",AuthWare, fetchFeed);
router.get("/search", implementSearch);
export default router;
