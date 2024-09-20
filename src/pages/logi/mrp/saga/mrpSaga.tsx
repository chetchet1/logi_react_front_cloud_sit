import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getMrpList, getMrpListSuccess, getMrpListError } from 'pages/logi/mrp/redux/mrpToolkit';
import { searchMrpList } from 'pages/logi/mrp/api';

function* handleSearchMrp(action: any) {
  try {
    const response = yield call( searchMrpList );
    yield put(getMrpListSuccess(response));
  } catch (error) {
    yield put(getMrpListError());
  }
}

function* watchMrpSaga() {
  yield takeLatest(getMrpList, handleSearchMrp);
}

export default function* mrpSaga() {
  yield all([fork(watchMrpSaga)]);
}