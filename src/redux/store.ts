import { configureStore } from '@reduxjs/toolkit'
import { organicFoodApi } from './api/foodApi'
import authSlice from '../redux/features/auth/authSlice'
import cartSlice from '../redux/features/cart/cartSlice'

export const store = configureStore({
  reducer: {
    // add RTK query for api in store 
    [organicFoodApi.reducerPath] : organicFoodApi.reducer,

    // add Redux toolkit for state managment 
    auth : authSlice,
    cart: cartSlice,
  },


  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(organicFoodApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch