import {
  PATH_METADATA,
  REQUEST_PARAM_METADATA,
  REQUEST_MAPPING,
  ROUTES_METADATA,
  PARAMS_METADATA,
} from "./constants";
import { IController } from "./Mozart.factory";

export interface IModulesMetadata {
  controllers: any[];
  providers: any[];
  imports: any[];
}
export interface IScanner {
  moduleData: IModulesMetadata;
  getControllersMetadata: (controllers: IController[]) => IController[];
  getParamsMetadata: (target: any) => any;
  getModulesData: (module: any) => IModulesMetadata;
}

export class Scanner implements IScanner {
  public moduleData: IModulesMetadata;

  constructor(module: any) {
    this.moduleData = this.getModulesData(module);
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

  getParamsMetadata(target: any) {
    const params = Reflect.getMetadata(PARAMS_METADATA, target.controller);

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
