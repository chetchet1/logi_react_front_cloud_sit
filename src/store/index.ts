// third-party
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';

import { persistStore } from 'redux-persist';

// project imports
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducer';
import LogiRootSaga from './saga/RootSaga';

const sagaMiddleware = createSagaMiddleware();
// ==============================|| REDUX - MAIN STORE ||============================== //
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
    sagaMiddleware, // Redux Saga 미들웨어 추가
  ]
});

sagaMiddleware.run(LogiRootSaga);
const persister = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { dispatch, persister, store, useDispatch, useSelector };
