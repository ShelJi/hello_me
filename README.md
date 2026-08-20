# Personal Portfolio

- [shelj.in](https://shelj.in) hosted in netlify free version.

- [Github hoisted](https://shelji.github.io/hello_me/)

## minifier used

[https://www.minifier.org/](https://www.minifier.org/)

## Noise creator

[Noise](https://www.fffuel.co/nnnoise/)

## CV

[ohmycv](https://ohmycv.app)

## Notes wiki

Notes live as Markdown under `notes/**/*.md`. Each has a matching `.html` export (same name) that's what actually gets served on the site, plus `notes/catalog.md` / `catalog.html` as the hand-curated index page.

The HTML is generated, not hand-written — never edit `.html` files under `notes/` directly, they'll be overwritten.

- Edit or add a `.md` note (and add a link for it in `notes/catalog.md` if it's new).
- `npm install` once, then `npm run notes:build` to regenerate all HTML, or `npm run notes:watch` to rebuild on save while editing.
- A git pre-commit hook (`githooks/pre-commit`, wired up via `git config core.hooksPath githooks`) also regenerates and stages the HTML automatically whenever a staged commit touches `notes/**/*.md`, so the Markdown and its HTML export can't drift out of sync.

Shared styling for note pages lives in `notes/notes.css` — edit it once instead of per-file.
