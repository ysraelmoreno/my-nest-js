export type RequestTypes = "get" | "post" | "patch" | "delete";

export interface RequestMethodMappingInterface {
  [key: number]: RequestTypes;
}

export interface IParametersMetadata {
  type: string;
  propertyName: string;
}
