import { Request } from "express";

export type Middleware = (req: Request) => boolean | Promise<boolean>