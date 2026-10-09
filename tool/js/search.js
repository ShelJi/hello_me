const normalize = (value) =>
	String(value ?? "")
		.toLocaleLowerCase()
		.trim();

export function flattenValue(value) {
	if (Array.isArray(value)) return value.map(flattenValue).join(" ");
	if (value && typeof value === "object") {
		return Object.entries(value)
			.map(([key, child]) => `${key} ${flattenValue(child)}`)
			.join(" ");
	}
	return String(value ?? "");
}

export function scoreTool(tool, query) {
	const tokens = normalize(query).split(/\s+/).filter(Boolean);
	if (!tokens.length) return 0;
	const searchable = [
		[tool.name, 10],
		[tool.topic, 7],
		[(tool.tags || []).join(" "), 8],
		[tool.description, 5],
		[tool.notes, 3],
		[tool.link, 2],
		[flattenValue(tool.fields), 4],
	];
	let score = 0;
	for (const token of tokens) {
		let best = 0;
		for (const [value, weight] of searchable) {
			if (normalize(value).includes(token)) best = Math.max(best, weight);
		}
		if (best === 0) return 0; // all query terms must match somewhere
		score += best;
	}
	return score;
}

export function matchesField(actual, expected) {
	if (Array.isArray(actual)) {
		const requested = Array.isArray(expected) ? expected : [expected];
		return requested.every((value) =>
			actual.some((item) => normalize(item) === normalize(value)),
		);
	}
	if (typeof actual === "boolean") return actual === expected;
	return normalize(actual) === normalize(expected);
}

export function searchTools(tools, state) {
	const filtered = tools
		.filter((tool) => {
			if (state.topic && tool.topic !== state.topic) return false;
			if (Number(tool.ranking || 0) < state.minRanking) return false;
			// if (![...state.tags].every((tag) => (tool.tags || []).includes(tag))) {
			// 	return false;
			// }

			if (
				![...(state.tags ?? [])].every((tag) =>
					(Array.isArray(tool.tags) ? tool.tags : []).includes(tag),
				)
			) {
				return false;
			}

			for (const [key, expected] of Object.entries(state.fieldFilters)) {
				if (!matchesField(tool.fields?.[key], expected)) return false;
			}
			return true;
		})
		.map((tool) => ({ tool, score: scoreTool(tool, state.query) }))
		.filter((item) => !state.query.trim() || item.score > 0);

	if (state.sort === "ranking")
		filtered.sort(
			(a, b) =>
				Number(b.tool.ranking || 0) - Number(a.tool.ranking || 0) ||
				a.tool.name.localeCompare(b.tool.name),
		);
	else if (state.sort === "name") filtered.sort((a, b) => a.tool.name.localeCompare(b.tool.name));
	else
		filtered.sort(
			(a, b) =>
				b.score - a.score ||
				Number(b.tool.ranking || 0) - Number(a.tool.ranking || 0) ||
				a.tool.name.localeCompare(b.tool.name),
		);
	return filtered.map((item) => item.tool);
}
