import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
  stockList: [],
  stockLoading: false,
  StockListSuccess: false,
  stockError: null,
  orderInfoDeliveryList: [],
  orderInfoDeliveryListLoading: false,
  orderInfoDeliveryListSuccess: false,
  orderInfoDeliveryListError: null,
  inspectionStockLoading: false,
  inspectionStockSuccess: false,
  inspectionStockError: null,
  warehousingStockLoading: false,
  warehousingStockSuccess: false,
  warehousingStockError: null,
  stockLogList : [],
  stockLogListLoading : false,
  stockLogListSuccess : false,
  stockLogListError : null,
  };

  const stockSlice = createSlice({
    name: 'stock',
    initialState,
    reducers: {
      getStockList(state) {
        state.stockLoading = true;
      },

      getStockListSuccess(state, action) {
        state.stockList = action.payload.stockList;
        state.stockLoading = false;
        state.StockListSuccess = true;
      },
  
      getStockListError(state) {
        state.stockLoading = false;
        state.stockError = '에러남';
      },

      getOrderInfoDeliveryList(state) {
        state.orderInfoDeliveryListLoading = true;
      },

      getOrderInfoDeliveryListSuccess(state, action) {
        state.orderInfoDeliveryList = action.payload.orderInfoDeliveryList;
        state.orderInfoDeliveryListLoading = false;
        state.orderInfoDeliveryListSuccess = true;
      },
  
      getOrderInfoDeliveryListError(state) {
        state.orderInfoDeliveryListLoading = false;
        state.orderInfoDeliveryListError = '에러남';
      },

      inspectionStock(state) {
        state.inspectionStockLoading = true;
      },

      inspectionStockSuccess(state, action) {
        state.inspectionStockLoading = false;
        state.inspectionStockSuccess = true;
      },
  
      inspectionStockError(state) {
        state.inspectionStockLoading = false;
        state.inspectionStockError = '에러남';
      },

      warehousingStock(state) {
        state.inspectionStockLoading = true;
      },

      warehousingStockSuccess(state, action) {
        state.inspectionStockLoading = false;
        state.inspectionStockSuccess = true;
      },
  
      warehousingStockError(state) {
        state.inspectionStockLoading = false;
        state.inspectionStockError = '에러남';
      },

      getStockLogList(state) {
        state.stockLogListLoading = true;
      },

      getStockLogListSuccess(state, action) {
        state.stockLogList = action.payload.stockLogList;
        state.stockLogListLoading = false;
        state.stockLogListSuccess = true;
      },
  
      getStockLogListError(state) {
        state.stockLogListLoading = false;
        state.stockLogListError = '에러남';
      }
    }
  });
  
  export default stockSlice.reducer;

  export const { getStockList, getStockListSuccess, getStockListError,
    getOrderInfoDeliveryList, getOrderInfoDeliveryListSuccess, getOrderInfoDeliveryListError,
    inspectionStock, inspectionStockSuccess, inspectionStockError,
    warehousingStock, warehousingStockSuccess, warehousingStockError,
    getStockLogList, getStockLogListSuccess, getStockLogListError } = stockSlice.actions;