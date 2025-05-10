import { Router } from "express";

import type { App } from "@/app";
import { SearchController } from "@/gateways/http/controllers/search.controller";

import { BookingController } from "../controllers/booking.controller";
import { OfferController } from "../controllers/offer.controller";
import { jwtMiddleware } from "../middlewares/jwt.middleware";

export class SearchRouter {
  private readonly router: Router;

  private readonly bookingController: BookingController;
  private readonly offerController: OfferController;
  private readonly searchController: SearchController;

  constructor(private readonly app: App) {
    this.bookingController = new BookingController(this.app);
    this.offerController = new OfferController(this.app);
    this.searchController = new SearchController(this.app);

    this.router = Router();
    this.router.use(jwtMiddleware);

    this.addRoutes();

    this.app.server.use("/searches", this.router);
  }

  private addRoutes(): void {
    this.router.post("/", (req, res) =>
      this.searchController.createSearch(req, res),
    );
    this.router.get("/:searchId", (req, res) =>
      this.searchController.getSearch(req, res),
    );
    this.router.get("/:searchId/offers", (req, res) =>
      this.offerController.listCarOffers(req, res),
    );
    this.router.get("/:searchId/offers/:offerId", (req, res) =>
      this.offerController.getCarOffer(req, res),
    );
    this.router.get("/:searchId/offers/:offerId/pendencies", (req, res) =>
      this.bookingController.getBookingPendencies(req, res),
    );
  }
}
