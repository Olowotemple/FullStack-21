export const createGenreList = (bookList) => {
  return bookList
    .map((bl) => bl.genres)
    .reduce((result, genres) => {
      return result.concat(
        genres.reduce((acc, genre) => {
          if (!result.includes(genre)) {
            acc.push(genre);
            return acc;
          }
          return acc;
        }, [])
      );
    }, []);
};
