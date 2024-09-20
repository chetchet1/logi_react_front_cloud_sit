import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import mrpListColumn from 'pages/logi/mrp/mrpColumn';
import MainCard from 'ui-component/cards/MainCard';
import { TextField, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MyCalendar from 'pages/utils/Mycalender';
import Swal from 'sweetalert2';
import useInput from 'utils/useInput';
import { today } from 'utils/hr/lib';
import { DataGrid } from '@mui/x-data-grid';
import { registerOrderDailog } from 'pages/logi/purchase/orderRegistInfo/redux/OrderRegistToolkit';

const OrderDialog = ({selectedRows, orderDialogClose, getOrderListClick}) => {
  const [orderDialogList, setOrderDialogList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [date, setDate] = useState(null);

  const Columns = [
    { headerName: '품목코드', field: 'itemCode', flex: true  },
    { headerName: '품목명', field: 'itemName', flex: true },
    { headerName: '단위', field: 'unitOfMrp', flex: true },
    { headerName: '총발주필요량', field: 'requiredAmount', flex: true },
    { headerName: '사용가능재고량', field: 'stockAmount', flex: true },
    { headerName: '실제발주필요량', field: 'calculatedRequiredAmount', flex: true },
    { headerName: '단가', field: 'standardUnitPrice', flex: true },
    { headerName: '합계금액', field: 'sumPrice', flex: true }
  ];

  const dispatch = useDispatch();

  const theme = useTheme();

  const orderDailogListState = useSelector((state) => {
    return state.orderRegist.orderDailogList;
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate);
    setDate(formattedDate);
    setOrderDialogList(orderDailogListState);
  });

  const OrderDialog = () => {};

  const registerMrp = () => {
    try {
      dispatch(registerOrderDailog({ selectedRows }));
      orderDialogClose();
      Swal.fire({
        icon: 'success',
        title: '발주 및 재고처리 완료'
      }).then((result) => {
        getOrderListClick();
      }).catch((err) => {
        
      });
    } catch (error) {
      orderDialogClose();
      Swal.fire({
        icon: 'error',
        title: '발주 및 재고처리 실패'
      }).then((result) => {
        getOrderListClick();
      }).catch((err) => {
        
      });
    }
  };

  return (
    <>
      <MainCard
        title="모의재고처리 및 취합발주"
        content={false}
        secondary={
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="등록일자"
              name="등록일자"
              type={'date'}
              value={date}
              InputLabelProps={{ shrink: true }}
              style={{ width: '130px', height: '40px', marginRight: '2vh' }}
              disabled
            />

            <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => registerMrp()}>
              현재 전개된 결과 발주 및 재고처리
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
          rows={orderDialogList}
          columns={Columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.itemCode} />
        </Box>
      </MainCard>
    </>
  );
};

export default OrderDialog;
