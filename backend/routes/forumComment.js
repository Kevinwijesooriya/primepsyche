import { Router } from "express";
const forumCommentRoute = Router();
import forumCommentController from "../controllers/forumComment.js";

forumCommentRoute.get(
  "/api/forumComment/get/:id",
  forumCommentController.getOneForumComment
);
forumCommentRoute.get(
  "/api/forumComment/getAll",
  forumCommentController.getForumComments
);
forumCommentRoute.post(
  "/api/forumComment/create",
  forumCommentController.createForumComment
);
forumCommentRoute.put(
  "/api/forumComment/update/:id",
  forumCommentController.updateForumComment
);
forumCommentRoute.put(
  "/api/forumComment/delete/:id",
  forumCommentController.deleteForumComment
);

export default forumCommentRoute;
