import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import pino from "pino";
import bcrypt from "bcryptjs";
import router from "./router";
import { main } from "./sandbox/script/template-publish";

const app = express();
export const logger = pino();
 
app.use(helmet());
app.use(cors({
  origin:"http://localhost:3000"
}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});