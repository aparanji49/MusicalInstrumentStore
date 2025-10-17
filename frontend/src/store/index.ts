import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // auth: authReducer, products: productsReducer, etc (later)
  },
  // middleware, devTools on by default in dev
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;