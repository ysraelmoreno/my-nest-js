import {
  PATH_METADATA,
  REQUEST_MAPPING,
  ROUTES_METADATA,
  PARAMS_METADATA,
  INJECTABLE_METADATA,
  INJECT_METADATA,
  HTTP_CODE_METADATA,
} from "@mozart/constants";
import { IController } from "@mozart/core";
import { IParametersMetadata } from "@mozart/interfaces";

export interface IModulesMetadata {
  controllers: any[];
  providers: any[];
  imports: any[];
}

export interface IHttpCode {
  code: number;
  method: string;
}

export interface IScanner {
  moduleData: IModulesMetadata;
  getControllersMetadata: (controllers: IController[]) => IController[];
  getParamsMetadata: (target: any) => IParametersMetadata[];
  getProviderMetadata: (provider: any) => any;
  getControllerInjectables: (controller: any) => any;
  getModulesData: (module: any) => IModulesMetadata;
  getHttpCode: (controller: any) => IHttpCode;
}

export class Scanner implements IScanner {
  public moduleData: IModulesMetadata;

  constructor(module: any) {
    this.moduleData = this.getModulesData(module);
  }

  getHttpCode(controller: any): IHttpCode {
    const statusCode = Reflect.getMetadata(HTTP_CODE_METADATA, controller);

    return statusCode;
  }

  getControllersMetadata(controllers: IController[]): IController[] {
    let controllersFormatted: IController[] = [];
    for (let controller of controllers) {
      const controllerPath = Reflect.getMetadata(PATH_METADATA, controller);
      const routes = Reflect.getMetadata(ROUTES_METADATA, controller);

      controllersFormatted = [
        ...controllersFormatted,
        {
          controller,
          path: controllerPath,
          routes,
        },
      ];
    }

    return controllersFormatted;
  }

  getProviderMetadata(provider: any) {
    const providers = Reflect.getMetadata(INJECTABLE_METADATA, provider);

    return providers;
  }

  getControllerInjectables(controller: any) {
    const injectables = Reflect.getMetadata(INJECT_METADATA, controller);

    return injectables;
  }

  getParamsMetadata(target: any): IParametersMetadata[] {
    const params = Reflect.getMetadata(PARAMS_METADATA, target);

    return params ?? [];
  }

  getModulesData(module: any): IModulesMetadata {
    const [controllers, imports, providers] = [
      REQUEST_MAPPING.controllers,
      REQUEST_MAPPING.imports,
      REQUEST_MAPPING.providers,
    ].map((item) => {
      const metadataItem = Reflect.getMetadata(item, module);

      return metadataItem;
    });

    return {
      controllers,
      imports,
      providers,
    };
  }
}
