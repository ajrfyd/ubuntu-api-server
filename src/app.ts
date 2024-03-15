import express, { Request, Response } from "express";
import cors from "cors";
// import dotenv from "dotenv";
import "./config/init.js";
import path from "path";
import db from "./models/index.js";
import router from "./routes/index.js";
import { logger, initResponseObj, getAllTags } from "./middleware/index.js";
import { log, __dirname, errorHandler } from "./utils/index.js";

// dotenv.config({
//   path: path.join(__dirname, "./.env")
// });

const { PORT } = process.env;
const app = express();
const staticPath = path.join(__dirname, "/src/assets");

db.sequelize.sync().catch(console.log);
app.use(express.static(staticPath));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://k-log3943.netlify.app",
      "http://localhost:5500",
      "https://klog.hkound.pe.kr",
    ],
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true,
  })
);

app.use(logger, initResponseObj, getAllTags);

app.use("/klog", router.klog);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to hk's Api Server;;</h1>");
});

app.use(errorHandler);

app.get("/*", (req, res) => {
  res.status(404).sendFile(staticPath + "/html/404.html");
});

app.listen(PORT, () => {
  log(`Server Listening On Port: ${PORT}`);
});
