import { REQUEST_MAPPING } from "@mozart/constants";
import { validateModuleKeys } from "@mozart/utils/validatorModuleProperty";

interface IModuleDTO {
  providers: any[];
  imports: any[];
  controllers: any[];
}

export function Module(moduleDTO: IModuleDTO): ClassDecorator {
  const propKeys = Object.keys(moduleDTO);

  validateModuleKeys(propKeys);

  return function (target: any) {
    for (const property of propKeys) {
      Reflect.defineMetadata(
        (REQUEST_MAPPING as any)[property],
        (moduleDTO as any)[property],
        target
      );
    }
  };
}
