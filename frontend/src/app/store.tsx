import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../utils/store/AllProductsSlice'
import cartReducer from '../utils/store/CartSlice'
import appReducer from '../utils/store/appSlice'
import authReducer from '../utils/store/authSlice'

export const store = configureStore({
    reducer:{
        product:productReducer,
        cart: cartReducer,
        app: appReducer,
        user: authReducer,
    }
})