import { PARAMS_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Param() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(PARAMS_PARAM_METADATA, {
      target,
      propertyName,
    });
}
