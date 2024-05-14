import { createSlice } from "@reduxjs/toolkit";
import { getLocalStorage } from "../utilities/authorization";

const email = getLocalStorage("email");
const cartitems = getLocalStorage(`cartitems_${email}`)
  ? JSON.parse(getLocalStorage(`cartitems_${email}`))
  : [];

const Cartslice = createSlice({
  name: "cart",
  initialState: cartitems,
  reducers: {
    add(state, action) {
      state.push(action.payload);
      let cartitems = [...state];
      localStorage.setItem(`cartitems_${email}`, JSON.stringify(cartitems));
    },

    remove(state, action) {
      let newstate = [...state];
      newstate.splice(action.payload, 1);
      localStorage.setItem(`cartitems_${email}`, JSON.stringify(newstate));
      return newstate;
    },

    update(state, action) {
      const { id, qty, price } = action.payload;
      const existingItem = state.find((item) => item.id === id);

      if (existingItem) {
        existingItem.qty += qty;
      } else {
        state.push(action.payload);
      }

      localStorage.setItem("cartitems_${email}", JSON.stringify([...state]));
    },
    clear(state, action) {
      let emp = [];
      localStorage.setItem("cartitems_${email}", JSON.stringify(emp));

      return emp;
    },
  },
});

export default Cartslice.reducer;
export const { add, remove, update, clear } = Cartslice.actions;
