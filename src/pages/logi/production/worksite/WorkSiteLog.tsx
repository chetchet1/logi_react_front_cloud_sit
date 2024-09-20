import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import {textAlign} from "@mui/system";
import {TextField, Button, Grid, Box} from "@mui/material";
import { getworkSiteLogList } from 'pages/logi/production/worksite/redux/workSiteToolkit';
import WorkSiteDialog from './WorkSiteDialog';

const WorkSiteLog = (props) => {
    const [list, setList] = useState([]);
    const [size, setSize] = useState('50vh');
    const [workSiteDialog, setWorkSiteDialog] = useState(false);
    const [workOrderNo, setWorkOrderNo] = useState('');
    const [date, setDate] = useState(null);

    const column = [
        { headerName: '작업지시일련번호', field: 'workOrderNo', minWidth: 150 ,flex: 1,},
        { headerName: '품목코드', field: 'itemCode', minWidth: 100 ,flex: 1,},
        { headerName: '품목명', field: 'itemName', minWidth: 150 ,flex: 1,},
        { headerName: '생산공정코드', field: 'productionProcessCode', minWidth: 100 ,flex: 1,},
        { headerName: '생산공정명', field: 'productionProcessName', minWidth: 130 ,flex: 1,},
        { headerName: '상황', field: 'reaeson', minWidth: 350 ,flex: 1,},
        { headerName: '작업장명', field: 'workSiteName', minWidth: 120 ,flex: 1,},
        { headerName: '날짜', field: 'workDate', minWidth: 150 ,flex: 1,},
    ];

    const dispatch = useDispatch();

    const state = useSelector((state) => {
      return state.workSite.workSiteLogList;
    });

    useEffect(() => {
        setList(state);
    }, [state]);

    const searchWorkSiteLogList = () => {
        dispatch(getworkSiteLogList(date));
    }

    const onChangeDate = (e: any) => {
        const date = e.target.valueAsDate;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setDate(formattedDate);
    }

    return (
        <>
            <MainCard
                content={false}
                title={'작업장 로그'}
                secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <TextField
                        fullWidth
                        label="조회일자"
                        name="조회일자"
                        type={'date'}
                        value={date}
                        onChange={onChangeDate}
                        InputLabelProps={{ shrink: true }}
                        style={{ width: '130px', height: '40px', marginRight: '2vh' }}
                    />
                    <Button variant="contained" color="secondary" onClick={()=>searchWorkSiteLogList()}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                        작업장 로그 조회
                    </Button>
                </Grid>
                }
            >
                <Box
                sx={{
                height: 500,
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

export default WorkSiteLog
