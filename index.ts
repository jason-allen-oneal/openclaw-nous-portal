// Nous Portal plugin entrypoint registers its OpenClaw integration.
import { defineSingleProviderPluginEntry } from "openclaw/plugin-sdk/provider-entry";
import { buildNousPortalProvider } from "./provider-catalog.js";

const PROVIDER_ID = "nous-portal";
const DEFAULT_MODEL_REF = "nous-portal/nvidia/nemotron-3-ultra:free";

export default defineSingleProviderPluginEntry({
  id: PROVIDER_ID,
  name: "Nous Portal Provider",
  description: "Nous Research inference API provider (inference-api.nousresearch.com)",
  provider: {
    label: "Nous Portal",
    docsPath: "/providers/nous-portal",
    auth: [
      {
        methodId: "api-key",
        label: "Nous Portal API key",
        hint: "API key from nousresearch.com",
        optionKey: "nousPortalApiKey",
        flagName: "--nous-portal-api-key",
        envVar: "NOUS_API_KEY",
        promptMessage: "Enter Nous Portal API key",
        defaultModel: DEFAULT_MODEL_REF,
        wizard: {
          groupLabel: "Nous Research",
          groupHint: "Inference API",
        },
      },
    ],
    catalog: {
      buildProvider: buildNousPortalProvider,
    },
  },
});