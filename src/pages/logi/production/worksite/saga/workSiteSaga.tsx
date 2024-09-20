import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getworkSiteList, getworkSiteListSuccess, getworkSiteListError,
    getWorkSiteSituationList, getWorkSiteSituationListSuccess, getWorkSiteSituationListError,
    registerWorkcompletion, registerWorkcompletionSuccess, registerWorkcompletionError,
    getworkSiteLogList, getworkSiteLogListSuccess, getworkSiteLogListError } from 'pages/logi/production/worksite/redux/workSiteToolkit';
import { searchWorkSiteList, searchWorkSiteSituationList, workCompletion, searchWorkSiteLogList } from 'pages/logi/production/worksite/api';

function* handleSearchWorkSite(action: any) {
  try {
    const response = yield call( searchWorkSiteList );
    const worksite = response.data.gridRowJson;
    yield put(getworkSiteListSuccess(worksite));
  } catch (error) {
    yield put(getworkSiteListError());
  }
}

function* handleSearchWorkSiteSituation(action: any) {
    try {
      const params = action.payload;
      const response = yield call( searchWorkSiteSituationList, params );
      const workSiteSituation = response.data.gridRowJson;
      yield put(getWorkSiteSituationListSuccess(workSiteSituation));
    } catch (error) {
      yield put(getWorkSiteSituationListError());
    }
  }

  function* handleWorkcompletion(action: any) {
    try {
      const params = action.payload;
      yield call( workCompletion, params );
      yield put(registerWorkcompletionSuccess());
    } catch (error) {
      yield put(registerWorkcompletionError());
    }
  }

  function* handleSearchWorkSiteLog(action: any) {
    try {
      const param = action.payload;
      const response = yield call( searchWorkSiteLogList, param );
      const worksiteLog = response.data.gridRowJson.map((item, index) => ({
        id: `id${index + 1}`,
        ...item
      }));
      yield put(getworkSiteLogListSuccess(worksiteLog));
    } catch (error) {
      yield put(getworkSiteLogListError());
    }
  }

function* watchWorkSiteSaga() {
  yield takeLatest(getworkSiteList, handleSearchWorkSite);
  yield takeLatest(getWorkSiteSituationList, handleSearchWorkSiteSituation);
  yield takeLatest(registerWorkcompletion, handleWorkcompletion);
  yield takeLatest(getworkSiteLogList, handleSearchWorkSiteLog);
}

export default function* workSiteSaga() {
  yield all([fork(watchWorkSiteSaga)]);
}