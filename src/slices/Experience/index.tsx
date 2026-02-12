"use client";

import { useEffect, useRef } from "react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceSlice {
	slice_type: string;
	primary: {
		heading: string;
	};
	items: Array<{
		title: string;
		time_period: string;
		institution: string;
		logo?: string;
		description: Array<{ type: string; text: string }>;
	}>;
}

/**
 * Component for "Experience" Slices.
 */
const Experience = ({ slice }: { slice: ExperienceSlice }): JSX.Element => {
	const component = useRef(null);

	useEffect(() => {
		let ctx = gsap.context(() => {
			const experiences = gsap.utils.toArray(".experience-item");

			experiences.forEach((item: any) => {
				gsap.fromTo(
					item,
					{
						opacity: 0,
						y: 50,
					},
					{
						opacity: 1,
						y: 0,
						duration: 1,
						ease: "power3.out",
						scrollTrigger: {
							trigger: item,
							start: "top 80%",
							end: "top 50%",
							toggleActions: "play none none none",
						},
					},
				);

				const logo = item.querySelector(".experience-logo");
				if (logo) {
					gsap.fromTo(
						logo,
						{
							scale: 0,
							rotation: -180,
						},
						{
							scale: 1,
							rotation: 0,
							duration: 0.8,
							ease: "back.out(1.7)",
							scrollTrigger: {
								trigger: item,
								start: "top 70%",
								toggleActions: "play none none none",
							},
						},
					);
				}
			});
		}, component);

		return () => ctx.revert();
	}, []);

	return (
		<Bounded
			ref={component}
			data-slice-type={slice.slice_type}
			data-slice-variation="default"
		>
			<Heading as="h2" size="lg">
				{slice.primary.heading}
			</Heading>
			{slice.items.map((item, index) => (
				<div
					key={index}
					className="experience-item ml-6 mt-8 md:ml-12 md:mt-16"
				>
					<div className="max-w-prose">
						<Heading
							as="h3"
							size="sm"
							className="md:whitespace-nowrap"
						>
							{item.title}
						</Heading>

						<div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
							<span>{item.time_period}</span>{" "}
							<span className="text-3xl font-extralight">/</span>{" "}
							<span>{item.institution}</span>
						</div>
						<div className="prose prose-lg prose-invert mt-4">
							{item.description.map((para, idx) => (
								<p key={idx}>{para.text}</p>
							))}
						</div>
						{item.logo && (
							<div className="mt-6 flex justify-start">
								<div className="experience-logo relative w-24 overflow-hidden rounded-3xl border-2 border-slate-700 bg-white p-3 shadow-lg md:w-32">
									<Image
										src={item.logo}
										alt={`${item.institution} logo`}
										width={128}
										height={128}
										className="w-full object-contain"
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			))}
		</Bounded>
	);
};

export default Experience;
