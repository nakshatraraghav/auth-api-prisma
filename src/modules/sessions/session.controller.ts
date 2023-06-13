import type { Request, Response } from "express";
import type { payload } from "../../middlewares/check-user";

import { findUser } from "../users/user.service";
import { createSessionBodyType } from "./session.schema";
import {
  createSession,
  findAllSessions,
  findSession,
  invalidateAllSessions,
  invalidateSession,
} from "./session.service";
import verifyPasswords from "../../utils/compare-passwords";
import { createTokens } from "../../utils/create-tokens";
import logger from "../../utils/logger";

export async function createSessionHandler(
  req: Request<{}, {}, createSessionBodyType>,
  res: Response
) {
  try {
    const user = await findUser(req.body.username);
    if (!user) {
      return res.json(
        "Invalid credentials. Please check your username and password and try again"
      );
    }

    // Step 2: Verify the password
    const valid = await verifyPasswords(user.password, req.body.password);
    if (!valid) {
      return res.json(
        "Invalid credentials. Please check your username and password and try again"
      );
    }

    // Step 3: create the session
    const session = await createSession(user.id, req.get("user-agent") || "");
    if (!session) {
      return res.status(500).json({
        error: "error while creating the session",
      });
    }

    // Step 4: create and return the tokens
    const toSign = {
      uid: user.id,
      sid: session.id,
    };

    const tokens = createTokens(toSign);
    res.cookie("tokens", tokens, {
      httpOnly: true,
    });
    res.json("[Authentication Succeded]: Tokens stored in HTTPOnly Cookies");
  } catch (error) {
    logger.error(error);
    return res.send("failed to login, please try later");
  }
}

export async function getAllActiveSessionsHandler(req: Request, res: Response) {
  const user = res.locals.user as payload;

  const sessions = await findAllSessions(user.uid);

  if (!sessions) {
    return res.json("no active sessions");
  }
  return res.json(sessions);
}

export async function invalidateSessionHandler(req: Request, res: Response) {
  const user = res.locals.user as payload;
  const sid = user.sid;
  const session = await invalidateSession(sid as string);

  if (!session) {
    return res.json("[Authentication Error]: Failed to logout, try again");
  }

  return res
    .clearCookie("tokens")
    .json("Authentication Success]: Succesfully logged out");
}

export async function invalidateAllSessionsHandler(
  req: Request,
  res: Response
) {
  const user = res.locals.user as payload;
  const id = user.uid;

  const status = await invalidateAllSessions(id);

  if (!status) {
    return res.status(500).json({
      error:
        "[Authentication Error]: Failed to logout from all devices, try again",
    });
  }

  return res.clearCookie("tokens").json({
    message: "[Authentication Success]: Successfully logged out",
  });
}
