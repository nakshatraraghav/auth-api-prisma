import type { Request, Response, NextFunction } from "express";

export type payload = {
  uid: string;
  sid: string;
};

export default function (req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user;

  if (!user.uid) {
    throw new Error("uid missing");
  }

  if (!user.sid) {
    throw new Error("sid missing");
  }

  return next();
}
