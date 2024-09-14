import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath:"UserApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:9009/api/pizza"}),
    tagTypes:["Order"],
    endpoints:builder=>({
        getOrders:builder.query({
            query:()=>"history",
            providesTags:["Order"]
        }),
        createNewOrder:builder.mutation({
            query:order=>({
                url:"order",
                method:"POST",
                body:order
            }),
            invalidatesTags:["Order"]
        })
    })
})


export const {useGetOrdersQuery,useCreateNewOrderMutation} = userApi;