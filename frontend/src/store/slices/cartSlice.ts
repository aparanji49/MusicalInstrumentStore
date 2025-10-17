import { createSlice,type PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";
import type { Product } from "../../types";
export type CartItem = {
  _id: string;
  name: string;
  price?: number;
  image?: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
};


const initialState: CartState = { items: [] };

const cartSlice = createSlice({ 
    name: "cart",
    initialState,
    reducers:{
        addItem(state, action: PayloadAction<{product: Product, qty?:number}>){
            const {product, qty=1} = action.payload;
            const idx = state.items.findIndex(i => i._id === product._id);

            if(idx >= 0){
                state.items[idx].qty += qty;
            } else {
                state.items.push({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images?.[0],
                    qty: qty,
                });
            }
        },
        setQty(state,action: PayloadAction<{id: string, qty:number}>){
            const it = state.items.find(i => i._id === action.payload.id);
            if(it){it.qty = action.payload.qty;}
            state.items = state.items.filter(i => i.qty > 0);
        },
        removeItem(state, action: PayloadAction<{id: string}>){
            state.items = state.items.filter(i => i._id !== action.payload.id);
        },
        clearCart(state){
            state.items = [];
        },
    },
});

export const {addItem, setQty, removeItem, clearCart} = cartSlice.actions;
export default cartSlice.reducer;


// Selectors

export const selectCartItems = (s: RootState) => s.cart.items;

// total number of items in cart
export const selectCartCount = createSelector(
    [selectCartItems], 
    (items) => items.reduce((n, i)=> n + i.qty, 0));

// total price of items in cart
export const selectCartSubTotal = createSelector(
    [selectCartItems],
    (items) => items.reduce((sum, i) => sum + (i.price ?? 0) * i.qty, 0)
);