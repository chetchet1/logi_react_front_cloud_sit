//🌟new

import createRequestSaga from 'pages/utils/createRequestSaga';
import { all, call, put, takeEvery } from 'redux-saga/effects';
import * as api from '../../api/index';
import * as types from '../action/LogisticsInfoActionType';

//code
function* codeInfo(action) {
  try {
    const { data } = yield axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/compinfo/code/list`, null);
    //여기서 data는 modelMap으로 리턴된 {"codeList", codeList},{"errorCode", 1},{"errorMsg", "성공"}
    //가 오고 codeList에는 - LogiCodeTO - divisionCodeNo, codeType, divisionCodeName, codeChangeAva~, description,
    //ArrayList<LogiCodeDetailTO> codeDetailTOList - 각각의 divisionCodeNo에 대한 detail {detail_code, detail_code_name} 이 들어가 있다.
    if (data.errorCode > 0) {
      //뒷단가서 data가져오기를 성공하면 0이상이다.
      yield put({ type: types.CODE_LIST, mode: 'search', data }); //그런다음 reducer함수에 액션타입과 mode:"search", data를 보낸다.
    } else {
      alert(data.errorMsg + '로 인한 구분코드 조회 실패');
    }
  } catch (error) {
    alert(error);
  }
}

function* addCodeInfo(action) {
  try {
    yield put({ type: types.CODE_LIST, mode: 'add', codeTo: action.payload });
  } catch (error) {
    alert(error);
  }
}

function* updateCodeInfo(action) {
  try {
    yield put({
      type: types.CODE_LIST,
      mode: 'update',
      divisionCodeNo: action.payload.divisionCodeNo
    });
  } catch (error) {
    alert(error);
  }
}

function* delCodeInfo(action) {
  try {
    yield put({ type: types.CODE_LIST, mode: 'delete', newList: action.payload.newList });
  } catch (error) {
    alert(error);
  }
}

const saveCodeInfo = createRequestSaga(types.SAVE_CODE_LIST, api.saveCodeInfo);

export function* codeinfo() {
  //takeEvery는 앞의 type에 대한 뒤쪽 함수를 실행 시킨다.
  yield takeEvery(types.SEARCH_CODE_LIST, codeInfo); //types.SEARCH_CODE_LIST에대한 codeInfo함수 실행
  yield takeEvery(types.ADD_CODE_LIST, addCodeInfo);
  yield takeEvery(types.SAVE_CODE_LIST, saveCodeInfo);
  yield takeEvery(types.UPDATE_CODE_LIST, updateCodeInfo);
  yield takeEvery(types.DEL_CODE_LIST, delCodeInfo);
}

//detailCode
function* addDetailCodeInfo(action) {
  try {
    yield put({ type: types.DETAIL_CODE_LIST, mode: 'add', detailCodeTo: action.payload });
  } catch (error) {
    alert(error);
  }
}

const saveDetailCodeInfo = createRequestSaga(types.SAVE_DEAIL_CODE_LIST, api.saveDetailCodeInfo);

export function* detailcodeinfo() {
  yield takeEvery(types.ADD_DEAIL_CODE_LIST, addDetailCodeInfo);
  yield takeEvery(types.SAVE_DEAIL_CODE_LIST, saveDetailCodeInfo);
}

//코드조회

const itemList = createRequestSaga(types.SEARCH_ITEM_LIST, api.itemList);

export function* searchItemList() {
  yield takeEvery(types.SEARCH_ITEM_LIST, itemList);
}

// WAREHOUSE_LIST Saga
const warehouseInfo = createRequestSaga(types.SEARCH_WAREHOUSE_LIST, api.warehouseInfo);
const saveWarehouseInfo = createRequestSaga(types.SAVE_WAREHOUSE_LIST, api.saveWarehouseInfo);

function* addWareHouse(action) {
  try {
    yield put({
      type: types.WAREHOUSE_LIST,
      mode: 'add',
      warehouseTo: action.payload
    });
  } catch (error) {
    alert(error);
  }
}

export function* warehouseinfo() {
  yield takeEvery(types.ADD_WAREHOUSE, addWareHouse);
  yield takeEvery(types.SEARCH_WAREHOUSE_LIST, warehouseInfo);
  yield takeEvery(types.SAVE_WAREHOUSE_LIST, saveWarehouseInfo);
}

//코드상세조회
const codeDetailList = createRequestSaga(types.CODE_DETAIL_LIST, api.codeDetailList);

export function* searchCodeDetailList() {
  yield takeEvery(types.CODE_DETAIL_LIST, codeDetailList);
}

//품목상세조회
const itemInfoDetail = createRequestSaga(types.SEACRCH_ITEM_DETAIL_LIST, api.searchItemInfoDetail);
const saveItemDetail = createRequestSaga(types.SAVE_ITEM_DETAIL_LIST, api.saveItemBatchList);

export function* addItemDetail(action) {
  try {
    yield put({ type: types.ADD_ITEM_DETAIL_LIST, mode: 'add', itemTo: action.payload });
  } catch (error) {
    alert(error);
  }
}

export function* searchItemInfoDetail() {
  yield takeEvery(types.SEACRCH_ITEM_DETAIL_LIST, itemInfoDetail);
  yield takeEvery(types.ADD_ITEM_DETAIL_LIST, addItemDetail);
  yield takeEvery(types.SAVE_ITEM_DETAIL_LIST, saveItemDetail);
}

//자재조회
const warehouseDetail = createRequestSaga(types.WAREHOUSE_DETAIL, api.warehouseDetail);
export function* searchWarehouseDetail() {
  yield takeEvery(types.WAREHOUSE_DETAIL, warehouseDetail);
}

export default function* LogisticsInfoSaga() {
  //와처사가함수
  yield all([
    call(codeinfo),
    call(detailcodeinfo),
    call(warehouseinfo),
    call(searchItemList),
    call(searchCodeDetailList),
    call(searchItemInfoDetail),
    call(searchWarehouseDetail)
  ]);
}
