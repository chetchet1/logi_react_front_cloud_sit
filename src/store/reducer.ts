// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import kanbanReducer from './slices/kanban';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import menuReducer from './slices/menu';
import InsureReducer from './slices/hr/salary/Insure';
import estimateReducer from 'pages/logi/estimate/reducer/EstimateReducer';
import basicinfoReducer from 'pages/logi/basicinfo/reducer/BasicInfoReducer';
import logisticsinfoReducer from 'pages/logi/basicinfo/reducer/LogisticsInfoReducer';
import salesReducer from 'pages/logi/delivery/reducer/SalesReducer';
// import ProductionReducerCombine from 'erp/logistic/production/reducer/index';
// import transport from 'erp/logistic/transport/reducer/transportReducer';
// import estimateRegisterReducer from 'pages/logi/estimate/redux/reducer/estimateRegisterReducer';
import mpsReducer from 'pages/logi/mps/redux/mpsReducer';
import mrpReducer from 'pages/logi/mrp/redux/mrpToolkit';
import mrpSimulatorReducer from 'pages/logi/mrp/redux/mrpSimulatorToolkit';
import gatherReducer from 'pages/logi/mrp/redux/gatherToolkit';
import orderRegistReducer from 'pages/logi/purchase/orderRegistInfo/redux/OrderRegistToolkit';
import orderInfoReducer from 'pages/logi/purchase/orderRegistInfo/redux/OrderInfoToolkit';
import stockReducer from 'pages/logi/purchase/stockInfo/redux/StockToolkit';
import workSiteReducer from 'pages/logi/production/worksite/redux/workSiteToolkit';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  snackbar: snackbarReducer,
  estimate: estimateReducer,            // 🌟new 
  basicinfo: basicinfoReducer,          // 🌟new 
  logisticsinfo: logisticsinfoReducer,  // 🌟new 
  sales: salesReducer, // 🌟new

  // ProductionReducerCombine,
  // Sales,
  // transport
  cart: persistReducer(
    {
      key: 'cart',
      storage,
      keyPrefix: 'berry-'
    },
    cartReducer
  ),
  kanban: kanbanReducer,
  customer: customerReducer,
  contact: contactReducer,
  product: productReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  mail: mailReducer,
  user: userReducer,
  menu: menuReducer,
  Insure: InsureReducer, //리듀서 등록
  mps: mpsReducer,
  mrp: mrpReducer,
  mrpSimulator : mrpSimulatorReducer,
  gather : gatherReducer,
  orderRegist : orderRegistReducer,
  orderInfo : orderInfoReducer,
  stock : stockReducer,
  workSite : workSiteReducer
});

export default reducer;
