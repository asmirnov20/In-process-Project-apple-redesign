import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { PURGE } from "redux-persist";
import storage from 'redux-persist/es/storage';

export interface CartState {
    items: Product[]
}

const initialState: CartState = {
    items: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        onAdd: (state: CartState, action: PayloadAction<{ product: Product }>) => {
            const { _id, } = action.payload.product
            const { product } = action.payload

            const isInCart = state.items.find(item => item?._id === _id)

            // if item is already in the cart
            if (isInCart) {
                state.items = state.items.map(cartProduct =>
                    cartProduct._id === _id
                        ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
                        : cartProduct
                )
            }
            else {
                // first time the item is added
                state.items = [...state.items, { ...product, quantity: 1 }]
            }
        },

        removeFromCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
            const newCartItems = state.items.filter(item => item?._id !== action.payload.id)
            state.items = newCartItems;
        },

        increment: (state: CartState, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload

            state.items = state.items.map((item: Product) =>
                item._id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item)
        },

        decrement: (state: CartState, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload

            state.items = state.items.map((item: Product) =>
                item._id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item)
        },

        clearAll: (state: CartState) => {
            state.items = []
        }
    }
})

// Actions
export const { onAdd, removeFromCart, increment, decrement, clearAll } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items

export const selectItemQuantity = (state: RootState, id: string) => state.cart.items.find((item: Product) => item._id === id)?.map((item: Product) => item.quantity)

export const selectTotalQuantity = (state: RootState) => state.cart.items.reduce((total: number, item: Product) => (total += item.quantity), 0)

export const selectCartTotalPrice = (state: RootState) =>
    state.cart.items.reduce((total: number, item: Product) => (total += item.price * item.quantity), 0)

export default cartSlice.reducer;