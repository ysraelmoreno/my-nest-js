import express, { Request, Response, Router } from "express";
import {
  PARAMS_METADATA,
  PARAMS_PARAM_METADATA,
  REQUEST_METHOD_MAPPING,
  REQUEST_PARAM_METADATA,
} from "./constants";
import { IRoute } from "./decorators/request";
import { IScanner, Scanner } from "./Scanner.factory";

export interface IController {
  controller: any;
  path: string;
  routes: IRoute[];
}

export class MozartFactory {
  private module: any;
  private scanner: IScanner;

  constructor(module: any) {
    this.module = module;
    this.scanner = new Scanner(module);
  }

  create() {
    const app = express();

    const {
      getControllersMetadata,
      moduleData: { controllers },
    } = this.scanner;

    const routes = this.createRoutes(getControllersMetadata(controllers));

    app.use(routes);

    return app;
  }

  createRoutes(controllers: IController[]) {
    const router = Router();

    for (let controller of controllers) {
      const routerRoutes = Router();

      for (let route of controller.routes) {
        const params = this.scanner.getParamsMetadata(controller);

        (routerRoutes as any)[
          (REQUEST_METHOD_MAPPING as any)[route.requestMethod]
        ](`${route.path}`, (req: Request, res: Response) => {
          const paramsMapper = {
            [REQUEST_PARAM_METADATA]: req,
            [PARAMS_PARAM_METADATA]: req.params,
          };

          const parameters = params.map((item: any) => {
            return (paramsMapper as any)[item.type];
          });

          const data = route.method(...parameters);

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
