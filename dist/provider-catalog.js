import { asOptionalRecord, asPositiveSafeInteger, filterStringEntries, normalizeOptionalString, } from "openclaw/plugin-sdk/string-coerce-runtime";
export const NOUS_PORTAL_BASE_URL = "https://inference-api.nousresearch.com/v1";
export const NOUS_PORTAL_DEFAULT_MODEL_ID = "inclusionai/ling-3.0-flash-sante:free";
export const NOUS_PORTAL_DEFAULT_MODEL_REF = `nous-portal/${NOUS_PORTAL_DEFAULT_MODEL_ID}`;
const FALLBACK_MODELS = [
    {
        id: NOUS_PORTAL_DEFAULT_MODEL_ID,
        name: "inclusionAI: Ling 3.0 Flash Sante (free)",
        reasoning: true,
        input: ["text"],
        contextWindow: 262_144,
        maxTokens: 32_768,
        cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 },
        compat: { supportsTools: true },
    },
];
export function buildNousPortalProvider() {
    return {
        baseUrl: NOUS_PORTAL_BASE_URL,
        api: "openai-completions",
        models: FALLBACK_MODELS.map((model) => ({ ...model })),
    };
}
function readPrice(value) {
    const raw = normalizeOptionalString(value)?.replace(/^\$/, "");
    const price = raw ? Number(raw) * 1_000_000 : Number.NaN;
    return Number.isFinite(price) && price >= 0
        ? Number(price.toFixed(9))
        : undefined;
}
export function projectNousPortalModels(rows, fallback) {
    const seeds = new Map(fallback.models.map((model) => [model.id, model]));
    const models = new Map();
    for (const row of rows) {
        const record = asOptionalRecord(row);
        const id = normalizeOptionalString(record?.id);
        const architecture = asOptionalRecord(record?.architecture);
        const topProvider = asOptionalRecord(record?.top_provider);
        const contextWindow = asPositiveSafeInteger(topProvider?.context_length) ??
            asPositiveSafeInteger(record?.context_length);
        const inputs = filterStringEntries(architecture?.input_modalities);
        const outputs = filterStringEntries(architecture?.output_modalities);
        if (!record ||
            !id ||
            id.length > 512 ||
            /[\s\p{Cc}]/u.test(id) ||
            !contextWindow ||
            !inputs.includes("text") ||
            !outputs.includes("text") ||
            normalizeOptionalString(record.expiration_date))
            continue;
        const seed = seeds.get(id);
        const pricing = asOptionalRecord(record.pricing);
        const parameters = filterStringEntries(record.supported_parameters);
        const reasoning = asOptionalRecord(record.reasoning);
        models.set(id, {
            ...seed,
            id,
            name: normalizeOptionalString(record.name) ?? id,
            reasoning: reasoning?.mandatory === true ||
                reasoning?.default_enabled === true ||
                parameters.includes("reasoning") ||
                parameters.includes("reasoning_effort"),
            input: inputs.includes("image") ? ["text", "image"] : ["text"],
            contextWindow,
            maxTokens: Math.min(asPositiveSafeInteger(topProvider?.max_completion_tokens) ??
                seed?.maxTokens ??
                8192, contextWindow),
            cost: {
                input: readPrice(pricing?.prompt) ?? seed?.cost.input ?? 0,
                output: readPrice(pricing?.completion) ?? seed?.cost.output ?? 0,
                cacheRead: readPrice(pricing?.input_cache_read) ?? seed?.cost.cacheRead ?? 0,
                cacheWrite: readPrice(pricing?.input_cache_write) ?? seed?.cost.cacheWrite ?? 0,
            },
            compat: { ...seed?.compat, supportsTools: parameters.includes("tools") },
        });
    }
    return [...models.values()].toSorted((a, b) => a.id.localeCompare(b.id));
}
export const NOUS_PORTAL_MODEL_DISCOVERY = {
    endpointUrl: {
        url: `${NOUS_PORTAL_BASE_URL}/models`,
        requireBaseUrl: NOUS_PORTAL_BASE_URL,
    },
    projectRows: projectNousPortalModels,
    ttlMs: 300_000,
};
//# sourceMappingURL=provider-catalog.js.map