import axios from "axios";
import { GET_CATEGORY } from "../ActionType";

export const getcategory = () => async (dispatch) => {
    try {
        const response = await axios.get('https://dummyjson.com/products/categories');

        dispatch({ type: GET_CATEGORY, payload: response.data});

    } catch (error) {
        console.log(error);
    }

}