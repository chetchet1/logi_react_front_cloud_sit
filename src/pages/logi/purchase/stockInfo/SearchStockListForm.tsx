import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import { TextField, Button, Box, Grid } from '@mui/material';
import MyCalendar from 'pages/utils/Mycalender';
import { getStockList } from 'pages/logi/purchase/stockInfo/redux/StockToolkit.tsx';
import OrderInfoListDialog from 'pages/logi/purchase/stockInfo/OrderInfoListDialog.tsx';

const SearchStockListForm = (props) => {
    const [list, setList] = useState([]);
    const [date, setDate] = useState(null);
    const [orderInfoDialog, setOrderInfoDialog] = useState(false);

    const column = [
        { headerName: '창고코드', field: 'warehouseCode', minWidth: 100, flex: 1 },
        { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
        { headerName: '품목명', field: 'itemName', minWidth: 150, flex: 1 },
        { headerName: '단위', field: 'unitOfStock', minWidth: 100, flex: 1 },
        { headerName: '안전재고량', field: 'safetyAllowanceAmount', minWidth: 100, flex: 1 },
        { headerName: '재고량', field: 'stockAmount', minWidth: 100, flex: 1 },
        { headerName: '입고예정재고량', field: 'orderAmount', minWidth: 100, flex: 1 },
        { headerName: '투입예정재고량', field: 'inputAmount', minWidth: 100, flex: 1 },
        { headerName: '납품예정재고량', field: 'deliveryAmount', minWidth: 100, flex: 1 },
      ]
      
    const dispatch = useDispatch();

    const stockListState = useSelector((state) => {
      return state.stock.stockList;
    });

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setDate(formattedDate);
        dispatch(getStockList());
      },[]);

    const serchStockList= () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const formattedDate = `${year}-${month}-${day}`;
        console.log(formattedDate);
        setDate(formattedDate);
        dispatch(getStockList());
    };


    useEffect(() => {
      setList(stockListState);
    }, [stockListState])

    const openOrderInfoListDialog = () => {
        setOrderInfoDialog(true);
    }

    const closeOrderInfoDialog = () => {
        setOrderInfoDialog(false);
    }

    return (
        <>
            <MainCard
                content={false}
                title={
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
        
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => openOrderInfoListDialog()}>
                      입고
                    </Button>
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
                getRowId={(row) => row.id}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableRowSelectionOnClick
                />
                </Box>
            
            </MainCard>

            <MyDialog open={orderInfoDialog} close={closeOrderInfoDialog} maxWidth={'sm'}>
                <OrderInfoListDialog closeOrderInfoDialog={()=>closeOrderInfoDialog()} serchStockList={()=>serchStockList()}/>
            </MyDialog>
        </>
    );
}

export default SearchStockListForm
