import { INJECT_METADATA } from "../constants";

export function Inject(value: any) {
  return function (target: any, _: string, paramIndex: number) {
    if (!Reflect.hasMetadata(INJECT_METADATA, target)) {
      Reflect.defineMetadata(INJECT_METADATA, [], target);
    }

    const metadata = Reflect.getMetadata(INJECT_METADATA, target);

    const newMetadata = [...metadata, value];

    Reflect.defineMetadata(INJECT_METADATA, newMetadata, target);
  };
}
