import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import remarkSmartypants from "remark-smartypants";
import getBlurDataURL from "./getBlurDataURL";

const posts = defineCollection({
	name: "posts",
	directory: "../../content",
	include: "**/*.{md,mdx}",
	exclude: "movies/**/*.{md,mdx}",
	schema: (z) => ({
		title: z.string(),
		date: z.coerce.date(),
		summary: z.string(),
		cover: z.string(),
		coverAlt: z.string(),
		category: z.enum(["blog", "notes"]).default("blog"),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			remarkPlugins: [[remarkSmartypants, { dashes: true }]],
		});
		return {
			...document,
			mdx,
			readingTime: getReadingTime(document.content),
			blurDataURL: await getBlurDataURL(document.cover),
		};
	},
});

const movies = defineCollection({
	name: "movies",
	directory: "../../content/movies",
	include: "**/*.{md,mdx}",
	schema: (z) => ({
		title: z.string(),
		rating: z.number(),
		cover: z.string().optional(),
		coverAlt: z.string().optional(),
	}),
	transform: async (document, context) => {
		const mdx = await compileMDX(context, document, {
			remarkPlugins: [[remarkSmartypants, { dashes: true }]],
		});
		return {
			...document,
			mdx,
		};
	},
});

export default defineConfig({
	collections: [posts, movies],
});

function getReadingTime(content: string) {
	const words = content.split(/\s+/g).length;
	const minutes = Math.ceil(words / 200); // 200 words per minute
	return minutes;
}
