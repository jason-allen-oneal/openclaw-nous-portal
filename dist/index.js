import { defineSingleProviderPluginEntry } from "openclaw/plugin-sdk/provider-entry";
import { createModelCatalogPresetAppliers } from "openclaw/plugin-sdk/provider-onboard";
import manifest from "./openclaw.plugin.json" with { type: "json" };
import { buildNousPortalProvider, NOUS_PORTAL_BASE_URL, NOUS_PORTAL_DEFAULT_MODEL_REF, NOUS_PORTAL_MODEL_DISCOVERY, } from "./provider-catalog.js";
const PROVIDER_ID = "nous-portal";
const { applyConfig } = createModelCatalogPresetAppliers({
    primaryModelRef: NOUS_PORTAL_DEFAULT_MODEL_REF,
    resolveParams: () => ({
        providerId: PROVIDER_ID,
        api: "openai-completions",
        baseUrl: NOUS_PORTAL_BASE_URL,
        catalogModels: buildNousPortalProvider().models,
        aliases: [
            { modelRef: NOUS_PORTAL_DEFAULT_MODEL_REF, alias: "Nous Portal Free" },
        ],
    }),
});
export default defineSingleProviderPluginEntry({
    id: PROVIDER_ID,
    name: "Nous Portal Provider",
    description: "Nous Research OpenAI-compatible inference provider",
    manifest,
    provider: {
        label: "Nous Portal",
        docsPath: "https://portal.nousresearch.com/",
        manifestAuth: { defaultModel: NOUS_PORTAL_DEFAULT_MODEL_REF, applyConfig },
        catalog: {
            buildProvider: buildNousPortalProvider,
            buildStaticProvider: buildNousPortalProvider,
            allowExplicitBaseUrl: true,
            liveModelDiscovery: NOUS_PORTAL_MODEL_DISCOVERY,
        },
    },
});
//# sourceMappingURL=index.js.map