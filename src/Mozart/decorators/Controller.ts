import {
  CONTROLLER_METADATA,
  PATH_METADATA,
  ROUTES_METADATA,
} from "@mozart/constants";

export function Controller(path: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER_METADATA, true, target);
    Reflect.defineMetadata(PATH_METADATA, path, target);

    if (!Reflect.hasMetadata(ROUTES_METADATA, target)) {
      Reflect.defineMetadata(ROUTES_METADATA, [], target);
    }
  };
}
