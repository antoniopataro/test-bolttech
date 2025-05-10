import type { Request, Response } from "express";

import type { App } from "@/app";
import { CreateSearchCommand } from "@/application/search/use-cases";
import { GetSearchCommand } from "@/application/search/use-cases/get-search/get-search.command";
import { ErrorService } from "@/infrastructure/common/error.service";
import { StatusCode } from "@/shared/enums";

import { SearchValidator } from "../validators/search.validator";

export class SearchController {
  private readonly searchValidator: SearchValidator;

  constructor(private readonly app: App) {
    this.searchValidator = new SearchValidator();
  }

  public async createSearch(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body, user } = req;

      const data = this.searchValidator.validateCreateSearch(body);

      const createSearchCommand = new CreateSearchCommand(
        this.app.repositories.searchRepository,
      );

      const result = await createSearchCommand.execute({
        ...data,
        userId: user?.id,
      });

      res.status(StatusCode.CREATED).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async getSearch(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { params } = req;

      const data = this.searchValidator.validateGetSearch(params);

      const getSearchCommand = new GetSearchCommand(
        this.app.repositories.searchRepository,
      );

      const result = await getSearchCommand.execute(data);

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
