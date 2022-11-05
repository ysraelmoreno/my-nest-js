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

interface IConstructorEndpoint {
  requestMethod: number;
  path?: string;
  target: any;
  propertyKey: string;
  descriptor: PropertyDescriptor;
}

function constructHttpEndpoint({
  descriptor,
  path,
  propertyKey,
  requestMethod,
  target,
}: IConstructorEndpoint) {
  if (!Reflect.hasMetadata(ROUTES_METADATA, target.constructor)) {
    Reflect.defineMetadata(ROUTES_METADATA, [], target.constructor);
  }

  Reflect.defineMetadata(
    PROPERTY_KEY_METADATA,
    propertyKey,
    target.constructor
  );

  const routes = Reflect.getMetadata(ROUTES_METADATA, target.constructor);

  const pathMetadata = path && path.length > 0 ? path : "/";

  const newRoutes = [
    ...routes,
    {
      requestMethod,
      path: pathMetadata,
      method: descriptor.value,
    },
  ];

  Reflect.defineMetadata(ROUTES_METADATA, newRoutes, target.constructor);
}

export function Post(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    constructHttpEndpoint({
      descriptor,
      propertyKey,
      requestMethod: REQUEST_METHOD.POST,
      target,
      path,
    });
  };
}

export function Get(path?: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    constructHttpEndpoint({
      requestMethod: REQUEST_METHOD.GET,
      descriptor,
      path,
      propertyKey,
      target,
    });
  };
}
