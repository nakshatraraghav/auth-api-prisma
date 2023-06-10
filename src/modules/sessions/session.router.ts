import { Router } from "express";

import {
  createSessionHandler,
  getAllActiveSessionsHandler,
  invalidateAllSessionsHandler,
  invalidateSessionHandler,
} from "./session.controller";

import validate from "../../middlewares/validate-request";
import authenticate from "../../middlewares/authentication";
import checkUser from "../../middlewares/check-user";
import { createSessionSchema } from "./session.schema";

const router = Router();

router.post("/", validate(createSessionSchema), createSessionHandler);

router.get("/active", [authenticate, checkUser], getAllActiveSessionsHandler);

router.delete("/", [authenticate, checkUser], invalidateSessionHandler);

router.delete("/all", [authenticate, checkUser], invalidateAllSessionsHandler);

export default router;
