import {
  PROPERTY_KEY_METADATA,
  REQUEST_METHOD,
  ROUTES_METADATA,
} from "../constants";

export interface IRoute {
  requestMethod: number;
  path: string;
  method: any;
}

export function Get(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (!Reflect.hasMetadata(ROUTES_METADATA, target.constructor)) {
      Reflect.defineMetadata(ROUTES_METADATA, [], target.constructor);
    }

    Reflect.defineMetadata(
      PROPERTY_KEY_METADATA,
      propertyKey,
      target.constructor
    );

    const routes = Reflect.getMetadata(ROUTES_METADATA, target.constructor);

    const newRoutes = [
      ...routes,
      {
        requestMethod: REQUEST_METHOD.GET,
        path,
        method: descriptor.value,
      },
    ];

    Reflect.defineMetadata(ROUTES_METADATA, newRoutes, target.constructor);
  };
}
