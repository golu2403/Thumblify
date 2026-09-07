import express from "express";
import { getThumbnailById, getUsersThumbnails, updateThumbnail } from "../controller/UserController.js";
import { deleteThumbnail } from "../controller/ThumbnailController.js";
import protect from "../middleware/auth.js";

const UserRouter = express.Router();


UserRouter.use(protect);


UserRouter.get("/thumbnails", getUsersThumbnails);

// Get a single thumbnail by ID
UserRouter.get("/thumbnail/:id", getThumbnailById);

// Update a thumbnail
UserRouter.put("/:id", updateThumbnail);

// Delete a thumbnail
UserRouter.delete("/:id", deleteThumbnail);

export default UserRouter;
