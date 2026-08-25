const fs = require("fs");
const path = require("path");
const assert = require("assert");

const pageDir = path.join(__dirname, "..", "..", "frontend", "triund-trek");
const html = fs.readFileSync(path.join(pageDir, "index.html"), "utf8");
const css = fs.readFileSync(path.join(pageDir, "style.css"), "utf8");
const js = fs.readFileSync(path.join(pageDir, "script.js"), "utf8");

assert.ok(html.includes("Triund Trek"), "page title/content should mention Triund Trek");
assert.ok(html.includes("Difficulty"), "difficulty requirement should be present");
assert.ok(html.includes("Distance"), "distance requirement should be present");
assert.ok(html.includes("Duration"), "duration requirement should be present");
assert.ok(html.includes("Best season"), "season requirement should be present");
assert.ok(html.includes("Starting point"), "starting point requirement should be present");
assert.ok(html.includes("Trail highlights"), "trail highlights should be represented");
assert.ok(html.includes("Nearby attractions"), "nearby attractions section should be represented");
assert.ok(html.includes('id="gallery"'), "gallery section should exist");
assert.ok(html.includes('id="map"'), "map section should exist");
assert.ok(html.includes("Wikimedia Commons"), "image attribution should be visible");
assert.ok(html.includes("OpenStreetMap"), "map attribution should be visible");
assert.ok(html.includes('class="skip-link"'), "accessibility skip link should exist");
assert.ok(html.includes('aria-label="Toggle navigation"'), "navigation should have an accessible label");
assert.ok(css.includes("@media (max-width: 720px)"), "mobile responsive rules should exist");
assert.ok(css.includes("prefers-reduced-motion"), "reduced motion support should exist");
assert.ok(js.includes("renderFacts"), "facts renderer should exist");
assert.ok(js.includes("renderTrail"), "trail renderer should exist");
assert.ok(js.includes("setupLightbox"), "gallery lightbox should exist");
assert.ok(js.includes("setupScrollTop"), "scroll-to-top behavior should exist");

console.log("Triund Trek issue #3149 structural tests passed.");
