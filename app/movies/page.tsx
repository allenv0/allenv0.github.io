import mergeMetadata from "@/lib/mergeMetadata";
import { MoviesContent } from "./movies-content";

export const metadata = mergeMetadata({
	title: "Movies",
	description: "A collection of movies",
});

export default function Page() {
	return <MoviesContent />;
}
