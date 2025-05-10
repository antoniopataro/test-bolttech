/* eslint-disable @typescript-eslint/no-explicit-any */

import { logger } from "./logger";

export abstract class Command {
  private readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  public abstract execute(params: any): Promise<any>;

  public logFailed(): void {
    logger.error(`${this.name} failed`);
  }

  public logFinished(): void {
    logger.info(`${this.name} finished`);
  }

  public logInitiated(): void {
    logger.info(`${this.name} initiated`);
  }
}
