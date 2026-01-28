import "./globals.css";
import localFont from "next/font/local";
import Navbar from "@/components/Navbar";
import { CommandPalette } from "@/components/CommandPalette";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import mergeMetadata from "@/lib/mergeMetadata";
import { ThemeProvider } from "next-themes";

export const metadata = mergeMetadata();

export const viewport = {
	themeColor: "#2563eb",
};

const IoskeleyMono = localFont({
	src: [
		{
			path: "../public/TTF/IoskeleyMono-Light.ttf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-Medium.ttf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-SemiBold.ttf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-Bold.ttf",
			weight: "700",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-ExtraBold.ttf",
			weight: "800",
			style: "normal",
		},
		{
			path: "../public/TTF/IoskeleyMono-LightItalic.ttf",
			weight: "300",
			style: "italic",
		},
		{
			path: "../public/TTF/IoskeleyMono-Italic.ttf",
			weight: "400",
			style: "italic",
		},
		{
			path: "../public/TTF/IoskeleyMono-MediumItalic.ttf",
			weight: "500",
			style: "italic",
		},
		{
			path: "../public/TTF/IoskeleyMono-SemiBoldItalic.ttf",
			weight: "600",
			style: "italic",
		},
		{
			path: "../public/TTF/IoskeleyMono-BoldItalic.ttf",
			weight: "700",
			style: "italic",
		},
		{
			path: "../public/TTF/IoskeleyMono-ExtraBoldItalic.ttf",
			weight: "800",
			style: "italic",
		},
	],
	variable: "--font-ioskeley-mono",
	display: "swap",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
			className={`${IoskeleyMono.variable} scroll-smooth [scrollbar-gutter:stable]`}
			style={{ fontFamily: "var(--font-ioskeley-mono), monospace" }}
		>
			<body className="flex min-h-screen max-w-full flex-col items-center gap-8 bg-zinc-50 px-4 pb-8 dark:bg-dark-base lg:mx-auto lg:flex lg:flex-row lg:py-20">
				<div className="bg-grid fixed left-0 top-0 -z-50 size-full h-screen w-screen [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_50%)]" />

				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem={true}
					disableTransitionOnChange={false}
				>
					<CommandPaletteProvider>
						<Navbar />
						<main
							id="main"
							className="mx-auto mt-16 max-w-[90%] grow lg:mt-0 lg:max-w-[60%]"
						>
							{children}
						</main>
						<CommandPalette />
					</CommandPaletteProvider>
				</ThemeProvider>

				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
