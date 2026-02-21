"use client";

import clsx from "clsx";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MdMenu, MdClose } from "react-icons/md";
import Button from "@/components/Button";

interface Settings {
	data: {
		name: string;
		nav_links: Array<{ label: string; link: string }>;
		cta_button?: { label: string; link: string };
	};
}

export default function NavBar({ settings }: { settings: Settings }) {
	const [open, setOpen] = useState(false);
	const [activeSection, setActiveSection] = useState("home");
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		// Track scroll direction
		const handleScroll = () => {
			setLastScrollY(window.scrollY);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	useEffect(() => {
		// Intersection Observer for active section tracking
		const observerOptions = {
			root: null,
			rootMargin: "-20% 0px -60% 0px",
			threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
		};

		let currentScrollY = window.scrollY;

		const observer = new IntersectionObserver((entries) => {
			const newScrollY = window.scrollY;
			const scrollingDown = newScrollY > currentScrollY;
			currentScrollY = newScrollY;

			// Filter intersecting entries
			const intersectingEntries = entries.filter(
				(entry) => entry.isIntersecting && entry.intersectionRatio > 0,
			);

			if (intersectingEntries.length > 0) {
				// Sort by position
				intersectingEntries.sort((a, b) => {
					return (
						a.target.getBoundingClientRect().top -
						b.target.getBoundingClientRect().top
					);
				});

				// Choose based on scroll direction
				if (scrollingDown) {
					// When scrolling down, pick the last (bottommost) intersecting section
					setActiveSection(
						intersectingEntries[intersectingEntries.length - 1]
							.target.id,
					);
				} else {
					// When scrolling up, pick the first (topmost) intersecting section
					setActiveSection(intersectingEntries[0].target.id);
				}
			}
		}, observerOptions);

		// Observe all sections
		const sections = document.querySelectorAll("section[id]");
		sections.forEach((section) => observer.observe(section));

		return () => {
			sections.forEach((section) => observer.unobserve(section));
		};
	}, []);

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		link: string,
	) => {
		if (link.startsWith("#")) {
			e.preventDefault();
			const sectionId = link.substring(1);
			const element = document.getElementById(sectionId);
			if (element) {
				element.scrollIntoView({ behavior: "smooth" });
				setOpen(false);
			}
		}
	};

	const isActive = (link: string) => {
		if (link.startsWith("#")) {
			return "#" + activeSection === link;
		}
		return false;
	};

	return (
		<nav aria-label="Main navigation">
			<ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
				<div className="flex items-center justify-between">
					<NameLogo name={settings.data.name} />
					<button
						aria-expanded={open}
						aria-label="Open menu"
						className="block p-2 text-2xl text-slate-800 md:hidden"
						onClick={() => setOpen(true)}
					>
						<MdMenu />
					</button>
				</div>
				<div
					className={clsx(
						"fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
						open ? "translate-x-0" : "translate-x-[100%]",
					)}
				>
					<button
						aria-label="Close menu"
						aria-expanded={open}
						className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
						onClick={() => setOpen(false)}
					>
						<MdClose />
					</button>
					{settings.data.nav_links.map(({ link, label }, index) => (
						<React.Fragment key={label}>
							<li className="first:mt-8">
								<a
									className={clsx(
										"group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900 ",
									)}
									href={link}
									onClick={(e) => handleNavClick(e, link)}
									aria-current={
										isActive(link) ? "page" : undefined
									}
								>
									<span
										className={clsx(
											"absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
											isActive(link)
												? "translate-y-6"
												: "translate-y-18",
										)}
									/>
									<span className="relative">{label}</span>
								</a>
							</li>
							{index < settings.data.nav_links.length - 1 && (
								<span
									className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
									aria-hidden="true"
								>
									/
								</span>
							)}
						</React.Fragment>
					))}
					{settings.data.cta_button && (
						<li className="mt-4">
							<Button
								linkField={settings.data.cta_button.link}
								label={settings.data.cta_button.label}
								showIcon={false}
							/>
						</li>
					)}
				</div>
				<DesktopMenu
					settings={settings}
					activeSection={activeSection}
					handleNavClick={handleNavClick}
					isActive={isActive}
				/>
			</ul>
		</nav>
	);
}

function NameLogo({ name }: { name: string }) {
	return (
		<Link
			href="/"
			aria-label="Home page"
			className="text-xl font-extrabold tracking-tighter text-slate-900"
		>
			{name}
		</Link>
	);
}

function DesktopMenu({
	settings,
	activeSection,
	handleNavClick,
	isActive,
}: {
	settings: Settings;
	activeSection: string;
	handleNavClick: (
		e: React.MouseEvent<HTMLAnchorElement>,
		link: string,
	) => void;
	isActive: (link: string) => boolean;
}) {
	return (
		<div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
			{settings.data.nav_links.map(({ link, label }, index) => (
				<React.Fragment key={label}>
					<li>
						<a
							className={clsx(
								"group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
							)}
							href={link}
							onClick={(e) => handleNavClick(e, link)}
							aria-current={isActive(link) ? "page" : undefined}
						>
							<span
								className={clsx(
									"absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
									isActive(link)
										? "translate-y-6"
										: "translate-y-8",
								)}
							/>
							<span className="relative">{label}</span>
						</a>
					</li>
					{index < settings.data.nav_links.length - 1 && (
						<span
							className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
							aria-hidden="true"
						>
							/
						</span>
					)}
				</React.Fragment>
			))}
			{settings.data.cta_button && (
				<li>
					<Button
						linkField={settings.data.cta_button.link}
						label={settings.data.cta_button.label}
						showIcon={false}
						className="ml-3"
					/>
				</li>
			)}
		</div>
	);
}
