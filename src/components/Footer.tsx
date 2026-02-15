"use client";

import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Bounded from "@/components/Bounded";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa6";

interface Settings {
	data: {
		name: string;
		nav_links: Array<{ label: string; link: string }>;
		social_links: Array<{ platform: string; link: string }>;
	};
}

export default function Footer({ settings }: { settings: Settings }) {
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
			}
		}
	};

	return (
		<Bounded as="footer" className="text-slate-600">
			<div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
				<div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
					<a
						href="#home"
						onClick={(e) => handleNavClick(e, "#home")}
						className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400 cursor-pointer"
					>
						{settings.data.name}
					</a>
					<span
						className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
						aria-hidden={true}
					>
						/
					</span>
					<p className=" text-sm text-slate-300 ">
						© {new Date().getFullYear()} {settings.data.name}
					</p>
				</div>
				<nav className="navigation" aria-label="Footer Navigation">
					<ul className="flex items-center gap-1">
						{settings.data.nav_links.map(
							({ link, label }, index) => (
								<React.Fragment key={label}>
									<li>
										<a
											className={clsx(
												"group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400 cursor-pointer",
											)}
											href={link}
											onClick={(e) =>
												handleNavClick(e, link)
											}
										>
											{label}
										</a>
									</li>
									{index <
										settings.data.nav_links.length - 1 && (
										<span
											className="text-4xl font-thin leading-[0] text-slate-400"
											aria-hidden="true"
										>
											/
										</span>
									)}
								</React.Fragment>
							),
						)}
					</ul>
				</nav>
				<div className="socials inline-flex justify-center sm:justify-end">
					{settings.data.social_links.map((social) => (
						<Link
							key={social.platform}
							href={social.link}
							className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
							aria-label={
								settings.data.name + " on " + social.platform
							}
							target="_blank"
							rel="noopener noreferrer"
						>
							{social.platform === "github" && <FaGithub />}
							{social.platform === "twitter" && <FaTwitter />}
							{social.platform === "linkedin" && <FaLinkedin />}
							{social.platform === "email" && <FaEnvelope />}
						</Link>
					))}
				</div>
			</div>
		</Bounded>
	);
}
