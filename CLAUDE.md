# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**whats_in_my_fridge** is a React Native cross-platform app (iOS, Android, Web) using Expo. The project uses **FSD (Feature-Sliced Design)** architecture to organize code into semantic layers, with strict import boundaries to keep modules decoupled.

## Tech Stack

- **Runtime**: Node.js 20+
- **Package Manager**: npm (with `package-lock.json`)
- **Framework**: Expo ~54.0.x with Expo Router (file-based routing)
- **UI**: React 19.x, React Native 0.81.x
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**:
  - **Client state** (UI, local): Zustand
  - **Server state** (data, cache): TanStack Query (@tanstack/react-query)
- **Type Safety**: TypeScript 5.9+ (strict mode)
- **Code Quality**:
  - **Formatter/Linter**: Biome 2.3.x (on `src/` only)
  - **Linter**: ESLint 9.x (Expo recommended config)
  - **Type Checker**: `tsc`

## Common Commands

### Development
```bash
npm run start          # Start Expo dev server (choose platform interactively)
npm run ios           # Start on iOS simulator
npm run android       # Start on Android emulator
npm run web           # Start on web (dev mode)
```

### Code Quality
```bash
npm run typecheck            # Run TypeScript type checking
npm run biome-check          # Check formatting/linting (src/ only)
npm run biome-fix            # Auto-fix linting issues (src/ only)
npm run biome-format         # Auto-format code (src/ only)
npm run lint                 # Run ESLint (Expo config)
```

### Expo/Build Validation
```bash
npx expo doctor              # Check dependency compatibility
npx expo export --platform ios      # Validate iOS build
npx expo export --platform android  # Validate Android build
```

## Architecture: FSD (Feature-Sliced Design)

The project uses strict layered architecture with import boundaries. Code is organized in `src/` as follows:

### Layers (top-level directories in `src/`)

1. **`src/app`** — Application root, routing, global providers
   - **Content**: Expo Router route files (`_layout.tsx`, `(tabs)/index.tsx`, etc.), theme providers, global setup
   - **Rules**: Composition only; logic belongs in lower layers
   - Only layer that imports from `expo-router` directly

2. **`src/pages`** — Page-level screens
   - **Content**: Screen/page components (e.g., `home/HomePage.tsx`, `detail/DetailPage.tsx`)
   - **Rules**: Assemble widgets/features into a screen; no domain logic

3. **`src/widgets`** — Large, reusable UI blocks
   - **Content**: Sections combining multiple features (e.g., `FridgeItemsList` = filter + list + header)
   - **Rules**: Compose features, entities, and shared components

4. **`src/features`** — User-value centered functionality
   - **Content**: Feature-specific UI, hooks, services (e.g., `add-item/`, `search-items/`)
   - **Structure**: `[feature-name]/{ui,model,api}/` plus `index.ts` barrel
   - **Rules**: Uses entities for data/models; each feature file typically has `ui`, `model`, and optional `api` subdirs

5. **`src/entities`** — Domain models and entity-specific UI
   - **Content**: Business concepts (Item, Fridge, Category), types, validators, entity cards/displays
   - **Structure**: `[entity-name]/{model,ui}/` plus `index.ts` barrel
   - **Rules**: No user-action-specific logic (that goes to features)

6. **`src/shared`** — Common utilities, components, config (no upper-layer imports)
   - **Subdirectories**:
     - `shared/ui` — Reusable components (buttons, text, theme wrappers)
     - `shared/lib` — Hooks, utilities, helpers
     - `shared/config` — Theme, constants
     - `shared/assets` — Images, icons, fonts

### Import Rules
- **Unidirectional**: Lower layers **never** import from higher layers
- **Example**: `shared/` can import nothing from above; `features/` can import `entities` and `shared`, but not `pages` or `app`
- Use barrel exports (`index.ts`) for clean imports from each module

## Path Aliases

Configure in `tsconfig.json`:
```
@/*        → src/*
@assets/*  → src/shared/assets/*
```

## Development Guidelines

### General Rules
- **File Headers**: When creating a new file, always include a comment at the very top describing its purpose and role.
- **Error Handling**: Implement robust error handling by wrapping potentially failable operations in try-catch blocks to prevent critical failures.

### FSD Layer Responsibilities
- **Don't mix concerns**: Keep type definitions in `entities`, feature logic in `features`, composition in `pages`
- **Index barrels**: Each module folder should have an `index.ts` that re-exports public API (e.g., `src/features/add-item/index.ts` exports hooks, UI)
- **Avoid circular imports**: Use the layer hierarchy to prevent cycles

### Code Style & Linting
- **Biome** controls formatting (2-space indent, 100 char line width) and linting for `src/` directory
- **ESLint (Expo)** provides React Native best practices
- Run `npm run biome-fix` to auto-format before committing
- Both tools run in CI on PR/push

### React Native / Expo Patterns
- Use `react-native` imports, not React web APIs (unless it's explicitly a `*.web.ts` file)
- Use `expo-router` for all routing (file-based, in `src/app/**`)
- Use NativeWind classes (`className="..."`) for styling
- Hooks like `useColorScheme`, `useThemeColor` in `shared/lib` for theme management
- Platform-specific files: `.ios.tsx`, `.android.tsx`, `.web.ts` are supported

### State Management
- **Zustand stores**: For local UI state (modals, filters, form inputs)
- **React Query**: For API data fetching, caching, mutations, and synchronization
- Keep queries/mutations in `features` or use React Query hooks from `src/hooks`

## CI/CD Pipeline

GitHub Actions runs on **push to main** and **pull requests**. Jobs run in parallel where possible:

1. **Biome** — Formatting/linting check (`src/` only)
2. **TypeScript** — Type checking via `tsc`
3. **ESLint (Expo)** — Linting rules (implicit in CI config)
4. **Expo Doctor** — Dependency compatibility
5. **Expo Export** — Validates build for iOS and Android (after all above pass)

All checks must pass before merge. No force-push or skip-hooks allowed.

## Key Files & Configuration

- **`app.json`** — Expo app config (name, icons, plugins, permissions)
- **`tsconfig.json`** — TypeScript config with path aliases
- **`biome.json`** — Biome formatter/linter rules
- **`tailwind.config.js`** — Tailwind utility classes for NativeWind
- **`metro.config.js`** — Metro bundler config (Expo/RN)

## Notes for Contributors

- **PR template**: `.github/pull_request_template.md`
- **Spec document**: `SPEC.md` contains project vision and tech decisions
- **Each layer has a `README.md`** with detailed rules and examples — consult them when unsure where code belongs
- **Typed routes**: Expo Router is configured for typed route hints (in `app.json` experiments)
- **React Compiler**: Enabled in `app.json` for potential future optimizations

