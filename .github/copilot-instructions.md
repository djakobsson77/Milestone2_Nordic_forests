# Copilot / AI Agent Instructions for Milestone2_Nordic_forests

This project is a small, static website (no build system). The goal of AI edits is to be conservative, keep relative asset paths intact, and update single-purpose files (HTML, CSS, JS) predictably.

Key facts
- Project type: static site (HTML/CSS/JS). Serve files from repository root or open `index.html` directly.
- Entry points: `index.html`, `treasures.html`, `forests.html`, `quiznfacts.html`.
- Main client code: `assets/js/script.js` (quiz and facts logic).

Where AI should look first
- `index.html` — site structure, navbar links, contact form, Bootstrap CDN inclusion.
- `assets/js/script.js` — all dynamic behavior: facts list, quiz questions, DOM IDs used for UI (`facts-container`, `buttons-container`, `question`, `optionsContainer`, `progressBar`, etc.).
- `assets/css/style.css` — styling conventions and helper classes (avoid breaking layout when changing markup).

Project-specific conventions and patterns
- Static-relative paths: images and assets use `assets/...` relative to HTML files. Do not change filenames or path structure unless renaming all references.
- Minimal JS module style: `script.js` exposes global functions/vars such as `initQuiz()`, `addFact()`, `clearAllFacts()` and uses `DOMContentLoaded` to initialize. Keep these global names unless you also update HTML script order.
- UI state is manipulated by CSS class names (e.g., `.hidden`, `.selected`, `.fact-card`). When changing state logic, align with existing classes in `style.css`.
- Data is inline arrays in `script.js` (e.g., `facts`, `questions`). If adding content, follow current object shape: `{ title, content }` for facts and `{ question, options, correctAnswer }` for quiz entries.

Developer workflows (how to run/test locally)
- Quick local server (recommended for testing relative imports and fetches):

```bash
# from project root
python -m http.server 8000
# then open http://localhost:8000/index.html
```

- Or install VS Code Live Server and open `index.html`.
- There are no unit tests or build steps in this repo.

Safe-edit rules for AI
- Make minimal, self-contained changes: edit one file per PR when possible.
- Preserve Bootstrap CDN `<link>` and `<script>` integrity attributes unless explicitly updating Bootstrap.
- When editing `script.js`:
  - Preserve top-level variable names used by HTML (IDs and function names). Update HTML if you rename functions, and keep both edits in the same change.
  - Keep initialization triggered on `DOMContentLoaded` so behavior starts after DOM is ready.
  - Update `questions` or `facts` arrays in place; maintain object shapes.
- When adding or removing images, update `assets/images/` and all HTML references together.

Examples from this repo
- To add a new fact, append to `facts` in `assets/js/script.js`:

```js
facts.push({ title: "New fact", content: "Short content string." });
```

- To change quiz text for question 1, edit `questions[0].question` in `assets/js/script.js` and keep `correctAnswer` as an index into `options`.

Notes & limitations
- No automated tests—validate changes manually via browser.
- Avoid refactoring into modules (ESM) unless you update all HTML references and ensure execution order (this is a small static site; simpler edits are preferred).

If something is unclear
- Ask the repo owner when: changing image filenames, changing global function names, introducing a build step, or adding external services.

Please run changes locally (via `python -m http.server`) and verify dynamic behaviors: facts cards, quiz flow, progress bar, and contact form navigation.
# Copilot / AI Agent Instructions for Milestone2_Nordic_forests ✅

## Project snapshot (big picture)
- Tiny static multi-page site (no build system). Main pages: `index.html`, `treasures.html`, `forests.html`.
- Static assets live under `assets/` (CSS, JS, vendor JS, images). Bootstrap is used from CDN; Google font is imported in `assets/css/style.css`.
- Design choice: portability and simplicity — no templates or server-side rendering. Header/footer are duplicated across pages (edit all HTML files when changing global content).

## Quick dev workflow & preview 🔧
- No npm. Two simple ways to preview locally:
  - Use VS Code Live Server (open repo root).
  - From repo root: `python -m http.server 8000` → visit `http://localhost:8000/index.html`.
- Debugging: open DevTools Console (look for 404s and JS errors), use mobile device toolbar for responsive checks.

## Key files & what matters 📁
- `index.html` — contains the dynamic "facts" UI (buttons and `#facts-container`) and the contact form (forms point to `success.html`).
- `assets/js/script.js` — small DOM script: defines `facts` array, exposes `addFact()` and `clearAllFacts()`, and contains a short jQuery snippet. No bundlers or transpilation.
- `assets/jquery-4.0.0.min.js` — vendor copy included in the repo (some pages include it, some don't).
- `assets/css/style.css` — custom styles and font imports.
- `assets/images/` — image assets used by cards and hero images.

## Project-specific gotchas & recommended fixes ⚠️
- Missing `success.html`: the forms POST/GET to `success.html` but the file is not present. Fix options:
  - Add a minimal `success.html` (static confirmation), or
  - Change form `action` to an external endpoint or remove the submission until a backend exists.

- Inconsistent jQuery usage (important): `script.js` has a jQuery line (`$("button").on("click", ...)`) but `treasures.html` does NOT include `assets/jquery-4.0.0.min.js` (whereas `index.html` and `forests.html` do). That causes a runtime error on pages without jQuery.
  - Quick fixes:
    - Add jQuery to `treasures.html` head: `<script src="assets/jquery-4.0.0.min.js"></script>` (keeps the repo consistent), OR
    - Remove/replace the jQuery snippet in `assets/js/script.js` with a short, defensive vanilla JS alternative (example below).

- Defensive JS patterns (apply everywhere in `script.js`):
  - Guard DOM queries because `script.js` is loaded on all pages but some pages lack the elements the script expects. Example safe patterns:

```js
// select a single element and remove it if present
const newFactBtn = document.querySelector('.btn-green');
if (newFactBtn) newFactBtn.remove();

// replace jQuery click behavior safely
if (typeof window.jQuery === 'function') {
  $("button").on("click", function() { $(".jq").hide(); });
} else {
  document.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.jq').forEach(el => el.style.display = 'none');
  }));
}
```

- Fragile element removals: using `getElementsByClassName` returns a live HTMLCollection. Prefer `querySelector` + `.remove()` for clarity and to avoid indexing errors.

## Debugging tips 🐞
- Always run the site via a local server (python or Live Server) to avoid file:// path issues.
- Check the Console for `ReferenceError: $ is not defined` (missing jQuery) and `Uncaught TypeError` for DOM operations on null.
- Use screenshots and console logs when describing JS fixes in PRs.

## PR checklist & contribution tips ✅
- Manual smoke tests: serve locally, test the "Add fact" button on `index.html`, test the contact form submission (or `action` change), and verify no Console errors on `treasures.html` and `forests.html`.
- When changing header/footer, update all HTML files — there's no template system.
- Add small, focused commits (one fix per PR) and include before/after screenshots or console output when fixing runtime errors.

## Concrete examples to copy into PRs ✍️
- Add missing jQuery to `treasures.html` (if you choose that route):
  - `<script src="assets/jquery-4.0.0.min.js"></script>` in the `<head>`

- Replace fragile removal in `assets/js/script.js`:
```js
// safer remove
const btn = document.querySelector('.btn-green');
if (btn) btn.remove();
```

- Provide a minimal `success.html` to satisfy the contact form, or change form action to `#` and add a client-side confirmation.

---
If you'd like, I can open a PR that (a) fixes the jQuery inconsistency, (b) hardens `assets/js/script.js` with defensive checks, and/or (c) adds a simple `success.html`. Which fix should I implement first? ✨