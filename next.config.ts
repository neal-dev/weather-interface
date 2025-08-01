import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	redirects: async () => {
		return [
			{
				source: "/",
				destination: "/weather",
				permanent: true,
			},
		];
	},
	pageExtensions: ["ts", "tsx", "js", "jsx"],
	env: {
		API_KEY: process.env.API_KEY,
		API_URL: process.env.API_URL,
	},
	/* config options here */
	images: {
		localPatterns: [
			{
				pathname: "assets/images/**",
				search: "",
			},
		],
	},
};

export default nextConfig;
