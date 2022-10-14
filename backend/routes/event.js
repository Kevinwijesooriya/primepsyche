import { Router } from "express";
import eventController from "../controllers/event.js";
const eventRoute = Router();

eventRoute.get(
    "/api/event/get/:id",
    eventController.getOneEvent
);
eventRoute.get("/api/event/getAll", eventController.getEvent
);
eventRoute.post(
    "/api/event/create",
    eventController.createEvent
);
eventRoute.put(
    "/api/event/update/:id",
    eventController.updateEvent
);
eventRoute.delete(
    "/api/event/delete/:id",
    eventController.deleteEvent
);
eventRoute.get(
    "/api/event/getMy/:id",
    eventController.getMyEvents
);

export default eventRoute;
