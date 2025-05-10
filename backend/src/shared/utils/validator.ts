import { ZodError } from "zod";

import type { BaseError } from "./errors";
import { BadRequestError, InternalServerError } from "./errors";

export abstract class Validator {
  public handleError(error: unknown): BaseError {
    if (error instanceof ZodError) {
      return new BadRequestError(
        `validation failed: ${error.errors.map((e) => e.message).join(", ")}`,
      );
    }

    return new InternalServerError("unknown error");
  }
}
