import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getMrpSimulatorList, getMrpSimulatorListSuccess, getMrpSimulatorListError,
  postMrpSimulator, postMrpSimulatorSuccess, postMrpSimulatorError } from 'pages/logi/mrp/redux/mrpSimulatorToolkit';
import { searchOpenMrpList, mrpInsert } from 'pages/logi/mrp/api';

function* handleSearchMrpSimulator(action: any) {
  try {
    const mpsNoListStr = action.payload;
    const response = yield call( searchOpenMrpList, mpsNoListStr );
    const mpsNoList = response.data.gridRowJson
    console.log('mpsNoList', mpsNoList);
    yield put(getMrpSimulatorListSuccess({mpsNoList}));
  } catch (error) {
    yield put(getMrpSimulatorListError());
  }
}

function* handleRegisterMrpSimulator(action: any) {
  try {
    console.log(action.payload.date);
    console.log(action.payload.list);
    yield call( mrpInsert, action.payload );
    yield put(postMrpSimulatorSuccess());
  } catch (error) {
    yield put(postMrpSimulatorError());
  }
}

function* watchMrpSimulator() {
  yield takeLatest(getMrpSimulatorList, handleSearchMrpSimulator);
  yield takeLatest(postMrpSimulator, handleRegisterMrpSimulator);
}

export default function* mrpSimulatorSaga() {
  yield all([fork(watchMrpSimulator)]);
}