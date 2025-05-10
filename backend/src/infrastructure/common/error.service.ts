import type { Response } from "express";

import { StatusCode } from "../../shared/enums";
import { BaseError } from "../../shared/utils/errors";
import { logger } from "../../shared/utils/logger";

export class ErrorService {
  constructor(private readonly res: Response) {}

  public handleError(error: unknown): void {
    logger.error(error);

    if (error instanceof BaseError) {
      this.res.status(error.statusCode).send({
        error: error.message,
      });

      return;
    }

    this.res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
      error: "unexpected error",
    });
  }
}
