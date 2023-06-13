import type { Request, Response } from "express";

import { createUser, deleteUser } from "./user.service";
import { payload } from "../../middlewares/check-user";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.json(user);
  } catch (error) {
    return res
      .status(409)
      .json({ error: "User with the same username or email already exists" });
  }
}

export async function deleteUserHandler(req: Request, res: Response) {
  const user = res.locals.user as payload;
  const status = await deleteUser(user.uid);

  if (!status) {
    return res.json("failed to delete the user, try again");
  }

  return res.json("user deleted");
}
