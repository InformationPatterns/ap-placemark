# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Placemark Play — an open-source, serverless geospatial map editor that runs entirely in the browser. It's the free, stripped-down version of the original Placemark commercial product, minus Blitz, the database layer, and server components. All data persistence is in-memory.

## Commands

```sh
pnpm dev          # Start Vite dev server
pnpm build        # Production build
pnpm lint         # Biome check (scoped to app/**)
pnpm tsc          # TypeScript type checking (noEmit)
pnpm test         # Vitest single run
pnpm test:watch   # Vitest watch mode
pnpm knip         # Dead code detection
```

Run a single test file: `pnpm vitest run app/lib/convert/geojson.server.test.ts`

CI runs: `pnpm lint` → `pnpm tsc` → `pnpm test`

## Tooling

- **Package manager:** pnpm 10.13.1 (enforced)
- **Node:** >= 22.19.0 (mise.toml specifies 24.5.0)
- **Build:** Vite 7 with `@vitejs/plugin-react`
- **Linter/Formatter:** Biome 2 (replaces ESLint/Prettier). lint-staged runs `biome check --write` on commit
- **Tests:** Vitest 3 with jsdom environment, globals enabled

## Architecture

### Stack

React 18 + Vite 7 SPA. Routing via **wouter** (3 routes: `/` editor, `/converter`, `/secret-styleguide`). State via **Jotai** atoms with **jotai-optics** (lenses) and **jotai-xstate** (state machines via XState 4). Map rendering via **Mapbox GL JS 3** + **Deck.gl 9**.

### Key Directories

- `app/lib/` — Core business logic (~70 modules)
- `app/lib/convert/` — File format converters (GeoJSON, KML, CSV, Shapefile, GPX, etc.)
- `app/lib/handlers/` — Map interaction mode handlers (draw point/line/polygon, select, lasso)
- `app/lib/persistence/` — Persistence abstraction (`IPersistence` interface, `MemPersistence` in-memory impl)
- `app/lib/map_operations/` — Geometry operations (buffer, simplify, merge)
- `app/components/` — React UI components
- `app/hooks/` — Custom React hooks
- `state/jotai.ts` — Central Jotai atom definitions (dataAtom, modeAtom, selectionAtom, etc.)
- `types/index.ts` — Core data types and Zod schemas
- `vendor/` — Vendored libraries (mapshaper, arc, exif, geotiff)
- `test/` — Test setup, fixtures, and helpers

### Data Model

- **`IWrappedFeature`** — GeoJSON Feature wrapped with `id`, `at` (fractional index for ordering), `folderId`
- **`FeatureMap`** / **`FolderMap`** — Ordered `Map` objects (Map insertion order is the source of truth for display order)
- **`Sel`** — Selection state discriminated union (none, single, multi, folder)
- All core types validated with **Zod** schemas

### Patterns

- **U-objects:** Data structures are plain objects with associated utility namespaces (e.g., `USelection`, `UWrappedFeature`) instead of class instances
- **purify-ts:** `Either` types for operations that can fail (file import, conversions). Custom Vitest matchers: `toBeRight()`, `toBeLeft()`, `toEqualRight(val)`, `toBeJust()`, `toBeNothing()`
- **ts-pattern:** Exhaustive pattern matching for discriminated unions
- **Fractional indexing:** Ordered collections without reindexing, via `fractional-indexing` library
- **Mapbox ID system:** Features use integer IDs for Mapbox GL, mapped to/from UUIDs via `UIDMap`
- **Styling:** ~90% Tailwind CSS, `classed-components` for reusable styled div components
- **UI components:** Radix UI primarily, Headless UI for Combobox only
- **Virtualization:** Lists should always be virtualized — feature counts can be very large

### TypeScript Config

`baseUrl: "."` enables bare imports: `import { ... } from "app/lib/utils"`, `import { ... } from "state/jotai"`, `import { ... } from "types"`

### Test Setup

`test/setup.ts` polyfills jsdom gaps (TextEncoder, ResizeObserver, DOMRect, fetch). `test/helpers.ts` provides GeoJSON fixtures and `wrap()`/`wrapMap()` utilities for converting FeatureCollections to app data format.

### Naming Conventions

Avoid abbreviations. GeoJSON features = "feature", app-wrapped features = "wrappedFeature".
