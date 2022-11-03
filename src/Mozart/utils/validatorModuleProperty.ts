const IMPORTS_CONSTANT = "imports";
const CONTROLLERS_CONSTANT = "controllers";
const PROVIDERS_CONSTANT = "providers";

const metadataKeys = [
  IMPORTS_CONSTANT,
  CONTROLLERS_CONSTANT,
  PROVIDERS_CONSTANT,
];

export function validateModuleKeys(keys: any[]) {
  const validateKey = (key: string) => {
    if (metadataKeys.includes(key)) {
      return;
    }

    throw new Error(
      "Module constructed not correctly, please verify your interface"
    );
  };

  keys.forEach(validateKey);
}
