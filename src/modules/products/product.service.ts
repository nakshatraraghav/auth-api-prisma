import db from "../../utils/db.server";
import { createProductBodyType } from "./product.schema";

export async function createProduct(
  input: createProductBodyType,
  userId: string
) {
  try {
    const product = await db.product.create({
      data: { ...input, userId },
    });

    return product;
  } catch (error) {
    throw error;
  }
}

export async function findProduct(name: string, userId: string) {
  try {
    const product = await db.product.findFirst({
      where: {
        AND: [{ name }, { userId }],
      },
    });
    return product;
  } catch (error) {
    throw error;
  }
}

export async function findAllProducts(userId: string) {
  try {
    const products = await db.product.findMany({
      where: {
        userId,
      },
    });
    return products;
  } catch (error) {
    throw error;
  }
}

export async function deleteAllProducts(userId: string) {
  try {
    await db.product.deleteMany({
      where: {
        userId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export async function deleteProduct(pid: string) {
  try {
    await db.product.delete({
      where: {
        id: pid,
      },
    });
  } catch (error) {
    throw error;
  }
}
