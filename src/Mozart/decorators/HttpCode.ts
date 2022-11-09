import { DEFAULT_STATUS_CODE, HTTP_CODE_METADATA } from "@mozart/constants";

export function HttpCode(code = DEFAULT_STATUS_CODE) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      HTTP_CODE_METADATA,
      {
        code,
        method: propertyKey,
      },
      target.constructor
    );
  };
}
