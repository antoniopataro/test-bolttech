import type { Request, Response } from "express";

import type { App } from "@/app";

import { BookingRouter } from "./booking.router";
import { SearchRouter } from "./search.router";
import { UserRouter } from "./user.router";

export class Router {
  constructor(private readonly app: App) {
    new BookingRouter(this.app);
    new SearchRouter(this.app);
    new UserRouter(this.app);

    this.app.server.get("/health", (_: Request, res: Response) => {
      res.json({ condition: "healthy" });
    });
  }
}
