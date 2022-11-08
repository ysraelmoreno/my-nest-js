export enum REQUEST_METHOD {
  "GET",
  "POST",
  "PATCH",
  "UPDATE",
  "DELETE",
}

export const REQUEST_MAPPING = {
  controllers: "controllers",
  imports: "imports",
  providers: "provider",
};

export const REQUEST_METHOD_MAPPING = {
  0: "get",
  1: "post",
  2: "patch",
  3: "update",
  4: "delete",
};

export const DEFAULT_STATUS_CODE = 200;
export const HTTP_CODE_METADATA = "__http_code__";

export const REQUEST_PARAM_METADATA = "__req_param__";
export const PARAMS_PARAM_METADATA = "__params_param__";
export const QUERY_PARAM_METADATA = "__query_param__";
export const RESPONSE_PARAM_METADATA = "__response_param__";
export const BODY_PARAM_METADATA = "__body_param__";
export const HEADER_PARAM_METADATA = "__header_param__";

export const PARAMS_METADATA = "__params__";
export const METHOD_METADATA = "__method__";
export const PATH_METADATA = "__path__";
export const CONTROLLER_METADATA = "__controller__";
export const INJECTABLES_METADATA = "__injectables_providers__";
export const INJECTABLE_METADATA = "__injectable__";
export const INJECT_METADATA = "__inject__";
export const PROPERTY_KEY_METADATA = "__property__";
export const ROUTES_METADATA = "__routes__";
