import type { Request, Response } from "express";

import type { App } from "@/app";
import {
  GetCarOfferCommand,
  ListCarOffersCommand,
} from "@/application/car/use-cases";
import { ErrorService } from "@/infrastructure/common/error.service";
import { StatusCode } from "@/shared/enums";

import { OfferValidator } from "../validators/offer.validator";

export class OfferController {
  private readonly offerValidator: OfferValidator;

  constructor(private readonly app: App) {
    this.offerValidator = new OfferValidator();
  }

  public async getCarOffer(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { params } = req;

      const data = this.offerValidator.validateGetCarOffer(params);

      const getCarOfferCommand = new GetCarOfferCommand(
        this.app.repositories.bookingRepository,
        this.app.repositories.carRepository,
        this.app.repositories.searchRepository,
      );

      const result = await getCarOfferCommand.execute(data);

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async listCarOffers(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { params, query } = req;

      const data = this.offerValidator.validateListCarOffers({
        ...params,
        ...query,
      });

      const listCarsCommand = new ListCarOffersCommand(
        this.app.repositories.bookingRepository,
        this.app.repositories.carRepository,
        this.app.repositories.searchRepository,
      );

      const result = await listCarsCommand.execute(data);

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
