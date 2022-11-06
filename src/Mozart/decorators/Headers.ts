import { HEADER_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Header() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(HEADER_PARAM_METADATA, {
      target,
      propertyName,
    });
}
