import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import {Button, Grid, Box} from "@mui/material";
import MyCalendar from 'pages/utils/Mycalender';
import { getStockLogList } from 'pages/logi/purchase/stockInfo/redux/StockToolkit.tsx';

const WorkInstruction = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const column = [
      { headerName: '기록 날짜', field: 'logDate', minWidth: 150, flex: 1  }, 
      { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
      { headerName: '품목명', field: 'itemName', minWidth: 100, flex: 1 },
      { headerName: '재고량', key: 'amount', minWidth: 100, flex: 1 },
      { headerName: '사유', field: 'reason', minWidth: 100, flex: 1 }, 
      { headerName: '원인', field: 'cause', minWidth: 100, flex: 1 },
      { headerName: '결과', field: 'effect', minWidth: 300, flex: 1 },
    ]

    const dispatch = useDispatch();

    const stockLogListState = useSelector((state) => {
      return state.stock.stockLogList;
    });

    useEffect(() => {
      setList(stockLogListState);
      console.log(stockLogListState);
    }, [stockLogListState])

    const searchStockLogList = () => {
      dispatch(getStockLogList({ startDate, endDate }));
    }

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

    return (
        <>
            <MainCard
                content={false}
                title={
                    '재고로그 조회'
                }
                secondary={
                    <Grid item xs={12} sm={6}>
                    <MyCalendar onChangeDate={onChangeDate} />
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => searchStockLogList()} >
                      재고로그 조회
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
        </>
    );
}

export default WorkInstruction
