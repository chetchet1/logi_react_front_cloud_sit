import { createAction } from '@reduxjs/toolkit';
import * as types from './EstimateActionType';

export const getEstimateData = createAction(types.SEARCH_ESTIMATE);
export const getEstimateDataSuccess = createAction(types.SEARCH_ESTIMATE_SUCCESS);
export const getEstimateDataFailure = createAction(types.SEARCH_ESTIMATE_FAILURE);

export const postEstimateData = createAction(types.REGISTER_ESTIMATE);
export const postEstimateDataSuccess = createAction(types.REGISTER_ESTIMATE_SUCCESS);
export const postEstimateDataFailure = createAction(types.REGISTER_ESTIMATE_FAILURE);