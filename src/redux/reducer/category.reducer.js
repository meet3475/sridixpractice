import { GET_CATEGORY } from "../ActionType";


const initialState = {
    isLoading: false,
    category: [],
    error: null
}

export const categoryReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_CATEGORY:
            return {
                isLoading: false,
                category: action.payload,
                error: null
            }

        default:
            return state
    }

}