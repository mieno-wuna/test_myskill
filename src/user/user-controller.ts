import { Request } from "express";
import { getAuth as getAuthAdmin } from "firebase-admin/auth";

import { StandardResponse } from "../utils/standard-response";

export async function showCurrentUser(req: Request): Promise<StandardResponse> {
  const { uid } = req.headers["user"] as any as { uid: string };

  const user = await getAuthAdmin().getUser(uid);

  return {
    data: {
      ...user,
    },
    statusCode: 200,
  };
}
