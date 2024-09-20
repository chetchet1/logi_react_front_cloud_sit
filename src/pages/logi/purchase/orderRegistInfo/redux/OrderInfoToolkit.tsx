import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderInfoList: [],
  orderInfoLoading: false,
  orderInfoSuccess: false,
  orderInfoEroor: null
  };

  const orderInfoSlice = createSlice({
    name: 'orderRegist',
    initialState,
    reducers: {
      getOrderInfoList(state) {
        state.orderInfoLoading = true;
      },

      getOrderInfoListSuccess(state, action) {
        state.orderInfoList = action.payload.orderInfoList;
        state.orderInfoLoading = false;
        state.orderInfoSuccess = true;
      },
  
      getOrderInfoListError(state) {
        state.orderInfoLoading = false;
        state.orderInfoEroor = '에러남';
      }
    }
  });
  
  export default orderInfoSlice.reducer;

  export const { getOrderInfoList, getOrderInfoListSuccess, getOrderInfoListError } = orderInfoSlice.actions;