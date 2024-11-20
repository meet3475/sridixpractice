import { combineReducers } from "redux";
import { productReducer } from "./product.reducer";
import cartSlice from "../slice/cart.slice";
import { categoriesReducer } from "./category.reducer";

export const RootReducer = combineReducers({
    products : productReducer,
    categories: categoriesReducer,
    cart : cartSlice,
})