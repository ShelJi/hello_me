import { searchTools } from "./search.js";
import { renderCards, renderCheckboxOptions } from "./render.js";

const $ = (selector) => document.querySelector(selector);
const state = {
	query: "",
	topic: "",
	tags: new Set(),
	fieldFilters: {},
	minRanking: 0,
	sort: "relevance",
};
let allTools = [];

const els = {
	search: $("#search-input"),
	topic: $("#topic-filter"),
	ranking: $("#ranking-filter"),
	rankingOutput: $("#ranking-output"),
	sort: $("#sort-filter"),
	tagFilters: $("#tag-filters"),
	customFilters: $("#custom-filters"),
	grid: $("#tool-grid"),
	count: $("#tool-count"),
	summary: $("#results-summary"),
	empty: $("#empty-state"),
	error: $("#load-error"),
	active: $("#active-filters"),
};

function setOptions(select, values, placeholder) {
	const current = select.value;
	select.replaceChildren(new Option(placeholder, ""));
	for (const value of values) select.add(new Option(value, value));
	if (values.includes(current)) select.value = current;
}

function uniqueSorted(values) {
	return [...new Set(values)].sort((a, b) => String(a).localeCompare(String(b)));
}

function fieldType(values) {
	if (values.every((value) => typeof value === "boolean")) return "boolean";
	if (values.every((value) => typeof value === "number")) return "number";
	if (values.every(Array.isArray)) return "array";
	if (values.every((value) => value && typeof value === "object" && !Array.isArray(value)))
		return "object";
	return "string";
}

function discoverFields(tools) {
	const keys = uniqueSorted(tools.flatMap((tool) => Object.keys(tool.fields || {})));
	return keys
		.map((key) => {
			const values = tools
				.map((tool) => tool.fields?.[key])
				.filter((value) => value !== undefined && value !== null);
			return { key, type: fieldType(values), values };
		})
		.filter((field) => ["boolean", "string", "array", "number"].includes(field.type));
}

function renderDynamicFilters() {
	const tagCounts = new Map();
	for (const tool of allTools)
		for (const tag of tool.tags || []) tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
	els.tagFilters.innerHTML = "<h3>Tags</h3>";
	const tagWrap = document.createElement("div");
	renderCheckboxOptions(tagWrap, {
		idPrefix: "tag",
		items: [...tagCounts.keys()].sort().map((value) => ({ value, label: value })),
		selected: state.tags,
		counts: tagCounts,
		onChange: (value, checked) => {
			checked ? state.tags.add(value) : state.tags.delete(value);
			render();
		},
	});
	els.tagFilters.append(tagWrap);

	els.customFilters.innerHTML = "<h3>Capabilities</h3>";
	for (const field of discoverFields(allTools)) {
		const group = document.createElement("div");
		group.className = "filter-group";
		const label = document.createElement("label");
		label.textContent = field.key.replace(/[_-]/g, " ");
		label.htmlFor = `field-${field.key}`;
		group.append(label);
		if (field.type === "boolean") {
			const select = document.createElement("select");
			select.id = `field-${field.key}`;
			select.add(new Option("Any", ""));
			select.add(new Option("Yes", "true"));
			select.add(new Option("No", "false"));
			select.value =
				state.fieldFilters[field.key] === true
					? "true"
					: state.fieldFilters[field.key] === false
						? "false"
						: "";
			select.addEventListener("change", () => {
				if (select.value === "") delete state.fieldFilters[field.key];
				else state.fieldFilters[field.key] = select.value === "true";
				render();
			});
			group.append(select);
		} else {
			const values =
				field.type === "array"
					? uniqueSorted(field.values.flat())
					: uniqueSorted(field.values.map(String));
			const select = document.createElement("select");
			select.id = `field-${field.key}`;
			select.add(new Option("Any", ""));
			for (const value of values) select.add(new Option(value, value));
			select.value = state.fieldFilters[field.key] ?? "";
			select.addEventListener("change", () => {
				if (!select.value) delete state.fieldFilters[field.key];
				else state.fieldFilters[field.key] = select.value;
				render();
			});
			group.append(select);
		}
		els.customFilters.append(group);
	}
	if (!discoverFields(allTools).length) {
		const note = document.createElement("p");
		note.className = "muted small";
		note.textContent = "No custom fields found in the current dataset.";
		els.customFilters.append(note);
	}
}

