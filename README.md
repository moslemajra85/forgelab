# ForgeLab

ForgeLab is an AI-powered project execution workspace that helps developers turn vague software ideas into structured, research-backed, buildable products.

## Local Development

### Prerequisites

- Node.js 24 LTS
- pnpm
- Docker
- Docker Compose

### Setup

```bash
cp .env.example .env
pnpm install
pnpm infra:up
pnpm dev