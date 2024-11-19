import { GET_ALLPRODUCTS} from "../ActionType";


const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const categoriesReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_ALLPRODUCTS:
            return {
                isLoading: false,
                categories: action.payload,
                error: null
            }

        default:
            return state
    }

}