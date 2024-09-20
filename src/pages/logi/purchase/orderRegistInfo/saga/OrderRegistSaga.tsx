import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getOrderList, getOrderListSuccess, getOrderListError,
  getOrderDailogList, getOrderDailogListSuccess, getOrderDailogListError,
  registerOrderDailog, registerOrderDailogSuccess, registerOrderDailogError } from 'pages/logi/purchase/orderRegistInfo/redux/OrderRegistToolkit';
import { searchOrderList, searchOrderDialogList, registerOrder } from 'pages/logi/purchase/orderRegistInfo/api';

function* handleSearchOrderList(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchOrderList, param );
    console.log(response);
    const OrderList = response.data.gridRowJson
    yield put(getOrderListSuccess({OrderList}));
  } catch (error) {
    yield put(getOrderListError());
  }
}

function* handleSearchOrderDailogList(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchOrderDialogList, param );
    console.log(response);
    const OrderDailogList = response.data.gridRowJson
    yield put(getOrderDailogListSuccess({OrderDailogList}));
  } catch (error) {
    yield put(getOrderDailogListError());
  }
}

function* handleRegisterOrderDailog(action: any) {
  try {
    console.log(action.payload);
    const param = action.payload;
    const response = yield call( registerOrder, param );
    yield put(registerOrderDailogSuccess());
  } catch (error) {
    yield put(registerOrderDailogError());
  }
}

function* watchOrderRegistSaga() {
  yield takeLatest(getOrderList, handleSearchOrderList);
  yield takeLatest(getOrderDailogList, handleSearchOrderDailogList);
  yield takeLatest(registerOrderDailog, handleRegisterOrderDailog);
}

export default function* orderRegistSaga() {
  yield all([fork(watchOrderRegistSaga)]);
}