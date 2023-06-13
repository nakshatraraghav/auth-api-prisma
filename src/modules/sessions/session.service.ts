import { user } from "@prisma/client";
import db from "../../utils/db.server";

import logger from "../../utils/logger";

export async function createSession(userId: string, userAgent: string) {
  try {
    const session = await db.session.create({
      data: {
        userId,
        userAgent,
      },
    });
    return session;
  } catch (error) {
    throw error;
  }
}

export async function findSession(sid: string) {
  try {
    const session = await db.session.findFirst({
      where: {
        id: sid,
      },
    });
    return session;
  } catch (error) {
    return false;
  }
}

export async function findAllSessions(uid: string) {
  try {
    const session = await db.session.findMany({
      where: {
        AND: [{ userId: uid }, { valid: true }],
      },
    });
    return session;
  } catch (error) {
    return false;
  }
}

export async function invalidateSession(sid: string) {
  try {
    const session = await db.session.update({
      data: {
        valid: false,
      },
      where: {
        id: sid,
      },
    });
    return session;
  } catch (error) {
    logger.error(error);
    return false;
  }
}

export async function invalidateAllSessions(uid: string) {
  try {
    await db.session.updateMany({
      where: {
        userId: uid,
      },
      data: {
        valid: false,
      },
    });
    return true;
  } catch (error) {
    logger.error(error);
    return false;
  }
}
