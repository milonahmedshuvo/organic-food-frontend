import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const organicFoodApi = createApi({
    reducerPath: 'organicFoodApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    endpoints: (builder) => ({
        userRegister : builder.mutation({
            query : (data) => {
                console.log('redux', data)


                return {
                    url: '/api/v1/user/register',
                    method: "POST",
                    body: data
                }
            }
        }),
        userLogin : builder.mutation({
            query : (data) => {

                return {
                    url : '/api/user/login',
                    method : 'POST',
                    body : data
                }
            }
        })
    }) 
})




export const { useUserRegisterMutation, useUserLoginMutation } = organicFoodApi