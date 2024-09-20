export const SEARCH_MRP_LIST_SUCCESS = 'src/erp/logistic/Saga/SEARCH_MRP_SUCCESS';

const initialState = {
  MrpSimulatorList: []
};

const mrpsimulatorlist = (state = initialState, action: any) => {
  switch (action.type) {
    case SEARCH_MRP_LIST_SUCCESS:
      return {
        ...state,
        MrpSimulatorList: action.payload.gridRowJson
      };
    default:
      return state;
  }
};

export default mrpsimulatorlist;

//2023-11-06(월) Hoyeon
//Reducer 생성
