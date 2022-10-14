import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { stat } from 'fs'

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
        onAdd: (state: CartState, action: PayloadAction<{ product: Product, quantity: number }>) => {
            const { _id, } = action.payload.product
            const { product, quantity } = action.payload

            const isInCart = state.items.find(item => item?._id === _id)

            // if item is already in the cart
            if (isInCart) {
                state.items = state.items.map(cartProduct =>
                    cartProduct._id === _id
                        ? { ...cartProduct, quantity: cartProduct.quantity + quantity }
                        : cartProduct
                )
            }
            else {
                // first time the item is added
                state.items = [...state.items, { ...product, quantity }]
            }
        },
        removeFromCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
            const newCartItems = state.items.filter(item => item?._id !== action.payload.id)
            state.items = newCartItems;
        }
    }
})

// Actions
export const { onAdd, removeFromCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalQuantity = (state: RootState) => state.cart.items.reduce((total: number, item: Product) => (total += item.quantity), 0)
export const selectItemsWithID = (state: RootState, id: string) =>
    state.cart.items.filter((item: Product) => item._id === id)

export const selectCartTotalPrice = (state: RootState) =>
    state.cart.items.reduce((total: number, item: Product) => (total += item.price), 0)

export default cartSlice.reducer;