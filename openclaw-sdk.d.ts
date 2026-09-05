declare module "openclaw/plugin-sdk/provider-catalog-live-runtime" {
  import type {
    ModelDefinitionConfig,
    ModelProviderConfig,
  } from "openclaw/plugin-sdk/provider-model-shared";
  export type OpenAICompatibleModelDiscoveryOptions = {
    endpointUrl?: { url: string; requireBaseUrl: string };
    endpointPath?: string;
    projectRows?: (
      rows: readonly unknown[],
      fallback: ModelProviderConfig,
    ) => readonly ModelDefinitionConfig[];
    timeoutMs?: number;
    ttlMs?: number;
  };
}
declare module "openclaw/plugin-sdk/provider-model-shared" {
  export type ModelDefinitionConfig = {
    id: string;
    name: string;
    reasoning?: boolean;
    input: ("text" | "image")[];
    contextWindow: number;
    maxTokens: number;
    cost: {
      input: number;
      output: number;
      cacheRead: number;
      cacheWrite: number;
    };
    compat?: Record<string, unknown>;
  };
  export type ModelProviderConfig = {
    baseUrl: string;
    api: string;
    apiKey?: string;
    models: ModelDefinitionConfig[];
  };
}
declare module "openclaw/plugin-sdk/provider-entry" {
  export function defineSingleProviderPluginEntry(
    options: Record<string, unknown>,
  ): unknown;
}
declare module "openclaw/plugin-sdk/provider-onboard" {
  export function createModelCatalogPresetAppliers<T>(
    options: Record<string, unknown>,
  ): {
    applyConfig: (...args: unknown[]) => unknown;
    applyProviderConfig: (...args: unknown[]) => unknown;
  };
}
