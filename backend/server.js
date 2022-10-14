import {} from "dotenv/config";
import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";

const { connect } = mongoose;

// Connect MongoDB.
const URI = process.env.MONGODB_URL;
connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection: " + err);
    }
  }
);

const app = express();
app.use(json());
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", 1);
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  `Server running on port ${port} 🔥`;
  console.log(`Server running on port ${port} 🔥`);
});

//route imports
import ForumPostRoute from "./routes/forumPost.js";
import eventRoute from "./routes/event.js";
import ReadableMaterialsRoute from "./routes/readableMaterials.js";
import forumCommentRoute from "./routes/forumComment.js";
import audioMaterialsRoute from "./routes/audioMaterials.js";
import imageUploadRoute from "./routes/imageUploadRoute.js";
import fileUploadRoute from "./routes/fileUploadRoute.js";
//import AudioMaterialsRoute from "./routes/audioMaterials.js";
import userRoute from "./routes/user.js";
import eventCommentRoute from "./routes/eventComment.js";

//Help route imports
import HelpPostRoute from "./routes/HelpPost.js";
import HelpCommentRoute from "./routes/HelpComment.js";

//routes
app.use(ForumPostRoute);
app.use(HelpPostRoute);
app.use(ReadableMaterialsRoute);
app.use(forumCommentRoute);
app.use(HelpCommentRoute);
app.use(audioMaterialsRoute);
app.use("/api", imageUploadRoute);
app.use("/api", fileUploadRoute);
//app.use(AudioMaterialsRoute);
app.use(userRoute);
app.use(eventRoute);
app.use(eventCommentRoute);
