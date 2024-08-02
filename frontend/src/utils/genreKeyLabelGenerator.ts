import { GENRE, TGenre } from "../components/BookFilter/BookFilter";

export const genreKeyLabelGenerator = (genres: TGenre[]) => {
  genres?.forEach((element: TGenre) => {
    // Find the index of the existing entry with the same key
    const index = GENRE.findIndex((genre) => genre.key === element.slug);

    // If it exists, remove it
    if (index !== -1) {
      GENRE.splice(index, 1);
    }

    // Push the new entry
    GENRE.push({
      key: element.slug,
      label: element.name,
    });
  });
};
