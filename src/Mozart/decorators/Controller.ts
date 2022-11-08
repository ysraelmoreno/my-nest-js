import { CONTROLLER_METADATA, PATH_METADATA } from "@mozart/constants";

export function Controller(path: string): ClassDecorator {
  return function (target: any) {
    Reflect.defineMetadata(CONTROLLER_METADATA, true, target);
    Reflect.defineMetadata(PATH_METADATA, path, target);

    if (!Reflect.hasMetadata("routes", target)) {
      Reflect.defineMetadata("routes", [], target);
    }
  };
}
