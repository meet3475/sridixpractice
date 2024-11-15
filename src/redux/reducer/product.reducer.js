import { GET_ALLPRODUCTS, GET_CATEGORYLIST } from "../ActionType";


const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_ALLPRODUCTS:
            return {
                isLoading: false,
                products: action.payload,
                error: null
            }

        default:
            return state
    }

}