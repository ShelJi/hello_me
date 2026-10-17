# Personal Portfolio

- [shelj.in](https://shelj.in) hosted in netlify free version.

- [Github hoisted](https://shelji.github.io/hello_me/)

## minifier used

[https://www.minifier.org/](https://www.minifier.org/)

## Noise creator

[Noise](https://www.fffuel.co/nnnoise/)

## CV

[ohmycv](https://ohmycv.app)

The full resume builder is available at `/build-resume/` (also linked in the
portfolio sidebar). Create, rename, duplicate, search and delete multiple resumes;
edit Markdown/CSS, adjust formatting, preview and export PDF. Resumes are saved
only in this browser's localStorage. Use the dashboard's JSON export/import for
backups or transferring between browsers.

Source and upstream GPL-3.0 attribution are in `vendor/oh-my-cv/`.

### Run the resume builder locally

From this repository's root, run `npm run resume:serve`, then open
http://127.0.0.1:4173/build-resume/ in Chrome or Edge. Keep the terminal running.
This uses the generated files and needs only Node.js, with no dependency install.
Serve the repository root, not the `build-resume` folder alone; do not open
`index.html` using a `file://` URL.

### Resume controls

- Click **Create My Resume**, then the **+** card to create a resume.
- **Markdown** edits the content; the middle pane previews it live. **CSS** edits custom styling.
- The right toolbar controls paper size, color, fonts, margins and spacing.
  On a narrow screen, use the sidebar toggle in the top bar to open the toolbar.
- Click **Save** or press **Ctrl+S** to save edits. Preview updates do not automatically save.
- **Export PDF** opens printing: select **Save as PDF**. **Export Markdown** downloads the content.
- **My Resumes** opens the dashboard. Double-click a resume name to rename it;
  press Enter to confirm. Hover over or focus a card for Duplicate and Delete.
- **Save as...** on the dashboard backs up all resumes as JSON; **Import from...** restores a backup.
- Use the same browser and origin (host and port) to access saved resumes.
  Localhost resumes and public-domain resumes are separate; use JSON export/import to transfer them.

### Publish

Deploy the repository root, including `build-resume/`, its `_nuxt/` assets,
`_redirects` and `.nojekyll`, through the existing static hosting workflow.
The public `/build-resume/` URL only becomes available after those changes are deployed.

See [integration instructions](vendor/oh-my-cv/HELLO-ME.md) to install dependencies
and regenerate the committed static app with `npm run resume:build`.

## Notes wiki

Notes live as Markdown under `notes/**/*.md`. Each has a matching `.html` export (same name) that's what actually gets served on the site, plus `notes/catalog.md` / `catalog.html` as the hand-curated index page.

The HTML is generated, not hand-written — never edit `.html` files under `notes/` directly, they'll be overwritten.

- Edit or add a `.md` note (and add a link for it in `notes/catalog.md` if it's new).
- `npm install` once, then `npm run notes:build` to regenerate all HTML, or `npm run notes:watch` to rebuild on save while editing.
- A git pre-commit hook (`githooks/pre-commit`, wired up via `git config core.hooksPath githooks`) also regenerates and stages the HTML automatically whenever a staged commit touches `notes/**/*.md`, so the Markdown and its HTML export can't drift out of sync.

Shared styling for note pages lives in `notes/notes.css` — edit it once instead of per-file.
