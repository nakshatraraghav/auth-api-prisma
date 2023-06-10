import { Router } from "express";
// Controllers
import { createUserHandler, deleteUserHandler } from "./user.controller";
// Reqiest Schemas
import { createUserSchema } from "./user.schema";
// middlewares
import hashPasswords from "../../middlewares/hash-password";
import validate from "../../middlewares/validate-request";
import authenticate from "../../middlewares/authentication";

const router = Router();

router.post(
  "/",
  [validate(createUserSchema), hashPasswords],
  createUserHandler
);

router.delete("/", authenticate, deleteUserHandler);

export default router;
