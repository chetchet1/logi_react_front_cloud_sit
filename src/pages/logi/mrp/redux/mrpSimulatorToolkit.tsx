import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    mrpSimulatorList: [],
    mrpSimulatorLoading: false,
    mrpSimulatorSuccess: false,
    mrpSimulatorError: null
  };

  const mrpSimulatorSlice = createSlice({
    name: 'mrpSimulator',
    initialState,
    reducers: {
      getMrpSimulatorList(state) {
        state.mrpSimulatorLoading = true;
      },

      getMrpSimulatorListSuccess(state, action) {
        state.mpsLoading = false;
        state.mrpSimulatorList = action.payload.mpsNoList;
        state.mrpSimulatorSuccess = true;
      },
  
      getMrpSimulatorListError(state) {
        state.mrpSimulatorLoading = false;
        state.mrpSimulatorError = '에러남';
      },

      postMrpSimulator(state) {
        state.mrpSimulatorLoading = true;
      },

      postMrpSimulatorSuccess(state) {
        state.mpsLoading = false;
        state.mrpSimulatorSuccess = true;
      },

      postMrpSimulatorError(state) {
        state.mrpSimulatorLoading = false;
        state.mrpSimulatorError = '에러남';
      }
    }
  });
  
  export default mrpSimulatorSlice.reducer;

  export const { getMrpSimulatorList, getMrpSimulatorListSuccess, getMrpSimulatorListError,
    postMrpSimulator, postMrpSimulatorSuccess, postMrpSimulatorError } = mrpSimulatorSlice.actions;