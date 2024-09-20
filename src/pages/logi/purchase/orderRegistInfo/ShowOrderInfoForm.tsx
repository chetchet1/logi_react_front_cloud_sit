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
import moment from 'moment';
import { getOrderInfoList } from 'pages/logi/purchase/orderRegistInfo/redux/OrderInfoToolkit';

const WorkInstruction = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [data, setData] = useState(null);
    const [startDate, setStartDate] = useState<string>(moment().startOf('month').format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>(moment().format('YYYY-MM-DD'));

    const column = [
      { headerName: '발주번호', field: 'orderNo', minWidth: 170, flex: 1 },
      { headerName: '발주날짜', field: 'orderDate', minWidth: 100, flex: 1 },
      { headerName: '현재상태', field: 'orderInfoStatus', minWidth: 100, flex: 1 },
      { headerName: '발주유형', field: 'orderSort', minWidth: 100, flex: 1 },
      { headerName: '품목코드', field: 'itemCode', minWidth: 100, flex: 1 },
      { headerName: '품목명', field: 'itemName', minWidth: 150, flex: 1 },
      { headerName: '발주수량', field: 'orderAmount', minWidth: 100, flex: 1 },
      { headerName: "원재료검사", field: "inspectionStatus", minWidth: 100, flex: 1 },
    ]

    const dispatch = useDispatch();

    const orderInfoListState = useSelector((state) => {
      return state.orderInfo.orderInfoList;
    });

    useEffect(() => {
      setList(orderInfoListState);
    }, [orderInfoListState])

    const searchOrderInfoList = () => {
      dispatch(getOrderInfoList({ startDate, endDate }));
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
                    '발주현황 조회'
                }
                secondary={
                    <Grid item xs={12} sm={6}>
                    <MyCalendar onChangeDate={onChangeDate} />
                    <Button variant="contained" color="secondary" style={{ marginRight: '1vh', marginTop: '1vh' }} onClick={() => searchOrderInfoList()} >
                      소요량 취합 결과 조회
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
                getRowId={(row) => row.orderNo}
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
