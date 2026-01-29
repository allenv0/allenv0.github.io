export default function BlogLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main
			id="main"
			className="mx-auto flex w-full max-w-[90%] grow flex-col items-center pt-16 lg:w-[900px]"
		>
			{children}
		</main>
	);
}
