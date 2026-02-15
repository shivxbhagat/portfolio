import { Metadata } from "next";
import { createClient } from "@/data/client";
import Hero from "@/slices/Hero";
import Biography from "@/slices/Biography";
import TechList from "@/slices/TechList";
import Experience from "@/slices/Experience";
import ContentIndex from "@/slices/ContentIndex";

export default async function Page() {
	const client = createClient();
	const page = await client.getSingle("homepage");
	const aboutPage = await client.getByUID("page", "about");
	const projectsPage = await client.getByUID("page", "projects");

	// Extract slices from about page
	const biographySlice = aboutPage?.data.slices.find(
		(slice: any) => slice.slice_type === "biography",
	);
	const techListSlice = aboutPage?.data.slices.find(
		(slice: any) => slice.slice_type === "tech_list",
	);
	const educationSlice = aboutPage?.data.slices.find(
		(slice: any) => slice.id === "education-1",
	);
	const experienceSlice = aboutPage?.data.slices.find(
		(slice: any) => slice.id === "experience-1",
	);

	// Extract projects slice
	const projectsSlice = projectsPage?.data.slices.find(
		(slice: any) => slice.slice_type === "content_index",
	);

	// Hero slice from homepage
	const heroSlice = page.data.slices.find(
		(slice: any) => slice.slice_type === "hero",
	);

	return (
		<>
			{/* Home Section */}
			<section id="home">
				{heroSlice && <Hero slice={heroSlice} />}
			</section>

			{/* About Section */}
			<section id="about">
				{biographySlice && <Biography slice={biographySlice} />}
				{techListSlice && <TechList slice={techListSlice} />}
				{educationSlice && <Experience slice={educationSlice} />}
				{experienceSlice && <Experience slice={experienceSlice} />}
			</section>

			{/* Projects Section */}
			<section id="projects">
				{projectsSlice && <ContentIndex slice={projectsSlice} />}
			</section>
		</>
	);
}

export async function generateMetadata(): Promise<Metadata> {
	const client = createClient();
	const page = await client.getSingle("homepage");

	return {
		title: page.data.meta_title,
		description: page.data.meta_description,
	};
}
