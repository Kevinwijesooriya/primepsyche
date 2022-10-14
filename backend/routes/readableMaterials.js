import { Router } from "express";
const readableMaterialsRoute = Router();
import readableMaterialsController from "../controllers/readableMaterials.js";

readableMaterialsRoute.get(
  "/api/readableMaterials/get/:id",
  readableMaterialsController.getOneReadableMaterial
);
readableMaterialsRoute.get(
  "/api/readableMaterials/getAll",
  readableMaterialsController.getReadableMaterials
);
readableMaterialsRoute.post(
  "/api/readableMaterials/create",
  readableMaterialsController.createReadableMaterials
);
readableMaterialsRoute.put(
  "/api/readableMaterials/update/:id",
  readableMaterialsController.updateReadableMaterial
);
readableMaterialsRoute.delete(
  "/api/readableMaterials/delete/:id",
  readableMaterialsController.deleteReadableMaterial
);
readableMaterialsRoute.put(
  "/api/readableMaterials/approveReadableMaterial/:id",
  readableMaterialsController.approveReadableMaterial
);
readableMaterialsRoute.post(
  "/api/readableMaterials/getApproveReadableMaterial",
  readableMaterialsController.getApproveReadableMaterial
);

export default readableMaterialsRoute;

