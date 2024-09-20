// import createRequestSaga from 'pages/utils/createRequestSaga';
// import { all, call, takeEvery } from 'redux-saga/effects';
// import * as api from '../api/index';
// import * as types from '../action/SalesActionType';

// const deliveryCompleteApi = createRequestSaga(types.DELIVERY_COMPLETE_REQUEST, api.deliveryCompleteApi);
// const deliveryAvailableApi = createRequestSaga(types.DELIVERY_AVAILABLE_REQUEST_SUCCESS, api.deliveryAvailableApi);

// export function* deliveryCompleteDataSaga() {
//   yield takeEvery(types.DELIVERY_COMPLETE_REQUEST, deliveryCompleteApi);
//   yield takeEvery(types.DELIVERY_AVAILABLE_REQUEST_SUCCESS, deliveryAvailableApi);
// }

// export default function* SalesSaga() {
//   yield all([call(deliveryCompleteDataSaga)]);
// }

import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import {
  deliveryAvailableRequest,
  deliveryAvailableRequestSuccess,
  deliveryCompleteRequest,
  deliveryCompleteRequestSuccess
} from '../reducer/SalesReducer';
import { deleveryCompleteApi, deliveryAvailableApi } from '../api/index';
import { AxiosResponse } from 'axios';

//조회
function* fetchDeliveryList(action: any) {
  console.log('왔니', action.payload.ableContractInfo);
  try {
    const response: AxiosResponse = yield call(deliveryAvailableApi, action.payload.ableContractInfo);
    console.log('hihi', response);
    yield put(deliveryAvailableRequestSuccess(response));
  } catch (error) {
    console.log('에러임', error);
  }
}

export function* watchFetchDeliveryList() {
  yield takeLatest(deliveryAvailableRequest, fetchDeliveryList);
}

//납품 현황
function* fetchCompleteList(action: any) {
  console.log('saga에 왔니?');
  try {
    const response: AxiosResponse = yield call(deleveryCompleteApi);
    console.log('ㅎㅎ', response);
    yield put(deliveryCompleteRequestSuccess(response));
  } catch (error) {
    console.log('에러임', error);
  }
}

export function* watchFetchCompleteList() {
  yield takeLatest(deliveryCompleteRequest, fetchCompleteList);
}

export default function* SalesSaga() {
  yield all([fork(watchFetchDeliveryList), fork(watchFetchCompleteList)]);
}