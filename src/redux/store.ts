import { configureStore } from '@reduxjs/toolkit'
import { organicFoodApi } from './api/foodApi'


export const store = configureStore({
  reducer: {
    // add RTK query for api in store 
    [organicFoodApi.reducerPath] : organicFoodApi.reducer
  },


  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(organicFoodApi.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch