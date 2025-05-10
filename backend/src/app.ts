import express, { type Express } from "express";

import { envs } from "./config/envs";
import { corsMiddleware } from "./gateways/http/middlewares/cors.middleware";
import { jsonMiddleware } from "./gateways/http/middlewares/json.middleware";
import { Router } from "./gateways/http/routers";
import {
  type Repositories,
  RepositoryFactory,
} from "./infrastructure/repositories/factory";
import { logger } from "./shared/utils/logger";

export class App {
  private readonly port: string;

  public readonly repositories: Repositories;
  public readonly server: Express;

  constructor() {
    this.port = envs.SERVER_PORT;

    this.repositories = RepositoryFactory.create();
    this.server = express();

    this.setupMiddlewares();
    this.setupRoutes();
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      logger.info(`server is running on port ${this.port}`);
    });
  }

  private setupMiddlewares(): void {
    this.server.use(corsMiddleware);
    this.server.use(jsonMiddleware);
  }

  private setupRoutes(): void {
    new Router(this);
  }

  public async start(): Promise<void> {
    this.listen();
  }
}
