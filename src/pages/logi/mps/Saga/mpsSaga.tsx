import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { requestmps, requestmpsSuccess, requestmpsError } from 'pages/logi/mps/redux/mpsReducer';
import { getmpsData } from 'pages/logi/mps/api/mpsApi';

function* handleEstimate(action: any) {
  try {
    const { startDate, endDate, dateSearchCondition } = action.payload;
    const mpsData = yield call(getmpsData, startDate, endDate, dateSearchCondition); //call은 호출메서드
    console.log('estimateDataestimateData', mpsData);
    yield put(requestmpsSuccess({ mpsData }));
  } catch (error) {
    yield put(requestmpsError());
  }
}

function* watchGetmps() {
  yield takeLatest(requestmps, handleEstimate);
  //takeLatest는 next()대신에 쓰는 헬펀데 들어오는 액션중에서 가장 마지막 액션만 처리를하고
  //기존에 하고있던 작업은 취소하고 제일마지막에 들어온 작업만실행
}

export default function* mpsSaga() {
  yield all([fork(watchGetmps)]);
}
