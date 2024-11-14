import { createSlice } from "@reduxjs/toolkit";

const syncLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const initialState = {
    isLoading: false,
    cart: JSON.parse(localStorage.getItem("cart")) || [],
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex((v) => v.id === Number(action.payload.id));
            if (index !== -1) {
                state.cart[index].quantity += action.payload.count;
            } else {
                state.cart.push({ id: Number(action.payload.id), quantity: action.payload.count });
            }
            syncLocalStorage(state.cart);
        },
        incrementQuantity: (state, action) => {
            const index = state.cart.findIndex((v) => v.id === Number(action.payload));
            if (index !== -1) {
                state.cart[index].quantity += 1;
            }
            syncLocalStorage(state.cart);
        },
        decrementQuantity: (state, action) => {
            const index = state.cart.findIndex((v) => v.id === Number(action.payload));
            if (index !== -1 && state.cart[index].quantity > 1) {
                state.cart[index].quantity -= 1;
            }
            syncLocalStorage(state.cart);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== Number(action.payload));
            syncLocalStorage(state.cart);
        }
    }
});

export const { addToCart, incrementQuantity, decrementQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
