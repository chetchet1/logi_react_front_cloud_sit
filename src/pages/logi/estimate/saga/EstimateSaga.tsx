import { takeEvery, call, all } from 'redux-saga/effects';
import createRequestSaga from 'pages/utils/createRequestSaga';
import * as types from '../action/EstimateActionType';
import * as api from '../../api/estimateApi';

const getEstimateData = createRequestSaga(types.SEARCH_ESTIMATE, api.getEstimateData);
const postEstimateData = createRequestSaga(types.SEARCH_ESTIMATE, api.postEstimateData);

export function* estimate() {
    yield takeEvery(types.SEARCH_ESTIMATE, getEstimateData); 
    yield takeEvery(types.REGISTER_ESTIMATE, postEstimateData); 
}
//takeEvery : 특정액션을 감시하고 해당액션이 디스패치될때마다, 지정된함수 호출

export default function* EstimateSaga() {
    yield all([     
        call(estimate)
    ]);
}

// //함수형 사가
// import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
// import { requestEstimate, requestEstimateSuccess, requestEstimateError } from '../reducer/EstimateReducer';
// import { getEstimateData, postEstimateData } from '../api/estimateApi';
// import { requestEstimateRegister, requestEstimateRegisterSuccess, requestEstimateRegisterError } from '../reducer/EstimateRegisterReducer';

// function* handleEstimate(action: any) {
//   try {
//     const { startDate, endDate, dateSearchCondition } = action.payload;
//     const estimateData = yield call(getEstimateData, startDate, endDate, dateSearchCondition); //call은 호출메서드
//     yield put(requestEstimateSuccess({ estimateData }));
//   } catch (error) {
//     yield put(requestEstimateError());
//   }
// }

// function* handlePostEstimate(action: any) {
//   try {
//     const { estimateDate, newData } = action.payload;
//     const estimateRegistData = yield call(postEstimateData, estimateDate, newData); //call은 호출메서드
//     yield put(requestEstimateRegisterSuccess({ estimateRegistData }));
//     console.log("estimateRegistData",estimateRegistData)
//   } catch (error) {
//     yield put(requestEstimateRegisterError());
//   }
// }


// function* watchGetEstimate() {
//   yield takeLatest(requestEstimate, handleEstimate); //requestEstimate얘를 감지하면 handleEstimate얘를 실행
//   yield takeLatest(requestEstimateRegister, handlePostEstimate); //requestEstimate얘를 감지하면 handleEstimate얘를 실행

// }


// export default function* estimateSaga() {
//   yield all([fork(watchGetEstimate)]);
// }


