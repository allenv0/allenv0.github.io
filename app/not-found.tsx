"use client";

import Link from "next/link";
import { IconCat, IconHome, IconLoader2 } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

export const metadata = {
	title: "404: That page doesn't exist",
};

export default function NotFound() {
	const [src, setSrc] = useState("/images/blog/code.png");
	const [loading, setLoading] = useState(true);


	return (
		<div className="text-lg md:text-xl">
			<h1 className="mb-2 bg-gradient-to-b from-red-600 to-red-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-red-400 dark:to-red-300 md:h-14 md:text-5xl">
				404: That page doesn&apos;t exist.
			</h1>
			<p></p>

			<div className="relative mx-auto mt-6 w-fit overflow-hidden rounded-2xl border-zinc-400/50 bg-zinc-200 drop-shadow-sm dark:bg-zinc-800">
				{loading && (
					<IconLoader2
						className="absolute inset-0 m-auto animate-spin"
						size={48}
					/>
				)}

				<Image
					src={src}
					alt="A cat"
					className={clsx("relative z-10", {
						"opacity-0": loading && typeof window !== "undefined", // Don't hide image on server, allowing NoScript users to see it
					})}
					width={800}
					height={600}
					unoptimized
					onLoad={() => setLoading(false)}
				/>
			</div>

			<div className="mx-auto mt-4 flex w-full flex-row justify-center gap-4 md:w-fit">
				<Link
					href={"/"}
					className="box-border flex grow cursor-default flex-row items-center justify-center gap-2 rounded-xl border-t border-white/30 bg-gradient-to-b from-blue-600 to-blue-800 px-4 py-2 font-semibold text-white drop-shadow-sm hover:from-blue-500 hover:to-blue-700 active:opacity-70 dark:from-blue-700 dark:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800"
				>
					<IconHome /> Home
				</Link>
			</div>
		</div>
	);
}
