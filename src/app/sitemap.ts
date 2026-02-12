import { MetadataRoute } from "next";
import { createClient } from "@/data/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const client = createClient();
  const pages = client.getAllByType("page");
  const projects = client.getAllByType("project");

  const siteRoot = "https://demo.com";

  const homepageRoute = {
    url: siteRoot,
    lastModified: new Date().toISOString(),
  };

  const pagesRoutes = pages.map((page) => ({
    url: siteRoot + "/" + page.uid,
    lastModified: new Date().toISOString(),
  }));

  const projectsRoutes = projects.map((project) => ({
    url: siteRoot + "/project/" + project.uid,
    lastModified: project.last_publication_date || new Date().toISOString(),
  }));

  return [homepageRoute, ...pagesRoutes, ...projectsRoutes];
  }));

  return [homepageRoute, ...pagesRoutes, ...projectsRoutes];
}
