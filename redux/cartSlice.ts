import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Rootstate } from './store'

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
        onAdd: (state: CartState, action: PayloadAction<Product>) => {
            state.items = [...state.items, action.payload]

        },
        removeFromCart: (state: CartState, action: PayloadAction<{ id: string }>) => {
            const newCartItems = state.items.filter(item => item._id !== action.payload.id)
            state.items = newCartItems;
        }
    }
})

// Actions
export const { onAdd, removeFromCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state: Rootstate) => state.cartReducer.items
export const selectItemsWithID = (state: Rootstate, id: string) => {
    state.cartReducer.items.filter((item: Product) => item._id === id)
}
export const selectCartTotalPrice = (state: Rootstate) =>
    state.cartReducer.items.reduce((total: number, item: Product) => (total += item.price), 0)


export default cartSlice.reducer;