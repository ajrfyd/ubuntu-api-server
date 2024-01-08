import express, { Request, Response } from "express";
import cors from "cors"
import dotenv from "dotenv";
import path from "path";
import { logger } from "./middleware/index.js";
import { log, __dirname } from "./utils/index.js";

dotenv.config({
  path: path.join(__dirname, "./.env")
});

const { PORT } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["http://localhost:5173", "https://k-log3943.netlify.app"],
  methods: ["GET", "POST"]
}));

app.use(logger);

app.get("/", (req: Request, res: Response) => {
  res.send("<h1>Welcome to hk's Api Server;</h1>");
});

app.listen(8800, () => {
  log(`Server Listening On Port: ${PORT}`);
});