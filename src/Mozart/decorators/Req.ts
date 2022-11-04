import { PARAMS_METADATA, REQUEST_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Req() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(REQUEST_PARAM_METADATA, {
      target,
      propertyName,
    });
}
