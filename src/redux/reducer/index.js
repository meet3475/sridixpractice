import { combineReducers } from "redux";
import { productReducer } from "./product.reducer";
import { categoryReducer } from "./category.reducer";
import cartSlice from "../slice/cart.slice";

export const RootReducer = combineReducers({
    products : productReducer,
    category: categoryReducer,
    cart : cartSlice
    
})