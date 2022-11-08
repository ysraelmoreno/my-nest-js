import { PARAMS_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Param() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(PARAMS_PARAM_METADATA, {
      target,
      propertyName,
    });
}
