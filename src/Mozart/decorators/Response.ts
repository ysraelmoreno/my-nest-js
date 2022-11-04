import { RESPONSE_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Response() {
  return (target: any, propertyName: string, _: any) => {
    ConstructParametersDecorator(RESPONSE_PARAM_METADATA, {
      target,
      propertyName,
    });
  };
}
