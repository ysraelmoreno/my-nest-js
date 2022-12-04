import { INJECTABLE_METADATA, IS_INJECTABLE } from "@mozart/constants";

export function Injectable() {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_METADATA, target, target);
    Reflect.defineMetadata(IS_INJECTABLE, true, target);
  };
}
