import {Button, Grid, NativeSelect} from '@mui/material';
import Axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import Swal from 'sweetalert2';
import MyGrid from 'pages/utils/Mygrid';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import {map} from "lodash";

function WorkOrderDialog(props) {
    const [list, setList] = useState([]);
    const [workpalce, setWorkplace] = useState([]);
    const [divisionCode, setDivisionCode] = useState([]);
    const [workPlaceCode, setWorkPlaceCode] = useState();
    const [productionProcessCode, setProductionProcessCode] = useState();
    const column = [
            { headerName: '소요량취합번호', field: 'mrpGatheringNo' , minWidth: 150, flex: 1},
            { headerName: '품목분류', field: 'itemClassification' , minWidth: 100, flex: 1},
            { headerName: '품목코드', field: 'itemCode' , minWidth: 100, flex: 1},
            { headerName: '품목명', field: 'itemName' , minWidth: 150, flex: 1},
            { headerName: '단위', field: 'unitOfMrp' , minWidth: 100, flex: 1},
            { headerName: '투입예정재고량', field: 'inputAmount' , minWidth: 100, flex: 1},
            { headerName: '재고소요/제품제작수량', field: 'requiredAmount' , minWidth: 100, flex: 1},
            { headerName: '재고량(재고소요이후)', field: 'stockAfterWork' , minWidth: 100, flex: 1},
            { headerName: '작업지시기한', field: 'orderDate' , minWidth: 100, flex: 1},
            { headerName: '작업완료기한', field: 'requiredDate' , minWidth: 100, flex: 1}
    ];
    const contractSearch = (params) => {

        var result = window.confirm('현재 모의 전개된 결과를 작업하시겠습니까?');
        if (result) {

            const formData = new FormData();
            formData.append('mrpGatheringNo', props.data.mrpGatheringNo);
            formData.append('workPlaceCode', 'BRC-01');
            formData.append('productionProcessCode', 'PP002');
            formData.append('mrpNo', props.data.mrpNo);

            Axios.post(`${process.env.REACT_APP_DOCKER_API_URL}/quality/workorder`, formData)
                .then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: '작업지시 성공'
                    });
                    props.close();
                    props.contractSearch();
                })
                .catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: '작업지시 실패',
                    });
                    props.close();
                    props.contractSearch();
                });
        }
    };

    useEffect(() => {
        console.log("작업지시 useEffect 진입");
        Axios.get(`${process.env.REACT_APP_DOCKER_API_URL}/quality/workorder/dialog`, {
            params: {
                mrpGatheringNo: props.data.mrpGatheringNo,
                mrpNo: props.data.mrpNo
            }
        })
            .then(({data}) => {
                console.log(data.RESULT);
                setList(data.RESULT);
            }).catch(e => {
            Swal.fire('오류', e, 'error');
        });
    }, []);

    return (
        <MainCard
            content={false}
            title="작업지시 시뮬레이션"
            secondary={<Grid item xs={12} sm={6} sx={{textAlign:'right'}}>
                <Button variant="contained" color="secondary" onClick={contractSearch}>
                    현재 모의전개된 결과 작업지시
                </Button>
            </Grid>
            }
        >
            <DataGrid columns={column} rows={list} getRowId={(row) => row.mrpGatheringNo}>
            </DataGrid>
        </MainCard>


    );
}

export default WorkOrderDialog;