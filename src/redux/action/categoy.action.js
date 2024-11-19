import axios from "axios";
import { FETCH_CATEGORIES} from "../ActionType";

export const fetchCategories = () => async (dispatch) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/category-list');
        const categories = response.data;
        dispatch({ type: FETCH_CATEGORIES, payload: categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};