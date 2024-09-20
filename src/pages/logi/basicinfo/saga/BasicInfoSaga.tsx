// 🌟new

import * as types from '../action/BasicInfoActionType';
import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import createRequestSaga from 'pages/utils/createRequestSaga';
import * as api from '../../api/index';

/****************** 사업장정보 saga *********************/
//🖋️사업장 정보의 각 액션에 대한 Saga 함수를 생성
const workplaceInfo = createRequestSaga(types.SEARCH_WORKPLACE_LIST, api.workplaceInfo);
const saveWorkplace = createRequestSaga(types.SAVE_WORKPLACE, api.saveWorkplace);

// #사업장 추가 시 실행되는 함수(사가)
// 🖋️ 각 액션에 대한 제너레이터 함수를 정의
//    이 함수들은 실제 액션이 발생했을 때 실행
function* addWorkplace(action) {
  try {
    yield put({
      type: types.WORKPLACE_LIST,
      mode: 'add',
      workplaceTo: action.payload
    });
  } catch (error) {
    alert(error);
  }
}

function* delWorkplace(action) {
  try {
    yield put({ type: types.WORKPLACE_LIST, mode: 'delete', newList: action.payload.newList });
  } catch (error) {
    alert(error);
  }
}

//🔨사업장 정보 수정을 위한 saga 함수 추가
function* modWorkplace(action) {
  try {
    yield put({
      type: types.WORKPLACE_LIST,
      mode: 'update',
      modWorkplaceTO: action.payload
    });
  } catch (error) {
    alert(error);
  }
}

//#액션들을 모니터링하고, 특정 액션이 발생할 때 관련 함수를 비동기적으로 실행
// takeEvery는 제너레이터 함수 내에서 특정 액션을 감시하고, 해당 액션이 발생할 때마다 특정 함수를 실행
// 두 개의 인자를 받는다. 1.감시할 액션의 타입(type) 2.실행할 함수(사가)
export function* workplace() {
  yield takeEvery(types.SAVE_WORKPLACE, saveWorkplace);
  yield takeEvery(types.SEARCH_WORKPLACE_LIST, workplaceInfo);
  yield takeEvery(types.ADD_WORKPLACE, addWorkplace);
  yield takeEvery(types.DEL_WORKPLACE, delWorkplace);
  // 🖋️사업장 수정 액션 타입 구현~
  yield takeEvery(types.MOD_WORKPLACE, modWorkplace);
}

/****************** 거래처정보 saga *********************/
function* addClient(action) {
  try {
    yield put({
      type: types.SEARCH_CLIENTINFO,
      mode: 'add',
      clientinfoTO: action.payload
    });
  } catch (error) {
    alert(error);
  }
}
function* addFinanceinfo(action) {
  try {
    yield put({
      type: types.SEARCH_FINANINFO,
      mode: 'add',
      financeinfoTO: action.payload
    });
  } catch (error) {
    alert(error);
  }
}

const searchClient = createRequestSaga(types.SEARCH_CLIENTINFO, api.searchClient);
const searchFinan = createRequestSaga(types.SEARCH_FINANINFO, api.searchFinan);
const saveClient = createRequestSaga(types.SAVE_CLIENTINFO, api.saveClient);
const saveFinanInfo = createRequestSaga(types.SAVE_FINANINFO, api.saveFinanInfo);
//#비동기 액션을 처리하기 위한 템플릿 형태의 사가(saga)를 생성하는 역할
//🖋️ workplaceInfo는 index.js에 있음

export function* clientinfo() {
  yield takeEvery(types.ADD_CLIENTINFO, addClient);
  yield takeEvery(types.ADD_FINANINFO, addFinanceinfo);
  yield takeEvery(types.SEARCH_CLIENTINFO, searchClient);
  yield takeEvery(types.SEARCH_FINANINFO, searchFinan);
  yield takeEvery(types.SAVE_CLIENTINFO, saveClient);
  yield takeEvery(types.SAVE_FINANINFO, saveFinanInfo);
}

/****************** 부서정보 saga *****************/
//#types.SEARCH_DEPTINFO와 types.SAVE_DEPTINFO 액션을 감지하며,
// 해당 액션들이 발생하면 관련된 API를 호출하여 데이터를 가져올 수 있다.
const deptInfoRequest = createRequestSaga(types.SEARCH_DEPTINFO, api.deptInfoRequest);
const saveDeptInfo = createRequestSaga(types.SAVE_DEPTINFO, api.saveDeptInfo);

//#takeLatest 함수는 해당 액션의 여러 인스턴스 중 가장 최근에 디스패치된 액션만을 처리
export function* deptinfo() {
  yield takeLatest(types.SEARCH_DEPTINFO, deptInfoRequest);
  yield takeLatest(types.SAVE_DEPTINFO, saveDeptInfo);
}

export default function* BasicInfoSaga() {
  yield all([
    call(workplace), // 사업장
    call(clientinfo), //미노
    call(deptinfo) // 부서 정보
  ]);
}
