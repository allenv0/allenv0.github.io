"use client";

import { IconMail } from "@tabler/icons-react";

export default function NewsletterForm({ title = "" }: { title?: string }) {
	return (
		<div className="mx-auto mt-8 max-w-lg rounded-3xl border border-zinc-400/50 bg-neutral-100/50 p-4 backdrop-blur dark:border-zinc-600/50 dark:bg-neutral-900/50 md:text-lg print:hidden">
			<span className="text-center font-semibold">
				{title || "Subscribe to my newsletter"}
			</span>

			<div className="mt-2 flex w-full flex-wrap justify-between gap-2">
				<a
					href="mailto:allenleexyz@gmail.com?subject=Newsletter%20Subscribe"
					className="box-border flex grow cursor-pointer flex-row items-center justify-center gap-2 rounded-xl border-t border-white/30 bg-gradient-to-b from-blue-600 to-blue-800 px-4 py-2 font-semibold text-white drop-shadow-sm hover:from-blue-500 hover:to-blue-700 active:opacity-70 dark:from-blue-700 dark:to-blue-900 dark:hover:from-blue-600 dark:hover:to-blue-800"
				>
					<IconMail /> Subscribe via Email
				</a>
			</div>
		</div>
	);
}