function renderActiveFilters() {
	els.active.replaceChildren();
	const chips = [];
	if (state.query)
		chips.push([
			"Search: " + state.query,
			() => {
				state.query = "";
				els.search.value = "";
			},
		]);
	if (state.topic)
		chips.push([
			"Topic: " + state.topic,
			() => {
				state.topic = "";
				els.topic.value = "";
			},
		]);
	for (const tag of state.tags) chips.push(["Tag: " + tag, () => state.tags.delete(tag)]);
	for (const [key, value] of Object.entries(state.fieldFilters))
		chips.push([
			`${key}: ${Array.isArray(value) ? value.join(", ") : value}`,
			() => delete state.fieldFilters[key],
		]);
	if (state.minRanking > 0)
		chips.push([
			`Ranking ≥ ${state.minRanking}`,
			() => {
				state.minRanking = 0;
				els.ranking.value = "0";
				els.rankingOutput.value = "0";
			},
		]);
	for (const [text, remove] of chips) {
		const chip = document.createElement("span");
		chip.className = "filter-chip";
		const label = document.createElement("span");
		label.textContent = text;
		const button = document.createElement("button");
		button.type = "button";
		button.setAttribute("aria-label", `Remove ${text}`);
		button.textContent = "×";
		button.addEventListener("click", () => {
			remove();
			renderDynamicFilters();
			render();
		});
		chip.append(label, button);
		els.active.append(chip);
	}
}

function render() {
	const results = searchTools(allTools, state);
	renderCards(els.grid, results);
	els.count.textContent = `${allTools.length} ${allTools.length === 1 ? "tool" : "tools"}`;
	els.summary.textContent = `${results.length} result${results.length === 1 ? "" : "s"}${state.query ? ` for “${state.query}”` : ""}`;
	els.empty.hidden = results.length !== 0;
	els.grid.hidden = results.length === 0;
	renderActiveFilters();
}

function reset() {
	state.query = "";
	state.topic = "";
	state.tags.clear();
	state.fieldFilters = {};
	state.minRanking = 0;
	state.sort = "relevance";
	els.search.value = "";
	els.topic.value = "";
	els.ranking.value = "0";
	els.rankingOutput.value = "0";
	els.sort.value = "relevance";
	renderDynamicFilters();
	render();
}

async function loadTools() {
	els.error.hidden = true;

	try {
		const response = await fetch("./data/tools.json", {
			cache: "no-cache",
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const payload = await response.json();

		if (payload?.schema_version !== 1 || !Array.isArray(payload.tools)) {
			throw new Error("Unsupported or invalid JSON schema");
		}

		allTools = payload.tools
			.filter(
				(tool) => tool && typeof tool.name === "string" && typeof tool.link === "string",
			)
			.map((tool) => ({
				...tool,
				tags: Array.isArray(tool.tags) ? tool.tags : [],
				fields:
					tool.fields && typeof tool.fields === "object" && !Array.isArray(tool.fields)
						? tool.fields
						: {},
				ranking: Number(tool.ranking) || 0,
			}));

		setOptions(
			els.topic,
			uniqueSorted(allTools.map((tool) => tool.topic).filter(Boolean)),
			"All topics",
		);
	} catch (error) {
		console.error("Failed to load tools.json", error);
		els.error.hidden = false;
		els.grid.hidden = true;
		els.empty.hidden = true;
		els.summary.textContent = "Directory unavailable";
		els.count.textContent = "Load error";
		return;
	}

	// Rendering errors now appear as JavaScript errors, not JSON load errors.

	try {
		renderDynamicFilters();
		render();
	} catch (error) {
		console.error("Failed to render tools directory:", error);
		els.summary.textContent = "Rendering failed. Check the console.";
	}
}

els.search.addEventListener("input", () => {
	state.query = els.search.value;
	render();
});
els.topic.addEventListener("change", () => {
	state.topic = els.topic.value;
	render();
});
els.ranking.addEventListener("input", () => {
	state.minRanking = Number(els.ranking.value);
	els.rankingOutput.value = els.ranking.value;
	render();
});
els.sort.addEventListener("change", () => {
	state.sort = els.sort.value;
	render();
});
$("#clear-filters").addEventListener("click", reset);
$("#empty-reset").addEventListener("click", reset);
$("#clear-search").addEventListener("click", () => {
	state.query = "";
	els.search.value = "";
	els.search.focus();
	render();
});
$("#retry-load").addEventListener("click", loadTools);
document.addEventListener("keydown", (event) => {
	if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
		event.preventDefault();
		els.search.focus();
	}
	if (event.key === "Escape" && document.activeElement === els.search) {
		els.search.value = "";
		state.query = "";
		render();
	}
});
loadTools();
