import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:9000",
  }),
  tagTypes: ["videos", "video", "relativeVideos"],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => "/videos",
      keepUnusedDataFor: 600,
      providesTags: ["videos"],
    }),
    getVideo: builder.query({
      query: (id) => `/videos/${id}`,
      providesTags: (result, error, arg) => [{ type: "video", id: arg }],
    }),
    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const searchQuery = title
          .split(" ")
          .map((t) => `title_like=${t}`)
          .join("&");
        return `videos/?${searchQuery}&_limit=4&id_ne=${id}`;
      },
      providesTags: (result, error, arg) => {
        return [{ type: "relatedVideos", id: arg.id }];
      },
    }),
    addVideo: builder.mutation({
      query: (data) => {
        return {
          url: "/videos",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["videos"],
    }),
    editVideo: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/videos/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: (result, error, arg) => [
        "videos",
        { type: "video", id: arg.id },
        { type: "relatedVideos", id: arg.id },
      ],
    }),
    deleteVideo: builder.mutation({
      query: (id) => {
        return {
          url: `/videos/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["videos"],
    }),
  }),
});

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
  useDeleteVideoMutation,
} = apiSlice;
