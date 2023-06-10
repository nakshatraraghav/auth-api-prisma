import { Express } from "express";

import userRouter from "./modules/users/user.router";
import sessionRouter from "./modules/sessions/session.router";
import productRouter from "./modules/products/product.router";

export default function router(app: Express) {
  app.get("/healthcheck", (_, res) => {
    return res.json("OK");
  });

  app.use("/users", userRouter);
  app.use("/sessions", sessionRouter);
  app.use("/products", productRouter);
}
