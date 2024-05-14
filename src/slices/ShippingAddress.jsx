import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utilities/authorization";

const email = getLocalStorage("email");

const shippingaddress = getLocalStorage(`shippingaddress_${email}`)
  ? JSON.parse(getLocalStorage(`shippingaddress_${email}`))
  : {
      address: "",
      postalCode: "",
      city: "",
      country: "",
    };

const shippingaddressSlice = createSlice({
  name: "shippingaddress",
  initialState: shippingaddress,
  reducers: {
    addshippingaddress(state, action) {
      state = action.payload;
      localStorage.setItem(`shippingaddress_${email}`, JSON.stringify(state));
    },
  },
});

export default shippingaddressSlice.reducer;

export const { addshippingaddress } = shippingaddressSlice.actions;
