import { combineReducers } from 'redux';
import gatherlist from './GatherReducer';
import mpslist from './mpsReducer';
import mrplist from './mrpReducer';
import mrpsimulatorlist from './mrpSimulator';

const ProductionReducerCombine = combineReducers({
  gatherlist,
  mpslist,
  mrplist,
  mrpsimulatorlist
});

export default ProductionReducerCombine;

//2023-11-06(월) Hoyeon
//Reducer 생성
