import type { Request, Response } from "express";

import type { App } from "@/app";
import {
  GetBookingPendenciesCommand,
  BookCommand,
} from "@/application/booking/use-cases";
import { ErrorService } from "@/infrastructure/common/error.service";
import { StatusCode } from "@/shared/enums";

import { BookingValidator } from "../validators/booking.validator";

export class BookingController {
  private readonly bookingValidator: BookingValidator;

  constructor(private readonly app: App) {
    this.bookingValidator = new BookingValidator();
  }

  public async book(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body, user } = req;

      const data = this.bookingValidator.validateBook(body);

      const bookCommand = new BookCommand(
        this.app.repositories.carRepository,
        this.app.repositories.userRepository,
      );

      const result = await bookCommand.execute({
        ...data,
        userId: user?.id,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async getBookingPendencies(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { params, user } = req;

      const data = this.bookingValidator.validateGetBookingPendencies(params);

      const getBookingPendenciesCommand = new GetBookingPendenciesCommand(
        this.app.repositories.documentRepository,
        this.app.repositories.searchRepository,
        this.app.repositories.userRepository,
      );

      const result = await getBookingPendenciesCommand.execute({
        ...data,
        userId: user?.id,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
