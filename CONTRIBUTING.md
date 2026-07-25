# Contributing to Incredible India Explorer 🇮🇳

Thank you for your interest in contributing to **Incredible India Explorer**! We welcome contributions from developers of all experience levels. Whether you're fixing bugs, improving the UI, creating educational games, or adding new explorer modules, your contributions help make this project better for everyone.

---

# Table of Contents

* Code of Conduct
* Getting Started
* Development Workflow
* Project Structure
* Creating a New Feature
* Coding Standards
* Pull Request Guidelines
* Commit Message Convention
* Reporting Issues

1. Fork the repository.
2. Clone your fork:

   ```bash
   git clone https://github.com/your-username/incredible-india-explorer.git
   ```

3. Open `index.html` in your browser — no build tools required.

# Code of Conduct

Please be respectful and collaborative. By participating in this project, you agree to follow our Code of Conduct and help maintain a welcoming environment for everyone.

1. Create a branch from `main`:

   ```bash
   git checkout -b fix/your-fix-name main
   ```

2. Make your changes following the [Coding Standards](#coding-standards).
3. Test locally by opening the relevant HTML files in your browser.
4. Check for console errors and responsive layout issues.
5. Commit and push, then open a Pull Request.

# Getting Started

1. Fork this repository.
2. Clone your fork.

```bash
git clone https://github.com/your-username/Incredible-India-Explorer.git
```

3. Navigate into the project.

```bash
cd Incredible-India-Explorer
```

4. Create a new branch.

```bash
git checkout -b feat/your-feature-name
```

5. Open the project using your preferred editor.

Since this project uses **HTML, CSS, and JavaScript**, no build tools or package installation are required.

---

# Development Workflow

1. Pick an issue assigned to you.
2. Create a new branch from `main`.
3. Develop your feature.
4. Test thoroughly.
5. Commit your changes.
6. Push your branch.
7. Open a Pull Request.

---

# 📁 Project Structure

The project follows a **feature-based architecture**.

Every feature is self-contained inside its own folder under the **frontend** directory.

```
Incredible-India-Explorer/
│
├── frontend/
│   ├── feature-name/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── another-feature/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   └── ...
│
├── assets/
├── .github/
├── README.md
└── CONTRIBUTING.md
```

---

# 🚨 Creating a New Feature

Every new feature **must** follow the project structure.

## Step 1

Create a folder inside `frontend`.

Example

```
frontend/state-capital-game/
```

---

## Step 2

Inside that folder create:

```
index.html
style.css
script.js
```

Final structure:

```
frontend/
└── state-capital-game/
    ├── index.html
    ├── style.css
    └── script.js
```

---

## ❌ Do NOT

Do **not** create files like

```
frontend/game.html
frontend/style.css
frontend/script.js
```

or

```text
incredible-india-explorer/
  index.html              -- Landing page with map, cuisine, festivals, quiz
  app.js                  -- Core application logic (navigation, map, theme, quiz)
  styles.css              -- Global stylesheet (~18k lines)
  pages-common.js         -- Shared logic for newer pages (tribes, coins, rivers)
  pages-common.css        -- Shared styles for newer pages
  router.js               -- SPA routing engine with lifecycle management
  data.js                 -- Map coordinates and state data
  journey.js              -- Bookmark ("My Journey") system
  search-index.js         -- Client-side search index
  auth.js / auth-core.mjs -- Authentication (Firebase + localStorage fallback)
  sw.js                   -- Service Worker with caching strategies
  js-modules/             -- Page-specific lazy-loaded JS modules
  assets/                 -- Images and icons
  states/                 -- Individual state detail pages
  docs/                   -- Additional documentation and test files
  .github/                -- Issue templates, PR template, workflows
```

Loose HTML, CSS, or JavaScript files inside the `frontend` directory are **not allowed**.

### HTML

- Use semantic HTML5 elements (`<header>`, `<main>`, `<section>`, `<nav>`, `<footer>`).
- Include `aria-label`, `role`, and `alt` attributes for accessibility.
- Use lowercase for tag and attribute names.

### CSS

- Use CSS custom properties from `:root` in `styles.css` for consistency.
- Follow the existing naming convention: `.kebab-case-classnames`.
- Support both dark (default) and light theme via `.light-theme` on `<body>`.
- Write responsive styles using the existing breakpoints (1024px, 768px, 640px).

### JavaScript

- Use vanilla JavaScript — no frameworks or libraries.
- Prefer `function` declarations over arrow functions for page-level logic.
- Use `const` and `let` (never `var` except when needed for wider scope).
- Expose shared APIs on `window` (e.g., `window.Journey`, `window.ToastNotifier`).
- Wrap modules in IIFE `(function() { ... })()` to avoid polluting global scope.
- Lazy-load page-specific modules via `window.lazyLoadScript()`.
- Handle errors gracefully with `try/catch` and user-facing toast notifications.

### Accessibility

- All interactive elements must be keyboard-accessible.
- Use `aria-live` regions for dynamic content updates.
- Maintain focus trapping for modals and overlays using `window.setupFocusTrap()`.

```
river-origin-challenge
state-jigsaw
metro-master
temple-architect
```

❌ Bad

```
RiverGame
River Game
MyFeature
test123
```

---

# Coding Standards

## HTML

* Use semantic HTML5 elements.
* Maintain proper indentation.
* Include meaningful page titles.
* Add `alt` text for images.
* Use ARIA attributes where appropriate.

---

## CSS

* Keep styles inside the feature's own `style.css`.
* Write responsive layouts.
* Use reusable CSS classes.
* Avoid unnecessary inline styles.
* Maintain consistent spacing and formatting.

---

## JavaScript

* Use vanilla JavaScript only.
* Prefer `const` and `let`.
* Write modular and readable code.
* Comment complex logic where necessary.
* Avoid polluting the global namespace.

---

# Responsive Design

Your feature should work properly on:

* Desktop
* Laptop
* Tablet
* Mobile devices

Test responsive layouts before submitting.

---

# Accessibility

Please ensure:

* Keyboard navigation works.
* Buttons have descriptive labels.
* Images include `alt` attributes.
* Color contrast is readable.
* Forms are accessible.

---

# Pull Request Guidelines

Before opening a Pull Request:

* Your feature follows the folder structure.
* No console errors.
* Responsive on different screen sizes.
* Existing functionality is not broken.
* Code is clean and properly formatted.
* Documentation is updated if required.

Please keep PRs focused on **one issue only**.

---

# Commit Message Convention

We follow Conventional Commits.

Examples:

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```text
<type>: <short description>

<optional body>
```
feat: add metro master game

fix: correct state map rendering

docs: update contributing guide

style: improve navbar responsiveness

refactor: organize frontend feature folders
```

---

# Reporting Bugs

When reporting bugs, include:

* Steps to reproduce
* Expected behavior
* Actual behavior
* Browser information
* Screenshots (if applicable)

---

# Before Submitting

Please verify the following:

* Feature is inside its own folder in `frontend/`
* Folder contains:

  * `index.html`
  * `style.css`
  * `script.js`
* Code is responsive
* No console errors
* Existing pages continue to work
* Follows project coding standards

---

# Need Help?

If you have questions about an issue or implementation, feel free to ask in the issue discussion before starting work.

Types:

- `feat:` — New feature or page
- `fix:` — Bug fix
- `docs:` — Documentation only
- `style:` — CSS or formatting changes (no logic change)
- `refactor:` — Code restructuring
- `perf:` — Performance improvement
- `a11y:` — Accessibility improvement
- `chore:` — Tooling, config, or CI changes

## Pull Request Process

1. Ensure your branch is based on the latest `main`.
2. Keep PRs focused — one change per PR.
3. Update documentation if your change affects the public API or setup.
4. Verify your changes work locally in both dark and light themes.
5. Fill out the [PR template](.github/PULL_REQUEST_TEMPLATE.md) completely.
6. A maintainer will review your PR. Address any feedback promptly.

