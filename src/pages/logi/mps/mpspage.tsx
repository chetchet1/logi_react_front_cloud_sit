import React, { ReactElement, useCallback, useState, useEffect } from 'react';
import moment from 'moment';

// material-ui
import { Button, Grid, Box } from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { MpsTO } from 'types/logi/mrp/types';
import MyCalendar from 'pages/utils/Mycalender';
import Swal from 'sweetalert2';
import { convertContractDetailToMps, searchContractDetailInMpsAvailable } from './mpsAxios';
import MyDialog from 'pages/utils/MyDialog';
import MpsDialog from './MpsDialog';
import dayjs from 'dayjs'

// assets
import axios from 'axios';
import { ContractDetailInMpsAvailableTO } from 'types/logi/mps/types';
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import { dispatch } from 'store';
import { getMpsList } from 'store/slices/mps';

const contractlistcolumn = [
  {
    headerName: '수주상세일련번호',
    field: 'contractDetailNo',
    minWidth: 150,
  },
  { headerName: '유형', field: 'contractType' },
  // { headerName: '계획구분', field: 'planClassification', hide: true },
  { headerName: '수주일자', field: 'contractDate' },
  { headerName: '견적수량', field: 'estimateAmount' },
  { headerName: '초기납품', field: 'stockAmountUse' },
  { headerName: '제작수량', field: 'productionRequirement', editable: true },
  {
    headerName: '계획일자',
    field: 'mpsPlanDate',
    editable: true,
    type: 'date',
    renderCell: (params) => {
      // params.value가 null 또는 undefined인 경우 기본값을 표시
      const dateValue = params.value ? dayjs(params.value).format('YYYY-MM-DD') : 'YYYY-MM-DD';
      return <div>{dateValue}</div>;
    },
  },
  {
    headerName: '출하예정일',
    field: 'scheduledEndDate',
    editable: true,
    type: 'date',
    renderCell: (params) => {
      // params.value가 null 또는 undefined인 경우 기본값을 표시
      const dateValue = params.value ? dayjs(params.value).format('YYYY-MM-DD') : 'YYYY-MM-DD';
      return <div>{dateValue}</div>; 
    },
  },
  { headerName: '납기일', field: 'dueDateOfContract' },
  { headerName: '거래처코드', field: 'customerCode', hide: true },
  { headerName: '품목코드', field: 'itemCode', hide: true },
  { headerName: '품목명', field: 'itemName', minWidth: 150 },
  { headerName: '단위', field: 'unitOfContract', hide: true },
  { headerName: '비고', field: 'description', editable: true, hide: true }
];
// ==============================|| TABLE - COLLAPSIBLE ||============================== //

