import { Router } from "express";
const HelpCommentRoute = Router();
import HelpCommentController from "../controllers/HelpComment.js";

HelpCommentRoute.post(
  "/api/HelpComment/create/",
  HelpCommentController.createComment
);

HelpCommentRoute.put(
  "/api/HelpComment/update/:id",
  HelpCommentController.updateComment
);
HelpCommentRoute.put(
  "/api/HelpComment/delete/:id",
  HelpCommentController.deleteHelpComment
);

export default HelpCommentRoute;
