# 0005: One error format for the whole API

Status: Accepted
Date: 2026-10-28

## Context
The web app needs to handle errors in one predictable way.

## Decision
Every error returns { code, message, details, requestId }.

## Why
- The frontend writes one error handler.
- The requestId links a user's problem to the exact server logs.
- Unknown errors never leak internal details.

## Alternatives rejected
- Default NestJS errors: shapes differ between error types.

## Consequences
- Every new error type must map to a code in the filter.
