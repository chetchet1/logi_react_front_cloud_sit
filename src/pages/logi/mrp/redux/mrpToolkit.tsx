import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    mrpList: [],
    mrpLoading: false,
    mrpSuccess: false,
    mrpError: null
  };

  const mrpSlice = createSlice({
    name: 'mrp',
    initialState,
    reducers: {
      getMrpList(state) {
        state.mrpLoading = true;
      },
      getMrpListSuccess(state, action) {
        state.mrpList = action.payload.data.gridRowJson;
        state.mrpLoading = false;
        state.mrpSuccess = true;
      },
      getMrpListError(state) {
        state.mrpLoading = false;
        state.mrpError = '에러남';
      }
    }
  });
  
  export default mrpSlice.reducer;

  export const { getMrpList, getMrpListSuccess, getMrpListError } = mrpSlice.actions;