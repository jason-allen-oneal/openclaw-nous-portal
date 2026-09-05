import { describe, expect, it } from "vitest";
import {
  buildNousPortalProvider,
  NOUS_PORTAL_MODEL_DISCOVERY,
  projectNousPortalModels,
} from "./provider-catalog.js";

const row = {
  id: "vendor/model",
  name: "Vendor Model",
  context_length: 131072,
  architecture: {
    input_modalities: ["text", "image", "file"],
    output_modalities: ["text"],
  },
  pricing: {
    prompt: "0.0000005",
    completion: "0.000002",
    input_cache_read: "0.0000001",
  },
  top_provider: { context_length: 120000, max_completion_tokens: 16000 },
  supported_parameters: ["tools", "reasoning_effort"],
  reasoning: { default_enabled: false },
  expiration_date: null,
};

describe("Nous Portal model catalog", () => {
  it("ships a usable network-free fallback", () => {
    expect(buildNousPortalProvider()).toMatchObject({
      baseUrl: "https://inference-api.nousresearch.com/v1",
      api: "openai-completions",
      models: [{ id: "inclusionai/ling-3.0-flash-sante:free" }],
    });
  });

  it("projects live metadata into OpenClaw model definitions", () => {
    expect(projectNousPortalModels([row], buildNousPortalProvider())).toEqual([
      expect.objectContaining({
        id: "vendor/model",
        name: "Vendor Model",
        reasoning: true,
        input: ["text", "image"],
        contextWindow: 120000,
        maxTokens: 16000,
        cost: { input: 0.5, output: 2, cacheRead: 0.1, cacheWrite: 0 },
        compat: { supportsTools: true },
      }),
    ]);
  });

  it("rejects malformed, expired, and non-chat catalog rows", () => {
    const invalid = [
      { ...row, id: "bad id" },
      { ...row, id: "expired", expiration_date: "2026-01-01" },
      {
        ...row,
        id: "embedding",
        architecture: {
          input_modalities: ["text"],
          output_modalities: ["embedding"],
        },
      },
      {
        ...row,
        id: "missing-context",
        context_length: undefined,
        top_provider: {},
      },
    ];
    expect(projectNousPortalModels(invalid, buildNousPortalProvider())).toEqual(
      [],
    );
  });

  it("pins discovery to the canonical endpoint so proxy credentials are not leaked", () => {
    expect(NOUS_PORTAL_MODEL_DISCOVERY.endpointUrl).toEqual({
      url: "https://inference-api.nousresearch.com/v1/models",
      requireBaseUrl: "https://inference-api.nousresearch.com/v1",
    });
  });
});
