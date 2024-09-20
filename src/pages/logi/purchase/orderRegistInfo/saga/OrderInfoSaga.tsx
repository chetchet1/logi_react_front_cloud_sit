import { call, fork, put, all, takeLatest } from 'redux-saga/effects';
import { getOrderInfoList, getOrderInfoListSuccess, getOrderInfoListError } from 'pages/logi/purchase/orderRegistInfo/redux/OrderInfoToolkit';
import { searchOrderInfoList } from 'pages/logi/purchase/orderRegistInfo/api';

function* handleSearchOrderInfoList(action: any) {
  try {
    const param = action.payload;
    const response = yield call( searchOrderInfoList, param );
    const orderInfoList = response.data.gridRowJson
    yield put(getOrderInfoListSuccess({orderInfoList}));
  } catch (error) {
    yield put(getOrderInfoListError());
  }
}

function* watchOrderInfoSaga() {
  yield takeLatest(getOrderInfoList, handleSearchOrderInfoList);

}

export default function* orderInfoSaga() {
  yield all([fork(watchOrderInfoSaga)]);
}
