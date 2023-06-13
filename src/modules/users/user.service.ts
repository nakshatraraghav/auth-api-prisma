import { user } from "@prisma/client";
import db from "../../utils/db.server";

import { createUserBodyType } from "./user.schema";
import logger from "../../utils/logger";

export async function findUser(username: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        username,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
}

export async function createUser(input: createUserBodyType) {
  try {
    const user = await db.user.create({
      data: {
        name: input.name,
        username: input.username,
        email: input.email,
        password: input.password,
      },
    });

    const { password, ...details } = user;
    return details;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}
