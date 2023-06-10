import type { Request, Response, NextFunction } from "express";
import { createUserBodyType } from "../modules/users/user.schema";

import argon from "argon2";

export default async function hashPasswords(
  req: Request<{}, {}, createUserBodyType>,
  res: Response,
  next: NextFunction
) {
  const password = req.body.password;
  try {
    req.body.password = await argon.hash(password);

    return next();
  } catch (error) {
    return res.status(500).send("error while hashing user passwords");
  }
}
