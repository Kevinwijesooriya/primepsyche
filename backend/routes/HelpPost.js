import { Router } from "express";
const HelpPostRoute = Router();
import HelpPostController from "../controllers/HelpPost";

HelpPostRoute.get("/api/HelpPost/get/:id", HelpPostController.getOneHelpPost);
HelpPostRoute.get("/api/HelpPost/getAll", HelpPostController.getHelpPosts);
HelpPostRoute.post("/api/HelpPost/create", HelpPostController.createHelpPost);
HelpPostRoute.put(
  "/api/HelpPost/update/:id",
  HelpPostController.updateHelpPost
);
HelpPostRoute.delete(
  "/api/HelpPost/delete/:id",
  HelpPostController.deleteHelpPost
);

export default HelpPostRoute;
