import express, { Request, Response } from "express";
import cors from "cors"
// import dotenv from "dotenv";
import "./config/init.js";
import path from "path";
import db from "./models/index.js";
import router from "./routes/index.js";
import { logger, initResponseObj } from "./middleware/index.js";
import { log, __dirname } from "./utils/index.js";

// dotenv.config({
//   path: path.join(__dirname, "./.env")
// });

const { PORT } = process.env;
const app = express();

db.sequelize.sync().catch(console.log);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://k-log3943.netlify.app"],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(logger, initResponseObj);

app.use("/klog", router.klog);

// app.use((err, req, res, next) => {

// });

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to hk's Api Server;;</h1>");
});

app.listen(PORT, () => {
  log(`Server Listening On Port: ${PORT}`);
});