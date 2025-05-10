import { Router } from "express";

import type { App } from "@/app";
import { BookingController } from "@/gateways/http/controllers/booking.controller";

import { jwtMiddleware } from "../middlewares/jwt.middleware";

export class BookingRouter {
  private readonly router: Router;
  private readonly bookingController: BookingController;

  constructor(private readonly app: App) {
    this.bookingController = new BookingController(this.app);

    this.router = Router();
    this.router.use(jwtMiddleware);

    this.addRoutes();

    this.app.server.use("/bookings", this.router);
  }

  private addRoutes(): void {
    this.router.post("/book", (req, res) => {
      this.bookingController.book(req, res);
    });
  }
}
