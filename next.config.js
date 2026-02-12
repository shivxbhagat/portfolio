/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "www.gov.mb.ca",
			},
			{
				protocol: "https",
				hostname: "news.umanitoba.ca",
			},
		],
	},
};

module.exports = nextConfig;
