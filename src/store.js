import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/Cartslice";
import OrderdetailsSlice from "./slices/Orderdetails";
import ShippingAddress from "./slices/ShippingAddress";
const store = configureStore({
  reducer: {
    cart: cartSlice,
    orderdetails: OrderdetailsSlice,
    shippingaddress: ShippingAddress,
  },
});

export default store;
