# Contributing to macOS Portfolio

Thank you for contributing! This repository aims to strictly maintain a high standard of code quality, accessibility, and design consistency. 

Please follow these guidelines to ensure a smooth review process.

## How to Structure Your Changes
* **Keep Changes Small**: Focus your Pull Request on a single feature, bug fix, or refactor. Avoid unrelated changes in the same PR.
* **Reuse Over Rewrite**: Before creating new hooks, utilities, or components, check if an existing one can be extended.
* **Modularity**: Do not bloat single files. Break complex windows or features down into smaller, composable React components.

## Commit Message Conventions
We follow conventional commits to keep the git history readable:
* `feat:` A new feature or window app.
* `fix:` A bug fix.
* `chore:` Routine tasks, dependency updates, or maintenance.
* `refactor:` Code changes that neither fix a bug nor add a feature (e.g., performance improvements).
* `docs:` Documentation updates.
* `style:` Formatting changes that do not affect the code meaning (e.g., Tailwind class sorting).

**Example:**
`feat(dock): add magnification effect on hover`

## Pull Request Requirements
When opening a PR, ensure you:
1. Provide a clear and descriptive title.
2. Describe *why* the change is being made, not just *what* changed.
3. Link any related issues.
4. Include screenshots or videos if the PR changes the UI or animations.

## Build Requirements
All PRs must pass the CI checks before they can be merged. Ensure you test locally:
1. **Linting**: No warnings or errors (`npm run lint`).
2. **Build**: The app must compile for production successfully (`npm run build`).
3. **Tests**: All tests must pass (`npm run test`).

## Review Checklist
Before submitting, review your own code against this checklist:
- [ ] Are all new buttons using `type="button"`?
- [ ] Are there visible focus states (`focus-visible`) for all interactive elements?
- [ ] Does the design match the macOS aesthetic?
- [ ] Have you tested the change across different window sizes?
- [ ] Have you checked the browser console for runtime warnings or errors?
- [ ] Did you avoid introducing `any` or disabling linting rules?

## Accessibility (a11y) Expectations
Accessibility is a core feature of this project, not an afterthought. 
* Never use `<div>` or `<span>` with an `onClick` handler unless absolutely necessary (and if so, provide `tabIndex`, `role`, and keyboard event handlers). Always prefer `<button>`.
* Provide descriptive `aria-label` attributes for icon buttons.
* Maintain logical document structure (e.g., proper heading hierarchy `<h1>` -> `<h2>`).

## Performance Expectations
* Avoid unnecessary re-renders. Use Zustand efficiently by selecting only the specific state properties your component needs.
* Animate composite properties (`transform`, `opacity`) rather than layout properties (`width`, `height`, `margin`) to prevent layout thrashing.
* Use React `useMemo` and `useCallback` appropriately when passing props to heavily rendered children.

## Coding Conventions
* Use functional components and React Hooks.
* Use Tailwind CSS for styling. Avoid writing custom CSS in separate files unless necessary for global resets or specific GSAP utilities.
* Group Tailwind classes logically (e.g., Layout > Spacing > Typography > Colors > Effects).
* Adhere to existing spacing, typography, and macOS design language tokens.
