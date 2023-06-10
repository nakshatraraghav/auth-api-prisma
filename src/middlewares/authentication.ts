import type { Request, Response, NextFunction } from "express";
import verifyToken from "../utils/verify-jwt";
import {
  findSession,
  invalidateSession,
} from "../modules/sessions/session.service";
import { createTokens } from "../utils/create-tokens";

export default async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const tokens = req.cookies.tokens;

  if (!tokens) {
    return res.json("authentication cookies are missing, please login first");
  }

  const accessToken = tokens.accessToken;
  const refreshToken = tokens.refreshToken;

  if (!accessToken) {
    return res.json("[Authentication Failed]: Access token is missing");
  }

  // we have a access token

  const { user, expired } = verifyToken(accessToken);

  if (user) {
    res.locals.user = user;
    return next();
  }

  // now access token can be invalid or expired we will issue new tokens only when it is expired

  const { user: payload } = verifyToken(refreshToken);

  if (payload && expired && payload instanceof Object) {
    // expired access token and valid refresh token now issue new tokens

    const uid = payload.uid;
    const sid = payload.sid;

    if (!uid || !sid) {
      return res.json("[Authentication Failed]: Internal Server Error");
    }

    const session = await findSession(sid as string);

    if (!session || !session.valid) {
      return res.json(
        "[Authentication Failed]: Already logged out of this session"
      );
    }

    const object = {
      uid,
      sid,
    };

    const newTokens = createTokens(object);

    res.cookie("tokens", newTokens, {
      httpOnly: true,
    });
    res.locals.user = payload;
    return next();
  }

  return res.json("[Authentication Failed]: Invalid Access Token");
}
