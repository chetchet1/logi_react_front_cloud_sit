// 🌟new

import * as types from '../action/LogisticsInfoActionType';

const initialState = {
  //초기값
  codeList: [],
  detailCodeList: [],
  warehouseList: [],
  itemList: [],
  itemInfoDetail: [],
  warehouseDetail: []
};

const logisticsinfo = (state = initialState, action) => {
  switch (action.type) {
    case types.SEARCH_ITEM_LIST:
      return {
        ...state
      };

    case types.SEARCH_ITEM_LIST_SUCCESS:
      console.log('@@@@@@@@아이템리스트성공했니????', action.payload.gridRowJson);
      return {
        ...state,
        itemList: action.payload.gridRowJson
      };

    case types.SAVE_DEAIL_CODE_LIST_SUCCESS:
      return;

    case types.CODE_LIST: //맨처음 화면 바꼈을때 세팅 되는것. saga에서 액션객체와 data를 받아옴.
      if (action.mode === 'search') {
        let detailList = [];
        action.data.codeList.map((ele) => {
          //ele=codeList=LogiCodeTO
          //codeList에는 = LogiCodeTO - divisionCodeNo, codeType, divisionCodeName, codeChangeAva~, description,
          //ArrayList<LogiCodeDetailTO> codeDetailTOList - 각각의 divisionCodeNo에 대한 detail {detail_code, detail_code_name} 이 들어가 있다.
          detailList = [...detailList, ele.codeDetailTOList];

          return ele; //return ele=codeDetailTOList - 각각의 divisionCodeNo에 대한 detail {detail_code, detail_code_name}
        });
        return {
          ...state,
          codeList: action.data.codeList, //codeList, codeDetailTOList
          detailCodeList: detailList //codEdtailTOList
        };
      } else if (action.mode === 'add') {
        let newList = [...state.codeList, action.codeTo]; //[]
        return {
          ...state,
          codeList: newList
        };
      } else if (action.mode === 'update') {
        let newList = state.codeList.map((ele) => {
          if (action.divisionCodeNo === ele.divisionCodeNo) {
            ele.status = 'UPDATE';
          }
          return ele;
        });
        return {
          ...state,
          codeList: newList
        };
      } else if (action.mode === 'delete') {
        let newList = action.newList; //[]
        return {
          ...state,
          codeList: newList
        };
      } else if (action.mode === 'save') {
        if (action.codeList !== undefined) {
          return {
            ...state,
            codeList: action.codeList
          };
        }
        return {
          ...state
        };
      }
    /* falls through */
    case types.DETAIL_CODE_LIST:
      let newList = state.detailCodeList.map((ele) => {
        if (ele[0].divisionCodeNo === action.detailCodeTo.divisionCodeNo) {
          ele.push(action.detailCodeTo);
        }
        return ele;
      });

      return {
        ...state,
        detailCodeList: newList
      };

    //내가 함 만들어보는거 코드상세
    case types.CODE_DETAIL_LIST:
      return {
        ...state
      };

    case types.CODE_DETAIL_LIST_SUCCESS:
      return {
        ...state,
        detailCodeList: action.payload.codeList
      };

    //품목상세
    case types.SEACRCH_ITEM_DETAIL_LIST:
      return { ...state };

    case types.SEACRCH_ITEM_DETAIL_LIST_SUCCESS:
      return {
        ...state,
        itemInfoDetail: action.payload.gridRowJson
      };
    case types.SAVE_ITEM_DETAIL_LIST:
      console.log('action은???', action);
      return {
        ...state
      };

    case types.SAVE_ITEM_DETAIL_LIST_SUCCESS:
      console.log('action은???', action);
      return {
        ...state,
        itemInfoDetail: action.payload.gridRowJson
      };

    //자재조회
    case types.WAREHOUSE_DETAIL:
      return {
        ...state
      };

    case types.WAREHOUSE_DETAIL_SUCCESS:
      return {
        ...state,
        warehouseDetail: action.payload.gridRowJson
      };
    case types.WAREHOUSE_DETAIL_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };
    // -------창고 관리------- //
    case types.SEARCH_WAREHOUSE_LIST:
      return {
        ...state
      };

    case types.SEARCH_WAREHOUSE_LIST_SUCCESS:
      return {
        ...state,
        warehouseList: action.payload.gridRowJson
      };

    case types.SEARCH_WAREHOUSE_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };
    case types.WAREHOUSE_LIST:
      if (action.mode === 'add') {
        let newList = [...state.warehouseList, action.warehouseTo];
        console.log('@@@@@@@@@@@', action.warehouseTo);
        return {
          ...state,
          warehouseList: newList
        };
      } else {
        return {
          ...state
        };
      }
    case types.SAVE_WAREHOUSE_LIST:
      return {
        ...state
      };

    case types.SAVE_WAREHOUSE_LIST_SUCCESS:
      let result = state.warehouseList.filter((warehouse) => warehouse.status !== 'DELETE');
      return {
        ...state,
        warehouseList: result
      };

    case types.SAVE_WAREHOUSE_LIST_FAILURE:
      return {
        ...state,
        errorMsg: action.payload
      };
    default:
      return state;
  }
};

export default logisticsinfo;
