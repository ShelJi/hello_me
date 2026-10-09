# Online Tools Viewer

Static HTML/CSS/JavaScript directory driven by `data/tools.json`.

## Data contract

- Root object: `schema_version` (currently `1`) and `tools` array.
- Each tool: `id`, `name`, `description`, `topic`, `ranking` (0–10), `tags` (string array), `notes`, `link` (HTTP(S) URL), and `fields` (JSON object).
- Custom field filters are inferred from the dataset. Boolean values become Yes/No selectors; strings, numbers, and array values become selectors.
- Search includes name, topic, tags, description, notes, link, and custom field keys/values.

## Run locally

Serve the directory using any static HTTP server. Opening `index.html` directly with `file://` will not work because browsers block `fetch()` for local JSON files.

## Deploy

Deploy the contents of this folder to a static host. Update `data/tools.json` whenever a new builder export is ready. No build step is required.

## Security

External links are limited to HTTP(S), opened in a new tab with `noopener noreferrer`. The viewer escapes imported text before rendering.
