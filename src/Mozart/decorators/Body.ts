import { BODY_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Body() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(BODY_PARAM_METADATA, {
      target,
      propertyName,
    });
}
