import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    gatherList: [],
    gatherLoading: false,
    gatherSuccess: false,
    gatherError: null,
    registerGatherLoading: false,
    registerGatherSuccess: false,
    registerGatherError: null,
    gatheringList: [],
    gatheringLoading: false,
    gatheringSuccess: false,
    gatheringError: null,
  };

  const gatherSlice = createSlice({
    name: 'gather',
    initialState,
    reducers: {
      getMrpGatherList(state) {
        state.gatherLoading = true;
      },

      getMrpGatherListSuccess(state, action) {
        state.gatherList = action.payload.gatherList;
        state.gatherLoading = false;
        state.gatherSuccess = true;
      },

      getMrpGatherListError(state) {
        state.gatherLoading = false;
        state.gatherError = '에러남';
      },

      registerMrpGatherList(state) {
        state.registerGatherLoading = true;
      },

      registerMrpGatherListSuccess(state) {
        state.registerGatherSuccess = false;
      },

      registerMrpGatherListError(state) {
        state.registerGatherError = false;
        state.registerGatherError = '에러남';
      },

      getMrpGatheringList(state) {
        state.gatheringLoading = true;
      },

      getMrpGatheringListSuccess(state, action) {
        state.gatheringList = action.payload.data.gridRowJson
        state.gatheringLoading = false;
        state.gatheringSuccess = true;
      },

      getMrpGatheringListError(state) {
        state.gatheringLoading = false;
        state.gatheringError = '에러남';
      }
    }
  });
  
  export default gatherSlice.reducer;

  export const { getMrpGatherList, getMrpGatherListSuccess, getMrpGatherListError,
    registerMrpGatherList, registerMrpGatherListSuccess, registerMrpGatherListError,
    getMrpGatheringList, getMrpGatheringListSuccess, getMrpGatheringListError } = gatherSlice.actions;