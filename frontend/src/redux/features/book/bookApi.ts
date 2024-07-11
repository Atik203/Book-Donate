import { baseApi } from "../../api/baseApi";

const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPopularBooks: builder.query({
      query: () => ({
        url: `/book/popular/`,
        method: "GET",
      }),
    }),
    getAllBooks: builder.query({
      query: ({
        page,
        search,
        id,
        page_size,
        genre,
        status,
        condition,
        rating,
        author,
      }) => {
        const params = new URLSearchParams();

        if (id) {
          params.append("id", id);
        }
        if (page) {
          params.append("page", page.toString());
        }
        if (search) {
          params.append("search", search);
        }
        if (page_size) {
          params.append("page_size", page_size.toString());
        }

        if (genre) {
          params.append("genre", genre);
        }
        if (status) {
          params.append("status", status);
        }

        if (condition) {
          params.append("condition", condition);
        }

        if (rating) {
          params.append("rating", rating);
        }

        if (author) {
          author = encodeURIComponent(author).replace(/%20/g, "+");
          params.append("author", author);
        }

        return {
          url: `/book/list/`,
          method: "GET",
          params,
        };
      },
    }),
    getSingleBook: builder.query({
      query: (id) => ({
        url: `/book/list/?id=${id}`,
        method: "GET",
      }),
    }),
    getAllGenres: builder.query({
      query: () => ({
        url: `/book/genre/`,
        method: "GET",
      }),
    }),
    getAllAuthors: builder.query({
      query: () => ({
        url: `/book/authors/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetPopularBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useGetAllGenresQuery,
  useGetAllAuthorsQuery,
} = bookApi;
