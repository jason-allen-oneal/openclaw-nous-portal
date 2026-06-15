# openclaw-nous-portal

Nous Research inference API provider for [OpenClaw](https://github.com/openclaw/openclaw).

## Overview

This provider connects OpenClaw to the **Nous Research Inference API** at `https://inference-api.nousresearch.com/v1` — an OpenAI-compatible endpoint hosting a wide range of models including:

- **Nous/NVIDIA models**: Nemotron 3 Ultra (free tier available)
- **Moonshot AI**: Kimi K2.7 Code
- **Anthropic**: Claude Opus 4.8, Claude Fable 5
- **Qwen**: Qwen 3.7 Max/Plus
- **MiniMax**: M3
- **StepFun**: Step 3.7 Flash
- **xAI**: Grok Build
- **Meta**: Llama 3.1 405B/70B/8B
- **Mistral**: Large, Mixtral 8x22B
- **OpenAI**: GPT-4o, GPT-4o Mini
- **Cohere**: Command R+

## Installation

```bash
pnpm add openclaw-nous-portal
```

Or with npm/yarn:
```bash
npm install openclaw-nous-portal
```

## Configuration

1. Get an API key from [Nous Research](https://nousresearch.com)
2. Configure in OpenClaw:

```bash
# Via CLI
openclaw onboard --nous-portal-api-key <your-key>

# Or set env var
export NOUS_API_KEY=<your-key>
```

## Models

The provider includes a static catalog of 20+ models. Key highlights:

| Model ID | Description |
|----------|-------------|
| `nvidia/nemotron-3-ultra:free` | Free tier Nemotron 3 Ultra (1M context) |
| `nvidia/nemotron-3-ultra` | Full Nemotron 3 Ultra |
| `moonshotai/kimi-k2.7-code` | Kimi K2.7 Code (262K context, multimodal) |
| `anthropic/claude-4.8-opus` | Claude Opus 4.8 (1M context) |
| `qwen/qwen3.7-max` | Qwen 3.7 Max (1M context) |
| `minimax/minimax-m3` | MiniMax M3 (1M context, video input) |

Use in OpenClaw as: `nous-portal/nvidia/nemotron-3-ultra:free`

## Usage

```bash
# List available models
openclaw models list --provider nous-portal

# Use a model
openclaw chat --model nous-portal/nvidia/nemotron-3-ultra:free
```

## Custom Base URL

Override the API endpoint via config:

```json
{
  "plugins": {
    "nous-portal": {
      "baseUrl": "https://custom-endpoint.example.com/v1"
    }
  }
}
```

## Development

```bash
# Install deps
pnpm install

# Type check
pnpm typecheck

# Build
pnpm build

# Test
pnpm test
```

## License

MIT