import { Router } from "express";
const forumPostRoute = Router();
import forumPostController from "../controllers/forumPost.js";

forumPostRoute.get(
  "/api/forumPost/get/:id",
  forumPostController.getOneForumPost
);
forumPostRoute.get("/api/forumPost/getAll", forumPostController.getForumPosts);
forumPostRoute.post(
  "/api/forumPost/create",
  forumPostController.createForumPost
);
forumPostRoute.put(
  "/api/forumPost/update/:id",
  forumPostController.updateForumPost
);
forumPostRoute.delete(
  "/api/forumPost/delete/:id",
  forumPostController.deleteForumPost
);

export default forumPostRoute;
