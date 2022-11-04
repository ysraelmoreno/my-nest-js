import { QUERY_PARAM_METADATA } from "../constants";
import { ConstructParametersDecorator } from "./ConstructParametersDecorator";

export function Query() {
  return (target: any, propertyName: string, _: any) =>
    ConstructParametersDecorator(QUERY_PARAM_METADATA, {
      target,
      propertyName,
    });
}
