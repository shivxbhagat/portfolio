"use client";

import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MdArrowOutward } from "react-icons/md";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
	uid?: string;
	data: {
		title: string;
		hover_image?: string;
		tech_stack?: string[];
		external_url?: string;
	};
}

type ContentListProps = {
	items: ProjectItem[];
	contentType: string;
	viewMoreText: string;
};

export default function ContentList({
	items,
	contentType,
	viewMoreText = "Read More",
}: ContentListProps) {
	const component = useRef(null);
	const itemsRef = useRef<Array<HTMLLIElement | null>>([]);

	const revealRef = useRef(null);
	const [currentItem, setCurrentItem] = useState<null | number>(null);
	const [hovering, setHovering] = useState(false);
	const lastMousePos = useRef({ x: 0, y: 0 });

	const urlPrefix = contentType === "Blogs" ? "/blog" : "/project";

	useEffect(() => {
		// Animate list-items in with a stagger
		let ctx = gsap.context(() => {
			itemsRef.current.forEach((item) => {
				gsap.fromTo(
					item,
					{
						opacity: 0,
						y: 20,
					},
					{
						opacity: 1,
						y: 0,
						duration: 1.3,
						ease: "elastic.out(1,0.3)",
						stagger: 0.2,
						scrollTrigger: {
							trigger: item,
							start: "top bottom-=100px",
							end: "bottom center",
							toggleActions: "play none none none",
						},
					},
				);
			});

			return () => ctx.revert(); // cleanup!
		}, component);
	}, []);

	useEffect(() => {
		// Mouse move event listener
		const handleMouseMove = (e: MouseEvent) => {
			const mousePos = { x: e.clientX, y: e.clientY + window.scrollY };
			// Calculate speed and direction
			const speed = Math.sqrt(
				Math.pow(mousePos.x - lastMousePos.current.x, 2),
			);

			let ctx = gsap.context(() => {
				// Animate the image holder
				if (currentItem !== null) {
					const maxY = window.scrollY + window.innerHeight - 350;
					const maxX = window.innerWidth - 250;

					gsap.to(revealRef.current, {
						x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
						y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
						rotation:
							speed *
							(mousePos.x > lastMousePos.current.x ? 1 : -1), // Apply rotation based on speed and direction
						ease: "back.out(2)",
						duration: 1.3,
					});
					gsap.to(revealRef.current, {
						opacity: hovering ? 1 : 0,
						visibility: "visible",
						ease: "power3.out",
						duration: 0.4,
					});
				}
				lastMousePos.current = mousePos;
				return () => ctx.revert(); // cleanup!
			}, component);
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
		};
	}, [hovering, currentItem]);

	const onMouseEnter = (index: number) => {
		// Only enable hover effect for non-project content (Blogs)
		if (contentType !== "Projects") {
			setCurrentItem(index);
			if (!hovering) setHovering(true);
		}
	};

	const onMouseLeave = () => {
		setHovering(false);
		setCurrentItem(null);
	};

	const contentImages = items.map((item) => item.data.hover_image || "");

	return (
		<>
			<ul
				ref={component}
				className="grid border-b border-b-slate-100"
				onMouseLeave={onMouseLeave}
			>
				{items.map((post, index) => (
					<li
						key={index}
						ref={(el) => (itemsRef.current[index] = el)}
						onMouseEnter={() => onMouseEnter(index)}
						className="list-item opacity-0"
					>
						<a
							href={
								post.data.external_url ||
								`${urlPrefix}/${post.uid}`
							}
							className="flex flex-col justify-between border-t border-t-slate-100 py-10  text-slate-200 md:flex-row "
							aria-label={post.data.title || ""}
							target={post.data.external_url ? "_blank" : "_self"}
							rel={
								post.data.external_url
									? "noopener noreferrer"
									: undefined
							}
						>
							<div className="flex flex-col">
								<span className="text-3xl font-bold">
									{post.data.title}
								</span>
								{post.data.tech_stack &&
									post.data.tech_stack.length > 0 && (
										<div className="mt-3 flex flex-wrap gap-2">
											{post.data.tech_stack.map(
												(tech, idx) => (
													<span
														key={idx}
														className="gap-2px rounded-lg py-1 text-sm font-medium text-yellow-400"
													>
														{tech}
													</span>
												),
											)}
										</div>
									)}
							</div>
							<span className="mt-4 flex items-center gap-2 text-xl font-medium md:ml-auto md:mt-0">
								{viewMoreText} <MdArrowOutward />
							</span>
						</a>
					</li>
				))}

				{/* Hover element */}
				<div
					className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
					style={{
						backgroundImage:
							currentItem !== null && contentImages[currentItem]
								? `url(${contentImages[currentItem]})`
								: "",
					}}
					ref={revealRef}
				></div>
			</ul>
		</>
	);
}
