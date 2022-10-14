import { Router } from "express";
const HelpCommentRoute = Router();
import HelpCommentController from "../controllers/HelpComment.js";

HelpCommentRoute.put(
  "/api/HelpComment/update/:id",
  HelpCommentController.updateCommentPost
);

export default HelpCommentRoute;
