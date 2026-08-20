// Regenerates notes/**/*.html from notes/**/*.md so the two can never drift.
// Usage: node scripts/build-notes.js [--watch]

const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const NOTES_ROOT = path.join(__dirname, "..", "notes");

marked.setOptions({ gfm: true });

function findMarkdownFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
  return out;
}

function titleFor(markdown, fallback) {
  const match = markdown.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

function relDepth(mdPath) {
  return path.relative(NOTES_ROOT, path.dirname(mdPath)).split(path.sep).filter(Boolean).length;
}

function buildOne(mdPath) {
  const markdown = fs.readFileSync(mdPath, "utf8");
  const base = path.basename(mdPath, ".md");
  const title = titleFor(markdown, base);
  const body = marked.parse(markdown);

  const depth = relDepth(mdPath);
  const up = "../".repeat(depth);
  const cssHref = `${up}notes.css`;

  const isRootCatalog = depth === 0 && base === "catalog";
  const crumbHref = isRootCatalog ? `${up}../index.html` : `${up}catalog.html`;
  const crumbText = isRootCatalog ? "← Home" : "← Catalog";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<link rel="stylesheet" href="${cssHref}">
</head>
<body>
<nav class="crumb"><a href="${crumbHref}">${crumbText}</a></nav>
<main class="markdown-body">
${body}
</main>
</body>
</html>
`;

  const outPath = path.join(path.dirname(mdPath), `${base}.html`);
  fs.writeFileSync(outPath, html, "utf8");
  return outPath;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildAll() {
  const files = findMarkdownFiles(NOTES_ROOT);
  for (const file of files) {
    const out = buildOne(file);
    console.log(`built ${path.relative(process.cwd(), out)}`);
  }
  console.log(`done: ${files.length} note(s)`);
}

buildAll();

if (process.argv.includes("--watch")) {
  console.log("watching notes/ for changes...");
  fs.watch(NOTES_ROOT, { recursive: true }, (_event, filename) => {
    if (filename && filename.endsWith(".md")) {
      const full = path.join(NOTES_ROOT, filename);
      if (fs.existsSync(full)) {
        try {
          buildOne(full);
          console.log(`rebuilt ${filename}`);
        } catch (err) {
          console.error(`failed to build ${filename}:`, err.message);
        }
      }
    }
  });
}
