import { BODY_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Body() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(BODY_PARAM_METADATA, {
      target,
      propertyName,
    });
}
