import {
  PATH_METADATA,
  REQUEST_MAPPING,
  ROUTES_METADATA,
  PARAMS_METADATA,
  INJECTABLE_METADATA,
  INJECT_METADATA,
  HTTP_CODE_METADATA,
  DEFAULT_STATUS_CODE,
  IS_INJECTABLE,
} from "@mozart/constants";
import { IController } from "@mozart/core";
import { IParametersMetadata } from "@mozart/interfaces";

export interface IModulesMetadata {
  controllers?: any[];
  providers?: any[];
  imports?: any[];
}

export type IAppModule = Omit<IModulesMetadata, "imports">;

export interface IHttpCode {
  code: number;
  method: string;
}

export interface IScanner {
  modules: IAppModule;
  getControllersMetadata: (controllers: IController[]) => IController[];
  getParamsMetadata: (target: any) => IParametersMetadata[];
  getProviderMetadata: (provider: any) => any;
  getControllerInjectables: (controller: any) => any;
  getModulesData: (module: any) => IModulesMetadata;
  getHttpCode: (controller: any) => IHttpCode;
}

export class Scanner implements IScanner {
  public modules: IAppModule;

  constructor(module: any) {
    this.modules = this.constructAppModules(module);
  }

  getHttpCode(controller: any): IHttpCode {
    const statusCode =
      Reflect.getMetadata(HTTP_CODE_METADATA, controller) ??
      DEFAULT_STATUS_CODE;

    return statusCode;
  }

  constructAppModules(module: any) {
    const { controllers, imports, providers } = this.getModulesData(module);

    if (!controllers) return {};
    if (!providers) return {};

    let controllersModule = controllers;
    let providersModule = providers;

    if (imports && imports?.length > 0) {
      for (const module of imports) {
        const modulesData = this.constructAppModules(module);

        if (!modulesData) break;

        const { controllers, providers } = modulesData;

        if (!providers) break;

        providersModule.push(...providers);
        controllersModule.push(...controllers);
      }
    }

    return { controllers: controllersModule, providers: providersModule };
  }

  getControllersMetadata(controllers: IController[]): IController[] {
    return controllers.map((controller) => {
      const controllerPath = Reflect.getMetadata(PATH_METADATA, controller);
      const routes = Reflect.getMetadata(ROUTES_METADATA, controller);

      return {
        controller,
        path: controllerPath,
        routes,
      };
    });
  }

  getProviderMetadata(provider: any) {
    const providers = Reflect.getMetadata(INJECTABLE_METADATA, provider);

    return providers;
  }

  getControllerInjectables(controller: any) {
    const injectables = Reflect.getMetadata(INJECT_METADATA, controller) ?? [];

    return injectables;
  }

  getParamsMetadata(target: any): IParametersMetadata[] {
    const params = Reflect.getMetadata(PARAMS_METADATA, target);

    return params ?? [];
  }

  verifyInjectableState(provider: any) {
    const isInjectable = Reflect.getMetadata(IS_INJECTABLE, provider);

    if (!isInjectable) {
      throw new Error("Provider is not injectable");
    }

    return provider;
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
      providers: providers.map(this.verifyInjectableState),
    };
  }
}
