// Import the API slice created using Redux Toolkit
// import { adminApiSlice } from "./adminApiSlice";
import { apiSlice } from "../user/apiSlice";
// Define the base URL for user-related API endpoints

const SERVER_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/player`


// Create a user API slice by injecting endpoints
export const playerApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createLive: builder.mutation({
      query: (data) => {
        console.log("nithin");
        console.log(data.get("title"));
        return {
          url: `${SERVER_URL}/createLive`,
          method: "POST",
          body: data,
        };
      },
    }),
    deleteLive: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/live?room_id=${data.room_id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export hooks for each mutation endpoint for use in components
export const { useCreateLiveMutation, useDeleteLiveMutation } = playerApi;
