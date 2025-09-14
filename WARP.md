# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

RunMath is a keyboard-first calculator desktop application for Windows built with Tauri (Rust backend) and React + TypeScript (frontend). It provides real-time mathematical calculations with support for complex numbers, unit conversions, and advanced mathematical operations powered by mathjs.

Key features:
- Basic math operations with complex number support
- Unit conversion capabilities
- Global keyboard shortcuts (Alt+M to toggle, Alt+S for settings)
- Auto-start functionality
- Customizable background colors and number formatting
- History navigation with arrow keys

## Development Commands

### Frontend Development
- `pnpm dev` - Start Vite development server (port 3000)
- `pnpm build` - Build frontend for production (TypeScript compilation + Vite build)
- `pnpm preview` - Preview production build locally

### Tauri Application
- `pnpm tauri:dev` - Start Tauri development mode (builds frontend first, then launches Tauri)
- `pnpm tauri:build` - Build production desktop application with installers
- `tauri dev` - Direct Tauri development (requires separate frontend server)
- `tauri build` - Direct production build

### Requirements
- Node.js >= 22
- pnpm package manager
- Rust toolchain (for Tauri backend)

## Architecture

### Frontend Architecture (React/TypeScript)

**State Management**: Uses Zustand for state management with two main stores:
- `useCalculatorStore` (`src/state/calculator.ts`) - Manages input and result state
- `useSettingsStore` (`src/state/settings.ts`) - Manages app configuration

**Component Structure**:
- `App.tsx` - Main application component with hooks for shortcuts, background, and exit handling
- `components/` - UI components (ConsoleInput, ConsoleResult, InputPlaceholder)
- `hooks/` - Custom React hooks for business logic (calculator, history, shortcuts, etc.)

**Calculator Domain Layer** (`src/app/calculator/`):
- Domain-driven design with abstract `Calculator` class
- `MathJsCalculator` implementation using mathjs library
- Settings abstraction for big numbers and notation configuration

**Path Aliases** (configured in both `tsconfig.json` and `vite.config.ts`):
- `@components/*` → `./src/components/*`
- `@utils/*` → `./src/utils/*`
- `@state/*` → `./src/state/*`

### Backend Architecture (Rust/Tauri)

**Tauri Configuration**:
- Main window: 700x46px, always on top, non-resizable, transparent, no decorations
- Capabilities split between base app and settings page
- Global shortcuts and single-instance handling
- Auto-updater integration with GitHub releases
- System tray support

**Key Tauri Features Used**:
- CLI arguments (start-hidden flag)
- Global shortcuts plugin
- Single instance plugin
- Clipboard manager
- Auto-updater
- Dialog plugin

### Build System

**Multi-page Vite Setup**:
- Main calculator: `index.html` → `main.tsx`
- Settings page: `settings.html` → `main_settings.tsx`

**Tauri Integration**:
- Frontend build triggered automatically by Tauri commands
- Before dev: `pnpm dev`
- Before build: `pnpm build`

## Key Implementation Patterns

### Calculator Logic Flow
1. User input handled in `ConsoleInput.tsx`
2. State managed via `useCalculatorStore`
3. Calculation triggered through `useCalculator` hook
4. `MathJsCalculator` processes input using mathjs
5. Results formatted based on user settings (notation, big numbers)

### Global Shortcuts Integration
- Shortcuts configured in `utils/configureShortcuts.ts`
- Alt+M toggles window visibility
- Alt+S opens settings
- Alt+Q quits application

### History System
- Managed by `useHistory` hook with `PointerStack` data structure
- Up/Down arrow keys navigate through calculation history
- History persisted across sessions

### Settings Persistence
- Settings stored using Tauri's storage capabilities
- Synchronized between main app and settings window
- Includes background color, auto-start, number format preferences

## Development Notes

### When Adding New Features
- Follow the established domain-driven design pattern in the calculator module
- Use existing path aliases for imports
- Add new hooks for complex business logic rather than putting it in components
- Respect the single-responsibility principle in components

### Tauri-Specific Considerations
- Window configuration changes require updating `tauri.conf.json`
- New Tauri permissions need to be added to capability files
- Frontend must handle Tauri's async nature (most APIs return Promises)
- Use Tauri's invoke system for Rust backend communication if needed

### Build and Deployment
- Application uses automated releases via release-please
- Updates delivered through GitHub releases with signature verification
- Windows installers (MSI and NSIS) generated automatically
- Version synchronization between package.json and Cargo.toml handled by Tauri