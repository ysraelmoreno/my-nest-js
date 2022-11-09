import "reflect-metadata";
import express, { Request, Response, Express, Router } from "express";
import {
  BODY_PARAM_METADATA,
  DEFAULT_STATUS_CODE,
  HEADER_PARAM_METADATA,
  PARAMS_PARAM_METADATA,
  QUERY_PARAM_METADATA,
  REQUEST_METHOD_MAPPING,
  REQUEST_PARAM_METADATA,
  RESPONSE_PARAM_METADATA,
} from "@mozart/constants";
import { IRoute } from "@mozart/decorators";
import { IScanner, Scanner } from "@mozart/core";
import { RequestMethodMappingInterface } from "@mozart/interfaces";

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
    const { providers } = this.scanner.modules;
    this.providersInstance = this.buildServicesInstance(providers);
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
      modules: { controllers },
    } = this.scanner;

    const routes = this.createRoutes(getControllersMetadata(controllers));

    app.use(routes);

    return app;
  }

  private buildParameters(
    params: any,
    method: string,
    req: Request,
    res: Response
  ): Record<string, any>[] {
    const parametersFromMethod = params.filter(
      (param: any) => param.propertyName === method
    );

    const paramsMapper = {
      [REQUEST_PARAM_METADATA]: req,
      [PARAMS_PARAM_METADATA]: req.params,
      [QUERY_PARAM_METADATA]: req.query,
      [BODY_PARAM_METADATA]: req.body,
      [HEADER_PARAM_METADATA]: req.headers,
      [RESPONSE_PARAM_METADATA]: res,
    };

    const parameters = parametersFromMethod.map((item: any) => {
      return (paramsMapper as any)[item.type];
    });

    return parameters;
  }

  private getInstances(metadata: any[]) {
    let instances = [];

    for (let metadataItem of metadata) {
      if (typeof metadataItem === "string") {
        const [findInstance] = this.providersInstance.filter(
          (item) => item.constructor.name === metadataItem
        );

        instances.push(findInstance);
        continue;
      }

      const [findInstance] = this.providersInstance.filter(
        (item) => item.constructor === metadataItem
      );
      instances.push(findInstance);
    }

    return instances;
  }

  private createRoutes(controllers: IController[]): Router {
    const router = Router();

    for (let { controller, routes, path } of controllers) {
      const routerRoutes = Router();

      const services = this.scanner.getControllerInjectables(controller);
      const instancesOfController = this.getInstances(services);

      const instance = new controller(...instancesOfController);

      for (let { method, path: routePath, requestMethod } of routes) {
        const routerMethod = (
          REQUEST_METHOD_MAPPING as RequestMethodMappingInterface
        )[requestMethod];
        const params = this.scanner.getParamsMetadata(controller);

        routerRoutes[routerMethod](
          `${routePath}`,
          (req: Request, res: Response) => {
            const parameters = this.buildParameters(params, method, req, res);
            const { method: methodKey, code } =
              this.scanner.getHttpCode(controller);

            const data = instance[method](...parameters);

            if (typeof data === "string") {
              return res.send(data);
            }

            res
              .status(methodKey === method ? code : DEFAULT_STATUS_CODE)
              .json(data);
          }
        );
      }

      router.use(path, routerRoutes);
    }

    return router;
  }
}
