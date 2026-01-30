export default function LinksLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main
			id="main"
			className="mx-auto flex w-full max-w-[90%] grow flex-col items-center pt-16 lg:max-w-4xl"
		>
			{children}
		</main>
	);
}
