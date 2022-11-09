import { PARAMS_METADATA } from "@mozart/constants";
import { IParametersMetadata } from "@mozart/interfaces";

export function ConstructParametersDecorator(
  parameter: string,
  { propertyName, target }: any
) {
  if (!Reflect.hasMetadata(PARAMS_METADATA, target.constructor)) {
    Reflect.defineMetadata(PARAMS_METADATA, [], target.constructor);
  }

  const currentParams = Reflect.getMetadata(
    PARAMS_METADATA,
    target.constructor
  );

  const params: IParametersMetadata[] = [
    ...currentParams,
    {
      type: parameter,
      propertyName,
    },
  ];

  Reflect.defineMetadata(PARAMS_METADATA, params, target.constructor);
}
