import { RESPONSE_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Response() {
  return (target: any, propertyName: string, _: any) => {
    ConstructParametersDecorator(RESPONSE_PARAM_METADATA, {
      target,
      propertyName,
    });
  };
}
