import { allMovies } from "./.content-collections/generated";

export default allMovies.sort((a, b) => b.rating - a.rating);
