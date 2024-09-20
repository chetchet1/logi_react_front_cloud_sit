// 이 페이지는 페이지는 정상적으로 나오는데 애초에 리엑트부터 기능 구현이 안되어있음....
// 구현을 부탁합니다^^ - ㅅㅂ 왜 짬처리하냐 공부좀 해라 병신들아

import React, { ReactElement, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

// material-ui
import {
    Button,
    Box,
    Collapse,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Grid
} from '@mui/material';

// project imports
import Layout from 'layout';
import Page from 'components/ui-component/Page';
import MainCard from 'ui-component/cards/MainCard';
import { MrpGatheringTO, MrpTO } from 'types/logi/mrp/types';
import MyDialog from 'pages/utils/MyDialog';
import MyCalendar from 'pages/utils/Mycalender';

// assets
import { DataGrid } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import GatherDialog from './GatherDialog';
import { getMrpGatheringList } from 'pages/logi/mrp/redux/gatherToolkit';

const columns = [
  {
    headerName: '소요량취합번호',
    field: 'mrpGatheringNo',
    minWidth: 150, flex: 1
  },
  { headerName: '구매 및 생산여부', field: 'orderOrProductionStatus', minWidth: 90, flex: 1 },
  { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
  { headerName: '품목명', field: 'itemName', minWidth: 100, flex: 1 },
  { headerName: '필요수량', field: 'necessaryAmount', minWidth: 100, flex: 1 },
  {
    headerName: '지시일',
    field: 'claimDate'
    , minWidth: 100, flex: 1
  },
  {
    headerName: '납기일',
    field: 'dueDate'
    , minWidth: 100, flex: 1
  }
];
// ==============================|| TABLE - COLLAPSIBLE ||============================== //

const mrpinfotest = (props: any) => {
  const [GatherList, setGatherList] = useState([]);
  const [startDate, setStartDate] = useState<string>(moment().startOf('month').format('YYYY-MM-DD'));
  const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));
  const [daySelect, setDaySelect] = useState(null);

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.gather.gatheringList;
  });

  const options = [
    { label: '지시일', value: 'claimDate' },
    { label: '납기일', value: 'dueDate' },
  ];

  const onChangeDate = (e: any) => {
    if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  //소요량 취합 결과 조회
  const MrpGatherRegister = () => {
    dispatch(getMrpGatheringList({daySelect, startDate, endDate}));
  };

  useEffect(()=>{
    console.log(state);
    setGatherList(state);
  },[state])

  const theme = useTheme();
  
  return (
    <Page title="MRP 소요량 취합">
      <Grid item xs={12}>
        <div id="grid-wrapper">
          <MainCard
            content={false}
            title="소요량 취합 결과"
            secondary={
              <Grid item xs={12} sm={6}>
                <MyCalendar onChangeDate={onChangeDate} />
                <FormControl sx={{ mr: 2, minWidth: 140 }}>
                    <InputLabel>DAY</InputLabel>
                    <Select
                    name="day"
                    onChange={(e) => {
                        console.log(e.target.value);
                        setDaySelect(e.target.value);
                    }}
                    >
                    {options.map((option, index) => (
                        <MenuItem
                        key={index}
                        value={option.value} // customerCode를 값으로 설정
                        >
                        {`${option.label}`}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
                <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={MrpGatherRegister}>
                  소요량 취합 결과 조회
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
                hideFooter
                rows={GatherList}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.mrpGatheringNo}
              />
            </Box>
          </MainCard>
        </div>
      </Grid>
    </Page>
  );
};
mrpinfotest.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default mrpinfotest;
