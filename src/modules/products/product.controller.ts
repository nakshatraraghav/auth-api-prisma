import type { Request, Response } from "express";
import { createProductBodyType } from "./product.schema";
import {
  createProduct,
  deleteAllProducts,
  deleteProduct,
  findAllProducts,
  findProduct,
} from "./product.service";
import type { payload } from "../../middlewares/check-user";

import logger from "../../utils/logger";

export async function createProductHandler(
  req: Request<{}, {}, createProductBodyType>,
  res: Response
) {
  try {
    const user = res.locals.user as payload;
    const product = await createProduct(req.body, user.uid);

    return res.json(product);
  } catch (error) {
    logger.error(error);
    return res.json("Product Creation Failed");
  }
}

export async function findProductHandler(req: Request, res: Response) {
  try {
    const name = req.params.name as string;
    const user = res.locals.user as payload;

    const product = await findProduct(name, user.uid);

    if (!product) {
      return res.json(
        "given product not found, you can access only those products that you have created"
      );
    }

    return res.json(product);
  } catch (error) {
    logger.error(error);
    return res.json("failed while fetching product from database");
  }
}
export async function findAllProductHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user as payload;

    const products = await findAllProducts(user.uid);

    if (!products) {
      return res.json("you currently have no products");
    }

    return res.json(products);
  } catch (error) {
    logger.error(error);
    return res.json("failed while fetching product from database");
  }
}

export async function deleteProductHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user as payload;
    const pid = req.params.id as string;

    await deleteProduct(pid);
    return res.json("deleted product");
  } catch (error) {
    logger.error(error);
    return res.json("failed to delete all products");
  }
}

export async function deleteAllProductsHandler(req: Request, res: Response) {
  try {
    const user = res.locals.user as payload;
    await deleteAllProducts(user.uid);
    return res.json("deleted all products");
  } catch (error) {
    logger.error(error);
    return res.json("failed to delete all products");
  }
}
