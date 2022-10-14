import { Router } from "express";
const audioMaterialsRoute = Router();
import audioMaterialsController from "../controllers/audioMaterials.js";

audioMaterialsRoute.get(
  "/api/audioMaterials/get/:id",
  audioMaterialsController.getOneAudioMaterial
);
audioMaterialsRoute.get(
  "/api/audioMaterials/getAll",
  audioMaterialsController.getAudioMaterials
);
audioMaterialsRoute.post(
  "/api/audioMaterials/create",
  audioMaterialsController.createAudioMaterials
);
audioMaterialsRoute.put(
  "/api/audioMaterials/update/:id",
  audioMaterialsController.updateAudioMaterial
);
audioMaterialsRoute.delete(
  "/api/audioMaterials/delete/:id",
  audioMaterialsController.deleteAudioMaterial
);

export default audioMaterialsRoute;

