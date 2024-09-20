import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getStockList, getStockListSuccess, getStockListError,
  getOrderInfoDeliveryList, getOrderInfoDeliveryListSuccess, getOrderInfoDeliveryListError,
  inspectionStock, inspectionStockSuccess, inspectionStockError,
  warehousingStock, warehousingStockSuccess, warehousingStockError,
  getStockLogList, getStockLogListSuccess, getStockLogListError } from 'pages/logi/purchase/stockInfo/redux/StockToolkit.tsx';
import { searchStockList, searchOrderInfoDeliveryList, putInspectionStock, getwarehousingStock, getStockLog } from 'pages/logi/purchase/stockInfo/api';

function* handleSearchStockList(action: any) {
  try {
    console.log('saga 등장')
    const param = action.payload;
    const response = yield call( searchStockList );
    console.log(response);
    const stockList = response.data.gridRowJson.map((item, index) => ({
      id: `id${index + 1}`,
      ...item
    }));
    yield put(getStockListSuccess({stockList}));
  } catch (error) {
    yield put(getStockListError());
  }
}

function* handleSearchOrderInfoDeliveryList(action: any) {
  try {
    const response = yield call( searchOrderInfoDeliveryList );
    console.log(response);
    const orderInfoDeliveryList = response.data.gridRowJson
    yield put(getOrderInfoDeliveryListSuccess({orderInfoDeliveryList}));
  } catch (error) {
    yield put(getOrderInfoDeliveryListError());
  }
}

function* handleInspectionStock(action: any) {
  try {
    const param = action.payload;
    yield call( putInspectionStock, param );
    yield put(inspectionStockSuccess());
  } catch (error) {
    yield put(inspectionStockError());
  }
}

function* handleWarehousingStock(action: any) {
  try {
    const param = action.payload;
    yield call( getwarehousingStock, param );
    yield put(warehousingStockSuccess());
  } catch (error) {
    yield put(warehousingStockError());
  }
}

function* handleSearchStockLog(action: any) {
  try {
    const param = action.payload;
    const response = yield call( getStockLog, param );
    const stockLogList = response.data.gridRowJson.map((item, index) => ({
      id: `id${index + 1}`,
      ...item
    }));
    yield put(getStockLogListSuccess({stockLogList}));
  } catch (error) {
    yield put(getStockLogListError());
  }
}

function* watchStockSaga() {
  yield takeLatest(getStockList, handleSearchStockList);
  yield takeLatest(getOrderInfoDeliveryList, handleSearchOrderInfoDeliveryList);
  yield takeLatest(inspectionStock, handleInspectionStock);
  yield takeLatest(warehousingStock, handleWarehousingStock);
  yield takeLatest(getStockLogList, handleSearchStockLog);
}

export default function* stockSaga() {
  yield all([fork(watchStockSaga)]);
}
