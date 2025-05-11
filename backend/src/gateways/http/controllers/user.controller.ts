import type { Request, Response } from "express";

import type { App } from "@/app";
import {
  ListDocumentsCommand,
  LoginUserCommand,
  RegisterUserCommand,
  SaveDocumentCommand,
} from "@/application/user/use-cases";
import { ErrorService } from "@/infrastructure/common/error.service";
import { StatusCode } from "@/shared/enums";

import { UserValidator } from "../validators/user.validator";

export class UserController {
  private readonly userValidator: UserValidator;

  constructor(private readonly app: App) {
    this.userValidator = new UserValidator();
  }

  public async listDocuments(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { user } = req;

      const listDocumentsCommand = new ListDocumentsCommand(
        this.app.repositories.documentRepository,
      );

      const result = await listDocumentsCommand.execute({
        userId: user?.id,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async login(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body } = req;

      const data = this.userValidator.validateLoginUser(body);
      const { email, password } = data;

      const loginUserCommand = new LoginUserCommand(
        this.app.repositories.userRepository,
      );

      const result = await loginUserCommand.execute({
        email,
        password,
      });

      res.status(StatusCode.OK).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async register(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body } = req;

      const data = this.userValidator.validateRegisterUser(body);
      const { email, password } = data;

      const registerUserCommand = new RegisterUserCommand(
        this.app.repositories.userRepository,
      );

      const result = await registerUserCommand.execute({
        email,
        password,
      });

      res.status(StatusCode.CREATED).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }

  public async saveDocument(req: Request, res: Response) {
    const errorService = new ErrorService(res);

    try {
      const { body, user } = req;

      const data = this.userValidator.validateSaveDocument(body);

      const saveDocumentCommand = new SaveDocumentCommand(
        this.app.repositories.documentRepository,
        this.app.repositories.userRepository,
      );

      const result = await saveDocumentCommand.execute({
        ...data,
        userId: user?.id,
      });

      res.status(StatusCode.CREATED).send(result);
    } catch (error) {
      errorService.handleError(error);
    }
  }
}
