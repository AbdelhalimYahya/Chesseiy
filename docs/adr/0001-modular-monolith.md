# 0001: Modular monolith first

Status: Accepted
Date: 2026-10-28

## Context
The platform needs accounts, live games, matchmaking, ratings, puzzles, social features, tournaments and more. The plan lists many modules (auth, users, games, gateway, matchmaking, ratings...). We had to decide whether to build them as separate microservices or as one application.

## Decision
Build the backend as one NestJS application (a modular monolith). Each feature lives in its own NestJS module with clear boundaries. The REST API, the WebSocket game gateway and the background workers start in the same codebase and the same deployment.

## Why
- One developer: microservices add network calls, deployment pipelines and debugging work that bring no user value at this stage.
- Simpler deploys, simpler local setup (one `docker compose up`), simpler tests.
- A game move touches the gateway, game state and ratings. In one process this is a function call, not a network request that can fail.
- Clean module boundaries keep the option open to split later.

## Alternatives rejected
- Microservices from day one: too much infrastructure (service discovery, message brokers, per-service CI) for a team of one.
- A single unstructured app: faster at first, but becomes hard to split or maintain. Modules with strict boundaries avoid this.

## Consequences
- Easier: fast development, one deploy, easy refactoring, easy debugging.
- Harder: one crash or bad deploy affects everything, and scaling is all-or-nothing at first.
- Modules must not reach into each other's internals. They talk through exported services or events, so the gateway, workers or bot can be extracted when load or team size requires it.
- Likely first split: the game gateway (WebSocket), then the workers, then the bot service.
