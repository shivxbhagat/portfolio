import contentData from "./content.json";

export type ContentType = "page" | "project" | "homepage" | "settings";

interface DataItem {
	uid?: string;
	data?: any;
	last_publication_date?: string;
	[key: string]: any;
}

/**
 * Get settings data
 */
export function getSingle(type: "settings"): {
	data: typeof contentData.settings;
};
export function getSingle(type: "homepage"): {
	data: typeof contentData.homepage;
};
export function getSingle(type: "settings" | "homepage") {
	if (type === "settings") {
		return {
			data: contentData.settings,
		};
	}
	if (type === "homepage") {
		return {
			data: contentData.homepage,
		};
	}
	throw new Error(`Unknown single type: ${type}`);
}

/**
 * Get a document by UID
 */
export function getByUID(
	type: "page" | "project",
	uid: string,
): DataItem | null {
	if (type === "page") {
		const page = contentData.pages.find((p) => p.uid === uid);
		if (!page) return null;
		return {
			uid: page.uid,
			data: {
				meta_title: page.meta_title,
				meta_description: page.meta_description,
				slices: page.slices,
			},
		};
	}

	if (type === "project") {
		const project = contentData.projects.find((p) => p.uid === uid);
		if (!project) return null;
		return {
			uid: project.uid,
			data: {
				title: project.title,
				tech_stack: project.tech_stack,
				external_url: project.external_url,
			},
		};
	}

	return null;
}

/**
 * Get all documents of a type
 */
export function getAllByType(type: "page"): Array<{
	uid?: string;
	data: {
		meta_title: string;
		meta_description: string;
		slices: any[];
	};
}>;
export function getAllByType(type: "project"): Array<{
	uid?: string;
	data: {
		title: string;
		tech_stack?: string[];
		external_url?: string;
	};
}>;
export function getAllByType(type: "page" | "project"): DataItem[] {
	if (type === "page") {
		return contentData.pages.map((page) => ({
			uid: page.uid,
			data: {
				meta_title: page.meta_title,
				meta_description: page.meta_description,
				slices: page.slices,
			},
		}));
	}

	if (type === "project") {
		return contentData.projects.map((project) => ({
			uid: project.uid,
			data: {
				title: project.title,
				tech_stack: project.tech_stack,
				external_url: project.external_url,
			},
		}));
	}

	return [];
}

/**
 * Create a client-like interface for compatibility
 */
export function createClient() {
	return {
		getSingle,
		getByUID,
		getAllByType,
	};
}
