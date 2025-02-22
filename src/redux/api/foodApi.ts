import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const organicFoodApi = createApi({
    reducerPath: 'organicFoodApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000',
        prepareHeaders: (Headers) => {
            const token = localStorage.getItem('accessToken')
            if(token){
              Headers.set('Authorization', token)
            }
           }
    }),
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
                    url : '/api/v1/user/login',
                    method : 'POST',
                    body : data
                }
            }
        }),
      
        allProducts : builder.query({
            query : () => '/api/v1/product/all'
        })


    }),
    
})




export const { useUserRegisterMutation, useUserLoginMutation, useAllProductsQuery } = organicFoodApi