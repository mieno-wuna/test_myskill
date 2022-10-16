import { Router, Request, Response } from "express";

import { StandardError } from "./standard-error";
import { StandardResponse } from "./standard-response";

export const route = Router();

async function httpWrapperHandler(
  req: Request,
  res: Response,
  handler: Function,
  middlewares?: Function[]
) {
  try {
    if (middlewares !== undefined) {
      for (const middleware of middlewares) {
        const isSuccess = await middleware(req);

        if (!isSuccess) {
          throw new StandardError("Error when call middlewares");
        }
      }
    }

    const data = await handler(req) as StandardResponse;

    res.status(data.statusCode).json(data);
  } catch (error) {
    console.log(error);

    if (error instanceof StandardError) {
      return res.status(error.errorCode).json({
        status: "error",
        message: error.message,
      });
    }    

    res.status(422).json(error);
  }
}

export class HttpWrapper {
  private constructor() {}

  static all(path: string, handle: Function, middlewares?: Function[]) {
    route.all(path, async function (req: Request, res: Response) {
      httpWrapperHandler(req, res, handle, middlewares);
    });
  }

  static get(path: string, handle: Function, middlewares?: Function[]) {
    route.get(path, async function (req: Request, res: Response) {
      httpWrapperHandler(req, res, handle, middlewares);
    });
  }

  static post(path: string, handle: Function, middlewares?: Function[]) {
    route.post(path, async function (req: Request, res: Response) {
      httpWrapperHandler(req, res, handle, middlewares);
    });
  }

  static patch(path: string, handle: Function, middlewares?: Function[]) {
    route.patch(path, async function (req: Request, res: Response) {
      httpWrapperHandler(req, res, handle, middlewares);
    });
  }

  static delete(path: string, handle: Function, middlewares?: Function[]) {
    route.delete(path, async function (req: Request, res: Response) {
      httpWrapperHandler(req, res, handle, middlewares);
    });
  }
}
