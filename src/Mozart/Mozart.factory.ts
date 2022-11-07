import express, { Request, Response, Express, Router } from "express";
import {
  BODY_PARAM_METADATA,
  HEADER_PARAM_METADATA,
  INJECT_METADATA,
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
  private providersInstance: any[];

  constructor(module: any) {
    this.scanner = new Scanner(module);
    this.providersInstance = this.buildServicesInstance(
      this.scanner.moduleData.providers
    );
  }

  private buildServicesInstance(providers: any[]): any[] {
    const instances = providers.map((item) => new item());

    return instances;
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
      [BODY_PARAM_METADATA]: req.body,
      [HEADER_PARAM_METADATA]: req.headers,
      [RESPONSE_PARAM_METADATA]: res,
    };

    const parameters = params.map((item: any) => {
      return (paramsMapper as any)[item.type];
    });

    return parameters;
  }

  private getInstances(metadata: any[]) {
    let instances = [];

    for (let metadataItem of metadata) {
      if (typeof metadataItem === "string") {
        const findInstance = this.providersInstance.filter(
          (item) => item.constructor.name === metadataItem
        );

        instances.push(findInstance[0]);
        continue;
      }

      const findInstance = this.providersInstance.filter(
        (item) => item.constructor === metadataItem
      );
      instances.push(findInstance[0]);
    }

    return instances;
  }

  private createRoutes(controllers: IController[]) {
    const router = Router();

    for (let controllerItem of controllers) {
      const routerRoutes = Router();

      const { controller, routes, path } = controllerItem;

      const data = this.scanner.getControllerInjectables(controller);
      const instancesOfController = this.getInstances(data);

      const instance = new controller(...instancesOfController);

      for (let route of routes) {
        const params = this.scanner.getParamsMetadata(controller);

        (routerRoutes as any)[
          (REQUEST_METHOD_MAPPING as any)[route.requestMethod]
        ](`${route.path}`, (req: Request, res: Response) => {
          const parameters = this.buildParameters(params, req, res);

          const data = instance[route.method](...parameters);

          if (typeof data === "string") {
            return res.send(data);
          }

          res.json(data);
        });
      }

      router.use(path, routerRoutes);
    }

    return router;
  }
}
