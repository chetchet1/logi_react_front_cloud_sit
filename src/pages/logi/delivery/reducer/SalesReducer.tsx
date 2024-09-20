//🌟new
import { createSlice } from '@reduxjs/toolkit';
// import * as types from '../action/SalesActionType';

// export const deliverySuccess = (successData) => ({
//   type: types.DELIVERY_COMPLETE_SUCCESS,
//   successData
// });

// export const orderSuccess = (successData) => ({
//   type: types.ORDER_COMPLETE_SUCCESS,
//   successData
// });

const salesReducer = createSlice({
  name: 'sales',
  initialState: {
    deliveryCompleteData: [],
    orderCompleteData: [],
    isDeliveryOpen: false,
    contractDetailListInMpsAvailable: [],
    contractAvailableList: [],
    error: null
  },
  reducers: {
    deliveryCompleteRequest: (state, action) => {
      console.log('✋리듀서리퀘스트: deliveryCompleteRequest', action);
      state.error = null;
    },
    deliveryCompleteRequestSuccess: (state, action) => {
      console.log('✋성공: deliveryCompleteRequestSuccess', action.payload);
      state.deliveryCompleteData = action.payload;
    },
    deliveryCompleteRequestFailure: (state, action) => {
      state.error = action.payload;
    },
    deliveryDivisionFailure: (state, action) => {
      state.deliveryCompleteData = action.payload;
    },
    orderCompleteSuccess: (state, action) => {
      state.orderCompleteData = action.payload;
    },
    orderCompleteFailure: (state, action) => {
      state.error = action.payload;
    },
    orderDivisionFailure: (state, action) => {
      state.error = action.payload;
    },
    contractDetailListInMpsAvailableRequest: (state, action) => {
      state.contractDetailListInMpsAvailable = action.payload;
    },
    contractDetailListInMpsAvailableSuccess: (state, action) => {
      state.contractDetailListInMpsAvailable = action.payload;
    },
    contractDetailListInMpsAvailableFailure: (state, action) => {
      state.error = action.payload;
    },
    deliveryAvailableRequest: (state, action) => {
      console.log('✋리퀘스트: deliveryAvailableRequest', action.payload);
      state.error = null;
    },
    deliveryAvailableRequestSuccess: (state, action) => {
      console.log('✋리듀서: deliveryAvailableRequestSuccess', action.payload);
      state.contractAvailableList = action.payload;
    },
    deliveryAvailableRequestFailure: (state, action) => {
      state.error = action.payload;
      console.log('@-@/', action);
      console.log('확인', action.payload);
    }
  }
});

export const {
  deliveryCompleteRequest,
  deliveryCompleteRequestSuccess,
  deliveryCompleteRequestFailure,
  deliveryDivisionFailure,
  orderCompleteSuccess,
  orderCompleteFailure,
  orderDivisionFailure,
  contractDetailListInMpsAvailableRequest,
  contractDetailListInMpsAvailableSuccess,
  contractDetailListInMpsAvailableFailure,
  deliveryAvailableRequest,
  deliveryAvailableRequestSuccess,
  deliveryAvailableRequestFailure
} = salesReducer.actions;

export default salesReducer.reducer;

// const initialState = {
//   deliveryCompleteData: [],
//   orderCompleteData: [],
//   isDeliveryOpen: false,
//   ContractDetailListInMpsAvailable: [],
//   contractavailableList: []
// };

// function sales(state = initialState, action: any) {
//   switch (action.type) {
//     case types.DELIVERY_COMPLETE_REQUEST:
//       return {
//         ...state,
//         deliveryCompleteData: []
//       };
//     case types.DELIVERY_COMPLETE_REQUEST_SUCCESS:
//       return {
//         ...state,
//         deliveryCompleteData: action.payload.gridRowJson
//       };
//     case types.DELIVERY_COMPLETE_REQUEST_FAILURE:
//       return {
//         ...state,
//         errorMsg: action.payload
//       };

//     case types.DELIVERY_DIVISON_FAILURE:
//       return {
//         ...state,
//         deliveryCompleteData: action.error
//       };

//     case types.ORDER_COMPLETE_SUCCESS:
//       return {
//         ...state,
//         orderCompleteData: action.payload
//       };
//     case types.ORDER_COMPLETE_FAILURE:
//       return {
//         ...state,
//         orderCompleteData: action.error
//       };
//     case types.ORDER_DIVISON_FAILURE:
//       return {
//         ...state,
//         orderCompleteData: action.error
//       };
//     case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_REQUEST:
//       return {
//         ...state,
//         ContractDetailListInMpsAvailable: action.payload
//       };
//     case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_SUCCESS:
//       return {
//         ...state,
//         ContractDetailListInMpsAvailable: action.error
//       };
//     case types.CONTRACT_DETAIL_LIST_IN_MPS_AVAILABLE_FAILURE:
//       return {
//         ...state,
//         ContractDetailListInMpsAvailable: action.error
//       };

//     //납품 가능 목록 조회
//     case types.DELIVERY_AVAILABLE_REQUEST:
//       return {
//         ...state,
//         contractavailableList: []
//       };
//     case types.DELIVERY_AVAILABLE_REQUEST_SUCCESS:
//       console.log('✋리듀서: DELIVERY_AVAILABLE_REQUEST_SUCCESS', action.payload.gridRowJson);
//       console.log('✋리듀서: DELIVERY_AVAILABLE_REQUEST_SUCCESS', action.payload);
//       return {
//         ...state,
//         contractavailableList: action.payload
//       };
//     case types.DELIVERY_AVAILABLE_REQUEST_FAILURE:
//       console.log('@-@/', action);
//       console.log('확인', action.error);
//       return {
//         ...state,
//         contractavailableList: action.error
//       };

//     default:
//       return state;
//   }
// }