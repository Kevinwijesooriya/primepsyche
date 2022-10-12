import { Router } from "express";
const readableMaterialsRoute = Router();
import readableMaterialsController from "../controllers/readableMaterials.js";

// forumPostRoute.get(
//   "/api/forumPost/get/:id",
//   forumPostController.getOneForumPost
// );
readableMaterialsRoute.get(
  "/api/readableMaterials/getAll",
  readableMaterialsController.getReadableMaterials
);
readableMaterialsRoute.post(
  "/api/readableMaterials/create",
  readableMaterialsController.createReadableMaterials
);
// forumPostRoute.put(
//   "/api/forumPost/update/:id",
//   forumPostController.updateForumPost
// );
// forumPostRoute.delete(
//   "/api/forumPost/delete/:id",
//   forumPostController.deleteForumPost
// );

export default readableMaterialsRoute;
