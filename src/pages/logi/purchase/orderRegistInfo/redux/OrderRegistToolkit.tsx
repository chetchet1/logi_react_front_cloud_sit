import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderList: [],
  orderLoading: false,
  orderSuccess: false,
  orderError: null,
  orderDailogList: [],
  orderDailogListLoading: false,
  orderDailogListSuccess: false,
  orderDailogListError: null,
  registerOrderLoading: false,
  registerOrderSuccess: false,
  registerOrderError: null
  };

  const orderRegistSlice = createSlice({
    name: 'orderRegist',
    initialState,
    reducers: {
      getOrderList(state) {
        state.orderListLoading = true;
      },

      getOrderListSuccess(state, action) {
        state.orderList = action.payload.OrderList;
        state.orderLoading = false;
        state.orderSuccess = true;
      },
  
      getOrderListError(state) {
        state.orderLoading = false;
        state.orderError = '에러남';
      },

      getOrderDailogList(state) {
        state.orderDailogListLoading = true;
      },

      getOrderDailogListSuccess(state, action) {
        state.orderDailogList = action.payload.OrderDailogList;
        state.orderDailogListLoading = false;
        state.orderDailogListSuccess = true;
      },
  
      getOrderDailogListError(state) {
        state.orderDailogListLoading = false;
        state.orderDailogListError = '에러남';
      },

      registerOrderDailog(state) {
        state.registerOrderLoading = true;
      },

      registerOrderDailogSuccess(state) {
        state.registerOrderLoading = false;
        state.registerOrderSuccess = true;
      },

      registerOrderDailogError(state) {
        state.registerOrderError = '에러남';
      },
    }
  });
  
  export default orderRegistSlice.reducer;

  export const { getOrderList, getOrderListSuccess, getOrderListError,
    getOrderDailogList, getOrderDailogListSuccess, getOrderDailogListError,
    registerOrderDailog, registerOrderDailogSuccess, registerOrderDailogError } = orderRegistSlice.actions;