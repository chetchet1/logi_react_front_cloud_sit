import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { textAlign } from '@mui/system';
import { Button, Grid, Box } from '@mui/material';
import MyCalendar from 'pages/utils/Mycalender';
import OrderDialog from './OrderDialog';
import { getOrderList, getOrderDailogList } from 'pages/logi/purchase/orderRegistInfo/redux/OrderRegistToolkit';

const WorkInstruction = (props) => {
  const [list, setList] = useState([]);
  const [size, setSize] = useState('50vh');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderDialog, setOrderDialog] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const column = [
    { headerName: '소요량취합번호', field: 'mrpGatheringNo', minWidth: 180, flex: true },
    { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: true },
    { headerName: '품목명', field: 'itemName', minWidth: 150, flex: true },
    { headerName: '단위', field: 'unitOfMrp', minWidth: 100, flex: true },
    { headerName: '필요수량', field: 'requiredAmount', minWidth: 100, flex: true },
    { headerName: '현재고량', field: 'stockAmount', minWidth: 100, flex: true },
    { headerName: '발주기한', field: 'orderDate', minWidth: 150, flex: true },
    { headerName: '입고기한', field: 'requiredDate', minWidth: 150, flex: true }
  ];

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state.orderRegist.orderList;
  });

  useEffect(() => {
    setList(state);
  }, [state]);

  const onChangeDate = (e) => {
    if (e.target.id === 'startDate') {
      setStartDate(e.target.value);
    } else {
      setEndDate(e.target.value);
    }
  };

  const basicInfo = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const openGetOrderDialog = () => {
    dispatch(getOrderDailogList({selectedRows}));
    setOrderDialog(true);
  }

  const openOptionOrderDialog = () => {
    console.log('test2');
  }

  const getOrderListClick = () => {
    dispatch(getOrderList({startDate, endDate}))
  }

  const orderDialogClose = () => {
    setOrderDialog(false);
  }

  return (
    <>
      <MainCard
        content={false}
        title={
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Button variant="contained" color="secondary" onClick={openGetOrderDialog}
                style={{ marginRight: '1vh', marginTop: '1vh' }}>
                모의재고처리 및 취합발주
              </Button>
              <Button variant="contained" color="secondary" onClick={openOptionOrderDialog}
                style={{ marginRight: '1vh', marginTop: '1vh' }}>
                임의발주
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} style={{ textAlign: 'right' }}>
              <MyCalendar onChangeDate={onChangeDate} basicInfo={basicInfo} />
              <Button variant="contained" color="secondary" onClick={getOrderListClick}
                style={{ marginRight: '1vh', marginTop: '1vh' }}>
                재고/발주목록 조회
              </Button>
            </Grid>
          </Grid>
        }
      >
        <Box
          sx={{
            height: 400,
            width: '100%',
            background: 'white'
          }}
        >
          <DataGrid
            rows={list}
            columns={column}
            getRowId={(row) => row.mrpGatheringNo}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(itm) => {
                console.log(itm);
                setSelectedRows(itm);
            }}
          />
        </Box>
      </MainCard>
      
      <MyDialog open={orderDialog} close={orderDialogClose} maxWidth={'sm'}>
        <OrderDialog selectedRows={selectedRows} orderDialogClose={()=>orderDialogClose()} getOrderListClick={()=>getOrderListClick()}/>
      </MyDialog>
    </>
  );
};

export default WorkInstruction;
