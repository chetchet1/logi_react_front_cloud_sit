import { createAction } from '@reduxjs/toolkit';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

/*
요청을 위한 액션 타입을 payload로 설정합니다.(예: "sample/GET_POST").
*/

export const startLoading = createAction(START_LOADING);
export const finishLoading = createAction(FINISH_LOADING);
const initialState = {};

const loading = (state = initialState, action) => {
  switch (action.type) {
    case START_LOADING: {
      return {
        ...state,
        [action.payload]: true
      };
    }
    case FINISH_LOADING: {
      return {
        ...state,
        [action.payload]: false
      };
    }
    default:
      return state;
  }
};

export default loading;
