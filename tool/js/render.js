const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[char]));

const safeURL = value => {
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch { return null; }
};

export function renderCards(container, tools) {
  container.replaceChildren();
  const fragment = document.createDocumentFragment();
  for (const tool of tools) {
    const card = document.createElement("article");
    card.className = "tool-card";
    const initial = (tool.name || "?").trim().charAt(0).toUpperCase();
    const link = safeURL(tool.link);
    const tags = (Array.isArray(tool.tags) ? tool.tags : []).slice(0, 5);
    card.innerHTML = `
      <div class="card-top">
        <div class="tool-icon" aria-hidden="true">${escapeHTML(initial)}</div>
        <span class="ranking">★ ${escapeHTML(tool.ranking ?? 0)} / 10</span>
      </div>
      <h3>${escapeHTML(tool.name)}</h3>
      <p>${escapeHTML(tool.description)}</p>
      <div class="card-bottom">
        <span class="topic-label">${escapeHTML(tool.topic)}</span>
        <div class="tag-list">${tags.map(tag => `<span class="tag">${escapeHTML(tag)}</span>`).join("")}</div>
        ${link ? `<a class="card-link" href="${escapeHTML(link)}" target="_blank" rel="noopener noreferrer"><span>Open tool</span><span aria-hidden="true">↗</span></a>` : `<span class="card-link">No valid link</span>`}
      </div>`;
    fragment.append(card);
  }
  container.append(fragment);
}

export function renderCheckboxOptions(container, { idPrefix, items, selected, onChange, counts = null }) {
  container.replaceChildren();
  const list = document.createElement("div");
  list.className = "check-list";
  for (const item of items) {
    const label = document.createElement("label");
    label.className = "check-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = item.value;
    input.checked = selected.has(item.value);
    input.id = `${idPrefix}-${item.value.replace(/[^a-z0-9_-]/gi, "-")}`;
    input.addEventListener("change", () => onChange(item.value, input.checked));
    const text = document.createElement("span");
    text.textContent = item.label;
    label.append(input, text);
    if (counts) {
      const count = document.createElement("span");
      count.className = "option-count";
      count.textContent = counts.get(item.value) ?? 0;
      label.append(count);
    }
    list.append(label);
  }
  container.append(list);
}
