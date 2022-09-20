import express from "express";
import { protect } from "../middleware/auth.js";
import { sendMessage, allMessages } from "../controllers/message.js";

const router = express.Router();

router.route("/").post(protect, sendMessage);
router.route("/:chatId").get(protect, allMessages);

export default router;
