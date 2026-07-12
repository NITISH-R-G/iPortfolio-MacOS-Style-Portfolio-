# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.1.0] - 2026-07-12
### Added
- Unified window state modeling (`isOpen`, `isMinimized`, `isMaximized`, `isFocused`, `zIndex`, `bounds`, `previousBounds`, `data`, `scrollTop`).
- Global Focus Management: Intercepts clicks to sweep focus dynamically to active windows.
- Minimized and Maximized GSAP animations and UI states.
- Arrow key navigation, macOS-style highlighting, and scroll persistence within the Finder.
- Responsive max-bounds added to all absolute windows to prevent horizontal scrolling on mobile/tablet.

### Changed
- Refactored Finder layout from absolute positioning to a flexible CSS Grid.
- Updated Dock interaction to seamlessly restore minimized windows and focus active ones.

## [v1.0.0-stable] - 2026-07-12
### Added
- Stable portfolio release with accurate resume synchronization.
- Initial GSAP draggable windows.

### Removed
- Placeholder generic content and duplicate folders.
- Cleaned up duplicate/stale PR branches.
