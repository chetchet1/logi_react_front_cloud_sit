import React, { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {Button, Grid, Box} from "@mui/material";
import {textAlign} from "@mui/system";
import { DataGrid } from '@mui/x-data-grid';

function WorkPerformanceManagement(props) {
    const [list, setList] = useState([]);

    const column = [
            {
                headerName: '생산완료날짜',
                field: 'workOrderCompletionDate',
                sortable: true,
                minWidth: 160,
                flex: 1,
            },
            { headerName: '작업지시일련번호', field: 'workOrderNo', minWidth: 150, flex: 1,},
            // { headerName: '주생산계획번호', field: 'mpsNo', minWidth: 150, flex: 1,},
            {
                headerName: '수주상세일련번호',
                field: 'contractDetailNo',
                minWidth: 150,
                flex: 1,
            },
            { headerName: '품목구분', field: 'itemClassification', minWidth: 100 ,flex: 1,},
            { headerName: '품목코드', field: 'itemCode', minWidth: 100 ,flex: 1,},
            { headerName: '품목명', field: 'itemName', minWidth: 150 ,flex: 1,},
            { headerName: '단위', field: 'unit', minWidth: 100 ,flex: 1,},
            { headerName: '작업지시수량', field: 'workOrderAmount', minWidth: 100 ,flex: 1,},
            {
                headerName: '실제제작수량',
                field: 'actualCompletionAmount',
                minWidth: 150,
                flex: 1,
            },
            { headerName: '공정성공율', field: 'workSuccessRate' , minWidth: 100 ,flex: 1,}
    ];

    const onClick = e => {
        Axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/quality/workorder/performance-list`)
            .then(({data}) => {

            setList(data.gridRowJson);
        }).catch(e => {
                Swal.fire('오류', e, 'error');
            });
    };

    return (
        <MainCard
            content={false}
            title="생산실적관리"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign: 'right'}}>
                <Button
                    variant="contained"
                    color="secondary"
                    //style={{ marginTop: "1vh" }}
                    onClick={onClick}
                >
                    생산실적조회
                </Button>
            </Grid>}
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
                pageSize={10}
                rowsPerPageOptions={[10]}
                getRowId={(row) => row.workOrderCompletionDate}
                />
            </Box>      

            {/* <MyGrid
                list={list}
                column={column}
                size={size}>
            </MyGrid> */}

            
        </MainCard>
    );
}

export default WorkPerformanceManagement
