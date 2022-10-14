import { Router } from "express";
const eventCommentRoute = Router();
import eventCommentController from "../controllers/eventComment.js";

eventCommentRoute.get(
    "/api/eventComment/get/:id",
    eventCommentController.getOneEventComment
);
eventCommentRoute.get(
    "/api/eventComment/getAll",
    eventCommentController.getEventComments
);
eventCommentRoute.post(
    "/api/eventComment/create",
    eventCommentController.createEventComment
);
eventCommentRoute.put(
    "/api/eventComment/update/:id",
    eventCommentController.updateEventComment
);
eventCommentRoute.put(
    "/api/eventComment/delete/:id",
    eventCommentController.deleteEventComment
);

export default eventCommentRoute;
