import { REQUEST_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Req() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(REQUEST_PARAM_METADATA, {
      target,
      propertyName,
    });
}
