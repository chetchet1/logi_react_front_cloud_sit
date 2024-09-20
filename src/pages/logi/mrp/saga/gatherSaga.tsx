import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getMrpGatherList, getMrpGatherListSuccess, getMrpGatherListError,
  registerMrpGatherList, registerMrpGatherListSuccess, registerMrpGatherListError,
  getMrpGatheringList, getMrpGatheringListSuccess, getMrpGatheringListError} from 'pages/logi/mrp/redux/gatherToolkit';
import { searchGatherList, mrpGatherInsert, searchMrpGathering } from 'pages/logi/mrp/api';

function* handleSearchMrpGather(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchGatherList, param );
    const gatherList = response.data.gridRowJson
    yield put(getMrpGatherListSuccess({gatherList}));
  } catch (error) {
    yield put(getMrpGatherListError());
  }
}

function* handleRegisterMrpGather(action: any) {
  try {
    const Date = action.payload.Date;
    const mrpList = action.payload.mrpList;
    yield call( mrpGatherInsert, {Date, mrpList} );
    yield put(registerMrpGatherListSuccess());
  } catch (error) {
    yield put(registerMrpGatherListError());
  }
}

function* handleSearchMrpGathering(action: any) {
  try {
    const daySelect = action.payload.daySelect;
    const startDate = action.payload.startDate;
    const endDate = action.payload.endDate;
    const response = yield call( searchMrpGathering, {daySelect, startDate, endDate} );
    yield put(getMrpGatheringListSuccess(response));
  } catch (error) {
    yield put(getMrpGatheringListError());
  }
}

function* watchGatherSaga() {
  yield takeLatest(getMrpGatherList, handleSearchMrpGather);
  yield takeLatest(registerMrpGatherList, handleRegisterMrpGather);
  yield takeLatest(getMrpGatheringList, handleSearchMrpGathering);
}

export default function* gatherSaga() {
  yield all([fork(watchGatherSaga)]);
}