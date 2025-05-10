import { Router } from "express";

import type { App } from "@/app";
import { UserController } from "@/gateways/http/controllers/user.controller";

import { jwtMiddleware } from "../middlewares/jwt.middleware";

export class UserRouter {
  private readonly router: Router;
  private readonly userController: UserController;

  constructor(private readonly app: App) {
    this.userController = new UserController(this.app);

    this.router = Router();

    this.addRoutes();

    this.app.server.use("/users", this.router);
  }

  private addRoutes(): void {
    this.router.post("/documents", jwtMiddleware, (req, res) =>
      this.userController.saveDocument(req, res),
    );
    this.router.post("/login", (req, res) =>
      this.userController.login(req, res),
    );
    this.router.post("/register", (req, res) =>
      this.userController.register(req, res),
    );
  }
}
