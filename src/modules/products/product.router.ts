import { Router } from "express";

import authenticate from "../../middlewares/authentication";
import checkUser from "../../middlewares/check-user";

import {
  createProductHandler,
  deleteAllProductsHandler,
  deleteProductHandler,
  findAllProductHandler,
  findProductHandler,
} from "./product.controller";
import validate from "../../middlewares/validate-request";

import { createProductSchema } from "./product.schema";
import { deleteAllProducts } from "./product.service";

const router = Router();

// Create Product
router.post(
  "/",
  [authenticate, checkUser, validate(createProductSchema)],
  createProductHandler
);

router.get("/", [authenticate, checkUser], findAllProductHandler);

router.get("/:name", [authenticate, checkUser], findProductHandler);

router.delete("/:id", [authenticate, checkUser], deleteProductHandler);

router.delete("/", [authenticate, checkUser], deleteAllProductsHandler);

export default router;
