# macOS Portfolio - Repository Health & Architecture

This document serves as the central source of truth for the project's architecture, dependencies, and health.

## Current Architecture Overview
The project is a web-based portfolio designed to replicate the macOS desktop experience. It utilizes a window management system where individual applications (like Safari, Finder, Resume, Contact) run as standalone, draggable, and interactive React components within a global desktop wrapper.

## Tech Stack & Major Dependencies
* **Framework**: React (v19)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS (v4)
* **Animations**: GSAP (GreenSock) & `@gsap/react` for smooth, macOS-like transitions
* **State Management**: Zustand (with Immer for immutable state updates)
* **Icons**: Lucide React
* **Testing**: Vitest (Unit/Integration) & Playwright (E2E)
* **PDF Rendering**: `react-pdf` for the Resume app

## Branching Strategy & Git Workflow
* **`main`**: The primary branch and single source of truth. It is protected, healthy, and deployable.
* **Feature Branches**: Use descriptive prefixes (`feat/`, `fix/`, `chore/`, `refactor/`) followed by a hyphenated description (e.g., `feat/safari-improvements`).
* **Pull Requests**: All changes must go through a Pull Request targeting `main`. Avoid force-pushing to `main`.
* **Clean History**: Merge conflicts should be resolved carefully by preserving all non-conflicting improvements (e.g., retaining accessibility features added by other PRs).

## Code Style Conventions
* Write functional React components.
* Use strict semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<dialog>`).
* Avoid using `<div>` when a more semantic tag is applicable.
* Keep components small, modular, and focused on a single responsibility.

## Accessibility (a11y) Standards
* **Actionable Elements**: Every clickable element must be a native `<button>` or `<a>` with a proper `type` (e.g., `type="button"`).
* **ARIA Labels**: Use `aria-label` or `aria-labelledby` for icon-only buttons (like window controls).
* **Focus Management**: Ensure all interactive elements have visible and distinct focus indicators (`focus-visible`).
* **Keyboard Navigation**: Windows and menus must be fully operable via keyboard.

## Animation Conventions
* Use GSAP for complex physics-based or sequential animations.
* Tailwind CSS transitions are acceptable for simple hover/focus micro-interactions.
* Animations should feel native to macOS: smooth, subtle, and performant. Avoid jarring or slow transitions.

## State Management Approach
* **Global State**: Managed via Zustand to handle open windows, focused window z-indexing, and global desktop state (e.g., dark mode, dock magnification).
* **Local State**: Managed via standard React `useState` for component-isolated logic (e.g., form inputs in the Contact window).

## Folder Structure
```
/src
  /assets         # Static images, icons, global CSS
  /components     # Reusable UI components (buttons, window frames)
  /store          # Zustand store definitions
  /windows        # App-specific components (Safari.jsx, Finder.jsx)
  /utils          # Helper functions and GSAP animation configs
```

## How to Run Locally
1. Clone the repository and navigate to the root directory.
2. Ensure you have Node.js installed.
3. Run `npm install` to install dependencies.
4. Run `npm run dev` to start the Vite development server.
5. The application will be available at `http://localhost:5173`.

## Validation Process Before Opening a PR
1. Run `npm run lint` to catch ESLint errors.
2. Run `npm run test` to verify unit and component tests via Vitest.
3. Run `npm run build` to ensure the Vite production bundle successfully compiles without errors.
4. Manually test keyboard navigation and screen reader behavior in the browser.

## Common Maintenance Commands
* `npm run dev` - Start local dev server
* `npm run build` - Build for production
* `npm run lint` - Run ESLint
* `npm run test` - Run Vitest suite
* `npx playwright test` - Run end-to-end tests

## Repository Cleanup History
**July 2026 Maintenance Session Summary:**
* Rescued the repository from a corrupted local state and relocated it from a OneDrive synced directory to a stable local workspace.
* Resolved a massive backlog of Pull Requests, carefully resolving complex merge conflicts to preserve semantic HTML (`type="button"`) and accessibility features from overlapping branches.
* Performed a safe, read-only audit of remote branches using GitHub API validations to check for branch protection, unmerged unique commits, and open PR references.
* Purged 18 safe, unreferenced, fully-merged, and inactive remote branches, bringing the repository back to a clean and highly maintainable state.
