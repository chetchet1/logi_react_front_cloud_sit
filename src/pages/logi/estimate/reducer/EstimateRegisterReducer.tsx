// import { PayloadAction, createSlice } from '@reduxjs/toolkit';

// export interface IestimateRegister {
//     estimateRegistData: [];
// }

// export interface IestimateStateRegister extends IestimateRegister {
//   estimateRegisterData: [];
//   estimateRegisterLoading: boolean;
//   estimateRegisterSuccess: boolean;
//   estimateRegisterError: any;
// }

// const initialState: IestimateStateRegister = {
//   estimateRegisterData: [],
//   estimateRegisterLoading: false,
//   estimateRegisterSuccess: false,
//   estimateRegisterError: null
// };

// const estimateRegisterSlice = createSlice({
//   name: 'estimateRegister',
//   initialState,
//   reducers: {
//     requestEstimateRegister(state: IestimateStateRegister) {
//       state.estimateRegisterLoading = true;
//     },
//     requestEstimateRegisterSuccess(state: IestimateStateRegister, action: PayloadAction<IestimateRegister>) {
//       state.estimateRegisterLoading = false;
//       state.estimateRegisterData = action.payload.estimateRegistData;
//       state.estimateRegisterSuccess = true;
//     },

//     requestEstimateRegisterError(state: IestimateStateRegister) {
//       state.estimateRegisterLoading = false;
//       state.estimateRegisterError = '에러남';
//     }
//   }
// });

// export default estimateRegisterSlice.reducer;
// export const { requestEstimateRegister, requestEstimateRegisterSuccess, requestEstimateRegisterError } = estimateRegisterSlice.actions;
