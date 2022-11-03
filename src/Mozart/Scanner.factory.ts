import { PATH_METADATA, REQUEST_MAPPING, ROUTES_METADATA } from "./constants";
import { IController } from "./Mozart.factory";

export class Scanner {
  public moduleData: any;

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

  getModulesData(module: any) {
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
