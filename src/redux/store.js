import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import searchReducer from "./reducers/searchReducer";


const store = configureStore({
    reducer: {
        cart: cartReducer,
        search: searchReducer, // Add search reducer
    }
})

export default store