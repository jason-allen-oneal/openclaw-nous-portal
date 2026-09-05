import type { OpenAICompatibleModelDiscoveryOptions } from "openclaw/plugin-sdk/provider-catalog-live-runtime";
import type { ModelDefinitionConfig, ModelProviderConfig } from "openclaw/plugin-sdk/provider-model-shared";
export declare const NOUS_PORTAL_BASE_URL = "https://inference-api.nousresearch.com/v1";
export declare const NOUS_PORTAL_DEFAULT_MODEL_ID = "inclusionai/ling-3.0-flash-sante:free";
export declare const NOUS_PORTAL_DEFAULT_MODEL_REF = "nous-portal/inclusionai/ling-3.0-flash-sante:free";
export declare function buildNousPortalProvider(): ModelProviderConfig;
export declare function projectNousPortalModels(rows: readonly unknown[], fallback: ModelProviderConfig): ModelDefinitionConfig[];
export declare const NOUS_PORTAL_MODEL_DISCOVERY: OpenAICompatibleModelDiscoveryOptions;
//# sourceMappingURL=provider-catalog.d.ts.map