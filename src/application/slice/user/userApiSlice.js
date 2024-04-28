// Import the API slice created using Redux Toolkit
import { apiSlice } from "./apiSlice";

// Define the base URL for user-related API endpoints
const SERVER_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/user`;

// Create a user API slice by injecting endpoints
export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Define a login mutation endpoint
    updateProfile: builder.mutation({
      query: (data) => {
        return {
          url: `${SERVER_URL}/profile`,
          method: "POST",
          body: data,
        };
      },
    }),
    acceptRecruitment: builder.mutation({
      query: (data) => {
        console.log(data)
        return {
          url: `${SERVER_URL}/accept-recruit`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    getStreams: builder.mutation({
      query: (data) => {
        console.log("abhirami");
        return {
          url: `${SERVER_URL}/getStreams`,
          method: "GET",
          body: data,
        };
      },
    }),
    getProfile: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/profile`,
        method: "PATCH",
        body: data,
      }),
    }),
    
    getMessage: builder.mutation({
      query: (data) => ({
        url: `${import.meta.env.VITE_API_SERVER_URL}/api/message`,
        method: "GET",
      }),
    }),
    getSchedules: builder.mutation({
      query: (data) => {
        return { url: `${SERVER_URL}/schedule`, method: "GET" };
      },
    }),
    authMiddleware: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `${SERVER_URL}/auth?ID=${data.id}`,
          method: "GET",
        
        };
      },
    }),
  }),
});

// Export hooks for each mutation endpoint for use in components
export const {
  useUpdateProfileMutation,
  useAcceptRecruitmentMutation,
  useGetStreamsMutation,
  useGetProfileMutation,
  useGetMessageMutation,
  useGetSchedulesMutation,
  useAuthMiddlewareMutation,
} = userApiSlice;
