import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { onAdd, increment, decrement, removeFromCart } from "./cartSlice";
import { RootState } from "./store";

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    matcher: isAnyOf(onAdd, increment, decrement, removeFromCart),
    effect: (action, listenerApi) => localStorage.setItem('cartItems', JSON.stringify((listenerApi.getState() as RootState).cart))
})