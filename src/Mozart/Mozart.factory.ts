import express, { Router } from "express";
import { IRoute } from "./decorators/request";
import { Scanner } from "./Scanner.factory";

export interface IController {
  controller: any;
  path: string;
  routes: IRoute[];
}

export class MozartFactory {
  static create(module: any) {
    const app = express();

    const { moduleData, getControllersMetadata } = new Scanner(module);

    const routes = MozartFactory.createRoutes(
      getControllersMetadata(moduleData.controllers)
    );

    app.use(routes);

    return app;
  }

  static createRoutes(controllers: IController[]) {
    const router = Router();

    for (let controller of controllers) {
      const routerRoutes = Router();

      for (let route of controller.routes) {
        routerRoutes.get(`/${route.path}`, (req, res) => {
          const data = route.method(req, res);

          if (typeof data === "string") {
            return res.send(data);
          }

          res.json(data);
        });
      }

      router.use(controller.path, routerRoutes);
    }

    return router;
  }
}
