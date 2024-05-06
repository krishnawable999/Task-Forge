// import { apiSlice } from "../apiSlice";

// const TASK_URL = "/task";
// export const taskApiSlice = apiSlice.injectEndpoints({
//     endpoints: (builder) => ({
//         getDashboardStats: builder.query({
//             query : ()=>({
//                 url: `${TASK_URL}/dashboard`,
//                 method: "GET",
//                 credentials: "include",
//             }),
//         }),

//         getAllTask: builder.query({
//             query: ({strQuery, isTrashed, search}) => ({
//                 url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
//                 method: "GET",
//                 credentials: "include",
//             })
//         }),

//         createTask: builder.mutation({
//             query: (data)=>({
//                 url: `${TASK_URL}/duplicate/${data.id}`, // Assuming data.id is the correct ID
//                 method: "POST",
//                 body: {},
//                 credentials: "include",
//             }),
//         }),

//         duplicateTask: builder.mutation({
//             query: (id)=>({
//                 url: `${TASK_URL}/duplicate/${id}`,
//                 method: "POST",
//                 body: {},
//                 credentials: "include",
//             }),
//         }),

//         updateTask: builder.mutation({
//             query: (data)=>({
//                 url: `${TASK_URL}/duplicate/${data._id}`,
//                 method: "PUT",
//                 body: data,
//                 credentials: "include",
//             }),
//         }),

//     })
// })

// export const {useGetDashboardStatsQuery, useGetAllTaskQuery, useCreateTaskMutation, useDuplicateTaskMutation, useUpdateTaskMutation} = taskApiSlice


import { apiSlice } from "../apiSlice";

const TASK_URL = "/task";
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query : () => ({
                url: `${TASK_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),

        getAllTask: builder.query({
            query: ({ strQuery, isTrashed, search }) => ({
                url: `${TASK_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: "GET",
                credentials: "include",
            })
        }),

        createTask: builder.mutation({
            // Assuming data.id is the correct ID of the task to duplicate
            query: (data) => ({
                url: `${TASK_URL}/create`, // Make sure data.id is not undefined
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        duplicateTask: builder.mutation({
            // Directly passing id as a parameter, make sure id is defined and correct
            query: (id) => ({
                url: `${TASK_URL}/duplicate/${id}`,
                method: "POST",
                body: {},
                credentials: "include",
            }),
        }),

        updateTask: builder.mutation({
            query: (data) => ({
                url: `${TASK_URL}/duplicate/${data._id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        trashTask: builder.mutation({
            query: ({id}) => ({
                url: `${TASK_URL}/${id}`,
                method: "PUT",
                credentials: "include",
            }),
        }),

        createSubTask: builder.mutation({
            query: ({data, id}) => ({
                url: `${TASK_URL}/create-subtask/${id}`,
                method: "PUT",
                body: data,
                credentials: "include",
            }),
        }),

        getSingleTask: builder.query({
            query: (id) => ({
                url: `${TASK_URL}/${id}`,
                method: "GET",
                credentials: "include",
            })
        }),

        postTaskActivity: builder.mutation({
            query: ({data, id}) => ({
                url: `${TASK_URL}/activity/${id}`,
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),

        deleteRestoreTask: builder.mutation({
            query: ({id, actionType}) =>({
                url: `${TASK_URL}/delete-restore/${id}?actionType=${actionType}`,
                method: "DELETE",
                credentials: "include",
            })
        })

    })
})

// Export the generated hooks
export const {
    useGetDashboardStatsQuery,
    useGetAllTaskQuery,
    useCreateTaskMutation,
    useDuplicateTaskMutation,
    useUpdateTaskMutation,
    useTrashTaskMutation,
    useCreateSubTaskMutation,
    useGetSingleTaskQuery,
    usePostTaskActivityMutation,
    useDeleteRestoreTaskMutation,
} = taskApiSlice;
