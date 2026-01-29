export default function MoviesLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main
			id="main"
			className="mx-auto flex max-w-[90%] grow flex-col items-center lg:max-w-[60%]"
		>
			{children}
		</main>
	);
}
