# 0003: Board library: chessground

Status: Accepted
Date: 2026-10-28

## Context
The web app needs a chess board component with drag and click moves, highlights, animations, promotion, premoves, touch support and accessibility. We compared two options:
- chessground (used by Lichess), license GPL-3.0
- react-chessboard, license MIT

## Decision
Use chessground, wrapped in our own React board component. The rest of the app talks only to our wrapper (props: fen, orientation, onMove, lastMove, legalMoves, disabled, theme), so the library can be replaced later.

## Why
- The project will include Stockfish in the browser, which is GPL-3.0. Distributing it already requires the repo to be open source under a GPL-compatible license, so chessground adds no new restriction.
- The project is free and open source by design, so GPL is not a problem for our goals.
- chessground is built for chess and handles things we need: smooth animation, premoves, drag and click input, touch, coordinates and fast rendering on weak phones.
- It is proven at large scale in Lichess.

## Alternatives rejected
- react-chessboard (MIT): easier license and React-native API, but fewer features (premoves, animations and mobile polish need extra work), and its license advantage does not matter while Stockfish forces GPL anyway.
- Building our own board: large effort and not the point of this project.

## Consequences
- The repository must be published under GPL-3.0 (or a compatible license), with a LICENSE and a NOTICE file listing attributions.
- Closed-source or proprietary forks of this project are not possible.
- chessground is not a React component, so we must wrap it carefully (create it once in an effect, update through its API, destroy on unmount).
- Because the app only uses our wrapper, switching to another board later means rewriting one component.
