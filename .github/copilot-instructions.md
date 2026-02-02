# Copilot / AI Agent Instructions for Milestone2_Nordic_forests ✅

## Project snapshot (big picture)
- Simple static site (no build system): 3 top-level pages: `index.html`, `treasures.html`, `forests.html`.
- Assets in `assets/`: CSS (`assets/css/style.css`), JS (`assets/js/script.js`), images (`assets/images/`).
- Uses Bootstrap from CDN and a Google font import in `style.css`.

## Quick local preview 🔧
- No npm/build steps. Two easy ways to preview:
  - Use the VS Code "Live Server" extension and open the project root.
  - From project root: `python -m http.server 8000` → visit `http://localhost:8000/index.html`.
- Note: in `index.html` the script is referenced as `/assets/js/script.js` (leading `/`) — ensure you're serving from the project root (server) or change to a relative path `assets/js/script.js` if using file:// or nested contexts.

## Key files and patterns (do not miss) 📁
- `index.html` — home page with dynamic "facts" feature and contact form; includes `/assets/js/script.js`.
- `assets/js/script.js` — small DOM script that adds/removes fact cards on the home page.
  - Pay attention: `getElementsByClassName` returns a live collection, not a node. Code currently attempts `removeChild(newFactBtn)` with a collection (bug). Example fix: `const btn = document.querySelector('.btn-green'); btn && btn.remove();` or use `newFactBtn[0]`.
- `treasures.html`, `forests.html` — static pages with repeated header/footer; if updating global header, edit each file (no templating).
- `style.css` — custom theme and component tweaks; site font loaded with `@import`.

## Discovered gotchas & actionable fixes ⚠️
- Script path inconsistency: `index.html` uses `/assets/js/script.js` (absolute path). This breaks when opened via file system. Prefer `assets/js/script.js` (relative) unless intentionally referencing site root.
- Missing `success.html`: multiple forms point to `success.html` but the file is absent. Add `success.html` or point forms to a valid route.
- `script.js` DOM manipulation bug: `btnsContainer.removeChild(newFactBtn);` passes an HTMLCollection — causing runtime errors. Replace with `btnsContainer.removeChild(newFactBtn[0]);` or use `querySelector` and `element.remove()`.
- Only `index.html` includes the JS file (so cards logic runs only on the home page). If behavior should be shared, include the script on other pages explicitly.

## Workflows & debugging tips 🐞
- Use browser DevTools console to identify JS errors (e.g., `Uncaught TypeError` from removeChild misuse).
- No linter/tests configured — run quick manual checks after edits and verify pages in multiple viewports (Bootstrap responsiveness).

## Contribution conventions & small suggestions (discoverable patterns only) 💡
- Content is static HTML with repeated sections (header/footer). Expect manual edits across pages for shared content.
- New images: place in `assets/images` and reference with `assets/images/<name>`.
- Keep CSS changes in `assets/css/style.css`. The project uses a single custom stylesheet.

## Examples to reference in PRs or edits ✍️
- Fix script path in `index.html`:
  - from: `<script src="/assets/js/script.js"></script>`
  - to:   `<script src="assets/js/script.js"></script>`
- Fix `removeChild` usage in `assets/js/script.js` — replace the collection-based removal with a single element removal (see section above).

---
If anything in this guide is unclear or you'd like more detail (for example: preferred behavior for forms, or whether to make templates to avoid repeated header/footer edits), tell me which parts to expand and I will iterate. ✨