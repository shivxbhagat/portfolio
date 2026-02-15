import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteRoot = "https://demo.com";

	return [
		{
			url: siteRoot,
			lastModified: new Date().toISOString(),
		},
	];
}
