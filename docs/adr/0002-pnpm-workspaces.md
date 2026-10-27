# 0002: pnpm workspaces monorepo

Status: Accepted
Date: 2026-10-28

## Context
The project has a Next.js web app, a NestJS API and shared code (WebSocket event types, DTOs, chess helpers). Later it will also have a separate bot service. We had to decide how to organize the repositories and the package manager.

## Decision
Use one Git repository (monorepo) managed with pnpm workspaces:
- apps/web (Next.js)
- apps/api (NestJS)
- packages/shared-types (shared TypeScript types)
- services/bot (later)

## Why
- Web and API share the same TypeScript types. When a WebSocket event changes, both sides fail to compile until they agree. This catches bugs early.
- One CI pipeline, one set of lint and format rules, one pull request for a change that touches both sides.
- pnpm is fast, saves disk space with its shared store, and has built-in workspace support.
- Easy for a reviewer to see the whole project in one place, which matters for a CV project.

## Alternatives rejected
- Separate repositories for web and API: shared types would need publishing as a package or copying, and a single feature would need multiple PRs.
- npm or yarn workspaces: work too, but pnpm is faster and stricter about dependencies.
- Turborepo or Nx on top: useful for caching later, not needed now. It can be added without restructuring.

## Consequences
- Easier: shared types, atomic changes, one CI, consistent tooling.
- Harder: CI must be configured to build only what changed as the repo grows, and the repo gets larger over time.
- Every package needs its own package.json and a clear name (for example @chess/shared-types).
- If the repo grows slow in CI, add Turborepo for task caching.
