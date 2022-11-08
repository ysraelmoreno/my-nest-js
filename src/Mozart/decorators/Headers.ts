import { HEADER_PARAM_METADATA } from "@mozart/constants";
import { ConstructParametersDecorator } from "@mozart/decorators";

export function Header() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(HEADER_PARAM_METADATA, {
      target,
      propertyName,
    });
}
