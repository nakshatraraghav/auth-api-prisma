import express from "express";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import helmet from "helmet";

import router from "./router";
import connect from "./utils/connect";
import logger from "./utils/logger";

dotenv.config();
const port = process.env.PORT as string;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

router(app);
connect();

app.listen(port, () => {
  logger.info(`listening on localhost:${port}`);
});
