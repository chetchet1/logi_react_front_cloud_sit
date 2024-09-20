import React, { useEffect, useState } from 'react';
import MyGrid2 from 'pages/utils/MyGrid2';
import Gatheringcolumn from './GatheringColumn';
import { TextField, Button } from '@mui/material';
import useInput from './useInput';
import { today } from 'utils/hr/lib';

const GatherDialog = (props: any) => {
  const fromDate = useInput(today);
  const [gridApi, setGridApi] = useState([]);

  useEffect(() => {
    console.log(props.mrpNoData);

    props.searchGatherList({ mrpNoList: props.mrpNoData });
  }, []);

  const onClickGatherInsert = () => {
    props.GatherInsert({
      mrpGatheringRegisterDate: fromDate.value,
      batchList: props.GatherList,
      mrpNoAndItemCodeList: props.mrpNoAndItemCodelist
    });

    gridApi.selectAll();
    let selectedData = gridApi.getSelectedRows();

    console.log(selectedData);

    gridApi.updateRowData({ remove: selectedData });

    props.gridApi.setRowData(null);
  };
  const Grind = (prams: any) => {
    setGridApi(prams.api);
  };
  return (
    <>
      <MyGrid2 column={Gatheringcolumn} title={'MRP GATHERING SIMULATION'} list={props.GatherList} api={Grind}>
        <TextField
          id={'fromDate'}
          label={'소요량 취합등록일자'}
          type={'date'}
          defaultValue={fromDate.value}
          onChange={fromDate.onChange}
          variant="outlined"
        />
        <Button variant="contained" color="primary" style={{ marginRight: '1vh', marginTop: '2vh' }} onClick={onClickGatherInsert}>
          취합 결과 등록
        </Button>
      </MyGrid2>
    </>
  );
};

export default GatherDialog;
