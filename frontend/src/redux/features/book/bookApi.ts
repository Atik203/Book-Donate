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
    claimedBook: builder.mutation({
      query: (submitData) => {
        return {
          url: `/book/claimed-book/`,
          method: "POST",
          body: {
            claimed_by: submitData.claimed_by,
            id: submitData.id,
          },
        };
      },
      invalidatesTags: ["Book", "User"],
    }),

    addBook: builder.mutation({
      query: (submitData) => {
        return {
          url: `/book/add-book/`,
          method: "POST",
          body: submitData,
        };
      },
      invalidatesTags: ["Book", "User"],
    }),
    addGenre: builder.mutation({
      query: (submitData) => {
        return {
          url: `/book/add-genre/`,
          method: "POST",
          body: submitData,
        };
      },
      invalidatesTags: ["Book", "User"],
    }),
    getPendingBook: builder.query({
      query: () => {
        return {
          url: `/book/pending/`,
          method: "GET",
        };
      },
      providesTags: ["Book", "User"],
    }),
    approveBook: builder.mutation({
      query: (submitData) => {
        return {
          url: `/book/approve-book/`,
          method: "POST",
          body: submitData,
        };
      },
      invalidatesTags: ["Book", "User"],
    }),
    updateBook: builder.mutation({
      query: (submitData) => {
        return {
          url: `/book/update-book/`,
          method: "PUT",
          body: submitData,
        };
      },
      invalidatesTags: ["Book", "User"],
    }),
    deleteBook: builder.mutation({
      query: (data) => {
        return {
          url: `/book/delete-book/`,
          method: "DELETE",
          body: data,
        };
      },
      invalidatesTags: ["Book", "User"],
    }),
  }),
});

export const {
  useGetPopularBooksQuery,
  useGetAllBooksQuery,
  useGetSingleBookQuery,
  useGetAllGenresQuery,
  useGetAllAuthorsQuery,
  useClaimedBookMutation,
  useAddBookMutation,
  useAddGenreMutation,
  useGetPendingBookQuery,
  useApproveBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;
