// 🌟new

import { all, fork } from 'redux-saga/effects';
import BasicInfoSaga from '../../pages/logi/basicinfo/saga/BasicInfoSaga';
import EstimateSaga from 'pages/logi/estimate/saga/EstimateSaga';
import LogisticsInfoSaga from 'pages/logi/basicinfo/saga/LogisticsInfoSaga';
import SalesSaga from 'pages/logi/delivery/saga/SalesSaga';
import mrpSimulatorSaga from 'pages/logi/mrp/saga/mrpSimulatorSaga.tsx';
import mrpSaga from 'pages/logi/mrp/saga/mrpSaga.tsx';
import gatherSaga from 'pages/logi/mrp/saga/gatherSaga.tsx';
import orderRegistSaga from 'pages/logi/purchase/orderRegistInfo/saga/OrderRegistSaga.tsx';
import orderInfoSaga from 'pages/logi/purchase/orderRegistInfo/saga/OrderInfoSaga.tsx';
import stockSaga from 'pages/logi/purchase/stockInfo/saga/StockSaga.tsx';
import workSiteSaga from 'pages/logi/production/worksite/saga/workSiteSaga.tsx';

export default function* LogiRootSaga() {
  yield all([fork(BasicInfoSaga), fork(EstimateSaga), fork(LogisticsInfoSaga), fork(SalesSaga),
    fork(mrpSaga), fork(mrpSimulatorSaga), fork(gatherSaga), fork(orderRegistSaga), fork(orderInfoSaga),
    fork(stockSaga), fork(workSiteSaga)]);
}