function MpsContainer() {
  const [startDate, setStartDate] = useState<string>(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [dateSearchCondition, setDateSearchCondition] = useState('includeMrpApply');
  const [selectedRows, setSelectedRows] = useState([]); // 선택된 행을 저장하기 위한 상태 추가
  const [contractData, setContractData] = useState<MpsTO[]>([]);
  const [selList, setSelList] = useState([]);
  const [mpsDialog, setMpsDialog] = useState(false);
  const [calendarDate, setCalendarDate] = useState({
    startDate: startDate,
    endDate: endDate
  });
  const [updatedRow, setUpdateRows ] = useState([]);
  const [dataRow, setDataRows ] = useState([]);
  const [editRowsModel, setEditRowsModel] = useState({});
  const [ContractList, setContractList] = useState<ContractDetailInMpsAvailableTO[]>([]);

  useEffect(() => {
    setSelectedRows([])
  }, [])

  const processRowUpdate = (newRow) => {
    const newRows = { ...newRow };
    const existingIndex = updatedRow.findIndex(row => row.estimateNo === newRows.estimateNo);
    if (existingIndex !== -1) {
      const updatedRows = [...updatedRow];
      updatedRows[existingIndex] = { ...newRow };
      setUpdateRows(updatedRows);
    } else {
      setUpdateRows(prevRows => [...prevRows, { ...newRow }]);
    }
    return newRows;
  };

  const uniqueContractsArray = (contracts) => {
    const uniqueContracts = {};

    contracts.forEach(contract => {
        const { contractDetailNo } = contract;
        if (!uniqueContracts[contractDetailNo] || uniqueContracts[contractDetailNo].index < contracts.indexOf(contract)) {
            uniqueContracts[contractDetailNo] = { index: contracts.indexOf(contract), value: contract };
        }
    });

    const uniqueContractsArray = Object.values(uniqueContracts).map(item => item.value);

    return uniqueContractsArray;
  }

  const findContractByDetailNo = (data, selectedRows) => {
    return [data.find(contract => contract.contractDetailNo === selectedRows[0])];
};

  //MPS등록
  const onClickMpsInsert = () => {
    if (selectedRows.length === 0) {
      console.log(selectedRows);
      return Swal.fire({
        icon: 'error',
        title: '등록할 열을 선택해주세요'
      });
    }
    
    try {
    const data = findContractByDetailNo(uniqueContractsArray(updatedRow),selectedRows)[0];

    if (
      data.mpsPlanDate === null ||
      data.scheduledEndDate === null ||
      data.mpsPlanDate === '' ||
      data.scheduledEndDate === '' ||
      data.productionRequirement === null ||
      data.productionRequirement === ''
     ) {
      return Swal.fire({
        icon: 'error',
        title: '계획일자,출하예정일 \r\n 값을 입력해주세요'
      });
     }
    data.planClassification = "수주상세"
    const newData = {...data};
    newData.mpsPlanDate = newData.mpsPlanDate.toISOString().split('T')[0];
    newData.scheduledEndDate = newData.scheduledEndDate.toISOString().split('T')[0];

    console.log('newData : ', newData);
    
    // MPS 등록 API를 호출하고 데이터를 서버로 보냅니다.
    convertContractDetailToMps(newData);
    onClickSearchContract();
    Swal.fire({
      icon: 'success',
      title: 'MPS 등록완료'
    }).then((result) => {
      onClickSearchContract();
    }).catch((err) => {
      
    });
    } catch (error) {
      console.error('서버 요청 중 오류 발생: ', error);
      return Swal.fire({
        icon: 'error',
        title: '서버 요청 중 오류 발생'
      }).then((result) => {
        onClickSearchContract();
      }).catch((err) => {
        
      });
    }
  };

  const handleEditCell = (params) => {
    const { id, field, value, hasChanged } = params;
    if (hasChanged) {
      // 변경된 값을 처리하는 로직 추가
      console.log(`Cell with id ${id}, field ${field} has new value: ${value}`);
    }
  };

  //20240819
  //여기가 조회했을때 실행되는 함수
  const onClickSearchContract = useCallback(() => {
    console.log('@@@searchContractDetailInMpsAvailable called with:', startDate, endDate);
    searchContractDetailInMpsAvailable(setContractList, startDate, endDate);
    setUpdateRows([]);
  }, [startDate, endDate]);

  const onChangeDate = (e: any) => {
    if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
      console.log('startDate', e.target.value);
      console.log('❇️startDate', startDate);
    } else {
      setEndDate(e.target.value);
      console.log('endDate', e.target.value);
      console.log('❇️endDate', endDate);
    }
  };

  //data grid 사용을 위한 컬럼 정의
  const theme = useTheme();
  //UI에 나타나는 화면 출력
  return (
    <Page title="MPS(주 생산계획) 관리">
      <Grid item xs={12}>
        <div id="grid-wrapper">
          <MainCard
            content={false}
            title="MPS 등록 및 조회"
            secondary={
              <Grid item xs={12} sm={6}>
                <div style={{ float: 'left' }}>
                  <MyCalendar onChangeDate={onChangeDate} />
                  <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={onClickMpsInsert}>
                    MPS 등록
                  </Button>
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ marginRight: '1vh', marginTop: '1vh' }}
                  onClick={onClickSearchContract}
                >
                  MPS등록 가능 조회
                </Button>
              </Grid>
            }
          >
            <Box
              sx={{
                height: 500,
                width: '100%',
                '& .MuiDataGrid-root': {
                  border: 'none',
                  '& .MuiDataGrid-cell': {
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnsContainer': {
                    color: theme.palette.mode === 'dark' ? 'grey.600' : 'grey.900',
                    borderColor: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  },
                  '& .MuiDataGrid-columnSeparator': {
                    color: theme.palette.mode === 'dark' ? theme.palette.text.primary + 15 : 'grey.200'
                  }
                }
              }}
            >
              <DataGrid
                rows={ContractList}
                columns={contractlistcolumn}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.contractDetailNo}
                checkboxSelection
                disableRowSelectionOnClick
                onRowSelectionModelChange={(itm) => {
                  if (itm.length > 1) {
                    const itmSet = new Set(selectedRows);
                    const result = itm.filter((s) => !itmSet.has(s));
                    setSelectedRows(result);
                    console.log(result)
                  } else if(itm.length = 1) {
                    console.log(itm)
                    setSelectedRows(itm)
                  } else {
                    setSelectedRows([null]);
                  }
                }}
                rowSelectionModel={selectedRows}
                processRowUpdate={processRowUpdate}
                onProcessRowUpdateError={(error) => error}
              />
            </Box>
          </MainCard>
        </div>
      </Grid>
    </Page>
  );
}
MpsContainer.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default MpsContainer;
