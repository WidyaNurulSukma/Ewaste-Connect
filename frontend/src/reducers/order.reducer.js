import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {},
  reducers: {
    updateOrder (state, action) {
      return action.payload;
    },
    clearOrder () {
      return {};
    }
  }
});

export const order = (details) => {
  return (dispatch, getState) => {
    return dispatch(updateOrder(details));
  };
};

export const { updateOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
