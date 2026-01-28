"use client";

import { useEffect, useState } from "react";
import Menu from "./Menu";
import Link from "next/link";
import clsx from "clsx";
import ThemeSwitch from "./ThemeSwitch";
import Image from "next/image";

export default function Navbar() {
	const [open, setOpen] = useState(false);

	return (
		<nav className="glass-panel fixed left-0 top-0 z-50 flex w-full items-center justify-between px-4 py-2">
			<div className="flex items-center gap-2">
				<Link href="/">
					<div className="flex aspect-square h-6 w-6 items-center justify-center overflow-hidden rounded-full">
						<Image
							src="/al.png"
							alt="Ale Home"
							width={24}
							height={24}
							className="object-cover"
							priority
						/>
					</div>
				</Link>
				<Menu open={open} setOpen={setOpen} />
			</div>

			<div className="flex-1" />

			<ThemeSwitch />
		</nav>
	);
}
