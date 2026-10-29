# 0004: Prisma as the ORM

Status: Accepted
Date: 2026-10-28

## Context
The API needs to talk to PostgreSQL safely, with migrations.

## Decision
Use Prisma (version 6).

## Why
- Typed queries catch mistakes at compile time.
- Simple migrations that live in the repo.
- Easy to read schema file.

## Alternatives rejected
- TypeORM: weaker types, more setup.
- Raw SQL only: more work and more risk of mistakes.

## Consequences
- Easier: safe queries, clear history of database changes.
- Harder: very complex queries may need raw SQL.
- Upgrading to a newer major Prisma version is a separate task.
