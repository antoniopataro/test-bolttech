import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

import { envs } from "@/config/envs";
import { UserEntity, type UserAttributes } from "@/domain/user";
import { StatusCode } from "@/shared/enums";

export const jwtMiddleware = ((
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: "Missing authentication header.",
    });
  }

  const [scheme, token] = authHeader.split(" ");

  if (!token || !["Bearer", "JWT"].includes(scheme)) {
    return res.status(StatusCode.UNAUTHORIZED).json({
      message: "Malformatted authentication header.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, envs.JWT_SECRET) as UserAttributes;

    req.user = new UserEntity({
      createdAt: decodedToken.createdAt,
      email: decodedToken.email,
      id: decodedToken.id,
      updatedAt: decodedToken.updatedAt,
    });

    next();

    return;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(StatusCode.UNAUTHORIZED).json({
        message: "Token has expired.",
      });

      return;
    }

    res.status(StatusCode.UNAUTHORIZED).json({
      message: "Invalid authentication token.",
    });
  }
}) as RequestHandler;
