// types
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { dispatch } from '../index';
import axios from 'utils/axios';
import { MpsProps, mpsType } from 'types/mps';

// initial state
const initialState: MpsProps = {
  mpsList: { gridRowJson: [] },
  error: null
};

// ==============================|| SLICE - MENU ||============================== //

const slice = createSlice({
  name: 'mps',
  initialState,
  reducers: {
    // has error
    hasError(state, action) {
      state.error = action.payload;
    },

    // get dashboard menu
    getMpsSuccess(state, action) {
      state.mpsList = action.payload;
    }
  }
});

export default slice.reducer;

export function getMpsList(params: mpsType) {
  return async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/production/mps/contractdetail-available`, { params });
      console.log('리듀서', response.data.gridRowJson);
      dispatch(slice.actions.getMpsSuccess(response.data.gridRowJson));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
