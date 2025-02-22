import { createSlice } from "@reduxjs/toolkit"

export interface TProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    image: string;
    currency: "BDT" | "USD";
    quantity: number
  }

  interface CartState {
    products: TProduct[];
    totaltk : number,
    totalProductCount: number
  }

const initialState:CartState = {
    products :[],
    totaltk: 0,
    totalProductCount : 0
}


const cartSlice = createSlice({
    name: "carts",
    initialState,
    reducers: {
       addToProduct: (state, action) => {
        const exsisting = state.products.find((product) => product._id === action.payload._id )
        if(exsisting){
            exsisting.quantity = exsisting.quantity + 1 
        }else{
            state.products.push( {...action.payload, quantity: 1 } )
        }

        state.totalProductCount = state.totalProductCount + 1
        state.totaltk =  state.totaltk + parseInt(action.payload.price)
       },

       decreaseProduct: (state, action) => {
        const exsisting = state.products.find((product) => product._id === action.payload._id )
        if(exsisting && exsisting.quantity > 1 ){
            exsisting.quantity = exsisting.quantity - 1
            state.totaltk = state.totaltk - parseInt(action.payload.price)
        }  

        state.totalProductCount = state.totalProductCount - 1
       },

       removeProduct: (state, action ) => {
        state.products = state.products.filter((product) => product._id !== action.payload._id )
        state.totaltk = state.totaltk - parseInt(action.payload.tk) * action.payload.quantity
        state.totalProductCount = state.totalProductCount - 1
       },


    }
})



export const { addToProduct, decreaseProduct, removeProduct } = cartSlice.actions; 
export default cartSlice.reducer;