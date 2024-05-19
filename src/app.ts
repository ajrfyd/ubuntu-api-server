import express, { Request, Response } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import "./db/config/init.js";
import path from "path";
import db from "./db/models/index.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import msgRouter from "./routes/msg.router.js";
import { app, server } from "./socket/socket.js";
import { cookieChecker } from "./middleware/auth.js";

import {
  logger,
  initResponseObj,
  responseStateMaker,
} from "./middleware/common.js";
import { getAllTags } from "./middleware/post.js";
// import { initResponseObj, getAllTags } from "./middleware/index.js";
import { log, __dirname, errorHandler } from "./utils/index.js";

// dotenv.config({
//   path: path.join(__dirname, "./.env")
// });

const { PORT, COOKIE_SECRET } = process.env;
// const app = express();
const staticPath = path.join(__dirname, "/src/assets");

db.sequelize.sync().catch(console.log);
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser(COOKIE_SECRET));
app.use(
  cors({
    origin: ["http://localhost:5173", "https://klog.hkound.pe.kr"],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger, responseStateMaker, getAllTags);

app.use("/blog", postRouter);
app.use("/user", userRouter);
app.use("/msg", cookieChecker, msgRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to hk's Api Server;;</h1>");
});

app.use(errorHandler);

app.get("/*", (req, res) => {
  res.status(404).sendFile(staticPath + "/html/404.html");
});

server.listen(PORT, () => {
  log(`Server Listening On Port: ${PORT}`);
});
