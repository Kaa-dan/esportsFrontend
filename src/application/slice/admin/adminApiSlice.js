
import { apiSlice } from "../user/apiSlice";
// Define the base URL for user-related API endpoints

const SERVER_URL = `${import.meta.env.VITE_API_SERVER_URL}/api/admin`


// Create a user API slice by injecting endpoints
export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFans: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/fans`,
        method: "put",
        body: data,
      }),
    }),
    blockFan: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/fans`,
        method: "PATCH",
        body: data,
      }),
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/team`,
        method: "POST",
        body: data,
      }),
    }),
    getTeam: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/teams`,
        method: "POST",
        body: data,
      }),
    }),
    recruitPlayer: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/recruit`,
        method: "POST",
        body: data,
      }),
    }),
    onGoingRecruit: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/recruits`,
        method: "POST",
        body: data,
      }),
    }),
    getAcceptedRecruitment: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/getAcceptedRecruitment`,
        method: "POST",
        body: data,
      }),
    }),
    createPlayer: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/createPlayer`,
        method: "POST",
        body: data,
      }),
    }),
    editTeam: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `${SERVER_URL}/team`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    deleteTeam: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `${SERVER_URL}/team`,
          method: "PUT",
          body: data,
        };
      },
    }),
    updateRecruits: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/recruit`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteRecruits: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/recruit`,
        method: "PATCH",
        body: data,
      }),
    }),
    getPlayer: builder.mutation({
      query: (data) => {
        return {
          url: `${SERVER_URL}/player?search=${data.query}&filter=${data.filterValue}&page=${data.page}`,
          method: "GET",
        };
      },
    }),
    getTeamBasedONVacansy: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/team`,
        method: "GET",
      }),
    }),
    addHighligh: builder.mutation({
      query: (data) => ({
        url: `${SERVER_URL}/highlight`,
        method: "POST",
        body: data,
      }),
    }),
    createSchedule: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `${SERVER_URL}/schedule`,
          method: "POST",
          body: data,
        };
      },
    }),
    getSchedule: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `${SERVER_URL}/schedule?filter=${data.filter}&dateFilter=${data.dateFilter}`,
          method: "GET",
        };
      },
    }),
    deleteSchedules: builder.mutation({
      query: (id) => ({
        url: `${SERVER_URL}/schedule?id=${id.ID}`,
        method: "DELETE",
      }),
    }),
    getHighlight: builder.mutation({
      query: ({ query }) => {
        console.log(query, "query");
        return {
          url: `${SERVER_URL}/highlight?query=${query}`,
          method: "GET",
        };
      },
    }),
    deleteHighlight: builder.mutation({
      query: ({ id }) => {
        return {
          url: `${SERVER_URL}/highlight?id=${id}`,
          method: "DELETE",
        };
      },
    }),
    editSchedule: builder.mutation({
      query: (data) => {
        return {
          url: `${SERVER_URL}/schedule`,
          method: "PUT",
          body: data,
        };
      },
    }),
    getOnGoingrecruitmentUser: builder.mutation({
      query: () => ({
        url: `${SERVER_URL}/recruitment`,
        method: "GET",
      }),
    }),
    demotePlayer: builder.mutation({
      query: (data) =>{
        console.log(data)
        return ({
          url: `${SERVER_URL}/player?id=${data.playerId}`,
          method: "DELETE",
        })
      }
    }),
  }),
});

// Export hooks for each mutation endpoint for use in components
export const {
  useGetFansMutation,
  useBlockFanMutation,
  useCreateTeamMutation,
  useGetTeamMutation,
  useRecruitPlayerMutation,
  useOnGoingRecruitMutation,
  useGetAcceptedRecruitmentMutation,
  useCreatePlayerMutation,

  useEditTeamMutation,
  useDeleteTeamMutation,
  useUpdateRecruitsMutation,
  useDeleteRecruitsMutation,
  useGetPlayerMutation,
  useGetTeamBasedONVacansyMutation,
  useAddHighlighMutation,
  useCreateScheduleMutation,
  useGetScheduleMutation,
  useDeleteSchedulesMutation,
  useGetHighlightMutation,
  useDeleteHighlightMutation,
  useEditScheduleMutation,
  useGetOnGoingrecruitmentUserMutation,
  useDemotePlayerMutation,
} = adminApi;
