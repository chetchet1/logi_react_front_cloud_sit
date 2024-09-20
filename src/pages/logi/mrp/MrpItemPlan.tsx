import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyGrid from 'pages/utils/Mygrid';
import Axios from 'axios';
import Swal from 'sweetalert2';
import MainCard from 'ui-component/cards/MainCard';
import MyDialog from 'pages/utils/MyDialog';
import { DataGrid } from '@mui/x-data-grid';
import { textAlign } from "@mui/system";
import { Button, Grid, Box } from "@mui/material";
import { getMrpList } from 'pages/logi/mrp/redux/mrpToolkit';
import MrpGatherResultDialog from './MrpGatherResultDialog';

const MrpItemPlan = () => {
    
    const [mrpList, setMrpList] = useState([]);
    const [mrpGatherResultDialog, setMrpGatherResultDialog] = useState(false);

    const column = [
        { headerName: "MRP번호", field: "mrpNo", minWidth: 100, flex: 1 },
        { headerName: "품목분류", field: "itemClassification", minWidth: 100, flex: 1 },
        { headerName: "품목코드", field: "itemCode", minWidth: 100, flex: 1 },
        { headerName: "품목명", field: "itemName", minWidth: 100, flex: 1 },
        { headerName: "요청일자", field: "orderDate", minWidth: 100, flex: 1 },
        { headerName: "소요일자", field: "requiredDate", minWidth: 100, flex: 1 },
        { headerName: "필요수량", field: "requiredAmount", minWidth: 100, flex: 1 },
        // { headerName: "취합 적용상태", field: "ZmrpGatheringStatus" },
    ];
      
    const dispatch = useDispatch();

    const state = useSelector((state) => {
      return state.mrp.mrpList;
    });

    useEffect(() => {
        dispatch(getMrpList());
    }, [])

    useEffect(() =>{
        const filteredItems = state
        console.log(filteredItems);
        setMrpList(filteredItems);
    },[state]);

    const mrpGatherResultOpen = () => {
        setMrpGatherResultDialog(true);
    };

    const mrpGatherResultClose = () => {
        setMrpGatherResultDialog(false);
    };

    const serchMrpList = () => {
        dispatch(getMrpList());
    };

    return (
        <>
            <MainCard
                content={false}
                title={'구매 및 생산 소요량 취합'}
                secondary={
                <Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                    <Button variant="contained" color="secondary" onClick={mrpGatherResultOpen}
                            style={{ marginRight: '1vh', marginTop: '1vh' }}
                    >
                    소요량 취합 실행
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
                rows={mrpList}
                columns={column}
                getRowId={(row) => row.mrpNo}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableRowSelectionOnClick
                />
                </Box>
            </MainCard>

            <MyDialog open={mrpGatherResultDialog} close={mrpGatherResultClose} maxWidth={'sm'}>
                <MrpGatherResultDialog mrpList={mrpList} mrpGatherResultClose={()=>mrpGatherResultClose()} getMrpList={()=>serchMrpList()}/>
            </MyDialog>
        </>
    );
}

export default MrpItemPlan
