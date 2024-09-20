// 🌟new

import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveWorkplace, searchWorkplaceList } from '../action/BasicInfoAction';
// material-ui
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
// project imports
import BasicModal from 'components/basicInfo/BasicModal';
import Page from 'components/ui-component/Page';
import Layout from 'layout';
import MainCard from 'ui-component/cards/MainCard';
// assets
import Swal from 'sweetalert2';

function WorkplaceInfo() {
  const [selected, setSelected] = useState<string[]>([]); // 선택된 아이템의 문자열 배열
  const [addOpenDialog, setAddOpenDialog] = useState(false);
  const [modOpenDialog, setModOpenDialog] = useState(false);
  const [selWorkRow, setSelWorkRow] = useState({});

  // const workplaceList = useSelector((state: any) => state.basicInfo.workplace.workplaceList);
  const dispatch = useDispatch();
  const workplaceList = useSelector((state) => state.basicinfo.workplaceList);
  const selectedWorkplace = selected[0];

  useEffect(() => {
    dispatch(searchWorkplaceList());
  }, [dispatch]);

  const columns = [
    { id: 'workplaceName', label: '사업장', minWidth: 100 },
    { id: 'businessLicenseNumber', label: '사업장등록번호', minWidth: 100 },
    { id: 'corporationLicenseNumber', label: '법인등록번호', minWidth: 100 },
    { id: 'workplaceCeoName', label: '대표자', minWidth: 100 },
    { id: 'workplaceBusinessConditions', label: '업태', minWidth: 100 },
    { id: 'workplaceBusinessItems', label: '종목', minWidth: 100 }
  ];
  //#workplaceTo라는 매개변수를 받는다. 이 매개변수는 폼에서 입력된 데이터를 나타낸다.

  //사업장 정보 행 클릭 시  선택된 사업장 정보 데이터 저장 로직
  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = [name]; // 선택된 값 하나만 새 배열에 넣음
    }
    setSelected(newSelected);
  };

  //🖋️모달창을 닫기 위한 함수
  const close = () => {
    setAddOpenDialog(false);
    setModOpenDialog(false);
  };
  const addClick = () => {
    setAddOpenDialog(true);
  };
  const modClick = () => {
    // 🔨선택된 사업장 목록 중에서 첫 번째 사업장을 가져옵니다.
    if (selectedWorkplace) {
      console.log('Selected Workplace Data:', selectedWorkplace);

      setSelWorkRow(selectedWorkplace);

      // 🖋️모달 열기 로직
      setModOpenDialog(true);
    } else {
      Swal.fire({
        icon: 'error',
        title: '사업장을 선택해주세요.'
      });
    }
  };
  const delClick = () => {
    if (selectedWorkplace) {
      let newSelected = [];
      selected.map((selectedRow) => {
        if (selectedRow.status === 'INSERT') newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
        else newSelected = newSelected.concat((selectedRow.status = 'DELETE'));
      });
      setSelected(newSelected);
      saveClick();
    } else {
      Swal.fire({
        icon: 'error',
        title: '사업장을 선택해주세요.'
      });
    }
  };
  const saveClick = () => {
    dispatch(saveWorkplace(workplaceList));
    return Swal.fire({
      icon: 'success',
      title: '저장 되었습니다'
    });
  };
  return (
    <Page title="Collapse Table">
      <MainCard
        content={false}
        title="사업장 정보"
        secondary={
          <Grid item xs={12} sm={6} sx={{ textAlign: 'right' }}>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={addClick}>
              사업장 추가
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={modClick}>
              수정
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={delClick}>
              삭제
            </Button>
            <Button variant="contained" color="secondary" style={{ marginRight: '1vh' }} onClick={saveClick}>
              저장
            </Button>
          </Grid>
        }
      >
        <TableContainer>
          <Table aria-label="사업장 정보">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell sx={{ py: 3 }} key={column.id} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {workplaceList &&
                workplaceList.map((list: any, index: number) => {
                  const isSelected = selected.includes(list);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      key={index}
                      sx={{ py: 3 }}
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      onClick={(event) => handleClick(event, list)}
                      selected={isSelected}
                    >
                      {columns.map((column) => {
                        const value = list[column.id];
                        return <TableCell key={labelId}>{value || 'No Data'}</TableCell>;
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <BasicModal open={addOpenDialog} onClose={close} title={'사업장 추가'} />
        <BasicModal open={modOpenDialog} onClose={close} title={'사업장 수정'} selWorkRow={selWorkRow} />
      </MainCard>
    </Page>
  );
}

WorkplaceInfo.getLayout = function getLayout(Page: ReactElement) {
  return <Layout>{Page}</Layout>;
};
export default WorkplaceInfo;
