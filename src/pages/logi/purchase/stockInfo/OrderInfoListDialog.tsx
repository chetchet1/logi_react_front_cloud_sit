import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import mrpListColumn from 'pages/logi/mrp/mrpColumn';
import MainCard from 'ui-component/cards/MainCard';
import Swal from 'sweetalert2';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MyCalendar from 'pages/utils/Mycalender';
import useInput from 'utils/useInput';
import { today } from 'utils/hr/lib';
import { DataGrid } from '@mui/x-data-grid';
import { getOrderInfoDeliveryList, inspectionStock, warehousingStock } from 'pages/logi/purchase/stockInfo/redux/StockToolkit.tsx';

const OrderInfoListDialog = ({closeOrderInfoDialog, serchStockList}) => {
  const [list, setList] = useState([]);
  const [orderDialogList, setOrderDialogList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [selectRows, setSelectedRows] = useState([]);

  const column = [
    { headerName: '발주번호', field: 'orderNo', minWidth: 170, flex: 1 },
    { headerName: '발주날짜', field: 'orderDate', minWidth: 100, flex: 1 },
    { headerName: '상태', field: 'orderInfoStatus', minWidth: 100, flex: 1 },
    { headerName: '발주구분', field: 'orderSort', minWidth: 100, flex: 1 },
    { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
    { headerName: '품목명', field: 'itemName', minWidth: 150, flex: 1 },
    { headerName: '수량', field: 'orderAmount', minWidth: 100, flex: 1 },
    { headerName: "원재료검사", field: "inspectionStatus", minWidth: 80, flex: 1 },
  ]

  const dispatch = useDispatch();

  const theme = useTheme();

  const orderInfoListState = useSelector((state) => {
    return state.stock.orderInfoDeliveryList;
  });

  useEffect(() => {
    dispatch(getOrderInfoDeliveryList());
  }, []);

  useEffect(() => {
    setList(orderInfoListState);
  }, [orderInfoListState]);

  const inspectionOrder = () => {
    try {
      dispatch(inspectionStock(selectRows));
      Swal.fire({
        icon: 'success',
        title: '검사 성공'
      });
      closeOrderInfoDialog();
      serchStockList();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '검사 실패'
      });
      closeOrderInfoDialog();
      serchStockList();
    }
  }

  const warehousinOrder = () => {
    try {
      dispatch(warehousingStock(selectRows));
      Swal.fire({
        icon: 'success',
        title: '입고 성공'
      });
      closeOrderInfoDialog();
      serchStockList();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: '입고 실패'
      });
      closeOrderInfoDialog();
      serchStockList();
    }
  }

  return (
    <>
      <MainCard
        title="발주품목 입고"
        content={false}
        secondary={
          <Grid item xs={12} sm={6}>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => inspectionOrder()}>
              현재 체크된 발주품목 원재료 검사
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => warehousinOrder()}>
              현재 체크된 발주품목 입고
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
            rows={list}
            columns={column}
            getRowId={(row) => row.orderNo}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            disableRowSelectionOnClick
            onRowSelectionModelChange={(itm) => {
                setSelectedRows(itm);
            }}
          />
        </Box>
      </MainCard>
    </>
  );
};

export default OrderInfoListDialog;
