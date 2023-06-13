import express from "express";

import cookieParser from "cookie-parser";
import helmet from "helmet";

import router from "./router";
import connect from "./utils/connect";
import logger from "./utils/logger";

import { env } from "./utils/zenv";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());

router(app);
connect();

app.listen(env.PORT, () => {
  logger.info(`listening on localhost:${env.PORT}`);
});
