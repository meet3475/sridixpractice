import axios from "axios";
import { GET_ALLPRODUCTS, GET_CATEGORYLIST } from "../ActionType";

export const getproduct = () => async (dispatch) => {
    try {
        const response = await axios.get("https://dummyjson.com/products");

        dispatch({ type: GET_ALLPRODUCTS, payload: response.data.products });

    } catch (error) {
        console.log(error);
    }
}


