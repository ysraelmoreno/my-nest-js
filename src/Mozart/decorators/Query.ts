import { QUERY_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Query() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(QUERY_PARAM_METADATA, {
      target,
      propertyName,
    });
}
