# OpenClaw Nous Portal Provider

Configurable Nous Research inference provider for OpenClaw 2026.9.1 and newer.

## Features

- OpenAI-compatible chat completions through `https://inference-api.nousresearch.com/v1`
- Refreshable discovery from the live `/v1/models` catalog
- Live context limits, output limits, pricing, reasoning, vision, and tool metadata
- A small offline fallback catalog when discovery is unavailable
- Custom inference base URLs without forwarding credentials to the Nous catalog host

## Install

```bash
openclaw plugins install clawhub:openclaw-nous-portal
```

## Configure

Run `openclaw onboard`, choose **Nous Portal**, and enter a Nous Portal API key through OpenClaw's protected secret prompt. `NOUS_API_KEY` is also recognized by OpenClaw's provider setup.

The default model is `nous-portal/inclusionai/ling-3.0-flash-sante:free`. Refresh and browse the current catalog with:

```bash
openclaw models refresh
openclaw models list --all --provider nous-portal
```

Select another discovered model in normal OpenClaw model configuration, using the `nous-portal/<model-id>` reference.

### Custom endpoint

Configure a custom OpenAI-compatible endpoint under the normal OpenClaw provider config:

```json
{
  "models": {
    "providers": {
      "nous-portal": {
        "baseUrl": "https://proxy.example/v1",
        "models": [
          {
            "id": "vendor/model-id",
            "name": "Vendor Model",
            "input": ["text"],
            "contextWindow": 131072,
            "maxTokens": 8192
          }
        ]
      }
    }
  }
}
```

Live Nous discovery is disabled for a custom base URL. This prevents a custom endpoint credential from being sent to Nous Research. Populate `models` explicitly for that endpoint; those configured models remain usable.

## Discovery and fallback behavior

The live catalog is advisory and cached for five minutes. Invalid, expired, non-text-output, and malformed entries are discarded. If the endpoint is unavailable or returns no usable models, OpenClaw retains the packaged fallback model. Discovery does not run for the static catalog path.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
npm pack --dry-run
```

## License

MIT
