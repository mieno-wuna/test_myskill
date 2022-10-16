import { Request } from "express";

import { getAuth as getAuthAdmin } from "firebase-admin/auth";
import { StandardError } from "../utils/standard-error";
import { Middleware } from "./middleware";

export const mustLoginMiddleware: Middleware = async (req: Request) => {
  if (!req.headers["authorization"]) {
    throw new StandardError("Unauthorized", 401);
  }

  const token = (req.headers["authorization"] =
    req.headers["authorization"].split(" ")[1]);

  const user = await getAuthAdmin()
    .verifyIdToken(token)
    .catch(() => {
      throw new StandardError("Unauthorized", 401);
    });

  req.headers["user"] = user as any as string;

  return true;
};
