import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    workSiteList: [],
    workSiteLoading: false,
    workSiteSuccess: false,
    workSiteError: null,
    WorkSiteSituationList: [],
    WorkSiteSituationLoading: false,
    WorkSiteSituationSuccess: false,
    WorkSiteSituationError: null,
    WorkcompletionLoading: false,
    WorkcompletionSuccess: false,
    WorkcompletionError: null,
    workSiteLogList: [],
    workSiteLogLoading: false,
    workSiteLogSuccess: false,
    workSiteLogError: null
  };

  const workSiteSlice = createSlice({
    name: 'workSite',
    initialState,
    reducers: {
      getworkSiteList(state) {
        state.workSiteLoading = true;
      },
      getworkSiteListSuccess(state, action) {
        state.workSiteList = action.payload
        state.workSiteLoading = false;
        state.workSiteSuccess = true;
      },
      getworkSiteListError(state) {
        state.workSiteLoading = false;
        state.workSiteError = '에러남';
      },
      getWorkSiteSituationList(state) {
        state.WorkSiteSituationLoading = true;
      },
      getWorkSiteSituationListSuccess(state, action) {
        state.WorkSiteSituationList = action.payload
        state.WorkSiteSituationLoading = false;
        state.WorkSiteSituationSuccess = true;
      },
      getWorkSiteSituationListError(state) {
        state.WorkSiteSituationLoading = false;
        state.WorkSiteSituationError = '에러남';
      },
      registerWorkcompletion(state) {
        state.WorkcompletionLoading = true;
      },
      registerWorkcompletionSuccess(state, action) {
        state.WorkcompletionLoading = false;
        state.WorkcompletionSuccess = true;
      },
      registerWorkcompletionError(state) {
        state.WorkcompletionLoading = false;
        state.WorkcompletionError = '에러남';
      },
      getworkSiteLogList(state) {
        state.workSiteLogListLoading = true;
      },
      getworkSiteLogListSuccess(state, action) {
        state.workSiteLogList = action.payload;
        state.workSiteLogLoading = false;
        state.workSiteLogSuccess = true;
      },
      getworkSiteLogListError(state) {
        state.workSiteLogLoading = false;
        state.workSiteLogError = '에러남';
      }
    }
  });
  
  export default workSiteSlice.reducer;

  export const { getworkSiteList, getworkSiteListSuccess, getworkSiteListError,
    getWorkSiteSituationList, getWorkSiteSituationListSuccess, getWorkSiteSituationListError,
    registerWorkcompletion, registerWorkcompletionSuccess, registerWorkcompletionError,
    getworkSiteLogList, getworkSiteLogListSuccess, getworkSiteLogListError } = workSiteSlice.actions;