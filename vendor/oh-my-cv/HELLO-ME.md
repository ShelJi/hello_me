# Hello Me integration

Vendored from https://github.com/Renovamen/oh-my-cv (main, downloaded 2026-10-17).
Original author: Renovamen. The application remains licensed under GPL-3.0;
see LICENSE. Package-specific licenses remain in packages/.

Hello Me changes:

- Static Nuxt SPA hosted at `/build-resume/`, with hash routing for static hosts.
- App-scoped PWA cache, manifest, icons and URLs.
- Dedicated `hello_me_resume_builder` localStorage instance (via localforage).
- Resume name search, saved resume count, browser storage guidance and a Hello Me link.
- Existing upstream create, rename, duplicate, delete, import/export, Markdown/CSS
  editor, formatting, preview and PDF options are preserved.

Build from the Hello Me root:

```sh
corepack pnpm --dir vendor/oh-my-cv install --frozen-lockfile
npm run resume:build
```

The generated `build-resume/` folder is committed so the existing static hosting
can serve it without running Node. Rebuild it whenever vendored sources change.
Only browser data is used; there is no resume API or account. Clearing browser
storage removes saved resumes. Export backups from the dashboard. Resumes saved
on ohmycv.app belong to that origin: export there and import here to transfer.
