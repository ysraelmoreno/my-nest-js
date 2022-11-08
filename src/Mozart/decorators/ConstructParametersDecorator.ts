import { PARAMS_METADATA } from "@mozart/constants";

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

  const params = [
    ...currentParams,
    {
      type: parameter,
      propertyName,
    },
  ];

  Reflect.defineMetadata(PARAMS_METADATA, params, target.constructor);
}
