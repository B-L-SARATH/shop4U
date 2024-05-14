import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utilities/authorization";

const orderdetails = getLocalStorage("orderdetails")
  ? JSON.parse(getLocalStorage("orderdetails"))
  : { shippingaddress: {}, paymentmethod: "upi" };

const orderdetailsSlice = createSlice({
  name: "orderdetails",
  initialState: orderdetails,
  reducers: {
    addshippingaddress(state, action) {
      state.shippingaddress = action.payload;
      localStorage.setItem("orderdetails", JSON.stringify(state));
    },
    addpaymentmethod(state, action) {
      state.paymentmethod = action.payload;
      localStorage.setItem("orderdetails", JSON.stringify(state));
    },
  },
});

export default orderdetailsSlice.reducer;

export const { addshippingaddress, addpaymentmethod } =
  orderdetailsSlice.actions;
