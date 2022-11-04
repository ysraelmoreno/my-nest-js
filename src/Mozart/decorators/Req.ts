import { PARAMS_METADATA, REQUEST_PARAM_METADATA } from "../constants";

export function Req() {
  return function (target: any, propertyName: string, _: any) {
    if (!Reflect.hasMetadata(PARAMS_METADATA, target.constructor)) {
      Reflect.defineMetadata(PARAMS_METADATA, [], target.constructor);
    }

    const currentParams = Reflect.getMetadata(
      PARAMS_METADATA,
      target.constructor
    );

    const params = [
      ...currentParams,
      {
        type: REQUEST_PARAM_METADATA,
        propertyName,
      },
    ];

    Reflect.defineMetadata(PARAMS_METADATA, params, target.constructor);
  };
}
