# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **Frontend**: React + Vite + Tailwind CSS

## Project: NexaTech Solutions Landing Page

A modern, high-conversion landing page for a service-based IT company.

### Features
- Hero section with gradient text and CTA buttons
- Services section (Full Stack Dev, AI Chatbots, Payment Integration, AI Search)
- Stats section with company metrics
- Process/methodology section
- Testimonials section
- FAQ accordion
- Contact form (saves to PostgreSQL via API)
- Floating chatbot widget with FAQ-based responses

### Architecture
- **Frontend**: `artifacts/landing-page` — React + Vite + Tailwind CSS single-page app
- **Backend**: `artifacts/api-server` — Express 5 API with contact and chat endpoints
- **Database**: PostgreSQL with `contact_messages` table via Drizzle ORM
- **API Spec**: `lib/api-spec/openapi.yaml` — OpenAPI 3.1 contract

### API Endpoints
- `POST /api/contact` — Submit contact form (name, email, message)
- `GET /api/contact` — List all contact submissions
- `POST /api/chat` — Send a chatbot message, returns FAQ-based response
- `GET /api/healthz` — Health check

### Database Schema
- `contact_messages` table: id, name, email, message, created_at

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
