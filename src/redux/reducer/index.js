import { combineReducers } from "redux";
import { productReducer } from "./product.reducer";
import cartSlice from "../slice/cart.slice";

export const RootReducer = combineReducers({
    products : productReducer,
    cart : cartSlice
    
})