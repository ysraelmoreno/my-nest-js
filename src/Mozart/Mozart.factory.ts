import express, { Request, Response, Express, Router } from "express";
import {
  BODY_PARAM_METADATA,
  PARAMS_PARAM_METADATA,
  QUERY_PARAM_METADATA,
  REQUEST_METHOD_MAPPING,
  REQUEST_PARAM_METADATA,
  RESPONSE_PARAM_METADATA,
} from "./constants";
import { IRoute } from "./decorators/request";
import { IScanner, Scanner } from "./Scanner.factory";

export interface IController {
  controller: any;
  path: string;
  routes: IRoute[];
}

export interface IMozartFactory {
  create: () => Express;
}

export class MozartFactory implements IMozartFactory {
  private scanner: IScanner;

  constructor(module: any) {
    this.scanner = new Scanner(module);
  }

  public create(): Express {
    const app = express();

    app.use(express.json());

    const {
      getControllersMetadata,
      moduleData: { controllers },
    } = this.scanner;

    const routes = this.createRoutes(getControllersMetadata(controllers));

    app.use(routes);

    return app;
  }

  private buildParameters(params: any, req: Request, res: Response) {
    const paramsMapper = {
      [REQUEST_PARAM_METADATA]: req,
      [PARAMS_PARAM_METADATA]: req.params,
      [QUERY_PARAM_METADATA]: req.query,
      [RESPONSE_PARAM_METADATA]: res,
      [BODY_PARAM_METADATA]: req.body,
    };

    const parameters = params.map((item: any) => {
      return (paramsMapper as any)[item.type];
    });

    return parameters;
  }

  private createRoutes(controllers: IController[]) {
    const router = Router();

    for (let controller of controllers) {
      const routerRoutes = Router();

      for (let route of controller.routes) {
        const params = this.scanner.getParamsMetadata(controller);

        (routerRoutes as any)[
          (REQUEST_METHOD_MAPPING as any)[route.requestMethod]
        ](`${route.path}`, (req: Request, res: Response) => {
          const parameters = this.buildParameters(params, req, res);

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
