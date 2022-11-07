import { INJECTABLE_METADATA } from "../constants";

export function Injectable() {
  return (target: any) => {
    Reflect.defineMetadata(INJECTABLE_METADATA, target, target);
  };
}
